import axios from "axios";
import { getProfileRoutine, clearLocalProfileRoutine } from "./index";
import { getThunkActionCreator } from "redux-thunk-routine";

export const getProfile = getThunkActionCreator(
  getProfileRoutine,
  async (access_token) => {
    return await axios.get("https://staging.diem.dev/client/profile", {
      params: {
        access_token,
      },
    });
  }
);

export const clearLocalProfile = getThunkActionCreator(
  clearLocalProfileRoutine,
  async () => {
    return await true;
  }
);
