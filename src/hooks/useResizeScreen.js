import { useEffect, useCallback, useState } from "react";

function useResizeScreen() {

  const getScreenWidth = useCallback(() => window.innerWidth, []);
  const [screenWidth, setScreenWidth] = useState(getScreenWidth());

  useEffect(() => {
    let timer;

    function handleScreenResize() {
      setScreenWidth(getScreenWidth());
    }

    function handleSetTimeout() {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          handleScreenResize();
        }, 1000);
      }
    }

    window.addEventListener("resize", handleSetTimeout);
    return () => window.removeEventListener("resize", handleSetTimeout);
  }, [getScreenWidth]);

  return screenWidth;
}

export default useResizeScreen;
