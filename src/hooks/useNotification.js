import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import { NotificationContext } from "../contexts/NotificationContext";

function useNotification() {
  const dispatch = useContext(NotificationContext);
  return (props) => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: uuidv4(),
        ...props,
      },
    });
  };
}

export default useNotification;
