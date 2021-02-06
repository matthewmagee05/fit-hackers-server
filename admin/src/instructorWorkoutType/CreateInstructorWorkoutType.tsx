import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { InstructorSelect } from "../instructor/InstructorSelect";
import { WorkoutTypeSelect } from "../workoutType/WorkoutTypeSelect";
import { InstructorWorkoutType } from "../api/instructorWorkoutType/InstructorWorkoutType";
import { InstructorWorkoutTypeCreateInput } from "../api/instructorWorkoutType/InstructorWorkoutTypeCreateInput";

const INITIAL_VALUES = {} as InstructorWorkoutTypeCreateInput;

export const CreateInstructorWorkoutType = (): React.ReactElement => {
  useBreadcrumbs(
    "/instructor-workout-types/new",
    "Create instructor_workout_type"
  );
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    InstructorWorkoutType,
    AxiosError,
    InstructorWorkoutTypeCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/instructor-workout-types", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/instructor-workout-types"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: InstructorWorkoutTypeCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create instructor_workout_type"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <InstructorSelect label="instructor" name="instructor.id" />
          </div>
          <div>
            <WorkoutTypeSelect label="workout_type" name="workoutType.id" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
