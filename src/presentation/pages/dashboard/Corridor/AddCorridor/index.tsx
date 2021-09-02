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



//STYLES
import {
  PageHomeContent,
  ContenHome,
  TitleTable,
  HeaderTable,
  ContentTable,
  Back,
  FormAdd,
} from "../../defaultStyles";

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
import Breadcrumb from "presentation/components/Breadcrumb";
import { ControlOptions } from "./styles";
import ButtonCancel from "presentation/components/ButtonCancel";
import ButtonDefault from "presentation/components/ButtonDefault";
import Loading from "presentation/components/Loading";

type ValidateEntry = {
  corridor_name: string,
  corridor_side: string,
  warehouse_warehouse_id: number,
};

const AddCorridor: React.FC = (props: any) => {
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
      history.push('/dashboard/corridor');
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

    <Breadcrumb
      before={["Home", "Corridor"]}
      current="Add Corridor"
      back={true}
    />
    
    <TitlePage
      title="Add Corridor"
    />

    {props.children}

      <ContenHome>
        <FormAdd center="yes">
          <div className="two">
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
                  datasWarehouses.map((elem, index) => 
                      <option key={index} value={ elem.warehouse_id }>{ elem.warehouse_name }</option>
                    )
                }                
              </SelectOption>
              <span style={{opacity :  errors.warehouse_warehouse_id && errors.warehouse_warehouse_id.type === 'required' ? 1 : 0 }}>Required field</span>
            </Field>
          </div>
          <ControlOptions>
            <ButtonCancel
              onClick={() => history.goBack()}
              title="CANCEL"
              disabled={controlLoading === 'yes' ?  true :  false }
            />
            
            <ButtonDefault
              title="REGISTER"
              disabled={controlLoading === 'yes' ?  true :  false }
            />
          </ControlOptions>
            <Loading
              space="spaceTop"
              size= "small"
              visible={controlLoading}
            />
        </FormAdd>
      </ContenHome>
    </PageHomeContent>


  );
};

export default AddCorridor;