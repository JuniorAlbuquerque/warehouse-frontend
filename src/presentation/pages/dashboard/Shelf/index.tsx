import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

//API
import api from "infra/services/api";
import { LIST_CORRIDOR, LIST_WAREHOUSE, LIST_SHELF, LIST_CABINET, ADD_SHELF } from "infra/config/api";

//COMPONENTS
import TitlePage from 'presentation/components/TitlePage';
import NavigatorRegister from 'presentation/components/NavigatorRegister';
import { useToast } from "data/hooks/toast";
import ModalDelete from "./ModalDelete";

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

//ASSETS
import ArrowLeft from 'assets/icons/arrow-left.svg';


//INTERFACES
import { InterfaceWarehouse } from "data/protocols/IWarehosue";
import { InterfaceCorridor } from "data/protocols/ICorridor";
import { Interfaceshelf  } from "data/protocols/IShelf";
import { InterfaceCabinet } from "data/protocols/ICabinet";
import Breadcrumb from "presentation/components/Breadcrumb";
import TitleContainerWarehouse from "presentation/components/TitleContainerWarehouse";


type ValidateEntry = {
  shelf_name: string,
	cabinet_cabinet_id: number,
	cabinet_corridor_corridor_id: number,
	cabinet_corridor_warehouse_warehouse_id: number
};


const Shelf: React.FC = (props: any) => {
  const history = useHistory();
  const { addToast } = useToast();
  const [controlLoading, setControlLoading] = useState<string>('no');
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ValidateEntry>();
  const [datasWarehouses, setDatasWarehouses] = useState<InterfaceWarehouse[]>([]);
  const [datasCorridor, setDatasCorridor] = useState<InterfaceCorridor[]>([]);
  const [datasCabinet, setDatasCabinet] = useState<InterfaceCabinet[]>([]);
  const [datasShelf, setDatasShelf] = useState<Interfaceshelf[]>([]);
  const [updateEffect, setUpdateEffect] = useState(false);
  const [viewCorridor, setViewCorridor] = useState('SELECT CORRIDOR');
  const [viewWarehouse, setViewWarehouse] = useState('SELECT CORRIDOR');
  const [modalDelete, setModalDelete] = useState(false);
  const [currentID, setCurrentID] = useState(9999);
  const [datas, setDatas] =  useState({
    shelf_name: '',
    cabinet_cabinet_id: 0,
    cabinet_corridor_corridor_id: 0,
    cabinet_corridor_warehouse_warehouse_id: 0
  });

  const updateData = (name: string, value: string) => {    
    if (name !== null && value !== null) {
        setDatas({ ...datas, [name]: value });
    }
  };

  useEffect(() => {
      api
        .get(LIST_CABINET)
        .then((res) => {
          setDatasCabinet(res.data);
        })
        .catch((err) => {
          addToast({
            type: "error",
            title: "Error when bringing the Cabinets",
            message: "Error",
          });
  
        });

    api
      .get(LIST_CORRIDOR)
      .then((res) => {
        setDatasCorridor(res.data);
      })
      .catch((err) => {
        addToast({
          type: "error",
          title: "Error when bringing the Corridors",
          message: "Error",
        });
      });

    api
      .get(LIST_WAREHOUSE)
      .then((res) => {
        setDatasWarehouses(res.data);
      })
      .catch((err) => {
        addToast({
          type: "error",
          title: "Error when bringing the Warehouses",
          message: "Error",
        });
      });
  }, []);

  useEffect(() => {
    let aux : number = 0;
    api    
      .get(LIST_SHELF)
      .then((res) => {
        setDatasShelf(res.data);
        aux = parseInt(res.data.length)+1;
        updateData('shelf_name', 'S'+ aux);
      })
      .catch((err) => {
        addToast({
          type: "error",
          title: "Error when bringing the warehouses",
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

  const [idWarehouse, setIdWarehouse] = useState(0);
  const [idCorridor, setIdCorridor] = useState(0);

  const getId = (tipo: string) => {
    let aux = 0;
    datasCabinet.map((elem) => {
      if(elem.cabinet_id == datas.cabinet_cabinet_id){
        console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n');
        if(tipo === 'corridor'){
          aux = elem.corridor_id;
        }else{
          aux = elem.warehouse_id;
        }
        return ;
      }          
    })
    return aux;
  }

  const handleSave = () => {
    setControlLoading('yes');   
    
    const payload = {
      shelf_name: datas.shelf_name,
      cabinet_cabinet_id: datas.cabinet_cabinet_id,
      cabinet_corridor_corridor_id: getId('corridor'),
      cabinet_corridor_warehouse_warehouse_id: getId('warehouse'),
    }

    console.log('\n\n\n\n\n\ndados do payload');
    console.log(payload);;

    api.post(ADD_SHELF, payload)
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

  const handleCheckWereHouve = (corredor : string) => {
    if(!corredor){
      setViewCorridor('SELECT CORRIDOR');
      setViewWarehouse('SELECT CORRIDOR');
      return;
    }    
    let aux = 0;
    datasCabinet.map((elem) => {
      if(elem.cabinet_id == parseInt(corredor)){
        console.log('\n\n\n\n\n\n');
        console.log(elem);
        aux = elem.corridor_id;
        console.log(elem.warehouse_name);
        setViewWarehouse(elem.warehouse_name);
        setViewCorridor(elem.corridor_name);
        return;
      }          
    })

    // datasWarehouses.map((elem) => {
    //   if(elem.warehouse_id === aux){
    //     setViewWarehouse(elem.warehouse_name);
    //     console.log(elem.warehouse_name);
    //     return;
    //   }
    // })
  }


  const handleDetails = (index : number) => {
    const payload = {
      id : datasShelf[index].shelf_id,
      name : datasShelf[index].shelf_name,
      cabinet : datasShelf[index].cabinet_id,
    }
    localStorage.setItem("details-shelf", JSON.stringify(payload));
    history.push('/dashboard/shelf/details');    
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
      current="Shelf"
      back={false}
    />

    <TitlePage
      title="Shelf"
    />
      
    {props.children}

      <ContenHome>
      <TitleContainerWarehouse
        title="Shelf"
        titleButton="Add Shelf"
        controlLoading={controlLoading}
        onPress={() => history.push('/dashboard/shelf/add')}
      />
      <HeaderTable>
        <li style={{width: '20%'}}>Name</li>
        <li style={{width: '20%'}}>Cabinet</li>
        <li style={{width: '20%'}}>Corridor</li>
        <li style={{width: '20%'}}>Qtd. Box</li>
        <li style={{width: '20%'}}>Qtd. Pallete</li>
        <li style={{width: '20%'}}>Options</li>
      </HeaderTable>

      <ScroolContentTable>
      {
        datasShelf.map((elem, index) => {
          return(
            <ContentTable key={index}>
              <li style={{width: '20%'}}>{ elem.shelf_name }</li>
              <li style={{width: '20%'}}>{ elem.cabinet_name }</li>
              <li style={{width: '20%'}}>{ elem.corridor_name }</li>
              <li style={{width: '20%'}}>{ elem.box_amount }</li>
              <li style={{width: '20%'}}>{ elem.pallet_amount }</li>
              <li style={{width: '20%'}} className="options">
                  <div className="option" onClick={() => handleDetails(index)}>
                    <svg width="14" height="3" viewBox="0 0 14 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.99992 2.16667C7.36811 2.16667 7.66659 1.86819 7.66659 1.5C7.66659 1.13181 7.36811 0.833336 6.99992 0.833336C6.63173 0.833336 6.33325 1.13181 6.33325 1.5C6.33325 1.86819 6.63173 2.16667 6.99992 2.16667Z" stroke="#5F5C6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M11.6667 2.16667C12.0349 2.16667 12.3333 1.86819 12.3333 1.5C12.3333 1.13181 12.0349 0.833336 11.6667 0.833336C11.2985 0.833336 11 1.13181 11 1.5C11 1.86819 11.2985 2.16667 11.6667 2.16667Z" stroke="#5F5C6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2.33341 2.16667C2.7016 2.16667 3.00008 1.86819 3.00008 1.5C3.00008 1.13181 2.7016 0.833336 2.33341 0.833336C1.96522 0.833336 1.66675 1.13181 1.66675 1.5C1.66675 1.86819 1.96522 2.16667 2.33341 2.16667Z" stroke="#5F5C6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Details</span>
                  </div>
                  <div className="option" onClick={() => {setCurrentID(elem.shelf_id); controlModalDelete()}}>
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

export default Shelf;