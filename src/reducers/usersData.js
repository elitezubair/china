const initialState = {
  data: [],
};

const usersData = (state = initialState, action) => {
  if (action.type === "UPDATE_USERS_LIST") {
    return { ...state, data: action.payload };
  } else {
    return state;
  }
};


export default usersData