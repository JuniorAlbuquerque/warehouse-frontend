import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";

//API
import api from "infra/services/api";
import { LIST_PLANT, LIST_WAREHOUSE, ADD_WAREHOUSE } from "infra/config/api";

//COMPONENTS
import Loading from "presentation/components/Loading";
import Breadcrumb from 'presentation/components/Breadcrumb';
import TitlePage from 'presentation/components/TitlePage';
//import NavigatorRegister from 'presentation/components/NavigatorRegister';
import { useToast } from "data/hooks/toast";

//STYLES
import {
  PageHomeContent,
  ContenHome,
  TitleTable,
  HeaderTable,
  ContentTable,
  // Back,
  FormAdd
} from "../../defaultStyles";

import {
  Field,
  Input,
  SelectOption,
} from "presentation/styles/defaults";

//ASSETS
//import ArrowLeft from 'assets/icons/arrow-left.svg';

//INTERFACES
import { InterfaceWarehouse } from "data/protocols/IWarehosue";
import { InterfacePlants } from "data/protocols/IPlants";
import { ControlOptions } from "./styles";
import ButtonCancel from "presentation/components/ButtonCancel";
import ButtonDefault from "presentation/components/ButtonDefault";

type ValidateEntry = {
  name_warehouse: string,
  plant: string,
};

const AddWerehouse: React.FC = (props: any) => {
  const history = useHistory();
  const { addToast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ValidateEntry>();
  const [controlLoading, setControlLoading] = useState<string>('no');
  const [datasWarehouses, setDatasWarehouses] = useState<InterfaceWarehouse[]>([]);
  const [datasPlants, setDatasPlants] = useState<InterfacePlants[]>([]);
  const [currentID, setCurrentID] = useState(9999);
  const [datas, setDatas] =  useState({
    name_warehouse: '',
    plant: '',
  })

  const updateData = (name: string, value: string) => {    
    if (name !== null && value !== null) {
        setDatas({ ...datas, [name]: value });
    }
  };

  useEffect(() => {
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
      
      addToast({
        type: "success",
        title: "Successfully registered!",
        message: `Sucess`,
      });
      history.push('/dashboard/warehouse');
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

    <Breadcrumb
      before={["Home", "Warehouse"]}
      current="Add Warehouse"
      back={true}
    />

    <TitlePage
      title="Add Warehouse" 
    />

    {props.children}
      <ContenHome>
        <FormAdd center="yes">
          <div className="two">
            <Field>
              <label>Name *</label>
              <Input
                disabled
                autoComplete="off"
                value={datas.name_warehouse}
                placeholder="Name"
                // {...register("name_warehouse", { required: true })}
                name="name_warehouse"
                onChange={(e) => updateData(e.target.name, e.target.value)}
                id="name_warehouse"
                maxLength={30}
              />
              {/* <span style={{opacity :  errors.name_warehouse && errors.name_warehouse.type === 'required' ? 1 : 0 }}>Required field</span> */}
            </Field>

            <Field>
              <label>Plant *</label>
              <SelectOption
                {...register("plant", { required: true })}
                onChange={(e) => updateData(e.target.name, e.target.value)}
                name="plant"
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
            size= "small"
            visible={controlLoading}
          />
        </FormAdd>

      </ContenHome>
    </PageHomeContent>
  );
};

export default AddWerehouse;