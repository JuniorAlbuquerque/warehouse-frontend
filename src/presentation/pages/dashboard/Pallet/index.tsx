import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

//API
import api from "infra/services/api";
import { LIST_CORRIDOR, LIST_WAREHOUSE, ADD_CORRIDOR, LIST_PALLET, ADD_PALLET, LIST_SHELF } from "infra/config/api";

//STYLES
import {
  PageHomeContent,
  ContenHome,
  TitleTable,
  HeaderTable,
  ContentTable,
  Back,
  FormAdd,
  ScroolContentTable,
} from "../defaultStyles";

import {
  Field,
  Input,
  SelectOption,
} from "presentation/styles/defaults";

//COMPONENTS
import TitlePage from 'presentation/components/TitlePage';
import NavigatorRegister from 'presentation/components/NavigatorRegister';
import { useToast } from "data/hooks/toast";
import ModalDelete from "./ModalDelete";

//ASSETS
import ArrowLeft from 'assets/icons/arrow-left.svg';

//INTERFACES
import { InterfacePallete } from "data/protocols/IPallete";
import { InterfaceCorridor } from "data/protocols/ICorridor";
import { Interfaceshelf  } from "data/protocols/IShelf";
import Breadcrumb from "presentation/components/Breadcrumb";
import TitleContainerWarehouse from "presentation/components/TitleContainerWarehouse";

type ValidateEntry = {
  pallet_name: string,
	shelf_shelf_id: number,
};

const Pallet: React.FC = (props : any) => {
  const history = useHistory();
  const { addToast } = useToast();
  const [controlLoading, setControlLoading] = useState<string>('no');
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ValidateEntry>();
  const [datasPallete, setDatasPallete] = useState<InterfacePallete[]>([]);
  const [updateEffect, setUpdateEffect] = useState(false);
  const [datasShelf, setDatasShelf] = useState<Interfaceshelf[]>([]);
  const [currentShelf, setCurrentShelf] = useState<number>(0);
  const [modalDelete, setModalDelete] = useState(false);
  const [currentID, setCurrentID] = useState(9999);
  const [datas, setDatas] =  useState({
    pallet_name: '',
	  shelf_shelf_id: 0,
  })

  const updateData = (name: string, value: string) => {    
    if (name !== null && value !== null) {
        setDatas({ ...datas, [name]: value });
    }
  };

  useEffect(() => {
    api    
      .get(LIST_SHELF)
      .then((res) => {
        setDatasShelf(res.data);
      })
      .catch((err) => {
        addToast({
          type: "error",
          title: "Error when bringing the shelfs",
          message: "Error",
        });
      });
  }, []);

  useEffect(() => {
    let aux : number = 0;
    api    
      .get(LIST_PALLET)
      .then((res) => {
        setDatasPallete(res.data);
        aux = parseInt(res.data.length)+1;
        updateData('pallet_name', 'P'+ aux);
      })
      .catch((err) => {
        addToast({
          type: "error",
          title: "Error when bringing the pallets",
          message: "Error",
        });
      });
  }, [updateEffect]);

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
      pallet_name: datas.pallet_name,
      shelf_shelf_id: datas.shelf_shelf_id,
      shelf_cabinet_cabinet_id: datasShelf[currentShelf].cabinet_id,
      shelf_cabinet_corridor_corridor_id: datasShelf[currentShelf].corridor_id,
      shelf_cabinet_corridor_warehouse_warehouse_id: datasShelf[currentShelf].warehouse_id
    }

    api.post(ADD_PALLET, payload)
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

  const [viewCabinet, setViewCabinet] = useState('SELECT SHELF');
  const [viewCorridor, setViewCorridor] = useState('SELECT SHELF');
  const [viewWareHouse, setViewWareHouse] = useState('SELECT SHELF');

  const handleCheckOtherDatas = (position : string) => {
    console.log('position: '+position);
    if(!position) {
      setViewCabinet('SELECT SHELF');
      setViewCorridor('SELECT SHELF');
      setViewWareHouse('SELECT SHELF');
      return;
    }

    
    datasShelf.map((elem, index) => {        
      if(elem.shelf_id == parseInt(position)){
        // alert('cheguei aqui');
        // console.log('shelf_id: '+elem.shelf_id);
        setCurrentShelf(index);
        return;
      }
    })

    setViewCabinet(datasShelf[currentShelf].cabinet_name);
    setViewCorridor(datasShelf[currentShelf].corridor_name);
    setViewWareHouse(datasShelf[currentShelf].warehouse_name);

  }


  const handleDetails = (index : number) => {
    const payload = {
      id : datasPallete[index].pallet_id,
      name : datasPallete[index].pallet_name,
      shelf : datasPallete[index].shelf_id,
    }
    localStorage.setItem("datails-pallet", JSON.stringify(payload));
    history.push('/dashboard/pallet/details');
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
      current="Pallet"
      back={false}
    />
    
    <TitlePage
      title="Pallet"
    />
    
    {props.children}

      <ContenHome>
      <TitleContainerWarehouse
        title="Pallet"
        titleButton="Add Pallet"
        controlLoading={controlLoading}
        onPress={() => history.push('/dashboard/pallet/add')}
      />

      <HeaderTable>
        <li style={{width: '16.6%'}}>Name</li>
        <li style={{width: '16.6%'}}>Warehouse</li>
        <li style={{width: '16.6%'}}>Shelf</li>
        <li style={{width: '16.6%'}}>Cabinet</li>
        <li style={{width: '16.6%'}}>Corridor</li>
        <li style={{width: '16.6%'}}>Options</li>
      </HeaderTable>
      

      <ScroolContentTable>

      {
        datasPallete.map((elem, index) => {
          return (
            <ContentTable key={index}>
              <li style={{width: '16.6%'}}>{ elem.pallet_name }</li>
              <li style={{width: '16.6%'}}>{ elem.warehouse_name }</li>
              <li style={{width: '16.6%'}}>{ elem.shelf_name }</li>
              <li style={{width: '16.6%'}}>{ elem.cabinet_name }</li>
              <li style={{width: '16.6%'}}>{ elem.corridor_name }</li>
              <li style={{width: '16.6%'}} className="options">
                  <div className="option" onClick={() => handleDetails(index)}>
                    <svg width="14" height="3" viewBox="0 0 14 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.99992 2.16667C7.36811 2.16667 7.66659 1.86819 7.66659 1.5C7.66659 1.13181 7.36811 0.833336 6.99992 0.833336C6.63173 0.833336 6.33325 1.13181 6.33325 1.5C6.33325 1.86819 6.63173 2.16667 6.99992 2.16667Z" stroke="#5F5C6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M11.6667 2.16667C12.0349 2.16667 12.3333 1.86819 12.3333 1.5C12.3333 1.13181 12.0349 0.833336 11.6667 0.833336C11.2985 0.833336 11 1.13181 11 1.5C11 1.86819 11.2985 2.16667 11.6667 2.16667Z" stroke="#5F5C6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2.33341 2.16667C2.7016 2.16667 3.00008 1.86819 3.00008 1.5C3.00008 1.13181 2.7016 0.833336 2.33341 0.833336C1.96522 0.833336 1.66675 1.13181 1.66675 1.5C1.66675 1.86819 1.96522 2.16667 2.33341 2.16667Z" stroke="#5F5C6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Details</span>
                  </div>
                  <div className="option" onClick={() => {setCurrentID(elem.pallet_id); controlModalDelete()}}>
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

export default Pallet;