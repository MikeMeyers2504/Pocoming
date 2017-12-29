import initialState from './initialState';

// mag er later uit 
export function posts(state = [], action) {
    const {posts} = action
    switch (action.type) {
        case 'FETCH_POSTS_SUCCESS':
            return posts;
        default:
            return state;
    }
}

export function getPosts(state = initialState.posts, action) {
  switch(action.type) {
    case 'FETCH_POSTS_SUCCESS':
      return {
        posts: action.posts
      }
    case 'POST_CREATING_SUCCESS':
      return action.post;
    case 'DELETE_POST_SUCCESS':
      return action.post;
    case 'EDIT_POST_SUCCESS':
      return action.post;
    default:
      return state
  }
}     