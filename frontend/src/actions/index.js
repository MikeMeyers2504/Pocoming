import axios from 'axios';

const api = "http://localhost:3001";

export function selectPost(post) {
  return {
    type: 'POST_SELECTED',
    payload: post
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
            dispatch(postsHasErrored(true))
        });
    };
};