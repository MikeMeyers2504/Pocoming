import { combineReducers } from 'redux';
import ActivePost from './reducer_active_post';
import { posts, postsHasErrored, postsIsLoading } from './posts';
import { categories, categoriesHasErrored, categoriesIsLoading } from './categories';

const rootReducer = combineReducers({
  activePost: ActivePost,
  posts: posts,
  postsHasErrored: postsHasErrored,
  postsIsLoading: postsIsLoading,
  categories: categories,
  categoriesHasErrored: categoriesHasErrored,
  categoriesIsLoading: categoriesIsLoading
});

export default rootReducer;