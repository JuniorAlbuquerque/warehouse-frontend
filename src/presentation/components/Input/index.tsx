import React, { useEffect, useRef } from "react";
import { InputHTMLAttributes } from "react";
import { useField } from "@unform/core";
import { Container } from "./styles";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input: React.FC<InputProps> = ({ name, ...rest }) => {
  const { fieldName, registerField } = useField(name);
  const inputRef = useRef(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return <Container {...rest} ref={inputRef} />;
};

export default Input;
