import axios from 'axios';

const api = "http://localhost:3001";
const config = { headers: {'Content-Type': 'application/json', 'Authorization': 'user'}};

let id = function () {
  return Math.random().toString(36).substr(2, 25);
};

let time = function () {
    let date = Date.now();
    let newDate = new Date(date).getTime();
    return newDate;
};

export function selectPost(post) {
    console.log(post);
  return {
    type: 'POST_SELECTED',
    payload: post
  };
}

export const voteUpPost = (post) => async dispatch => {
    let vote = {};
    vote["option"] = "upVote";
    console.log(vote.option);
    const res = await axios.post(api + '/posts/' + post.id, vote, config)
    dispatch({ type: 'VOTE_UP_SUCCESS', payload: res.data });
    dispatch({ type: 'VOTED_POST', payload: res.data });
}

export const voteDownPost = (post) => async dispatch => {
  let vote = {};
  vote["option"] = "downVote";
  console.log(vote.option);
  const res = await axios.post(api + '/posts/' + post.id, vote, config)
  dispatch({ type: 'VOTE_DOWN_SUCCESS', payload: res.data });
  dispatch({ type: 'VOTED_POST', payload: res.data });
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

export function postsHasErrored(bool) {
    return {
        type: 'POSTS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function postsIsLoading(bool) {
    return {
        type: 'POSTS_IS_LOADING',
        isLoading: bool
    };
}

export function postsFetchDataSuccess(posts) {
    return {
        type: 'POSTS_FETCH_DATA_SUCCESS',
        posts
    };
}

export const postsFetchData = () => {
    return (dispatch) => {
        dispatch(postsIsLoading(true));
        return axios.get(api + '/posts', { headers: { Authorization: 'user' } })
        .then(response => {
            dispatch(postsFetchDataSuccess(response.data))
            console.log(response.data)
            dispatch(postsIsLoading(false));
        })
        .catch(error => {
            throw(error);
            dispatch(postsHasErrored(true))
        });
    };
};

export function categoriesHasErrored(bool) {
    return {
        type: 'CATEGORIES_HAS_ERRORED',
        hasErrored: bool
    };
}

export function categoriesIsLoading(bool) {
    return {
        type: 'CATEGORIES_IS_LOADING',
        isLoading: bool
    };
}

// sync action
export const fetchCategoriesSuccess = (categories) => {
    return {
        type: 'FETCH_CATEGORIES_SUCCESS',
        categories
    }
};

//async action
export const fetchCategories = () => {
    //returns a dispatcher function
    // that dispatches an action at a later time
    return (dispatch) => {
        dispatch(categoriesIsLoading(true));
        //returns a promise
        return axios.get(api + '/categories', { headers: { Authorization: 'user' } })
        .then(response => {
            //dispatch another action  to consume data
            dispatch(fetchCategoriesSuccess(response.data.categories))
            console.log(response.data.categories)
            dispatch(categoriesIsLoading(false));
        })
        .catch(error => {
            throw(error);
            dispatch(categoriesHasErrored(true))
        });
    };
};
