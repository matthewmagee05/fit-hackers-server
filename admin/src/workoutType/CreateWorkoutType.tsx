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
  TextField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { WorkoutType } from "../api/workoutType/WorkoutType";
import { WorkoutTypeCreateInput } from "../api/workoutType/WorkoutTypeCreateInput";

const INITIAL_VALUES = {} as WorkoutTypeCreateInput;

export const CreateWorkoutType = (): React.ReactElement => {
  useBreadcrumbs("/workout-types/new", "Create workout_type");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    WorkoutType,
    AxiosError,
    WorkoutTypeCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/workout-types", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/workout-types"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: WorkoutTypeCreateInput) => {
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
            <FormHeader title={"Create workout_type"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="icon_url" name="iconUrl" />
          </div>
          <div>
            <TextField label="name" name="name" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
