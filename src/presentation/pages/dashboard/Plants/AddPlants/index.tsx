import React, { useState, useCallback, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import Moment from "moment";

//API
import api from "infra/services/api";
import { LIST_PURCHASINGSECTOR, ADD_PLANT, LIST_COSTCENTER,  UPDATE_PLANT } from "infra/config/api";

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
  FormAdd
} from "../../defaultStyles";

import  {
  ControlOptions
} from "./styles";
import {
  Field,
  Input,
  SelectOption,
} from "presentation/styles/defaults";

//ASSETS
import ArrowLeft from 'assets/icons/arrow-left.svg';

//INTERFACES
import { InterfacePurchasingsector } from "data/protocols/IPurchasingsector";
import { InterfaceCostCenter } from "data/protocols/iCostCenter";
import Breadcrumb from "presentation/components/Breadcrumb";
import ButtonDefault from "presentation/components/ButtonDefault";
import ButtonCancel from "presentation/components/ButtonCancel";

type ValidateEntry = {  
  plant_name: string,  
  cost_center_cost_center_id: string,  
  purchasing_sector_purchasing_sector_id: string,  
};

const Plants: React.FC = (props: any) => {
  const { addToast } = useToast();
  const history = useHistory();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ValidateEntry>();
  const [controlLoading, setControlLoading] = useState<string>('no');
  const [plant_name, setPlantName] = useState('');
  const [datasPurchasingsector, setDatasPurchasingsector] = useState<InterfacePurchasingsector[]>([]);
  const [datasCostCenter, setDatasCostCenter] = useState<InterfaceCostCenter[]>([]);
  
  const [updateEffect, setUpdateEffect] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [currentID, setCurrentID] = useState(9999);

  const [datas, setDatas] =  useState({
    plant_name : '',
    cost_center_cost_center_id : '',
    purchasing_sector_purchasing_sector_id : '',

    
  })

  const updateData = (name: string, value: string) => {    
    if (name !== null && value !== null) {
        setDatas({ ...datas, [name]: value });
    }
  };
  
  useEffect(() => {
    api
        .get(LIST_PURCHASINGSECTOR)

        .then((res) => {
          setDatasPurchasingsector(res.data);
        })
        .catch((err) => {
          addToast({
            type: "error",
            title: "Error when bringing the purchasing sector",
            message: "Error",
          });

        });

        api
        .get(LIST_COSTCENTER)

        .then((res) => {
          setDatasCostCenter(res.data);
        })
        .catch((err) => {
          addToast({
            type: "error",
            title: "Error when bringing the cost center",
            message: "Error",
          });

        });

  }, []);

  const onSubmit = (data: ValidateEntry) => {
    reset();
    handleSave();
  }

  const controlModalDelete = () => {
    setModalDelete(!modalDelete);
  }

  const handleSave = () => {
    setControlLoading('yes');

    const payload = {
      ...datas
    }

    console.log(datas)
    api.post(ADD_PLANT, payload)
    .then((res) =>{
      setControlLoading('no');
      setUpdateEffect(!updateEffect);
      addToast({
        type: "success",
        title: "Successfully registered!",
        message: `Sucess`,
      });
      history.push('/dashboard/plants');

      // setPlantName('');
    })
    .catch((err) => {
      setControlLoading('no');
      setPlantName('');
      addToast({
        type: "error",
        title: "Error",
        message: "Error",
      });
    })
  }

  // const handleDetails = (index : number) => {
  //   const payload = {
  //     id : String(datasPurchasingsector[index].plant_id),
  //     name : datasPurchasingsector[index].plant_name,
  //   }
  //   localStorage.setItem("datails-plants", JSON.stringify(payload));
  //   history.push('/dashboard/plants/details');
  // }
  
  return (
    <PageHomeContent
      onSubmit={handleSubmit(onSubmit)}
    >

    <Breadcrumb
      before={["Home", "Plants"]}
      current="Add Plants"
      back={true}
    />
    
    <TitlePage
      title="Add Plants"      
    />
    {props.children}

      <ContenHome>        
        <FormAdd center="yes">
          <div className="two">
            <Field>
              <label>Name *</label>
              <Input
                autoComplete="off"
                placeholder="Name"
                {...register("plant_name", { required: true })}
                onChange={(e) => updateData(e.target.name, e.target.value)}
                name="plant_name"
                maxLength={45}
              />
              <span style={{opacity :  errors.plant_name && errors.plant_name.type === 'required' ? 1 : 0 }}>Required field</span>
            </Field>        

            <Field>
              <label>Cost Center *</label>
              <SelectOption
                {...register("cost_center_cost_center_id", { required: true })}
                onChange={(e) => updateData(e.target.name, e.target.value)}
                name="cost_center_cost_center_id"
                id="cost_center_cost_center_id"
              >
                <option value="">SELECT</option>
                {
                  datasCostCenter.map((elem, index) => {
                    return(
                      <option value={elem.cost_center_id} key={index}>{elem.cost_center_name}</option>
                    )} )
                }
              </SelectOption>
              <span style={{opacity : errors.cost_center_cost_center_id && errors.cost_center_cost_center_id.type === 'required' ? 1 : 0 }}>Required field</span>
            </Field>


            <Field>
              <label>Purchasing Sector *</label>
              <SelectOption
                {...register("purchasing_sector_purchasing_sector_id", { required: true })}
                onChange={(e) => updateData(e.target.name, e.target.value)}
                name="purchasing_sector_purchasing_sector_id"
                id="purchasing_sector_purchasing_sector_id"
              >
                <option value="">SELECT</option>
                {
                  datasPurchasingsector.map((elem, index) => {
                    return(
                      <option value={elem.purchasing_sector_id} key={index}>{elem.purchasing_sector_name}</option>
                    )} )
                }
              </SelectOption>
              <span style={{opacity : errors.purchasing_sector_purchasing_sector_id && errors.purchasing_sector_purchasing_sector_id.type === 'required' ? 1 : 0 }}>Required field</span>
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
        </FormAdd>
      </ContenHome>
    </PageHomeContent>
  );
};

export default Plants;