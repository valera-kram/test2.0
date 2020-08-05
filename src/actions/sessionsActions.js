import axios from "axios";
import { createSessionRoutine, deleteSessionRoutine } from "./index";
import history from "../history";
import { sessionService } from "redux-react-session";

export const createSession = ({ email, password }) => async (dispatch) => {
  dispatch(createSessionRoutine.request({ email, password }));
  try {
    const response = await axios.post(
      "https://staging.diem.dev/client/sessions",
      {
        email,
        password,
        session: {
          platform_type: "web",
        },
      }
    );

    await sessionService
      .saveSession({ token: response.data.session.access_token })
      .then(() => {
        history.push("/profile");
        return dispatch(createSessionRoutine.success(response));
      });
    return dispatch(createSessionRoutine.success(response));
  } catch (error) {
    dispatch(createSessionRoutine.failure(error));
    throw error;
  }
};

export const deleteSession = () => async (dispatch) => {
  dispatch(deleteSessionRoutine.request());
  try {
    const currentSession = await sessionService.loadSession();
    const response = await axios.delete(
      "https://staging.diem.dev/client/sessions",
      {
        params: {
          access_token: currentSession.token,
        },
      }
    );
    await sessionService.deleteSession().then(() => {
      return dispatch(deleteSessionRoutine.success(response));
    });
  } catch (error) {
    dispatch(deleteSessionRoutine.failure(error));
  }
};
