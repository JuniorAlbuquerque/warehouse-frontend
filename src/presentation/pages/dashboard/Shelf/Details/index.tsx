import React, { useState, useCallback, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";

//API
import api from "infra/services/api";
import { LIST_CABINET, LIST_WAREHOUSE, LIST_CORRIDOR, UPDATE_SHELF } from "infra/config/api";

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
import { InterfaceCabinet } from "data/protocols/ICabinet";


import ButtonDefault from "presentation/components/ButtonDefault";

type ValidateEntry = {
  shelf_name: string,
  cabinet_cabinet_id: number,
  cabinet_corridor_corridor_id: number,
  cabinet_corridor_warehouse_warehouse_id: number
};

const ShelfDetails: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ValidateEntry>();
  const [datasPlants, setDatasPlants] = useState<InterfacePlants[]>([]);
  const [controlLoading, setControlLoading] = useState<string>('no');
  const [datasWarehouses, setDatasWarehouses] = useState<InterfaceWarehouse[]>([]);
  const [datasCorridor, setDatasCorridor] = useState<InterfaceCorridor[]>([]);
  const [datasCabinet, setDatasCabinet] = useState<InterfaceCabinet[]>([]);
  const [viewCorridor, setViewCorridor] = useState('SELECT CORRIDOR');
  const [viewWarehouse, setViewWarehouse] = useState('SELECT CORRIDOR');
  const [updateEffect, setUpdateEffect] = useState(false);
  const details = localStorage.getItem('details-shelf');
  const [datas, setDatas] = useState({
    id: details ? JSON.parse(details).id : '',
    shelf_name: details ? JSON.parse(details).name : '',
    cabinet_cabinet_id: details ? JSON.parse(details).cabinet : '',
    cabinet_corridor_corridor_id: 0,
    cabinet_corridor_warehouse_warehouse_id: 0
  });

  const updateData = (name: string, value: string) => {
    if (name !== null && value !== null) {
      setDatas({ ...datas, [name]: value });
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("details-shelf")) {
      history.push('/dashboard/shelf');
    }

  }, []);

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

  setTimeout(() => {
    handleCheckWereHouve(datas.cabinet_cabinet_id);
  }, 3000);

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
  }

  const onSubmit = (data: ValidateEntry) => {
    handleSave();
  }

    const getId = (tipo: string) => {
    let aux = 0;
    datasCabinet.map((elem) => {
      if(elem.cabinet_id == datas.cabinet_cabinet_id){
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
    
    api.put(UPDATE_SHELF + datas.id, payload)
      .then((res) => {
        localStorage.removeItem("details-shelf");
        setControlLoading('no');
        setUpdateEffect(!updateEffect);
        reset();
        addToast({
          type: "success",
          title: "Successful editing!",
          message: `Sucess`,
        });
        history.push('/dashboard/shelf');
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
          <h2>Shelf</h2>
          <div className="tree">
            <Field>
              <label>Name *</label>
              <Input
                autoComplete="off"
                placeholder="Name"
                {...register("shelf_name", { required: true })}
                onChange={(e) => updateData(e.target.name, e.target.value)}
                name="shelf_name"
                value={datas.shelf_name}
                maxLength={10}
              />
              <span style={{ opacity: errors.shelf_name && errors.shelf_name.type === 'required' ? 1 : 0 }}>Required field</span>
            </Field>

            <Field>
              <label>Cabinet  *</label>
              <SelectOption
                {...register("cabinet_cabinet_id", { required: true })}
                onChange={(e) => { updateData(e.target.name, e.target.value); handleCheckWereHouve(e.target.value) }}
                name="cabinet_cabinet_id"
                value={datas.cabinet_cabinet_id}
              >
                <option value="">SELECT</option>
                {
                  datasCabinet.map((elem, index) => {
                    return (
                      <option value={elem.cabinet_id} key={index} >{elem.cabinet_name}</option>
                    )
                  })
                }
              </SelectOption>
              <span style={{ opacity: errors.cabinet_cabinet_id && errors.cabinet_cabinet_id.type === 'required' ? 1 : 0 }}>Required field</span>
            </Field>

            <Field>
              <label>Corridor  *</label>
              <SelectOption
                disabled
              >
                <option value="">{viewCorridor}</option>
              </SelectOption>
            </Field>
          </div>
          <div className="tree">
            <Field>
              <label>Warehouse  *</label>
              <SelectOption
                disabled
              >
                <option value="">{viewWarehouse}</option>
              </SelectOption>
            </Field>
          </div>

        </FormAdd>
      </ContenHome>
      <NavFooter>
        <ButtonDefault title="Save"
        />
      </NavFooter>
    </PageHomeContent>


  );
};

export default ShelfDetails;