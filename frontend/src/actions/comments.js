import axios from 'axios';
import { id, time, api, config } from './extra';

export const getCommentsApi = (post) => {
  return axios.get(`${api}/posts/${post.id}/comments`, { headers: { Authorization: 'user' } })
  .then(response => response.data)
  .catch(error => {throw(error);})
};

export const fetchComments = (post) => (dispatch) => {
    return getCommentsApi(post)
        .then((comments) => dispatch(getComments(comments)))
        .catch(error => {throw(error);})
};

export const getComments = (comments) => {
  return {
    type: 'FETCH_COMMENTS_SUCCESS',
    comments
  }
};

export const createComment = (comment) => {
    return (dispatch) => {
        let fullComment = {};
        fullComment["id"] = id();
        fullComment["timestamp"] = time();
        fullComment["parentId"] = comment.parentId;
        fullComment["body"] = comment.body;
        fullComment["author"] = comment.author;
        console.log(fullComment);
        return axios.post(api + '/comments', fullComment, config)
        .then(response => {
            dispatch(createCommentSuccess(response.data))
        })
        .catch(error => {
            throw(error);
        });    
    };
};

export function createCommentSuccess(comment) {
  return {
    type: 'COMMENT_CREATING_SUCCESS',
    comment
  };
}

export const deleteCommentAction = (comment) => {
   return {       
     type: 'DELETE_COMMENT_SUCCESS',        
     comment
   }       
  }     
        
export const deleteComment = (comment) => (dispatch) => {
  return deleteCommentApi(comment)
  .then((comment) => dispatch(deleteCommentAction(comment)))
}


export const deleteCommentApi= (comment) => {
  return axios.delete(`${api}/comments/${comment.id}`, {headers: {Authorization: 'user'}})
  .then(response => response.data)
  .catch(error => {
      throw(error);
  }); 
};