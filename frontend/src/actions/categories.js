import axios from 'axios';
import { api } from './extra';

export const getCategoriesApi = () => {
  return axios.get(api + '/categories', { headers: { Authorization: 'user' } })
  .then(response => response.data.categories)
  .catch(error => {throw(error);})
};

export const fetchCategories = () => (dispatch) => {
    return getCategoriesApi()
        .then((categories) => dispatch(getCategories(categories)))
};

export const getCategories = (categories) => {
  return {
    type: 'FETCH_CATEGORIES_SUCCESS',
    categories
  }
};