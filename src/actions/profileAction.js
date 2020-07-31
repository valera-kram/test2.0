import axios from "axios";
import { getProfileRoutine } from "./index";
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
