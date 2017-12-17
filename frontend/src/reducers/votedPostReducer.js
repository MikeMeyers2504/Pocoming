export default function(state = [], action) {
  switch (action.type) {
    case 'VOTED_POST':
      return action.payload;
  }

  return state;
}
