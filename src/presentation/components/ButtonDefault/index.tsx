import React, { useEffect } from "react";

//STYLES
import {
  ContainerButtonDefault,
} from './styles';

//ASSETS
import ArrowLeft from 'assets/icons/arrow-left.svg';

interface ButtonDefaultProps {
  title: string,
  onClick?: () => void,
  disabled?: true | false,
}

const ButtonDefault: React.FC<ButtonDefaultProps> = ({ title, onClick, disabled}) => {
  return (
    <ContainerButtonDefault>  
      <button onClick={onClick} disabled={disabled}>{ title}</button>
    </ContainerButtonDefault>
  );
};

export default ButtonDefault;
