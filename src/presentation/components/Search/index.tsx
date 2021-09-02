import React, { useEffect } from "react";

//STYLES
import {
  ContainerSearch,
} from './styles';

//ASSETS
import ArrowLeft from 'assets/icons/arrow-left.svg';

interface ButtonDefaultProps {
  title: string,  
}

const Search: React.FC<ButtonDefaultProps> = ({ title}) => {
  return (
    <ContainerSearch>  
      <input type="text" placeholder={title} />
    </ContainerSearch>
  )
}

export default Search;
