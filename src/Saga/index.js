import { put, call, takeLatest, take } from "redux-saga/effects";
import api from "../Api/index.js";

export const GET_DATA = "GET_DATA";
export const SAVE_DATA = "SAVE_DATA";

export const getData = (payload) => ({
  type: "GET_DATA",
  payload,
});



export default function* rootSaga() {
  yield takeLatest("GET_DATA", handleGetJobs);
}

function* handleGetJobs(action) {
  try {
    const data = yield call(api.getData, action.payload);
    yield put({
      type: "SAVE_DATA",
      data,
    });
  } catch (error) {
    yield put({
      type: "SAVE_DATA",
      error,
    });
  }
}

