import React, { useState, useCallback, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";

//API
import api from "infra/services/api";
import { LIST_CABINET, LIST_SHELF, LIST_PALLET, LIST_WAREHOUSE, LIST_CORRIDOR, UPDATE_PALLET } from "infra/config/api";

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
import { InterfacePallete } from "data/protocols/IPallete";
import { Interfaceshelf  } from "data/protocols/IShelf";


import ButtonDefault from "presentation/components/ButtonDefault";

type ValidateEntry = {
  pallet_name: string,
	shelf_shelf_id: number,
};

const PalletDetails: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ValidateEntry>();
  const [datasPlants, setDatasPlants] = useState<InterfacePlants[]>([]);
  const [controlLoading, setControlLoading] = useState<string>('no');
  const [datasWarehouses, setDatasWarehouses] = useState<InterfaceWarehouse[]>([]);
  const [datasCorridor, setDatasCorridor] = useState<InterfaceCorridor[]>([]);
  const [datasCabinet, setDatasCabinet] = useState<InterfaceCabinet[]>([]);
  const [currentShelf, setCurrentShelf] = useState<number>(0);
  const [datasShelf, setDatasShelf] = useState<Interfaceshelf[]>([]);
  const [updateEffect, setUpdateEffect] = useState(false);
  const [datasPallete, setDatasPallete] = useState<InterfacePallete[]>([]);
  const details = localStorage.getItem('datails-pallet');
  const [datas, setDatas] = useState({
    id: details ? JSON.parse(details).id : '',
    pallet_name: details ? JSON.parse(details).name : '',
    shelf_shelf_id: details ? JSON.parse(details).shelf : '',
  });

  const updateData = (name: string, value: string) => {
    if (name !== null && value !== null) {
      setDatas({ ...datas, [name]: value });
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("datails-pallet")) {
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

    api    
      .get(LIST_PALLET)
      .then((res) => {
        setDatasPallete(res.data);
      })
      .catch((err) => {
        addToast({
          type: "error",
          title: "Error when bringing the pallets",
          message: "Error",
        });
      });

}, []);

  setTimeout(() => {
    handleCheckOtherDatas(datas.shelf_shelf_id);
  }, 3000);
  
  const [viewCabinet, setViewCabinet] = useState('SELECT SHELF');
  const [viewCorridor, setViewCorridor] = useState('SELECT SHELF');
  const [viewWareHouse, setViewWareHouse] = useState('SELECT SHELF');

  const handleCheckOtherDatas = (position : string) => {
    if(!position) {
      setViewCabinet('SELECT SHELF');
      setViewCorridor('SELECT SHELF');
      setViewWareHouse('SELECT SHELF');
      return;
    }

    datasPallete.map((elem, index) => {        
      if(elem.shelf_id == parseInt(position)){
        setCurrentShelf(index);
        return;
      }
    })

    if(datasPallete[currentShelf]) {
      setViewCabinet(datasPallete[currentShelf].cabinet_name);
      setViewCorridor(datasPallete[currentShelf].corridor_name);
      setViewWareHouse(datasPallete[currentShelf].warehouse_name);
    }

  }

  const onSubmit = (data: ValidateEntry) => {
    handleSave();
  }
  

  const handleSave = () => {
    setControlLoading('yes');
    const payload = {      
      pallet_name: datas.pallet_name,
      shelf_shelf_id: datas.shelf_shelf_id,
      shelf_cabinet_cabinet_id: datasPallete[currentShelf].cabinet_id,
      shelf_cabinet_corridor_corridor_id: datasPallete[currentShelf].corridor_id,
      shelf_cabinet_corridor_warehouse_warehouse_id: datasPallete[currentShelf].warehouse_id
    }
    
    api.put(UPDATE_PALLET + datas.id, payload)
      .then((res) => {
        localStorage.removeItem("datails-pallet");
        setControlLoading('no');
        setUpdateEffect(!updateEffect);
        reset();
        addToast({
          type: "success",
          title: "Successful editing!",
          message: `Sucess`,
        });
        history.push('/dashboard/pallet');
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
          <div className="tree">
            <Field>
              <label>Name *</label>
              <Input
                autoComplete="off"
                placeholder="Name"                
                value={datas.pallet_name}
                {...register("pallet_name", { required: true })}
                onChange={(e) => updateData(e.target.name, e.target.value)}
                name="pallet_name"
                maxLength={10}
              />
              <span style={{opacity :  errors.pallet_name && errors.pallet_name.type === 'required' ? 1 : 0 }}>Required field</span>
            </Field>

            <Field>
              <label>Shelf *</label>
              <SelectOption              
                {...register("shelf_shelf_id", { required: true })}
                onChange={(e) => {updateData(e.target.name, e.target.value); handleCheckOtherDatas(e.target.value)}}
                name="shelf_shelf_id"
                value={datas.shelf_shelf_id}
              >
                <option value=""  >SELECT</option>
                {
                  datasShelf.map((elem, index) => {
                    return(
                      <option value={ elem.shelf_id } key={index} >{ elem.shelf_name }</option>
                    )})
                }
              </SelectOption>
              <span style={{opacity :  errors.shelf_shelf_id && errors.shelf_shelf_id.type === 'required' ? 1 : 0 }}>Required field</span>
            </Field>

            <Field>
              <label>Cabinet *</label>
              <SelectOption disabled>
                <option value="">{viewCabinet}</option>                
              </SelectOption>
              {/* <span style={{opacity :  errors.user && errors.user.type === 'required' ? 1 : 0 }}>Required field</span> */}
            </Field>
          </div>
          <div className="two">
            <Field>
              <label>Corridor *</label>
              <SelectOption disabled>
                <option value="">{viewCorridor}</option>                
              </SelectOption>
              {/* <span style={{opacity :  errors.user && errors.user.type === 'required' ? 1 : 0 }}>Required field</span> */}
            </Field>

            <Field>
              <label>Warehouse *</label>
              <SelectOption disabled>
                <option value="">{ viewWareHouse}</option>                
              </SelectOption>
              {/* <span style={{opacity :  errors.user && errors.user.type === 'required' ? 1 : 0 }}>Required field</span> */}
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

export default PalletDetails;