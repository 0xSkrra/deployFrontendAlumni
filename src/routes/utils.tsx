import { Navigate} from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";
import { getOrCreateUserProfile } from "../common/util/API";
import { useUserStore } from "../common/util/Store/userStore";

interface PrivateRouteParams {
    children:
    | React.ComponentType<any> 
    | any
    | Element
  }


const PrivateRoute = ({ children }: PrivateRouteParams) => {
    const {keycloak} =  useKeycloak()

      

    return keycloak.authenticated ? children : <Navigate to='/'/>
}

export default PrivateRoute