import React, { useState, useCallback, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";

//API
import api from "infra/services/api";
import {LIST_PLANT, UPDATE_WAREHOUSE } from "infra/config/api";

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
import { InterfaceUser } from "data/protocols/IUser";
import { InterfacePlants } from "data/protocols/IPlants";
import { InterfaceDepartment } from "data/protocols/IDepartment";
import { InterfaceFunction } from "data/protocols/IFunction";
import ButtonDefault from "presentation/components/ButtonDefault";

type ValidateEntry = {
  name_warehouse: string,
  plant: string,
};

const WarehouseDetails: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ValidateEntry>();
  const [datasPlants, setDatasPlants] = useState<InterfacePlants[]>([]);
  const [controlLoading, setControlLoading] = useState<string>('no');
  const [updateEffect, setUpdateEffect] = useState(false);
  const details = localStorage.getItem('datails-werehouse');
  const [datas, setDatas] =  useState({
    name_warehouse: details ? JSON.parse(details).name : '',
    plant: details ? JSON.parse(details).plant_id : '',
    warehouse_id: details ? JSON.parse(details).id : '',
  });

  const updateData = (name: string, value: string) => {
    if (name !== null && value !== null) {
        setDatas({ ...datas, [name]: value });
    }
  };

  useEffect(() => {
    if(!localStorage.getItem("datails-werehouse")){            
      history.push('/dashboard/werehouse');
    }
}, []);

useEffect(() => {
    api
    .get(LIST_PLANT)
        .then((res) => {
          setDatasPlants(res.data);
        })
        .catch((err) => {
          addToast({
            type: "error",
            title: "Error when bringing the plants",
            message: "Error",
          });
        });
      }, []);

  const onSubmit = (data: ValidateEntry) => {
    handleSave();
  }

  const handleSave = () => {
        
    setControlLoading('yes');    
    const payload = {
      warehouse_name: datas.name_warehouse,
      plant_plant_id: datas.plant
    }
    api.put(UPDATE_WAREHOUSE + datas.warehouse_id, payload)
    .then((res) =>{
      localStorage.removeItem("datails-werehouse");
      setControlLoading('no');
      setUpdateEffect(!updateEffect);
      reset();
      addToast({
        type: "success",
        title: "Successful editing!",
        message: `Sucess`,
      });
      history.push('/dashboard/werehouse');
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
            <h2>Warehouse</h2>
              {/* <div className="tree"> */}
              <div className="two">
                <Field>
                  <label>Name *</label>
                  <Input
                    autoComplete="off"
                    value={datas.name_warehouse}
                    placeholder="Name"
                    {...register("name_warehouse", { required: true })}
                    name="name_warehouse"
                    onChange={(e) => updateData(e.target.name, e.target.value)}
                    id="name_warehouse"
                    maxLength={30}
                  />
                  <span style={{opacity :  errors.name_warehouse && errors.name_warehouse.type === 'required' ? 1 : 0 }}>Required field</span>
                </Field>

                <Field>
                  <label>Plant *</label>
                  <SelectOption
                    {...register("plant", { required: true })}
                    onChange={(e) => updateData(e.target.name, e.target.value)}
                    name="plant"
                    value={datas.plant}
                    id="plant"
                  >
                    <option value="">SELECT</option>
                    {
                      datasPlants.map((elem, index) => {
                        return(
                          <option value={elem.plant_id} key={index}>{elem.plant_name}</option>
                        )} )
                    }
                  </SelectOption>
                  <span style={{opacity : errors.plant && errors.plant.type === 'required' ? 1 : 0 }}>Required field</span>
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

export default WarehouseDetails;