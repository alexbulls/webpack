import * as $ from 'jquery';
import Post from 'modules/Post/index';
import WebpackLogo from './Cube.png';
import './index.css';
import './index.less';
import './babel';

const post = new Post({
  title: 'Webpack post title',
  image: WebpackLogo,
});

console.log($('body'));
console.log(post.toString());
console.log(post.getJSONData());