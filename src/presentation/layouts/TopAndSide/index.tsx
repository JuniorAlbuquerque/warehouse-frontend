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
import IconDash from 'assets/icons/set-right.svg';
import IconRegister from 'assets/icons/set-right.svg';


function TopAndSide(props: any) {
  const history = useHistory();
  const [controlRegister, setControlRegister] = useState(false);  
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
              <h1>ICCT</h1>
              {/* <img src={Menu} alt="Icon Main" /> */}
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 7H19" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1 1H19" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1 13H19" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

          </div>

          <div className="contenTop">              
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
                  <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.33333 1H1.5V6.83333H7.33333V1Z" stroke="#FFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16.5 1H10.6667V6.83333H16.5V1Z" stroke="#FFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16.5 10.1667H10.6667V16H16.5V10.1667Z" stroke="#FFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7.33333 10.1667H1.5V16H7.33333V10.1667Z" stroke="#FFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>DASHBOARD</span>
                </div>
                {/* <img src={Seta} alt="Icon Set" className="dash"/> */}
                <svg className="item-icon-svg" width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 11L6.5 6L1.5 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </OptionItem>

              <OptionItem
                controlRegister={controlRegister}
                onClick={ () => setControlRegister(!controlRegister)}
              >
                <div className="item">
                  <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6.16666C13.1421 6.16666 16.5 5.04737 16.5 3.66666C16.5 2.28594 13.1421 1.16666 9 1.16666C4.85786 1.16666 1.5 2.28594 1.5 3.66666C1.5 5.04737 4.85786 6.16666 9 6.16666Z" stroke="#FFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16.5 9.5C16.5 10.8833 13.1667 12 9 12C4.83333 12 1.5 10.8833 1.5 9.5" stroke="#FFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M1.5 3.66666V15.3333C1.5 16.7167 4.83333 17.8333 9 17.8333C13.1667 17.8333 16.5 16.7167 16.5 15.3333V3.66666" stroke="#FFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                  <span>REGISTER</span>
                </div>
                {/* <img src={Seta} alt="Icon Set" className="register"/> */}
                <svg className="item-icon-svg" width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 11L6.5 6L1.5 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </OptionItem>
              <Options controlRegister={controlRegister} >                  
                  <li onClick={() => history.push('/dashboard/users') } className={window.location.pathname === '/dashboard/users' ? 'selected' : ''}><span>USERS</span></li>
                  {/* <span>{window.location.pathname === '/dashboard/users' ? 'existo' : ''}</span> */}
                  <li onClick={() => history.push('/dashboard/werehouse')} ><span>WAREHOUSE</span></li>
                  <li><span>PRODUCTS</span></li>
              </Options>
          </Side>
          <Chieldren>
          <NavigatorRegister />
            {props.children}
          </Chieldren>
        </MainBody>
    </ContainerTopAndSide>
  );
}
export default TopAndSide;
