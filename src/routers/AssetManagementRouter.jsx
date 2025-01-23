import { Route, Switch, useRouteMatch } from "react-router";

import AssetDetail from "views/AssetDetail";
import AssetsScreen from "views/AssetsScreen";
import LocationDetail from "views/LocationDetail";
import LocationScreen  from "views/LocationScreen";
import TypeDetail from "views/TypeDetail";
import VendorDetail from "views/VendorDetail";
import VendorScreen from "views/VendorScreen";
import TypeScreen from "views/TypeScreen";
import MyAssetScreen from "views/MyAssetScreen";

export default function AssetManagementRouter() {
  let { path } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route component={MyAssetScreen} exact path={`${path}/my-asset`} />
        <Route component={LocationScreen} exact path={`${path}/locations`} />
        <Route component={LocationDetail} exact path={`${path}/location/:id`} />
        <Route component={VendorScreen} exact path={`${path}/vendors`} />
        <Route component={VendorDetail} exact path={`${path}/vendor/:id`} />
        <Route component={TypeScreen} exact path={`${path}/types`} />
        <Route component={TypeDetail} exact path={`${path}/type/:id`} />
        <Route component={AssetsScreen} exact path={`${path}/assets`} />
        <Route component={AssetDetail} exact path={`${path}/asset/:id`} />
    
      </Switch>
    </>
  );
}
