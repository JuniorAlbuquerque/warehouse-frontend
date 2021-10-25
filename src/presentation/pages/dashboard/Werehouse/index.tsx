import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";

//API
import api from "infra/services/api";
import { LIST_PLANT, LIST_WAREHOUSE, ADD_WAREHOUSE } from "infra/config/api";

//COMPONENTS
import Breadcrumb from 'presentation/components/Breadcrumb';
import TitlePage from 'presentation/components/TitlePage';
//import NavigatorRegister from 'presentation/components/NavigatorRegister';
import { useToast } from "data/hooks/toast";
import ModalDelete from "./ModalDelete";

//STYLES
import {
  PageHomeContent,
  ContenHome,
  HeaderTable,
  ContentTable,
  // Back,
  ScroolContentTable
} from "../defaultStyles";


//ASSETS
//import ArrowLeft from 'assets/icons/arrow-left.svg';

//INTERFACES
import { InterfaceWarehouse } from "data/protocols/IWarehosue";
import TitleContainerWarehouse from "presentation/components/TitleContainerWarehouse";

type ValidateEntry = {
  name_warehouse: string,
  plant: string,
};

const Werehouse: React.FC = (props: any) => {
  const history = useHistory();
  const { addToast } = useToast();
  const { handleSubmit, reset } = useForm<ValidateEntry>();
  const [controlLoading, setControlLoading] = useState<string>('no');
  const [datasWarehouses, setDatasWarehouses] = useState<InterfaceWarehouse[]>([]);
  const [updateEffect, setUpdateEffect] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [currentID, setCurrentID] = useState(9999);
  
  const [datas, setDatas] =  useState({
    name_warehouse: '',
    plant: '',
  })
  
  useEffect(() => {
    const updateData = (name: string, value: string) => {    
      if (name !== null && value !== null) {
          setDatas({ ...datas, [name]: value });
      }
    };

    let aux : number = 0;
    api
      .get(LIST_WAREHOUSE)
      .then((res) => {
        setDatasWarehouses(res.data);
        aux = parseInt(res.data.length)+1;
        updateData('name_warehouse', 'W'+ aux);
      })
      .catch((err) => {
        addToast({
          type: "error",
          title: "Error when bringing the warehouses",
          message: "Error",
        });
      });

  }, [datas, addToast]);

  const controlModalDelete = () => {
  setModalDelete(!modalDelete);
  }

  

  const onSubmit = (data: ValidateEntry) => {
    reset();
    handleSave();
  }

  const handleSave = () => {
    setControlLoading('yes');
    const payload = {
      warehouse_name: datas.name_warehouse,
	    plant_plant_id: datas.plant
    }
    api.post(ADD_WAREHOUSE, payload)
    .then((res) =>{      
      setControlLoading('no');
      setUpdateEffect(!updateEffect);
      addToast({
        type: "success",
        title: "Successfully registered!",
        message: `Sucess`,
      });
    })
    .catch((err) => {
      setControlLoading('no');      
      addToast({
        type: "error",
        title: err.response.data.message,
        message: "Error",
      });
    })
  }

  const handleDetails = (index : number) => {
    const payload = {
      id : datasWarehouses[index].warehouse_id,
      name : datasWarehouses[index].warehouse_name,
      plant_id : datasWarehouses[index].plant_id,
    }
    localStorage.setItem("datails-werehouse", JSON.stringify(payload));
    history.push('/dashboard/warehouse/details');
  }
  

  return (
    <PageHomeContent
      onSubmit={handleSubmit(onSubmit)}
    >
    <ModalDelete
      id={String(currentID)}
      isOpen={modalDelete}
      onClose={() => controlModalDelete()}
      updateData={ () => setUpdateEffect(!updateEffect)}
    />
    <Breadcrumb
      before={["Home"]}
      current="Warehouse"
      back={false}
    />

    <TitlePage
      title="Warehouse" 
    />
    {props.children}

      <ContenHome>
        <TitleContainerWarehouse
          title="Warehouse"
          titleButton="Add Warehouse"
          controlLoading={controlLoading}
          onPress={() => history.push('/dashboard/warehouse/add')}
        />
        <HeaderTable>
          <li style={{width: '25%'}}>Name</li>
          <li style={{width: '25%'}}>Plant</li>
          <li style={{width: '25%'}}>Corridor</li>
          <li style={{width: '25%'}}>Options</li>
        </HeaderTable>
        <ScroolContentTable>
        {
          datasWarehouses.map((elem, index) => {
            return(
              <ContentTable key={index}>
                <li style={{width: '25%'}}>{ elem.warehouse_name }</li>
                <li style={{width: '25%'}}>{ elem.plant_name }</li>
                <li style={{width: '25%'}}>{ elem.corridor_amount }</li>
                <li style={{width: '25%'}} className="options">
                    <div className="option" onClick={() => handleDetails(index)}>
                      <svg width="14" height="3" viewBox="0 0 14 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.99992 2.16667C7.36811 2.16667 7.66659 1.86819 7.66659 1.5C7.66659 1.13181 7.36811 0.833336 6.99992 0.833336C6.63173 0.833336 6.33325 1.13181 6.33325 1.5C6.33325 1.86819 6.63173 2.16667 6.99992 2.16667Z" stroke="#5F5C6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M11.6667 2.16667C12.0349 2.16667 12.3333 1.86819 12.3333 1.5C12.3333 1.13181 12.0349 0.833336 11.6667 0.833336C11.2985 0.833336 11 1.13181 11 1.5C11 1.86819 11.2985 2.16667 11.6667 2.16667Z" stroke="#5F5C6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2.33341 2.16667C2.7016 2.16667 3.00008 1.86819 3.00008 1.5C3.00008 1.13181 2.7016 0.833336 2.33341 0.833336C1.96522 0.833336 1.66675 1.13181 1.66675 1.5C1.66675 1.86819 1.96522 2.16667 2.33341 2.16667Z" stroke="#5F5C6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Details</span>
                    </div>
                    <div className="option" onClick={() => {setCurrentID(elem.warehouse_id); controlModalDelete()}}>
                      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 3.5H2.33333H13" stroke="#5F5C6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4.33325 3.5V2.16667C4.33325 1.81305 4.47373 1.47391 4.72378 1.22386C4.97383 0.973812 5.31296 0.833336 5.66659 0.833336H8.33325C8.68687 0.833336 9.02601 0.973812 9.27606 1.22386C9.52611 1.47391 9.66659 1.81305 9.66659 2.16667V3.5M11.6666 3.5V12.8333C11.6666 13.187 11.5261 13.5261 11.2761 13.7761C11.026 14.0262 10.6869 14.1667 10.3333 14.1667H3.66659C3.31296 14.1667 2.97382 14.0262 2.72378 13.7761C2.47373 13.5261 2.33325 13.187 2.33325 12.8333V3.5H11.6666Z" stroke="#5F5C6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5.66675 6.83334V10.8333" stroke="#5F5C6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8.33325 6.83334V10.8333" stroke="#5F5C6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Delete</span>
                    </div>
                </li>
              </ContentTable>
            )})
          }
        </ScroolContentTable>
      </ContenHome>
    </PageHomeContent>
  );
};

export default Werehouse;