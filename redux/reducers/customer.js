const customer = (state = {
  // id: null,
  // username: null,
  // password: null,
  id: '2fa81068-baa8-4d41-a091-77a31f1ee0aa',
  username: 'secret',
  password: 'Homer',
}, action) => {
  switch (action.type) {
    case 'SET_CUSTOMER':
      return {
        ...state,
        id: action.customer.id,
        username: action.customer.username,
        password: action.customer.password,
      };
    default:
      return state;
  }
}

export default customer