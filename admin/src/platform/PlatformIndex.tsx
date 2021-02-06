import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { PlatformList } from "./PlatformList";
import { CreatePlatform } from "./CreatePlatform";
import { Platform } from "./Platform";

export const PlatformIndex = (): React.ReactElement => {
  useBreadcrumbs("/platforms/", "platforms");

  return (
    <Switch>
      <PrivateRoute exact path={"/platforms/"} component={PlatformList} />
      <PrivateRoute path={"/platforms/new"} component={CreatePlatform} />
      <PrivateRoute path={"/platforms/:id"} component={Platform} />
    </Switch>
  );
};
