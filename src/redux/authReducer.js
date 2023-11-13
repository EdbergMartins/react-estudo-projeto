const initialState = {
  isAuthenticated: null,
  token: null,
  email: null,
  id: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        token: action.token,
        email: action.email,
        id: action.id,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        token: null,
        email: null,
        id: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
