import { setErrorRoutine, hideErrorRoutine } from "./index";
import { getThunkActionCreator } from "redux-thunk-routine";

export const setError = getThunkActionCreator(
  setErrorRoutine,
  async (error) => {
    return await error;
  }
);

export const hideError = getThunkActionCreator(hideErrorRoutine, async () => {
  return await true;
});
