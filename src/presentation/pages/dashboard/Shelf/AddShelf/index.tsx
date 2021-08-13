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
import { Interfaceshelf  } from "data/protocols/IShelf";
import { InterfaceCabinet } from "data/protocols/ICabinet";
import Breadcrumb from "presentation/components/Breadcrumb";
import { ControlOptions } from "./styles";
import ButtonCancel from "presentation/components/ButtonCancel";
import ButtonDefault from "presentation/components/ButtonDefault";
import Loading from "presentation/components/Loading";


type ValidateEntry = {
  shelf_name: string,
	cabinet_cabinet_id: number,
	cabinet_corridor_corridor_id: number,
	cabinet_corridor_warehouse_warehouse_id: number
};


const AddShelf: React.FC = (props: any) => {
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

      
    <Breadcrumb
      before={["Home", "Shelf"]}
      current="Add Shelf"
      back={true}
    />

    <TitlePage
      title="Add Shelf"
    />
      
    {props.children}

      <ContenHome>
        <FormAdd center="yes">
          <div className="two">
            <Field>
              <label>Name *</label>
              <Input
                disabled
                value={datas.shelf_name}
                autoComplete="off"
                placeholder="Name"
                // {...register("shelf_name", { required: true })}
                onChange={(e) => updateData(e.target.name, e.target.value)}
                name="shelf_name"
                maxLength={10}
              />
              {/* <span style={{opacity :  errors.shelf_name && errors.shelf_name.type === 'required' ? 1 : 0 }}>Required field</span> */}
            </Field>

            <Field>
              <label>Cabinet  *</label>
              <SelectOption
                  {...register("cabinet_cabinet_id", { required: true })}
                  onChange={(e) => {updateData(e.target.name, e.target.value); handleCheckWereHouve(e.target.value)}}
                  name="cabinet_cabinet_id">
                  <option value="">SELECT</option>
                {
                  datasCabinet.map((elem, index) => {
                    return(
                      <option value={ elem.cabinet_id } key={index} >{ elem.cabinet_name }</option>
                    )})
                }
              </SelectOption>
              <span style={{opacity :  errors.cabinet_cabinet_id && errors.cabinet_cabinet_id.type === 'required' ? 1 : 0 }}>Required field</span>
            </Field>

            <Field>
              <label>Corridor *</label>
              <SelectOption
                disabled
              >
                <option value="">{ viewCorridor }</option>
              </SelectOption>
            </Field>

            <Field>
              <label>Warehouse  *</label>
              <SelectOption
                disabled
              >
                <option value="">{ viewWarehouse }</option>
              </SelectOption>
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

export default AddShelf;