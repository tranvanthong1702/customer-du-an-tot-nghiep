import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import LayoutProfile from "./components/LayoutProfile";

export const OrderRoutesPath = {
    root: '/user/order',
    default: '/user/order/1',
    process: '/user/order/:id',
}

function OrderRoutes() {
    return (
        <LayoutProfile>
            <Switch>
                <Redirect exact from={OrderRoutesPath.root} to={OrderRoutesPath.default}/>
                <Route path={OrderRoutesPath.process} exact>
                    <div>
                        Process
                    </div>
                </Route>
            </Switch>
        </LayoutProfile>
    )
}

export default OrderRoutes