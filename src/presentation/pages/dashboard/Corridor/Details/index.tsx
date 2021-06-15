import React, { useState, useCallback, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";

//API
import api from "infra/services/api";
import { LIST_WAREHOUSE, UPDATE_CORRIDOR } from "infra/config/api";

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
import ButtonDefault from "presentation/components/ButtonDefault";

type ValidateEntry = {
  corridor_name: string,
  corridor_side: string,
  warehouse_warehouse_id: number,
};

const CorridorDetails: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ValidateEntry>();
  const [datasPlants, setDatasPlants] = useState<InterfacePlants[]>([]);
  const [controlLoading, setControlLoading] = useState<string>('no');
  const [datasWarehouses, setDatasWarehouses] = useState<InterfaceWarehouse[]>([]);
  const [updateEffect, setUpdateEffect] = useState(false);
  const details = localStorage.getItem('details-corridor');
  const [datas, setDatas] = useState({
    id: details ? JSON.parse(details).id : '',
    corridor_name: details ? JSON.parse(details).name : '',
    corridor_side: details ? JSON.parse(details).side : '',
    warehouse_warehouse_id: details ? JSON.parse(details).warehouse_id : '',
  });

  const updateData = (name: string, value: string) => {
    if (name !== null && value !== null) {
      setDatas({ ...datas, [name]: value });
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("details-corridor")) {
      history.push('/dashboard/corridor');
    }

  }, []);

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
    handleSave();
  }

  const handleSave = () => {

    setControlLoading('yes');
    const payload = {
      corridor_name: datas.corridor_name,
      corridor_side: datas.corridor_side,
      warehouse_warehouse_id: datas.warehouse_warehouse_id
    }
    api.put(UPDATE_CORRIDOR + datas.id, payload)
      .then((res) => {
        localStorage.removeItem("details-corridor");
        setControlLoading('no');
        setUpdateEffect(!updateEffect);
        reset();
        addToast({
          type: "success",
          title: "Successful editing!",
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
          <h2>Corridor</h2>
          {/* <div className="tree"> */}
          <div className="tree">
            <Field>
              <label>Name *</label>
              <Input
                autoComplete="off"
                placeholder="Name"
                value={datas.corridor_name}
                {...register("corridor_name", { required: true })}
                onChange={(e) => updateData(e.target.name, e.target.value)}
                name="corridor_name"
                maxLength={10}
              />
              <span style={{ opacity: errors.corridor_name && errors.corridor_name.type === 'required' ? 1 : 0 }}>Required field</span>
            </Field>

            <Field>
              <label>Side  *</label>
              <SelectOption
                {...register("corridor_side", { required: true })}
                onChange={(e) => updateData(e.target.name, e.target.value)}
                name="corridor_side"
                value={datas.corridor_side}
              >
                <option value="">SELECT</option>
                <option value="right">Right</option>
                <option value="left">Left</option>
              </SelectOption>
              <span style={{ opacity: errors.corridor_side && errors.corridor_side.type === 'required' ? 1 : 0 }}>Required field</span>
            </Field>

            <Field>
              <label>Warehouse  *</label>
              <SelectOption
                {...register("warehouse_warehouse_id", { required: true })}
                onChange={(e) => updateData(e.target.name, e.target.value)}
                name="warehouse_warehouse_id"
                value={datas.warehouse_warehouse_id}
              >
                <option value="">SELECT</option>
                {
                  datasWarehouses.map((elem, index) => {
                    return (
                      <option value={elem.warehouse_id}>{elem.warehouse_name}</option>
                    )
                  })
                }
              </SelectOption>
              <span style={{ opacity: errors.warehouse_warehouse_id && errors.warehouse_warehouse_id.type === 'required' ? 1 : 0 }}>Required field</span>
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

export default CorridorDetails;