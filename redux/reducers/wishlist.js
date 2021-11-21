const wishlist = (state = {
  items: []
}, action) => {
  switch (action.type) {
    case 'SET_WISHLIST':
      return {
        ...state,
        items: action.wishlist
      };
    default:
      return state;
  }
}

export default wishlist