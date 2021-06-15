import React, { useState, useCallback, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";

//API
import api from "infra/services/api";
import { LIST_WAREHOUSE, LIST_CORRIDOR, UPDATE_CABINET } from "infra/config/api";

//COMPONENTS
import TitlePage from 'presentation/components/TitlePage';
import { useToast } from "data/hooks/toast";

//ASSETS
import ArrowLeft from 'assets/icons/arrow-left.svg';

//STYLES
import {
  PageHomeContent,
  ContenHome,
  TitleTable,
  HeaderTable,
  ContentTable,
  Back,
  FormAdd,
  NavInfo,
  NavFooter,
} from "../../defaultStylesDetails";

import {
  Field,
  Input,
  SelectOption,
} from "presentation/styles/defaults";

//INTERFACES
import { InterfaceWarehouse } from "data/protocols/IWarehosue";
import { InterfaceUser } from "data/protocols/IUser";
import { InterfacePlants } from "data/protocols/IPlants";
import { InterfaceDepartment } from "data/protocols/IDepartment";
import { InterfaceFunction } from "data/protocols/IFunction";
import { InterfaceCorridor } from "data/protocols/ICorridor";


import ButtonDefault from "presentation/components/ButtonDefault";

type ValidateEntry = {
  cabinet_name: string,
	corridor_corridor_id: number,
};

const CabinetDetails: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ValidateEntry>();
  const [datasPlants, setDatasPlants] = useState<InterfacePlants[]>([]);
  const [controlLoading, setControlLoading] = useState<string>('no');
  const [datasWarehouses, setDatasWarehouses] = useState<InterfaceWarehouse[]>([]);
  const [datasCorridor, setDatasCorridor] = useState<InterfaceCorridor[]>([]);
  const [updateEffect, setUpdateEffect] = useState(false);
  const details = localStorage.getItem('details-cabinet');
  const [datas, setDatas] = useState({
    id: details ? JSON.parse(details).id : '',
    cabinet_name: details ? JSON.parse(details).name : '',
    corridor_corridor_id: details ? JSON.parse(details).corridor : '',
  });

  const updateData = (name: string, value: string) => {
    if (name !== null && value !== null) {
      setDatas({ ...datas, [name]: value });
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("details-cabinet")) {
      history.push('/dashboard/cabinet');
    }

  }, []);

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

  setTimeout(() => {
    console.log('\n\n\n\n\n\n\n')
    console.log(datas.corridor_corridor_id);
    handleCheckWereHouve(datas.corridor_corridor_id);
  }, 3000);

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
    handleSave();
  }

  const handleSave = () => {
    setControlLoading('yes');
    const payload = {
      cabinet_name: datas.cabinet_name,
      corridor_corridor_id: datas.corridor_corridor_id,
      corridor_warehouse_warehouse_id: idWarehouse
    }
    api.put(UPDATE_CABINET + datas.id, payload)
      .then((res) => {
        localStorage.removeItem("details-cabinet");
        setControlLoading('no');
        setUpdateEffect(!updateEffect);
        reset();
        addToast({
          type: "success",
          title: "Successful editing!",
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

    return (
    <PageHomeContent
      onSubmit={handleSubmit(onSubmit)}
    >
      <NavInfo>
        <h1
        onClick={() => {
          history.goBack();
        }}
        >X</h1>
        <span>Details</span>
      </NavInfo>
      <ContenHome>
        <FormAdd>
          {/* <div className="center"> */}
          <h2>Cabinet</h2>
          {/* <div className="tree"> */}
          <div className="tree">
            <Field>
              <label>Name *</label>
              <Input
                autoComplete="off"
                placeholder="Name"
                {...register("cabinet_name", { required: true })}
                onChange={(e) => updateData(e.target.name, e.target.value)}
                name="cabinet_name"
                value={datas.cabinet_name}
                maxLength={10}
              />
              <span style={{opacity :  errors.cabinet_name && errors.cabinet_name.type === 'required' ? 1 : 0 }}>Required field</span>
            </Field>

            <Field>
              <label>Corridor *</label>
              <SelectOption
                value={datas.corridor_corridor_id}
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
          {/* </div> */}
          {/* </div> */}
        </FormAdd>
      </ContenHome>
      <NavFooter>
        <ButtonDefault title="Save"
        />
      </NavFooter>
    </PageHomeContent>


  );
};

export default CabinetDetails;