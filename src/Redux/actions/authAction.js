import { SIGN_IN, ADMIN_DATA, PERMISSION_DATA } from "../types.js";

export const signIn = () => async (dispatch, getState) => {
  dispatch({
    type: SIGN_IN,
    payload: true,
  });
};

export const setAdminDetails = () => (dispatch, getState) => {
  dispatch({
    type: ADMIN_DATA,
    payload: getState(),
  });
};

export const setPermissionData = () => (dispatch, getState) => {
  dispatch({
    type: PERMISSION_DATA,
    payload: getState(),
  });
};
