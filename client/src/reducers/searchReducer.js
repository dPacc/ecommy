export const searchReducer = (state = { text: "" }, action) => {
  switch (action.type) {
    case "SEARCH_FILTER":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
