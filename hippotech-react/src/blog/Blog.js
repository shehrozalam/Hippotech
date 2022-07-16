import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Footer from './Footer';
import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';
import server from '../server';

const sections = [
  { title: 'House Prices', url: '#' },
  { title: 'Upsizing', url: '#' },
  { title: 'New Parents', url: '#' },
  { title: 'Buy to let', url: '#' },
  { title: 'Opinion', url: '#' },
  { title: 'Remortgaging', url: '#' },
];

// const mainFeaturedPost = {
//   title: 'Where next for house prices?',
//   description:
//     "Boiling hot house prices in the Netherlands may be a sign of things to come in rich, densely populated countries.",
//   image: 'blog1.jpg',
//   imageText: 'main image description',
//   linkText: 'Continue reading…',
//   fullText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
// };

// const featuredPosts = [
//   {
//     title: 'A Cornish treat',
//     date: 'Nov 12',
//     description:
//       'A small country estate nestled amongst 23 acres of rolling Cornish countryside, just a stone’s throw from Falmouth — for sale for £1.85 million',
//     image: 'blog2.jpg',
//     imageLabel: 'Image Text',
//     fullText: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
//   },
//   {
//     title: 'How to become a ‘power buyer’ in 2022',
//     date: 'Nov 11',
//     description:
//       'Are you thinking of moving this year? Buyers are facing hot competition right now, with a huge number of people chasing after every available property for sale. So if you’ve been looking to move, you’ve no doubt noticed how competitive it is.',
//     image: 'blog3.jpg',
//     imageLabel: 'Image Text',
//     fullText: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.'
//   },
// ];

const posts = [post1, post2, post3];

const theme = createTheme();

export default function Blog() {
  let [posts, setPosts]= React.useState([]);

  React.useEffect(() => {
    async function loadData() {
      const result = await server.getBlogPostsAsync();
      setPosts(result);
    }
    loadData();
  }, []);

  return (
    // <ThemeProvider theme={theme}>
    //   <CssBaseline />
    <Grid  style={{ minHeight: '100vh', padding: '50px' }} container component="main" > 
      <Container maxWidth="lg">
        <Header title="Blog" sections={sections} />
        <main>
        {
          posts.length && <MainFeaturedPost post={posts[0]} />
        }
        {
          posts.length >1 && <Grid container spacing={4}>
            {posts.slice(1).map((post, i) => (
              <FeaturedPost key={post.title} post={post} postNumber={i+2} />
            ))}
          </Grid>
        }

        </main>
      </Container>

      {/* </ThemeProvider> */}
    </Grid>
     
  );
}
