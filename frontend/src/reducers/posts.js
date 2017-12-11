import initialState from './initialState';

export function postsHasErrored(state = false, action) {
    switch (action.type) {
        case 'POSTS_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}

export function postsIsLoading(state = false, action) {
    switch (action.type) {
        case 'POSTS_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}

export function posts(state = initialState.posts, action) {
    switch (action.type) {
        case 'POSTS_FETCH_DATA_SUCCESS':
            return action.posts;
        default:
            return state;
    }
}

export function postCreating(state = [], action) {
    switch (action.type) {
        case 'POST_CREATING_SUCCESS':
            return action.payload;
        default:
            return state;
    }
}