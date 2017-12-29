export * from './categories';
export * from './posts';
export * from './comments';

// sync action
/*export const fetchCategoriesSuccess = (categories) => {
    return {
        type: 'FETCH_CATEGORIES_SUCCESS',
        categories
    }
};*/

//async action
/*export const fetchCategories = () => {
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
};*/