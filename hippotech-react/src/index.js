import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom";

import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import HippoAppBar from './HippoAppBar';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { blue } from '@mui/material/colors';
import SignIn from './SignIn';
import ApprovalRequest from './ApprovalRequest';
import MyMortgages from './MyMortgages';
import FullPost from './blog/FullPost';
import Blog from './blog/Blog';

import { AuthProvider, RequireAuth } from './Auth';
import Copyright from './Copyright';

const theme = createTheme({
  palette: {
    primary: {
      main: "#791b89",
    },
    secondary: {
      main: blue[500],
    },
  },
});


function Home() {
  const navigate = useNavigate();
  
  return (
    <>      
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="top"
        style={{ minHeight: '100vh', padding: '50px' }}
      >
        <Box
          align="center"
          component="img"
          sx={{
            height: 400,
            width: 600,
            padding:5
            // maxHeight: { xs: 233, md: 167 },
            // maxWidth: { xs: 350, md: 250 },
          }}
          alt="The house from the offer."
          // src="hippo-front.svg"
          src="homeowner.jpg"
        />

        <Typography variant="h5" align="center" color="text.secondary" component="p">
        Don't waste your precious time filling in loads of boring old forms ... get an agreement in principle with HippoTech today!
        </Typography>
        <br/>
        
        <Button 
          id="goToApproval"
          sx={{ fontSize: 20 }} 
          variant="contained"
          onClick={ () => navigate('/approval') }>
          Get me a mortgage!
        </Button>

        <ArrowUpwardIcon sx={{ fontSize: 80 }} color="primary"></ArrowUpwardIcon>
        <Copyright />
      </Grid>
      
    </>
  );
}

function Login() {
  const navigate = useNavigate();

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="top"
        style={{ minHeight: '100vh', padding: '50px' }}
      >
        <SignIn />
      </Grid>
    </>
  );
}



function App() {
  return <AuthProvider>
    <ThemeProvider theme={theme}>  
      <BrowserRouter>
        <HippoAppBar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="blog" element={<Blog />}>
          </Route>
          <Route path="blog/:blogId" element={<FullPost />} />
          <Route path="approval" element={<RequireAuth><ApprovalRequest /> </RequireAuth>} />
          <Route path="myMortgages" element={<RequireAuth><MyMortgages /></RequireAuth>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </AuthProvider>;
}

ReactDOM.render(
  <App />
, document.querySelector('#root'));