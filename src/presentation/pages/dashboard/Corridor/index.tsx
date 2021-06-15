import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';

//API
import api from "infra/services/api";
import { LIST_CORRIDOR, LIST_WAREHOUSE, ADD_CORRIDOR } from "infra/config/api";

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

type ValidateEntry = {
  corridor_name: string,
  corridor_side: string,
  warehouse_warehouse_id: number,
};

const Corridor: React.FC = () => {
  const history = useHistory();
  const { addToast } = useToast();
  const [controlLoading, setControlLoading] = useState<string>('no');
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ValidateEntry>();
  const [datasWarehouses, setDatasWarehouses] = useState<InterfaceWarehouse[]>([]);
  const [datasCorridor, setDatasCorridor] = useState<InterfaceCorridor[]>([]);
  const [updateEffect, setUpdateEffect] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [currentID, setCurrentID] = useState(9999);
  const [datas, setDatas] =  useState({
    corridor_name: '',
    corridor_side: '',
    warehouse_warehouse_id: 0,
  })

  const updateData = (name: string, value: string) => {    
    if (name !== null && value !== null) {
        setDatas({ ...datas, [name]: value });
    }
  };

  useEffect(() => {
    let aux : number = 0;
    api
      .get(LIST_CORRIDOR)
      .then((res) => {
        setDatasCorridor(res.data);
        aux = parseInt(res.data.length)+1;
        updateData('corridor_name', 'C'+ aux);
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

  useEffect(() => {
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

  const onSubmit = (data: ValidateEntry) => {
    reset();
    handleSave();
  }

  const handleSave = () => {
    setControlLoading('yes');    
    api.post(ADD_CORRIDOR, datas)
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
      id : datasCorridor[index].corridor_id,
      name : datasCorridor[index].corridor_name,
      side : datasCorridor[index].corridor_side,
      warehouse_id : datasCorridor[index].warehouse_id,
    }
    localStorage.setItem("details-corridor", JSON.stringify(payload));
    history.push('/dashboard/corridor/details');    
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
      {/* <Back>
        <img src={ArrowLeft} alt="Icon To BAck" />
        <span>BACK</span>
      </Back> */}

      <ContenHome>
        {/* <NavigatorRegister/> */}
        <TitlePage
          title="Corridor"
          titleButton="REGISTER"
          controlLoading={controlLoading}
        />
        <TitleTable>
          <h1>REGISTER</h1>
        </TitleTable> 

        <FormAdd>
          <div className="tree">
            <Field>
              <label>Name *</label>
              <Input
                disabled
                value={datas.corridor_name}
                autoComplete="off"
                placeholder="Name"
                // {...register("corridor_name", { required: true })}
                onChange={(e) => updateData(e.target.name, e.target.value)}
                name="corridor_name"
                maxLength={10}
              />
              {/* <span style={{opacity :  errors.corridor_name && errors.corridor_name.type === 'required' ? 1 : 0 }}>Required field</span> */}
            </Field>

            <Field>
              <label>Side  *</label>
              <SelectOption
                {...register("corridor_side", { required: true })}
                onChange={(e) => updateData(e.target.name, e.target.value)}
                name="corridor_side"
              >
                <option value="">SELECT</option>
                <option value="right">Right</option>
                <option value="left">Left</option>
              </SelectOption>
              <span style={{opacity :  errors.corridor_side && errors.corridor_side.type === 'required' ? 1 : 0 }}>Required field</span>
            </Field>

            <Field>
              <label>Warehouse  *</label>
              <SelectOption
                {...register("warehouse_warehouse_id", { required: true })}
                onChange={(e) => updateData(e.target.name, e.target.value)}
                name="warehouse_warehouse_id"
              >
                <option value="">SELECT</option>
                {
                  datasWarehouses.map((elem, index) => {
                    return(
                        <option value={ elem.warehouse_id }>{ elem.warehouse_name }</option>
                    )})
                }                
              </SelectOption>
              <span style={{opacity :  errors.warehouse_warehouse_id && errors.warehouse_warehouse_id.type === 'required' ? 1 : 0 }}>Required field</span>
            </Field>

          </div>
        </FormAdd>

        <TitleTable>
          <h1>REGISTERED</h1>
        </TitleTable>  

      <HeaderTable>
        <li style={{width: '20%'}}>Name</li>
        <li style={{width: '20%'}}>Side</li>
        <li style={{width: '20%'}}>Werehouse</li>
        <li style={{width: '20%'}}>Cabinet</li>
        <li style={{width: '20%'}}>Options</li>
      </HeaderTable>

      {
        datasCorridor.map((elem, index) => {
          return(
            <ContentTable key={index}>
              <li style={{width: '20%'}}>{ elem.corridor_name }</li>
              <li style={{width: '20%'}}>{ elem.corridor_side }</li>
              <li style={{width: '20%'}}>{ elem.warehouse_name }</li>
              <li style={{width: '20%'}}>{ elem.cabinet_amount }</li>
              <li style={{width: '20%'}} className="options">
                  <div className="option" onClick={() => handleDetails(index)}>
                    <svg width="14" height="3" viewBox="0 0 14 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.99992 2.16667C7.36811 2.16667 7.66659 1.86819 7.66659 1.5C7.66659 1.13181 7.36811 0.833336 6.99992 0.833336C6.63173 0.833336 6.33325 1.13181 6.33325 1.5C6.33325 1.86819 6.63173 2.16667 6.99992 2.16667Z" stroke="#5F5C6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M11.6667 2.16667C12.0349 2.16667 12.3333 1.86819 12.3333 1.5C12.3333 1.13181 12.0349 0.833336 11.6667 0.833336C11.2985 0.833336 11 1.13181 11 1.5C11 1.86819 11.2985 2.16667 11.6667 2.16667Z" stroke="#5F5C6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M2.33341 2.16667C2.7016 2.16667 3.00008 1.86819 3.00008 1.5C3.00008 1.13181 2.7016 0.833336 2.33341 0.833336C1.96522 0.833336 1.66675 1.13181 1.66675 1.5C1.66675 1.86819 1.96522 2.16667 2.33341 2.16667Z" stroke="#5F5C6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Details</span>
                  </div>
                  <div className="option" onClick={() => {setCurrentID(elem.corridor_id); controlModalDelete()}}>
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 3.5H2.33333H13" stroke="#5F5C6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M4.33325 3.5V2.16667C4.33325 1.81305 4.47373 1.47391 4.72378 1.22386C4.97383 0.973812 5.31296 0.833336 5.66659 0.833336H8.33325C8.68687 0.833336 9.02601 0.973812 9.27606 1.22386C9.52611 1.47391 9.66659 1.81305 9.66659 2.16667V3.5M11.6666 3.5V12.8333C11.6666 13.187 11.5261 13.5261 11.2761 13.7761C11.026 14.0262 10.6869 14.1667 10.3333 14.1667H3.66659C3.31296 14.1667 2.97382 14.0262 2.72378 13.7761C2.47373 13.5261 2.33325 13.187 2.33325 12.8333V3.5H11.6666Z" stroke="#5F5C6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M5.66675 6.83334V10.8333" stroke="#5F5C6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M8.33325 6.83334V10.8333" stroke="#5F5C6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Delete</span>
                  </div>
              </li>
            </ContentTable>
          )})
      }

      </ContenHome>
    </PageHomeContent>


  );
};

export default Corridor;