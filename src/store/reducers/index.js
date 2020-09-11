import { combineReducers } from 'redux';

import user from './user';
import challenges from './challenges';
import routes from './routes';
import posts from './posts';
import MyChallenge from './MyChallenge';

export default combineReducers({
  posts,
  user,
  challenges,
  routes,
  MyChallenge
});
