export function comments(state = {}, action) {
  switch(action.type) {
    case 'FETCH_COMMENTS_SUCCESS':
      return {
        comments: action.comments
      }
    case 'COMMENT_CREATING_SUCCESS':
      return action.comment;
    case 'DELETE_COMMENT_SUCCESS':
      return action.comment;
    default:
      return state
  }
}     