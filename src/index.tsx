import React from "react"
import ReactDOM from "react-dom/client"
import keycloak from "./keycloak"
import "./index.css"
import App from "./App"
import { ReactKeycloakProvider } from "@react-keycloak/web"

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
)

root.render(
  <React.StrictMode>
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{
        checkLoginIframe: "false",
        onLoad: "check-sso",
        silentCheckSsoRedirectUri:
          window.location.origin + "/silent-check-sso.html",
        promiseType: "native",
      }}
      onEvent={console.log}
    >
      <App />
    </ReactKeycloakProvider>
  </React.StrictMode>
)
