import { createSelector } from "reselect";

const getServerTimePending = (state: any) => state.submitSection.pending;

const getServerTime = (state: any) => state.submitSection.server_time.server_time;

const getServerTimeError = (state: any) => state.submitSection.error;

export const getPendingServerTimeSelector = createSelector(
  getServerTimePending,
  (pending) => pending
);
export const getServerTimeSelector = createSelector(getServerTime, (serverTime) => serverTime);

export const getErrorServerTimeSelector = createSelector(getServerTimeError, (error) => error);
