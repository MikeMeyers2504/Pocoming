const api = 'http://localhost:3001';

const headers = {
  'Accept': 'application/json',
  'Authorization': 'user'
}

export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)
    .catch(error => {
      return error;
    });

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)
    .catch(error => {
      return error;
    });

export const getSinglePost = (post) =>
  fetch(`${api}/posts/${post.id}`, { headers })
    .then(res => res.json())
    .then(data => data.post)

export const remove = (post) =>
  fetch(`${api}/posts/${post.id}`, { method: 'DELETE', headers })
    .then(res => res.json())
    .then(data => data.post)

export const create = (body) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
