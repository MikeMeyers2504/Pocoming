import initialState from './initialState';

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