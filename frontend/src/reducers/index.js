import { combineReducers } from 'redux';
import ActivePost from './reducer_active_post';
import { posts, postsHasErrored, postsIsLoading, postCreating } from './posts';
import { categories, categoriesHasErrored, categoriesIsLoading } from './categories';
import { reducer as reduxFormReducer } from 'redux-form';

const rootReducer = combineReducers({
  form: reduxFormReducer,
  activePost: ActivePost,
  posts: posts,
  postsHasErrored: postsHasErrored,
  postsIsLoading: postsIsLoading,
  post: postCreating,
  categories: categories,
  categoriesHasErrored: categoriesHasErrored,
  categoriesIsLoading: categoriesIsLoading
});

export default rootReducer;