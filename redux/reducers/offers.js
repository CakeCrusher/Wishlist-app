const offers = (state = {
  offers: []
}, action) => {
  switch (action.type) {
    case 'SET_OFFERS':
      return {
        ...state,
        offers: action.offers
      };
    default:
      return state;
  }
}

export default offers