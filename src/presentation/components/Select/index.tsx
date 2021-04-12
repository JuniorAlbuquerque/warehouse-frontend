import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";
import { SelectHTMLAttributes } from "react";

import { Container } from "./styles";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
}

const Select: React.FC<SelectProps> = ({ name, ...rest }) => {
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const selectRef = useRef(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return <Container {...rest} ref={selectRef} />;
};

export default Select;
