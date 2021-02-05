export const codReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_COD":
      return action.payload;
    default:
      return state;
  }
};
