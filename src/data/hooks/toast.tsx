import React, { createContext, useCallback, useContext, useState } from "react";

import ToastContainer from "../../presentation/components/Toast";

import { ToastMessage } from "../protocols/IToast";

interface ToastContextData {
  addToast(message: ToastMessage): void;
  removeToast(): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const [message, setMessage] = useState<ToastMessage>({} as ToastMessage);
  const [show, setShow] = useState(false);

  const addToast = useCallback(
    ({ type, title, message }: ToastMessage) => {
      setShow(true);

      const toast = {
        type,
        title,
        message,
        show,
      };

      setMessage(toast);
    },
    [show]
  );

  const removeToast = useCallback(() => {
    setShow(false);

    setMessage(message);
  }, [message]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer
        type={message.type}
        title={message.title}
        message={message.message}
        show={show}
      />
    </ToastContext.Provider>
  );
};

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within an ToastProvider");
  }

  return context;
}

export default ToastProvider;
