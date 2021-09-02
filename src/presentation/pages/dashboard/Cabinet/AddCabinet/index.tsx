import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';

//API
import api from "infra/services/api"; 
import { LIST_CORRIDOR, LIST_WAREHOUSE, ADD_CABINET, LIST_CABINET } from "infra/config/api";

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
import { InterfaceCabinet } from "data/protocols/ICabinet";
import Breadcrumb from "presentation/components/Breadcrumb";
import ButtonCancel from "presentation/components/ButtonCancel";
import ButtonDefault from "presentation/components/ButtonDefault";
import { ControlOptions } from "./styles";
import Loading from "presentation/components/Loading";

type ValidateEntry = {
  cabinet_name: string,
	corridor_corridor_id: number,
};

const AddCabinet: React.FC = (props: any) => {
  const history = useHistory();
  const { addToast } = useToast();
  const [controlLoading, setControlLoading] = useState<string>('no');
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ValidateEntry>();
  const [datasCabinet, setDatasCabinet] = useState<InterfaceCabinet[]>([]);
  const [datasCorridor, setDatasCorridor] = useState<InterfaceCorridor[]>([]);
  const [datasWarehouses, setDatasWarehouses] = useState<InterfaceWarehouse[]>([]);
  const [updateEffect, setUpdateEffect] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [currentID, setCurrentID] = useState(9999);
  const [datas, setDatas] =  useState({
    cabinet_name: '',
    corridor_corridor_id: 0,
  })

  const updateData = (name: string, value: string) => {    
    if (name !== null && value !== null) {
        setDatas({ ...datas, [name]: value });
    }
  };

  useEffect(() => {    
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
      .get(LIST_CABINET)
      .then((res) => {
        setDatasCabinet(res.data);
        aux = parseInt(res.data.length)+1;
        updateData('cabinet_name', 'G'+ aux);
      })
      .catch((err) => {
        addToast({
          type: "error",
          title: "Error when bringing the Cabinets",
          message: "Error",
        });

      });
  }, [updateEffect]);

  const controlModalDelete = () => {
    setModalDelete(!modalDelete);
  }

  const [currentWareHouse, setCurrentWareHouse] = useState('SELECT CORRIDOR');
  const [idWarehouse, setIdWarehouse] = useState(0);
  const handleCheckWereHouve = (corredor : string) => {
    if(!corredor){
      setCurrentWareHouse('SELECT CORRIDOR');
      return;
    }    
    let aux = 0;
    datasCorridor.map((elem) => {
      if(elem.corridor_id == parseInt(corredor)){
        aux = elem.warehouse_id;
        console.log(aux);
        return;
      }          
    })
    datasWarehouses.map((elem) => {
      if(elem.warehouse_id === aux){
        setCurrentWareHouse(elem.warehouse_name);
        setIdWarehouse(elem.warehouse_id);
        console.log(elem.warehouse_name);
        return;
      }
    })
  }
  
  const onSubmit = (data: ValidateEntry) => {
    reset();
    handleSave();
  }

  const handleSave = () => {
    setControlLoading('yes');    
    const payload = {
      cabinet_name: datas.cabinet_name,
      corridor_corridor_id: datas.corridor_corridor_id,
      corridor_warehouse_warehouse_id: idWarehouse
    }
    api.post(ADD_CABINET, payload)
    .then((res) =>{
      setControlLoading('no');
      setUpdateEffect(!updateEffect);
      addToast({
        type: "success",
        title: "Successfully registered!",
        message: `Sucess`,
      });
      history.push('/dashboard/cabinet');
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
      id : datasCabinet[index].cabinet_id,
      name : datasCabinet[index].cabinet_name,
      corridor : datasCabinet[index].corridor_id,
      warehouse_id : datasCabinet[index].warehouse_id,
    }
    localStorage.setItem("details-cabinet", JSON.stringify(payload));
    history.push('/dashboard/cabinet/details');    
  }

  return (
    <PageHomeContent
      onSubmit={handleSubmit(onSubmit)}
    >
    <Breadcrumb
      before={["Home", "Cabinet"]}
      current="Add Cabinet"
      back={true}
    />
    
    <TitlePage
      title="Add Cabinet"
    />

    {props.children}

      <ContenHome>
        <FormAdd center="yes">
          <div className="two">
            <Field>
              <label>Name *</label>
              <Input
                disabled
                value={datas.cabinet_name}
                autoComplete="off"
                placeholder="Name"
                // {...register("cabinet_name", { required: true })}
                onChange={(e) => updateData(e.target.name, e.target.value)}
                name="cabinet_name"
                maxLength={10}
              />
              {/* <span style={{opacity :  errors.cabinet_name && errors.cabinet_name.type === 'required' ? 1 : 0 }}>Required field</span> */}
            </Field>

            <Field>
              <label>Corridor *</label>
              <SelectOption
                {...register("corridor_corridor_id", { required: true })}
                onChange={(e) => {updateData(e.target.name, e.target.value); handleCheckWereHouve(e.target.value)}}
                name="corridor_corridor_id"
              >
                <option value="">SELECT</option>
                {
                  datasCorridor.map((elem, index) => {
                    return(
                      <option value={ elem.corridor_id } key={index}>{ elem.corridor_name }</option>
                    )})
                }                
              </SelectOption>
              <span style={{opacity :  errors.corridor_corridor_id && errors.corridor_corridor_id.type === 'required' ? 1 : 0 }}>Required field</span>
            </Field>

            <Field>
              <label>Warehouse *</label>
              <SelectOption
                disabled
              >
                <option>{currentWareHouse}</option>
              </SelectOption>
              {/* <span style={{opacity :  errors.user && errors.user.type === 'required' ? 1 : 0 }}>Required field</span> */}
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

export default AddCabinet;