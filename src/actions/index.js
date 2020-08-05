import { createThunkRoutine } from "redux-thunk-routine";

export const createSessionRoutine = createThunkRoutine("CREATE_SESSION");
export const deleteSessionRoutine = createThunkRoutine("DELETE_SESSION");
export const getProfileRoutine = createThunkRoutine("GET_PROFILE");
export const clearLocalProfileRoutine = createThunkRoutine("CLEAR_LOCAL_PROFILE");

export const setErrorRoutine = createThunkRoutine("SET_ERROR");
export const hideErrorRoutine = createThunkRoutine("HIDE_ERROR");
