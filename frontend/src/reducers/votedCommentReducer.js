export default function(state = {}, action) {
  switch (action.type) {
    case 'VOTED_COMMENT':
      return action.payload;
    default: 
      return state;
  }
}
