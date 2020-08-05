import { getProfileRoutine, clearLocalProfileRoutine } from "../actions";

const initialState = {
  id: null,
  firstName: "",
  lastName: "",
  phone: "",
};

export default (state = { user: initialState }, action) => {
  if (getProfileRoutine.isSuccessAction(action)) {
    const { data } = action.payload;

    return {
      ...state,
      user: data.user,
    };
  }
  if (clearLocalProfileRoutine.isSuccessAction(action)) {
    return {
      ...state,
      user: initialState,
    };
  }
  return state;
};
