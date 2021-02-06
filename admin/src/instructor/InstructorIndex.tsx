import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { InstructorList } from "./InstructorList";
import { CreateInstructor } from "./CreateInstructor";
import { Instructor } from "./Instructor";

export const InstructorIndex = (): React.ReactElement => {
  useBreadcrumbs("/instructors/", "instructors");

  return (
    <Switch>
      <PrivateRoute exact path={"/instructors/"} component={InstructorList} />
      <PrivateRoute path={"/instructors/new"} component={CreateInstructor} />
      <PrivateRoute path={"/instructors/:id"} component={Instructor} />
    </Switch>
  );
};
