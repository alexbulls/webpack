import './index.css';
import data from './index.json';

class Post {
  constructor({ title = '', image = '' } = {}) {
    this.title = title;
    this.image = image;
    this.date = new Date();
  }

  toString() {
    return JSON.stringify({
      title: this.title,
      image: this.image,
      data: this.date.toJSON(),
    }, null, 2);
  }

  getJSONData() {
    return data;
  }
}

export default Post;
