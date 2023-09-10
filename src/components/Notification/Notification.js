import { useCallback, useEffect, useState } from "react";
import "./Notification.css";

function Notification({ dispatch, noteId, type, title, message }) {
  const [exit, setExit] = useState(false);
  const [width, setWidth] = useState(0);
  const [intervalId, setIntervalId] = useState(null);


  function handleStartTimer() {
    const id = setInterval(() => {
      setWidth((prevState) => {
        if (prevState < 100) {
          return prevState + 0.5;
        }
        clearInterval(id);
        return prevState;
      });
    }, 20);
    setIntervalId(id);
  }

  const handlePauseTimer = useCallback(() => {
    clearInterval(intervalId);
  }, [intervalId]);

  const handleCloseNotification = useCallback(() => {
    handlePauseTimer();
    setExit(true);
    setTimeout(() => {
      dispatch({
        id: noteId,
        type: "REMOVE_NOTIFICATION",
      });
    }, 400);
  }, [handlePauseTimer, dispatch, noteId]);

  useEffect(() => {
    if (width === 100) {
      handleCloseNotification();
    }
  }, [width, handleCloseNotification]);

  useEffect(() => {
    handleStartTimer();
  }, []);

  return (
    <div
      className={`notification ${exit ? "notification_action_exit" : ""}`}
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
    >
      <div className="notification__wrapper">
        <p
          className={`notification__title ${
            type === "SUCCESS"
              ? "notification__title_type_success"
              : "notification__title_type_error"
          }`}
        >
          {title}
        </p>
        <button
          className="notification__btn-close hover-button"
          type="button"
          aria-label="Закрыть"
          onClick={handleCloseNotification}
        >
          <svg
            className="movies-card__btn-del-img"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#fff"
              fillRule="evenodd"
              d="m4 5.06 2.652 2.652 1.06-1.06L5.061 4l2.651-2.652-1.06-1.06L4 2.939 1.348.287.288 1.348 2.939 4 .287 6.652l1.061 1.06L4 5.061Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <p className="notification__text">{message}</p>
      <div
        className={`notification__timer ${
          type === "SUCCESS"
            ? "notification__timer_type_success"
            : "notification__timer_type_error"
        }`}
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
}

export default Notification;
