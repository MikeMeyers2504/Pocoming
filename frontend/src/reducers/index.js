import { combineReducers } from 'redux';
import { getPosts } from './posts';
import { getCategories } from './categories';
import { reducer as reduxFormReducer } from 'redux-form';
import votedPostReducer from "./votedPostReducer";
import votedCommentReducer from "./votedCommentReducer";
import ActivePost from "./ActivePost";
import { comments } from './comments';
import ActiveComment from "./ActiveComment";

const rootReducer = combineReducers({
  form: reduxFormReducer,
  votedPost: votedPostReducer,
  votedComment: votedCommentReducer,
  activePost: ActivePost,
  activeComment: ActiveComment,
  getCategories,
  getPosts,
  comments,
});

export default rootReducer;
