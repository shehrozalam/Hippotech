import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import server from '../server.js';
import { useParams } from "react-router-dom";
import { useAuth } from '../Auth';
import { formatDate } from '../utils';
import BadLanguageModal from '../BadLanguageModal';
import { Co2Sharp, SettingsInputAntenna } from '@mui/icons-material';

function useForceUpdate(){
  const [value, setValue] = React.useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}

const theme = createTheme();

export default function FullPost() {
  let params = useParams();
  let [comment, setComment]= React.useState("");
  let [badWord, setBadWord] = React.useState("");
  let [badPost, setBadPost] = React.useState("");

  const forceUpdate = useForceUpdate();
  const auth = useAuth();

  const [post, setPost] = React.useState();
  React.useEffect(() => {
    async function loadData() {
      const result = await server.getBlogPostAsync(params.blogId);
      setPost(result);
    }
    loadData();
  }, [params]);

  const handleBadWordClose = () => {
    setBadWord("");
    setBadPost("");
  }

  const handleChange = (event) => {
    setComment(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    async function postComment() {
      const response = await server.submitCommentAsync(params.blogId, data.get('comment'));
      if (response && response.error) {
        console.log("Bad word!" + response.word);
        setBadWord(response.word);
        setBadPost(data.get('comment'));
      } else {
        const newPost = await server.getBlogPostAsync(params.blogId);
        setPost(newPost);
        forceUpdate();
      }
    }

    postComment();
    setComment("");
  };

  return (
    //<ThemeProvider theme={theme}>

         
    // <Grid
    //   container
    //   spacing={0}
    //   direction="column"
    //   alignItems="center"
    //   component="main"
    //   justifyContent="top"
    //   sx={{ height: '100vh' }}
    //   style={{ minHeight: '100vh', padding: '50px' }}
    // >  
      // <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid  style={{ minHeight: '100vh', padding: '50px' }} container component="main" > 
        {/* <CssBaseline /> */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url("../blog1.jpg")',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        
          {
            post && <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {formatDate(post.date)}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.description}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.fullText}
            </Typography>
            <br/>
          
            {
              post.comments && post.comments.map((c, i) => <Paper key={"post"+i} elevation={2} sx={{ padding: '5px', margin: '5px' }}>
                <Typography variant="subtitle2" color="text.primary">
                  {c.email}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {c.text}
                </Typography>
              </Paper>)
            }

          {
            auth.user && <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="comment"
              label="Leave a comment - get involved!"
              name="comment"
              value={comment}
              onChange={handleChange}
              autoComplete="Your comment"
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Post
            </Button>
          </Box>
          }  
          </CardContent>
          { badWord && <BadLanguageModal badWord={badWord} onClose={handleBadWordClose} badPost={badPost} /> }
        </Card>
          }
        </Grid>
      </Grid>
      
 //   </ThemeProvider>
  );
}