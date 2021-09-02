import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

//STYLES
import {
  ContainerTilePage,
} from './styles';

//ASSETS
import ArrowLeft from 'assets/icons/arrow-left.svg';

//COMPONENTS
import ButtonDefault from 'presentation/components/ButtonDefault';

interface InterfaceNavigatorRegister {
  selected?: string,  
}

const NavigatorRegister: React.FC<InterfaceNavigatorRegister> = ({ selected}) => {
  const history = useHistory();
  
  return (
    <ContainerTilePage>
      {/* <li style={{backgroundColor: window.location.pathname === '/dashboard/plants' ? '#3B5BDB' : '#FFF', color: window.location.pathname === '/dashboard/plants' ? '#FFF' : '' }} onClick={() => {history.push('/dashboard/plants')}}>Plants</li>
      <li style={{backgroundColor: window.location.pathname === '/dashboard/warehouse' ? '#3B5BDB' : '#FFF', color: window.location.pathname === '/dashboard/warehouse' ? '#FFF' : '' }} onClick={() => {history.push('/dashboard/warehouse')}}>Warehouse</li>
      <li style={{backgroundColor: window.location.pathname === '/dashboard/corridor' ? '#3B5BDB' : '#FFF', color: window.location.pathname === '/dashboard/corridor' ? '#FFF' : '' }} onClick={() => {history.push('/dashboard/corridor')}}>Corridor</li>
      <li style={{backgroundColor: window.location.pathname === '/dashboard/cabinet' ? '#3B5BDB' : '#FFF', color: window.location.pathname === '/dashboard/cabinet' ? '#FFF' : '' }} onClick={() => {history.push('/dashboard/cabinet')}}>Cabinet</li>
      <li style={{backgroundColor: window.location.pathname === '/dashboard/shelf' ? '#3B5BDB' : '#FFF', color: window.location.pathname === '/dashboard/shelf' ? '#FFF' : '' }} onClick={() => {history.push('/dashboard/shelf')}}>Shelf</li>
      <li style={{backgroundColor: window.location.pathname === '/dashboard/pallet' ? '#3B5BDB' : '#FFF', color: window.location.pathname === '/dashboard/pallet' ? '#FFF' : '' }} onClick={() => {history.push('/dashboard/pallet')}}>Pallet</li>
      <li style={{backgroundColor: window.location.pathname === '/dashboard/box' ? '#3B5BDB' : '#FFF', color: window.location.pathname === '/dashboard/box' ? '#FFF' : '' }} onClick={() => {history.push('/dashboard/box')}}>Box</li> */}

      <li onClick={() => {history.push('/dashboard/plants')}}>Plants</li>
      <li onClick={() => {history.push('/dashboard/warehouse')}}>Warehouse</li>
      <li onClick={() => {history.push('/dashboard/corridor')}}>Corridor</li>
      <li onClick={() => {history.push('/dashboard/cabinet')}}>Cabinet</li>
      <li onClick={() => {history.push('/dashboard/shelf')}}>Shelf</li>
      <li onClick={() => {history.push('/dashboard/pallet')}}>Pallet</li>
      <li onClick={() => {history.push('/dashboard/box')}}>Box</li>
    </ContainerTilePage>
  );
};

export default NavigatorRegister;
