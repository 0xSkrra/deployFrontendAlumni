import { Navigate} from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";


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