import { getProfileRoutine } from "../actions";

export default (state = { user: {} }, action) => {
  if (getProfileRoutine.isSuccessAction(action)) {
    if (action.payload) {
      const { data } = action.payload;

      return {
        ...state,
        user: data.user,
      };
    }
  }
  return state;
};
