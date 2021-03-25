// Inspirert av forelesningene//
// Router guard for ikke innloggede brukere, klient side sikkerhet//
import React from "react";
import { useAuth} from "react-nhost";
import { Route, Redirect } from "react-router-dom";

type RouterGuardProps = {
  component: React.FC; 
  path: string;
  exact: boolean;
};


const ReactGuard = ({ component, path, exact }: RouterGuardProps) => {
  const { signedIn } = useAuth(); 

  return signedIn ? 
  <Route path={path} component={component} exact={exact}/> :
  <Redirect to="/login" />;
}

export default ReactGuard; 