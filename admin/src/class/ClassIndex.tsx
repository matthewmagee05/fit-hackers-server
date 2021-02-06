import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { ClassList } from "./ClassList";
import { CreateClass } from "./CreateClass";
import { Class } from "./Class";

export const ClassIndex = (): React.ReactElement => {
  useBreadcrumbs("/classes/", "classes");

  return (
    <Switch>
      <PrivateRoute exact path={"/classes/"} component={ClassList} />
      <PrivateRoute path={"/classes/new"} component={CreateClass} />
      <PrivateRoute path={"/classes/:id"} component={Class} />
    </Switch>
  );
};
