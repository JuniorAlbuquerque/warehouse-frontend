import React, { useEffect } from "react";

//STYLES
import {
  ContainerButtonDefault,
} from './styles';

//ASSETS
import ArrowLeft from 'assets/icons/arrow-left.svg';

interface ButtonDefaultProps {
  title: string,
  onClick: () => void,
  disabled?: true | false,  
}

const ButtonCancel: React.FC<ButtonDefaultProps> = ({ title, onClick, disabled}) => {
  return (
    <ContainerButtonDefault>  
      <button onClick={(e) => {onClick(); e.preventDefault()}} disabled={disabled}>{ title}</button>
    </ContainerButtonDefault>
  );
};


export default ButtonCancel;
