import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { WorkoutTypeList } from "./WorkoutTypeList";
import { CreateWorkoutType } from "./CreateWorkoutType";
import { WorkoutType } from "./WorkoutType";

export const WorkoutTypeIndex = (): React.ReactElement => {
  useBreadcrumbs("/workout-types/", "workout_types");

  return (
    <Switch>
      <PrivateRoute
        exact
        path={"/workout-types/"}
        component={WorkoutTypeList}
      />
      <PrivateRoute path={"/workout-types/new"} component={CreateWorkoutType} />
      <PrivateRoute path={"/workout-types/:id"} component={WorkoutType} />
    </Switch>
  );
};
