import initialState from './initialState';

// mag er later uit 
export function categories(state = [], action) {  
  switch(action.type) {
    case 'FETCH_CATEGORIES_SUCCESS':
      return action.categories;
    default: 
      return state;
  }
}

export function getCategories(state = initialState.categories, action) {
  switch(action.type) {
    case 'FETCH_CATEGORIES_SUCCESS':
      return {
        categories: action.categories
      }
    default:
      return state
  }
}     