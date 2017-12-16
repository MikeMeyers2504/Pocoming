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
    const {payload, posts} = action
    switch (action.type) {
        case 'POSTS_FETCH_DATA_SUCCESS':
            return posts;
        default:
            return state;
    }
}

export function postCreating(state = [], action) {
    switch (action.type) {
        case 'POST_CREATING_SUCCESS':
            return action.post;
        default:
            return state;
    }
}

export function postVoting(state = [], action) {
    const {payload} = action
    switch (action.type) {
        case 'VOTE_UP_SUCCESS': 
        let id = payload.id;
        console.log(payload);
        console.log(id);
        return [
            {...state[id], voteScore: payload.voteScore},
        ]
        case 'VOTE_DOWN_SUCCESS':
            return payload; 
        default:
            return state;
    }
}