import { combineReducers } from 'redux';
import ActivePost from './reducer_active_post';
import { posts, postsHasErrored, postsIsLoading, postCreating, postVoting } from './posts';
import { categories, categoriesHasErrored, categoriesIsLoading } from './categories';
import { reducer as reduxFormReducer } from 'redux-form';
import votedPostReducer from "./votedPostReducer";

const rootReducer = combineReducers({
  form: reduxFormReducer,
  activePost: ActivePost,
  postVoting: postVoting,
  posts: posts,
  postsHasErrored: postsHasErrored,
  postsIsLoading: postsIsLoading,
  post: postCreating,
  categories: categories,
  categoriesHasErrored: categoriesHasErrored,
  categoriesIsLoading: categoriesIsLoading,
  votedPost: votedPostReducer,
});

export default rootReducer;
