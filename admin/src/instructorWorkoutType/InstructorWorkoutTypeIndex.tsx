import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { InstructorWorkoutTypeList } from "./InstructorWorkoutTypeList";
import { CreateInstructorWorkoutType } from "./CreateInstructorWorkoutType";
import { InstructorWorkoutType } from "./InstructorWorkoutType";

export const InstructorWorkoutTypeIndex = (): React.ReactElement => {
  useBreadcrumbs("/instructor-workout-types/", "instructor_workout_types");

  return (
    <Switch>
      <PrivateRoute
        exact
        path={"/instructor-workout-types/"}
        component={InstructorWorkoutTypeList}
      />
      <PrivateRoute
        path={"/instructor-workout-types/new"}
        component={CreateInstructorWorkoutType}
      />
      <PrivateRoute
        path={"/instructor-workout-types/:id"}
        component={InstructorWorkoutType}
      />
    </Switch>
  );
};
