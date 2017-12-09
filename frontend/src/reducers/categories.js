import initialState from './initialState';

export function categories(state = initialState.categories, action) {  
  switch(action.type) {
    case 'FETCH_CATEGORIES_SUCCESS':
      return action.categories;
    default: 
      return state;
  }
}

export function categoriesHasErrored(state = false, action) {
    switch (action.type) {
        case 'CATEGORIES_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}

export function categoriesIsLoading(state = false, action) {
    switch (action.type) {
        case 'CATEGORIES_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}