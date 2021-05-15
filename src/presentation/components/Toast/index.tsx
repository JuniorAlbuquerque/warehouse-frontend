import React, { useEffect } from "react";
import { useSpring, config } from "react-spring";

import { RiCloseLine } from "../../styles/Icons";
import { Container, ToastContent } from "./styles";
import {
  RiCheckboxCircleFill,
  RiCloseCircleFill,
  RiErrorWarningFill,
} from "../../styles/Icons";

import { ToastMessage } from "../../../data/protocols/IToast";

import { useToast } from "../../../data/hooks/toast";
import theme from "../../styles/themes/defaultTheme";

const Toast: React.FC<ToastMessage> = ({ type, title, message, show }) => {
  const { removeToast } = useToast();

  const showIcon = {
    success: <RiCheckboxCircleFill color={theme.colors.success} size={28} />,
    error: <RiCloseCircleFill color={theme.colors.error} size={28} />,
    warning: <RiErrorWarningFill color={theme.colors.warning} size={28} />,
  };

  const props = useSpring({
    right: show ? "0%" : "-120%",
    opacity: show ? 1 : 0,
    config: { ...config.stiff },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast();
    }, 3200);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message]);

  return (
    <Container>
      <ToastContent type={type} style={props}>
        {showIcon[type || "success"]}
        <div>
          <p>{title}</p>
          <span>{message}</span>
        </div>
        <button type="button">
          <RiCloseLine size={20} onClick={removeToast} />
        </button>
      </ToastContent>
    </Container>
  );
};

export default Toast;
