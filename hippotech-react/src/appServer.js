
import axios from 'axios';
import { logError } from './utils';

export default class AppServer {
  constructor() {
    this.authToken = null;
    this.username = null;
  }

  isLoggedIn() { return !!this.authToken; }

  async loginAsync(username, password) {  
    console.log(username);
    console.log(password);

    const result = await axios.post('/api/authenticate', { username, password});
    console.log(result.data);

    if (result.status === 200) {
      this.authToken = result.data.token;
      this.username = username;
      return true;
    }
    return false;
  }

  async withdrawApplication(id) {
    const url = '/api/approval/' + id;
    const options = {
      headers: {
        Authorization: this.authToken,
      }
    }
    await axios.delete(url, options);
  }


  async logoutAsync() {
    console.log('logoutAsync');
    this.authToken = null;
    this.username = null;
    return Promise.resolve();
  }

  async getMyMortgagesAsync() {
    if (!this.username) {
      logError('Calling getMyMortgagesAsync while not logged in.');
      return Promise.resolve([]);
    }

    const url = '/api/approval';
    const options = {
      headers: {
        Authorization: this.authToken,
      }
    }
    const result = await axios.get(url, options);
    return Promise.resolve(result.data);
  }

  async requestApproval(propertyDetails, cardDetails) {
    console.log(propertyDetails);
    const url = '/api/approval';
    const options = {
      headers: {
        Authorization: this.authToken,
      }
    }
    await axios.post(url, propertyDetails, options);
  }

  async submitCommentAsync(postId, text) {
    const url = '/api/blog/' + postId + '/comments';
    const options = {
      headers: {
        Authorization: this.authToken,
        'Content-Type': 'text/plain'
      }
    }
    try {
      await axios.post(url, text, options);
    } catch (error) {
      console.log(error.response);
      return error.response.data;
    }
  }

  async submitJustification(post, justification) {
    const url = '/api/blog/justification';
    const options = {
      headers: {
        Authorization: this.authToken,
      }
    }
    try {
      await axios.post(url, { post, justification }, options);
    } catch (error) {
      console.log(error.response);
      return error.response.data;
    }
  }

  async subscribeToBlog(email, partnersIncluded) {
    const url = '/api/blog/subscribe';
    const data = {
      email,
      partnersIncluded
    };
    try {
      await axios.post(url, data);   
    } catch (e) {
      logError('suscribeToBlog() POST failed');
      logError(e);
    }
    
  }

  async getBlogPostsAsync() {
    let blogs = await axios.get('/api/blog');
    return Promise.resolve(Array.from(blogs.data));
  }

  async getBlogPostAsync(id) {
    let blogs = await axios.get('/api/blog');
    let extractedBlog = null;
    blogs.data.forEach(blog => {
      if (blog.id == id) {
        extractedBlog = blog;
      }
    });
    return extractedBlog;
  }
}