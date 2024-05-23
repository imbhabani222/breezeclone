import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getServerTimeSelector } from "../../selectors/serverTimeSelector";
import { fetchGetServerTimeRequest } from "../../actions/getServerActions";

const SampleView = () => {
  const dispatch = useDispatch();
  // const timeRunning = useSelector(getServerTimeSelector);
  // console.log(timeRunning);
  useEffect(() => {
    dispatch(fetchGetServerTimeRequest());
  }, [dispatch]);
  return (
    <div style={{ padding: "15px" }}>
      {/* {pending ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error</div>
      ) : (
        todos.map((todo, index) => (
          <div style={{ marginBottom: "10px" }} key={todo.id}>
            {++index}. {todo.title}
          </div>
        ))
      )} */}
    </div>
  );
};

export default SampleView;
