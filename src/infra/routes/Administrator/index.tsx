import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from 'react-router-dom';

// LAYOUTS
import TopAndSide from 'presentation/layouts/TopAndSide';
import TopAndSideNoNavigator from 'presentation/layouts/TopAndSideNoNavigator';

// DASHBOARD

import Presentation from 'presentation/pages/dashboard/Presentation';
import Testeroute from 'presentation/pages/dashboard/Users/Testeroute';
import Login from 'presentation/pages/Login'
import Users from 'presentation/pages/dashboard/Users';
import AddUser from 'presentation/pages/dashboard/Users/AddUser';
import UsersDetails from 'presentation/pages/dashboard/Users/Details';
import Plants from 'presentation/pages/dashboard/Plants';
import AddPlants from 'presentation/pages/dashboard/Plants/AddPlants';
import PlantsDetails from 'presentation/pages/dashboard/Plants/Details';
import CostCenter from 'presentation/pages/dashboard/CostCenter';
import Cabinet from 'presentation/pages/dashboard/Cabinet';
import AddCabinet from 'presentation/pages/dashboard/Cabinet/AddCabinet';

import CabinetDetails from 'presentation/pages/dashboard/Cabinet/Details';
import Shelf from 'presentation/pages/dashboard/Shelf';
import AddShelf from 'presentation/pages/dashboard/Shelf/AddShelf';
import ShelfDetails from 'presentation/pages/dashboard/Shelf/Details';
import Pallet from 'presentation/pages/dashboard/Pallet';
import PalletDetails from 'presentation/pages/dashboard/Pallet/Details';
import Box from 'presentation/pages/dashboard/Box';
import BoxDetails from 'presentation/pages/dashboard/Box/Details';
import Corridor from 'presentation/pages/dashboard/Corridor';
import CorridorDetails from 'presentation/pages/dashboard/Corridor/Details';
import Werehouse from 'presentation/pages/dashboard/Werehouse';
import WarehouseDetails from 'presentation/pages/dashboard/Werehouse/Details';
import NavigatorRegister from 'presentation/components/NavigatorRegister';
import NavigatorWarehouse from 'presentation/components/NavigatorWarehouse';
import AddWerehouse from 'presentation/pages/dashboard/Werehouse/AddWerehouse';
import AddCorridor from 'presentation/pages/dashboard/Corridor/AddCorridor';
import AddPallet from 'presentation/pages/dashboard/Pallet/AddPallet';
import AddBox from 'presentation/pages/dashboard/Box/AddBox';
import AddCostCenter from 'presentation/pages/dashboard/CostCenter/AddCostCenter';
import AddPurchasingSector from 'presentation/pages/dashboard/PurchasingSector/AddPurchasingSector';
import PurchasingSector from 'presentation/pages/dashboard/PurchasingSector';

const Administrator = () => {
    return (    
        <Switch>

            <Route path="/dashboard/presentation" exact>
                <TopAndSide>
                    <Presentation />
                </TopAndSide>
            </Route>

            <Route path="/dashboard/testeroute" exact>
                {/* <TopAndSide> */}
                    <Testeroute />
                {/* </TopAndSide> */}
            </Route>

            <Route path="/dashboard/users" exact>
                <TopAndSide>
                    <Users />
                </TopAndSide>
            </Route>

            <Route path="/dashboard/users/add" exact>
                <TopAndSide>
                    <AddUser />
                </TopAndSide>
            </Route>

            

            <Route path="/dashboard/users/details" exact>
            {/* <Route path="/dashboard/users/details/:id" exact> */}
                <UsersDetails />
            </Route>

            <Route path="/dashboard/plants" exact>      
                <TopAndSide>
                    {/* <NavigatorRegister/> */}
                    <Plants>
                        <NavigatorWarehouse />
                    </Plants>
                </TopAndSide>
            </Route>

            <Route path="/dashboard/plants/add" exact>
                <TopAndSide>
                    <AddPlants>
                        <NavigatorWarehouse />
                    </AddPlants>
                </TopAndSide>
            </Route>

            <Route path="/dashboard/plants/details" exact>      
                <PlantsDetails />
            </Route>        

            <Route path="/dashboard/cabinet" exact>      
                <TopAndSide>
                    <Cabinet>
                        <NavigatorWarehouse />
                    </Cabinet>
                </TopAndSide>
            </Route>

            <Route path="/dashboard/cabinet/add" exact>      
                <TopAndSide>
                    <AddCabinet>
                        <NavigatorWarehouse />
                    </AddCabinet>
                </TopAndSide>
            </Route>     




            <Route path="/dashboard/cabinet/details" exact>
                <CabinetDetails />
            </Route>

            <Route path="/dashboard/shelf" exact>
                <TopAndSide>
                    <Shelf>
                        <NavigatorWarehouse />
                    </Shelf>
                </TopAndSide>
            </Route>

            <Route path="/dashboard/shelf/add" exact>
                <TopAndSide>
                    <AddShelf>
                        <NavigatorWarehouse />
                    </AddShelf>
                </TopAndSide>
            </Route>

            

            <Route path="/dashboard/shelf/details" exact>
                <ShelfDetails />
            </Route>
            
            <Route path="/dashboard/pallet" exact>
                <TopAndSide>
                    <Pallet>
                        <NavigatorWarehouse />
                    </Pallet>
                </TopAndSide>
            </Route>

            <Route path="/dashboard/pallet/add" exact>
                <TopAndSide>
                    <AddPallet>
                        <NavigatorWarehouse />
                    </AddPallet>
                </TopAndSide>
            </Route>            

            <Route path="/dashboard/pallet/details" exact>
                <PalletDetails />
            </Route>

            <Route path="/dashboard/box" exact>
                <TopAndSide>
                    <Box>
                        <NavigatorWarehouse />
                    </Box>
                </TopAndSide>
            </Route>

            <Route path="/dashboard/box/add" exact>
                <TopAndSide>
                    <AddBox>
                        <NavigatorWarehouse />
                    </AddBox>
                </TopAndSide>
            </Route>            

            <Route path="/dashboard/box/details" exact>      
                <BoxDetails />
            </Route>

            <Route path="/dashboard/costcenter" exact>          
                <TopAndSide>
                    <CostCenter>
                        <NavigatorWarehouse />
                    </CostCenter>
                </TopAndSide>
            </Route>

            <Route path="/dashboard/costcenter/add" exact>          
                <TopAndSide>
                    <AddCostCenter>
                        <NavigatorWarehouse />
                    </AddCostCenter>
                </TopAndSide>
            </Route>

            <Route path="/dashboard/purchasingsector" exact>          
                <TopAndSide>
                    <PurchasingSector>
                        <NavigatorWarehouse />
                    </PurchasingSector>
                </TopAndSide>
            </Route>

            <Route path="/dashboard/purchasingsector/add" exact>          
                <TopAndSide>
                    <AddPurchasingSector>
                        <NavigatorWarehouse />
                    </AddPurchasingSector>
                </TopAndSide>
            </Route>
            

            <Route path="/dashboard/corridor" exact>          
                <TopAndSide>
                    <Corridor>
                        <NavigatorWarehouse />
                    </Corridor>
                </TopAndSide>
            </Route>

            <Route path="/dashboard/corridor/add" exact>          
                <TopAndSide>
                    <AddCorridor>
                        <NavigatorWarehouse />
                    </AddCorridor>
                </TopAndSide>
            </Route>

            <Route path="/dashboard/corridor/details" exact>                
                <CorridorDetails />      
            </Route>    

            <Route path="/dashboard/warehouse" exact>
                <TopAndSide>
                    <Werehouse>
                        <NavigatorWarehouse />
                    </Werehouse>
                </TopAndSide>
            </Route>

            <Route path="/dashboard/warehouse/add" exact>
                <TopAndSide>
                    <AddWerehouse>
                        <NavigatorWarehouse  />
                    </AddWerehouse>
                </TopAndSide>
            </Route>

            <Route path="/dashboard/warehouse/details" exact>
                <WarehouseDetails />
            </Route> 

            {/* <Route path="/" exact component={Login} /> */}

            {/* <Redirect to='/' /> */}

            <Redirect to='/dashboard/presentation' />
        </Switch>
    );
}

export default Administrator;