import { Tooltip } from "antd";
import { useEffect, useState } from "react";

export const ScrollOnTop = (): JSX.Element => {
  const scrollOnTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const [currentScroll, setCurrentScroll] = useState<number>(0);

  useEffect(() => {
    const getCurrentScroll = (): void => {
      setCurrentScroll(window.scrollY);
    };
    document.addEventListener("scroll", () => {
      getCurrentScroll();
    });
    return document.removeEventListener("scroll", getCurrentScroll);
  }, []);

  return (
    <Tooltip title="Наверх" placement="topLeft">
      <div
        onClick={scrollOnTop}
        style={{
          display: currentScroll < 300 ? "none" : "initial",
          position: "fixed",
          width: "30px",
          height: "30px",
          zIndex: 1000,
          border: "2px solid black",
          borderRadius: "10px",
          opacity: 0.2,
          fontSize: "22px",
          cursor: "pointer",
          bottom: "10px",
          right: "15px",
          textAlign: "center"
        }}>
        ^
      </div>
    </Tooltip>
  );
};
