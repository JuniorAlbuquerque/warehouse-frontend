import React from 'react';

//STYLES
import {
  ContainerTopAndSide,
  Top,
  MainBody,
  Side,
  OptionItem,
  Options,
  Chieldren
} from './styles';

// ASSETS
import Menu from 'assets/icons/menu.svg';
import Seta from 'assets/icons/set-right.svg';
import IconDash from 'assets/icons/set-right.svg';
import IconRegister from 'assets/icons/set-right.svg';


function TopAndSide(props: any) {
  return (
    <ContainerTopAndSide>
       <Top>
          <div className="logo">
              <h1>ICCT</h1>
              <img src={Menu} alt="Icon Main" />
          </div>
          <div className="contenTop">
              <ul>
                <li><span>Home</span></li>
                <li><img src={Seta} alt="Icon Set"/></li>
                <li><span>Register</span></li>
                <li><img src={Seta} alt="Icon Set"/></li>
                <li><span>Plants</span></li>
              </ul>

              <div className="profile">
                <span>Rosivan Cardoso</span>
                <img src={Seta} alt="Icon Set"/>
              </div>
          </div>
        </Top>
        <MainBody>
          <Side>
              <OptionItem>
                <div className="item">
                  <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.33333 1H1.5V6.83333H7.33333V1Z" stroke="#4E4B59" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16.5 1H10.6667V6.83333H16.5V1Z" stroke="#4E4B59" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16.5 10.1667H10.6667V16H16.5V10.1667Z" stroke="#4E4B59" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7.33333 10.1667H1.5V16H7.33333V10.1667Z" stroke="#4E4B59" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>DASHBOARD</span>
                </div>
                <img src={Seta} alt="Icon Set"/>
              </OptionItem>

              <OptionItem>
                <div className="item">
                  <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6.16666C13.1421 6.16666 16.5 5.04737 16.5 3.66666C16.5 2.28594 13.1421 1.16666 9 1.16666C4.85786 1.16666 1.5 2.28594 1.5 3.66666C1.5 5.04737 4.85786 6.16666 9 6.16666Z" stroke="#4E4B59" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16.5 9.5C16.5 10.8833 13.1667 12 9 12C4.83333 12 1.5 10.8833 1.5 9.5" stroke="#4E4B59" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M1.5 3.66666V15.3333C1.5 16.7167 4.83333 17.8333 9 17.8333C13.1667 17.8333 16.5 16.7167 16.5 15.3333V3.66666" stroke="#4E4B59" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                  <span>REGISTER</span>
                </div>
                <img src={Seta} alt="Icon Set"/>
              </OptionItem>
              <Options>
                  <li><span>PLANTS</span></li>
                  <li><span>COST CENTER</span></li>
                  <li><span>WEREHOUSE</span></li>
                  <li><span>CORRIDOR</span></li>
                  <li><span>CABINET</span></li>
                  <li><span>SHELF</span></li>
                  <li><span>BOX</span></li>
                  <li><span>PALLETES</span></li>
              </Options>
          </Side>
          <Chieldren>
            {props.children}
          </Chieldren>
        </MainBody>
    </ContainerTopAndSide>
  );
}
export default TopAndSide;
