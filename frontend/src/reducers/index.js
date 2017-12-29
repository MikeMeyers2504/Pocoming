import { combineReducers } from 'redux';
import { posts, getPosts } from './posts';
import { categories, getCategories } from './categories';
import { reducer as reduxFormReducer } from 'redux-form';
import votedPostReducer from "./votedPostReducer";
import ActivePost from "./ActivePost";
import { comments } from './comments';

const rootReducer = combineReducers({
  form: reduxFormReducer,
  posts: posts,
  categories: categories,
  votedPost: votedPostReducer,
  activePost: ActivePost,
  getCategories,
  getPosts,
  comments,
});

export default rootReducer;
