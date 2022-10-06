import Keycloak from "keycloak-js";


// NB! Leave the / or the relative path will use the Router path
const keycloak = new Keycloak("/keycloak.json")


/** @type { Keycloak } keycloak */
export default keycloak;
