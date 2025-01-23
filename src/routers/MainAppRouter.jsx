import { LinearProgress } from "@mui/material";
import { Layout } from "layout";
import { drawerWidth } from "layout/sidebar/SideBar";
import { Suspense, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { useNotificationState } from "state/NotificationState";
import NotFound from "views/errors/NotFound";
import PrivateRoute from "./PrivateRoute";
import TeacherRouter from "./TeacherRouter";
import DemoScreen from "views/DemoScreen";
// import ShippingRequestManageScreen from "views/ShippingRequestManageScreen";
// import ShippingRequestDetailScreen from "views/ShippingRequestDetailScreen";
// import CustomerScreen from "views/CustomerScreen";
// import OrderScreen from "views/OrderScreen";
// import VehicleScreen from "views/VehicleScreen";
import BuildingScreen from "views/BuildingScreen";
import AssetManagementRouter from "./AssetManagementRouter";
import TeachingDevicesDashboard from "views/TeachingDeviceDashboard";
const styles = {
  loadingProgress: {
    position: "fixed",
    top: 0,
    left: -drawerWidth,
    width: "calc(100% + 300px)",
    zIndex: 1202,
    "& div": {
      top: "0.5px",
    },
  },
};

function MainAppRouter(props) {
  const location = useLocation();
  const [notificationState, setNotificationState] = useNotificationState();

  useEffect(() => {
    setNotificationState((prevState) => ({
      ...prevState,
      open: false,
    }));
  }, [location.pathname]);

  return (
    <Layout>
      <Suspense fallback={<LinearProgress sx={styles.loadingProgress} />}>
        <Switch>
          <Route component={TeachingDevicesDashboard} exact path="/" />
          <PrivateRoute component={DemoScreen} exact path="/demo" />
          <PrivateRoute component={TeacherRouter} path="/teacher" />
          {/* <PrivateRoute component={ShippingRequestDetailScreen} path="/shipping-request-manage/:id" />
          <PrivateRoute component={ShippingRequestManageScreen} path="/shipping-request-manage" />
          <PrivateRoute component={CustomerScreen} path="/customer" />
          <PrivateRoute component={OrderScreen} path="/order" /> */}
          {/* <PrivateRoute component={VehicleScreen} path="/vehicle" /> */}
          <PrivateRoute component={BuildingScreen} path="/building" />
          <PrivateRoute component={AssetManagementRouter} path="/asset-management" />

          {/* <Route component={error} path="*" /> */}
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default MainAppRouter;
