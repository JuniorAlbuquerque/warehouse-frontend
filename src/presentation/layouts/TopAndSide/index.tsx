import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

// STORAGE
import { store } from 'data/store';
import { unsetSession } from 'data/store/reducers';

//STYLES
import {
  ContainerTopAndSide,
  BackgroundMenu,
  HiddenMenu,
  HeaderMenuLink,
  Top,
  MainBody,
  Side,
  OptionItem,
  Options,
  Chieldren
} from './styles';

import NavigatorRegister from 'presentation/components/NavigatorRegister';

// ASSETS
import Menu from 'assets/icons/menu.svg';
import Seta from 'assets/icons/set-right.svg';
import ICCT from 'assets/images/ICCT.png';
import IconDash from 'assets/icons/set-right.svg';
import IconRegister from 'assets/icons/set-right.svg';

function TopAndSide(props: any) {
  const history = useHistory();
  const [controlRegister, setControlRegister] = useState(
    window.location.pathname === "/dashboard/users" ||
    window.location.pathname === "/dashboard/plants" ||
    window.location.pathname === "/dashboard/plants/add" ||
    window.location.pathname === "/dashboard/warehouse" ||
    window.location.pathname === "/dashboard/warehouse/add" ||
    window.location.pathname === "/dashboard/corridor" ||
    window.location.pathname === "/dashboard/corridor/add" ||
    window.location.pathname === "/dashboard/cabinet" ||
    window.location.pathname === "/dashboard/cabinet/add" ||
    window.location.pathname === "/dashboard/shelf" ||
    window.location.pathname === "/dashboard/shelf/add" ||
    window.location.pathname === "/dashboard/pallet" || 
    window.location.pathname === "/dashboard/pallet/add" ||
    window.location.pathname === "/dashboard/box" ||
    window.location.pathname === "/dashboard/box/add" ?
    true : false
    );  
  // const userName = store.getState().session.user.user_name;
  const userName: string = store.getState().session.user.user_name;
  const [controlMenuHidden, setControlMenuHidden] = useState(false);

  const controlMenu = () => {
    setControlMenuHidden(!controlMenuHidden);
  };

  const handleExit = () => {
    store.dispatch(unsetSession());
    history.push("/");
  }

  return (
    <ContainerTopAndSide>
      {
          controlMenuHidden &&
          <BackgroundMenu onClick={controlMenu} />
      }
       <Top>
          <div className="logo">
              {/* <h1>ICCT - CALCOMP</h1> */}
              <img src={ICCT} alt="LOGO" />              
          </div>


          <div className="contenTop">              
            <div className="options">
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 7H19" stroke="#ADB5BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 1H19" stroke="#ADB5BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 13H19" stroke="#ADB5BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z" stroke="#ADB5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 19L13 13" stroke="#ADB5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>


            </div>
              <div className="profile" onClick={controlMenu}>
                <span>{userName}</span>
                <img src={Seta} alt="Icon Set"/>
              </div>
              <HiddenMenu className={!controlMenuHidden ? "hidden-control" : ""}>
                  {/* <div className="triangle"></div> */}
                  {/* <HeaderMenuLink>
                      <img src={User} alt="Icon User"/>
                      <span>Profile</span>                        
                  </HeaderMenuLink>
                  <hr/> */}
                  <HeaderMenuLink
                      onClick={() => handleExit()}
                  >
                      {/* <img src={Exit} alt="Icon User"/> */}
                      <span>Logout</span>                        
                  </HeaderMenuLink>

              </HiddenMenu>
          </div>
        </Top>
        <MainBody>
          <Side>
              <OptionItem
                controlDashboard={false}
              >
                <div className="item">
                  {/* <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.33333 1H1.5V6.83333H7.33333V1Z" stroke="#ADB5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.5 1H10.6667V6.83333H16.5V1Z" stroke="#ADB5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.5 10.1667H10.6667V16H16.5V10.1667Z" stroke="#ADB5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7.33333 10.1667H1.5V16H7.33333V10.1667Z" stroke="#ADB5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg> */}
                  <span>DASHBOARD</span>
                </div>
                {/* <img src={Seta} alt="Icon Set" className="dash"/> */}
                {/* <svg className="item-icon-svg" width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 11L6.5 6L1.5 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg> */}
              </OptionItem>

              <OptionItem
                controlDashboard={false}
              >
                <div className="item">
                  <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.33333 1H1.5V6.83333H7.33333V1Z" stroke="#ADB5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.5 1H10.6667V6.83333H16.5V1Z" stroke="#ADB5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.5 10.1667H10.6667V16H16.5V10.1667Z" stroke="#ADB5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7.33333 10.1667H1.5V16H7.33333V10.1667Z" stroke="#ADB5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>HOME</span>
                </div>
                {/* <img src={Seta} alt="Icon Set" className="dash"/> */}
                {/* <svg className="item-icon-svg" width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 11L6.5 6L1.5 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg> */}
              </OptionItem>

              <OptionItem
                controlRegister={controlRegister}
                onClick={ () => setControlRegister(!controlRegister)}
              >
                <div className="item">
                  {/* <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6.16666C13.1421 6.16666 16.5 5.04737 16.5 3.66666C16.5 2.28594 13.1421 1.16666 9 1.16666C4.85786 1.16666 1.5 2.28594 1.5 3.66666C1.5 5.04737 4.85786 6.16666 9 6.16666Z" stroke="#ADB5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.5 9.5C16.5 10.8833 13.1667 12 9 12C4.83333 12 1.5 10.8833 1.5 9.5" stroke="#ADB5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1.5 3.66666V15.3333C1.5 16.7167 4.83333 17.8333 9 17.8333C13.1667 17.8333 16.5 16.7167 16.5 15.3333V3.66666" stroke="#ADB5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg> */}
                  <span>REGISTER</span>
                </div>
                {/* <img src={Seta} alt="Icon Set" className="register"/> */}
                <svg className="item-icon-svg" width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 11L6.5 6L1.5 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </OptionItem>

              <Options controlRegister={controlRegister} >                  
                  <li onClick={() => history.push('/dashboard/users') } className={window.location.pathname === '/dashboard/users' || window.location.pathname === '/dashboard/users/add' ? 'selected' : ''}>
                  <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.00016 6.83333C6.47292 6.83333 7.66683 5.63943 7.66683 4.16667C7.66683 2.69391 6.47292 1.5 5.00016 1.5C3.5274 1.5 2.3335 2.69391 2.3335 4.16667C2.3335 5.63943 3.5274 6.83333 5.00016 6.83333Z" stroke="#ADB5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 13.5V12.1667C1 11.4594 1.28095 10.7811 1.78105 10.281C2.28115 9.78095 2.95942 9.5 3.66667 9.5H6.33333C7.04058 9.5 7.71885 9.78095 8.21895 10.281C8.71905 10.7811 9 11.4594 9 12.1667V13.5" stroke="#ADB5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                    <span>USERS</span>
                  </li>
                  {/* <span>{window.location.pathname === '/dashboard/users' ? 'existo' : ''}</span> */}
                  <li
                    onClick={() => history.push('/dashboard/warehouse') }
                    className={
                      window.location.pathname === "/dashboard/plants" ||
                      window.location.pathname === "/dashboard/plants/add" ||
                      window.location.pathname === "/dashboard/warehouse" ||
                      window.location.pathname === "/dashboard/warehouse/add" ||
                      window.location.pathname === "/dashboard/corridor" ||
                      window.location.pathname === "/dashboard/corridor/add" ||
                      window.location.pathname === "/dashboard/cabinet" ||
                      window.location.pathname === "/dashboard/cabinet/add" ||
                      window.location.pathname === "/dashboard/shelf" ||
                      window.location.pathname === "/dashboard/shelf/add" ||
                      window.location.pathname === "/dashboard/pallet" || 
                      window.location.pathname === "/dashboard/pallet/add" ||
                      window.location.pathname === "/dashboard/box" ||
                      window.location.pathname === "/dashboard/box/add" ?
                      'selected' : ''}>
                  {/* <li onClick={() => history.push('/dashboard/warehouse')} > */}
                  <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.9998 1.16667H2.99984C2.26346 1.16667 1.6665 1.76363 1.6665 2.50001V10.5C1.6665 11.2364 2.26346 11.8333 2.99984 11.8333H10.9998C11.7362 11.8333 12.3332 11.2364 12.3332 10.5V2.50001C12.3332 1.76363 11.7362 1.16667 10.9998 1.16667Z" stroke="#ADB5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 1.16667V11.8333" stroke="#ADB5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>WAREHOUSE</span>
                  </li>
                  <li>
                  <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.00016 2.83333H2.66683C2.31321 2.83333 1.97407 2.9738 1.72402 3.22385C1.47397 3.4739 1.3335 3.81304 1.3335 4.16666V12.1667C1.3335 12.5203 1.47397 12.8594 1.72402 13.1095C1.97407 13.3595 2.31321 13.5 2.66683 13.5H9.3335C9.68712 13.5 10.0263 13.3595 10.2763 13.1095C10.5264 12.8594 10.6668 12.5203 10.6668 12.1667V4.16666C10.6668 3.81304 10.5264 3.4739 10.2763 3.22385C10.0263 2.9738 9.68712 2.83333 9.3335 2.83333H8.00016" stroke="#ADB5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.66667 1.5H5.33333C4.59695 1.5 4 2.09695 4 2.83333C4 3.56971 4.59695 4.16667 5.33333 4.16667H6.66667C7.40305 4.16667 8 3.56971 8 2.83333C8 2.09695 7.40305 1.5 6.66667 1.5Z" stroke="#ADB5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 7.5H4.00667" stroke="#ADB5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.6665 7.5H7.99984" stroke="#ADB5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 10.1667H4.00667" stroke="#ADB5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.6665 10.1667H7.99984" stroke="#ADB5BD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>


                    <span>PRODUCTS</span>
                  </li>
              </Options>
          </Side>
          <Chieldren>
          {/* <NavigatorRegister />  */}
            {props.children}
          </Chieldren>
        </MainBody>
    </ContainerTopAndSide>
  );
}
export default TopAndSide;
