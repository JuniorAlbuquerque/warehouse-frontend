import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

//STYLES
import {
  ContainerTilePage,
} from "./styles";

//ASSETS
import ArrowLeft from "assets/icons/arrow-left.svg";

//COMPONENTS
import ButtonDefault from "presentation/components/ButtonDefault";

interface InterfaceNavigatorRegister {
  selected?: string,  
}

const NavigatorWarehouse: React.FC<InterfaceNavigatorRegister> = ({ selected}) => {
  const history = useHistory();
  const [currentTab, setCurrentTab] = useState<string>("warehouse");

  useEffect(()=> {
    console.log(window.location.pathname);
  }, [])

  // const controlTav  = (nameTab : string, destiny : string) => {
  //   // setCurrentTab(nameTab);
  //   console.log(window.location.pathname);
  //   history.push(destiny);
  // }

  const controlTav  = () => {
    let tabNavigator : string = window.location.pathname;

    switch(tabNavigator) {
      case "/dashboard/plants":
      return "plants";

      case "/dashboard/plants/add":
      return "plants";
      // -------------------------
      case "/dashboard/warehouse":
      return "warehouse";

      case "/dashboard/warehouse/add":
      return "warehouse";
      // -------------------------
      case "/dashboard/corridor":
      return "corridor";

      case "/dashboard/corridor/add":
      return "corridor";
      // -------------------------
      case "/dashboard/cabinet":
      return "cabinet";

      case "/dashboard/cabinet/add":
      return "cabinet";
      // -------------------------
      case "/dashboard/shelf":
      return "shelf";

      case "/dashboard/shelf/add":
      return "shelf";
      // -------------------------
      case "/dashboard/pallet": 
      return "pallet";

      case "/dashboard/pallet/add":
      return "pallet";      
      // -------------------------
      case "/dashboard/box":
      return "box";

      case "/dashboard/box/add":
      return "box";      
      // -------------------------
      case "/dashboard/costcenter":
      return "costcenter";

      case "/dashboard/costcenter/add":
      return "costcenter";
      // -------------------------

      case "/dashboard/purchasingsector":
      return "purchasingsector";

      case "/dashboard/purchasingsector/add":
      return "purchasingsector";
      // -------------------------
      default:
      return "plants";
    }
  }
  
  return (
    <ContainerTilePage>
      <li onClick={() => history.push("/dashboard/costcenter")} className={controlTav() == "costcenter" ? "current-tab" : ""} >Cost Center</li>
      <li onClick={() => history.push("/dashboard/purchasingsector")} className={controlTav() == "purchasingsector" ? "current-tab" : ""} >Sector</li>      
      <li onClick={() => history.push("/dashboard/plants")} className={controlTav() == "plants" ? "current-tab" : ""} >Plants</li>
      <li onClick={() => history.push("/dashboard/warehouse")} className={controlTav() == "warehouse" ? "current-tab" : ""} >Warehouse</li>
      <li onClick={() => history.push("/dashboard/corridor")} className={controlTav() == "corridor" ? "current-tab" : ""} >Corridor</li>
      <li onClick={() => history.push("/dashboard/cabinet")} className={controlTav() == "cabinet" ? "current-tab" : ""} >Cabinet</li>
      <li onClick={() => history.push("/dashboard/shelf")} className={controlTav() == "shelf" ? "current-tab" : ""} >Shelf</li>
      <li onClick={() => history.push("/dashboard/pallet")} className={controlTav() == "pallet" ? "current-tab" : ""} >Pallet</li>
      <li onClick={() => history.push("/dashboard/box")} className={controlTav() == "box" ? "current-tab" : ""} >Box</li>
      <div className={"line " + controlTav()}></div>
    </ContainerTilePage>
  );
};

export default NavigatorWarehouse;
