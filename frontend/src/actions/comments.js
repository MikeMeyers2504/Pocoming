import axios from 'axios';
import { id, time, api, config } from './extra';

export const getCommentsApi = (post) => {
  return axios.get(`${api}/posts/${post.id}/comments`, { headers: { Authorization: 'user' } })
  .then(response => response.data)
  .catch(error => {throw(error);})
};

export const fetchComments = (post) => (dispatch) => {
    if (post) {
      return getCommentsApi(post)
        .then((comments) => dispatch(getComments(comments)))
        .catch(error => {throw(error);})
    }
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

export const editCommentAction = (comment) => {
   return {       
     type: 'EDIT_COMMENT_SUCCESS',        
     comment
   }       
  }     
        
export const editComment = (comment) => (dispatch) => {
  return editCommentApi(comment)
  .then((comment) => dispatch(editCommentAction(comment)))
}

export const editCommentApi= (comment) => {
  console.log(comment);
  return axios.put(`${api}/comments/${comment.id}`, comment, config)
  .then(response => response.data)
  .catch(error => {
      throw(error);
  }); 
};

export function selectComment(comment) {
  console.log(comment);
  return {
    type: 'COMMENT_SELECTED',
    payload: comment
  };
}

export const voteUpComment = (comment) => async dispatch => {
    let vote = {};
    vote["option"] = "upVote";
    console.log(vote.option);
    const res = await axios.post(api + '/comments/' + comment.id, vote, config)
    dispatch({ type: 'VOTED_COMMENT', payload: res.data});
}

export const voteDownComment = (comment) => async dispatch => {
  let vote = {};
  vote["option"] = "downVote";
  console.log(vote.option);
  const res = await axios.post(api + '/comments/' + comment.id, vote, config)
  dispatch({ type: 'VOTED_COMMENT', payload: res.data });
}