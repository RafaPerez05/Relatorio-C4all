import axios from 'axios';

class PostService {
  static async getPosts() {
    try {
      const response = await axios.get('http://localhost:5000/api/posts');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch posts');
    }
  }
}

export default PostService;
