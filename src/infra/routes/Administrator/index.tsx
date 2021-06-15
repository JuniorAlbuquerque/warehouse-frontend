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
import Users from 'presentation/pages/dashboard/Users';
import UsersDetails from 'presentation/pages/dashboard/Users/Details';
import Plants from 'presentation/pages/dashboard/Plants';
import PlantsDetails from 'presentation/pages/dashboard/Plants/Details';
import CostCenter from 'presentation/pages/dashboard/CostCenter';
import Cabinet from 'presentation/pages/dashboard/Cabinet';
import CabinetDetails from 'presentation/pages/dashboard/Cabinet/Details';
import Shelf from 'presentation/pages/dashboard/Shelf';
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

const Administrator = () => {
    return (    
        <Switch>
            <Route path="/dashboard/users" exact>
                <TopAndSideNoNavigator>
                    <Users />
                </TopAndSideNoNavigator>
            </Route>

            <Route path="/dashboard/users/details" exact>
            {/* <Route path="/dashboard/users/details/:id" exact> */}
                <UsersDetails />
            </Route>

            <Route path="/dashboard/plants" exact>      
                <TopAndSide>
                    {/* <NavigatorRegister/> */}
                    <Plants />
                </TopAndSide>
            </Route>

            <Route path="/dashboard/plants/details" exact>      
                <PlantsDetails />
            </Route>        

            <Route path="/dashboard/cabinet" exact>      
                <TopAndSide>
                    <Cabinet />
                </TopAndSide>
            </Route>     

            <Route path="/dashboard/cabinet/details" exact>
                <CabinetDetails />
            </Route>

            <Route path="/dashboard/shelf" exact>
                <TopAndSide>
                    <Shelf />
                </TopAndSide>
            </Route>

            <Route path="/dashboard/shelf/details" exact>
                <ShelfDetails />
            </Route>
            
            <Route path="/dashboard/pallet" exact>
                <TopAndSide>
                    <Pallet />
                </TopAndSide>
            </Route>

            <Route path="/dashboard/pallet/details" exact>
                <PalletDetails />
            </Route>

            <Route path="/dashboard/box" exact>
                <TopAndSide>
                    <Box />
                </TopAndSide>
            </Route>

            <Route path="/dashboard/box/details" exact>      
                <BoxDetails />
            </Route>

            <Route path="/dashboard/costcenter" exact>          
                <TopAndSide>
                    <CostCenter />
                </TopAndSide>
            </Route>

            <Route path="/dashboard/corridor" exact>          
                <TopAndSide>
                    <Corridor />
                </TopAndSide>
            </Route>

            <Route path="/dashboard/corridor/details" exact>                
                <CorridorDetails />      
            </Route>    

            <Route path="/dashboard/werehouse" exact>
                <TopAndSide>
                    {/* <NavigatorRegister/> */}
                    <Werehouse />
                </TopAndSide>
            </Route>

            <Route path="/dashboard/werehouse/details" exact>
                <WarehouseDetails />
            </Route> 

            <Redirect to='/dashboard/plants' />
        </Switch>
    );
}

export default Administrator;