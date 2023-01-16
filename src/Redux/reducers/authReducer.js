import { SIGN_IN, SIGN_OUT, ADMIN_DATA, PERMISSION_DATA } from "../types.js";

const initialState = {
  isSignedIn: false,
  userId: null,
  adminData: null,
  permissionList: [],
};

export default function (state, action) {
  const states = state || initialState;
  switch (action.type) {
    case SIGN_IN:
      return { ...states, isSignedIn: action.payload };
    case SIGN_OUT:
      return { ...states, isSignedIn: false, adminData: null };
    case ADMIN_DATA:
      return { ...states, adminData: action.payload };
    case PERMISSION_DATA:
      return { ...states, permissionList: action.payload };
    default:
      return states;
  }
}
