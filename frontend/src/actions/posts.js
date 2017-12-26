import axios from 'axios';
import { id, time, api, config } from './extra';

export const getPostsApi = () => {
  return axios.get(api + '/posts', { headers: { Authorization: 'user' } })
  .then(response => response.data)
};

export const postsFetchData = () => (dispatch) => {
    return getPostsApi()
        .then((posts) => dispatch(getPosts(posts)))
};

export const getPosts = (posts) => {
  return {
    type: 'FETCH_POSTS_SUCCESS',
    posts
  }
};

export const voteUpPost = (post) => async dispatch => {
    let vote = {};
    vote["option"] = "upVote";
    console.log(vote.option);
    const res = await axios.post(api + '/posts/' + post.id, vote, config)
    dispatch({ type: 'VOTED_POST', payload: res.data});
}

export const voteDownPost = (post) => async dispatch => {
  let vote = {};
  vote["option"] = "downVote";
  console.log(vote.option);
  const res = await axios.post(api + '/posts/' + post.id, vote, config)
  dispatch({ type: 'VOTED_POST', payload: res.data });
}

export function selectPost(post) {
  console.log(post);
  return {
    type: 'POST_SELECTED',
    payload: post
  };
}

export const createPost = (post) => {
    return (dispatch) => {
        let fullPost = {post};
        fullPost["id"] = id();
        fullPost["timestamp"] = time();
        fullPost["title"] = post.title;
        fullPost["body"] = post.body;
        fullPost["author"] = post.author;
        fullPost["category"] = post.category;
        return axios.post(api + '/posts', fullPost, config)
        .then(response => {
            dispatch(createPostSuccess(response.data))
        })
        .catch(error => {
            throw(error);
        });    
    };
};

export function createPostSuccess(post) {
  return {
    type: 'POST_CREATING_SUCCESS',
    post
  };
}


export const deletePostAction = (post) => {
   return {       
     type: 'DELETE_POST_SUCCESS',        
     post
   }       
  }     
        
export const deletePost = (post) => (dispatch) => {
  return deletePostApi(post)
  .then((post) => dispatch(deletePostAction(post)))
}


export const deletePostApi= (post) => {
  return axios.delete(`${api}/posts/${post.id}`, {headers: {Authorization: 'user'}})
  .then(response => response.data)
};
