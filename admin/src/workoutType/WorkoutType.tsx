import * as React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery, useMutation } from "react-query";
import { Formik } from "formik";
import pick from "lodash.pick";

import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  EnumButtonStyle,
  TextField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { WorkoutType as TWorkoutType } from "../api/workoutType/WorkoutType";
import { WorkoutTypeUpdateInput } from "../api/workoutType/WorkoutTypeUpdateInput";

export const WorkoutType = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/workout-types/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TWorkoutType,
    AxiosError,
    [string, string]
  >(["get-/api/workout-types", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/workout-types"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TWorkoutType, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/workout-types"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//workout-types");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TWorkoutType, AxiosError, WorkoutTypeUpdateInput>(
    async (data) => {
      const response = await api.patch(`${"/api/workout-types"}/${id}`, data);
      return response.data;
    }
  );

  const handleSubmit = React.useCallback(
    (values: WorkoutTypeUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.name);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(() => pick(data, ["name"]), [data]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form
            formStyle={EnumFormStyle.Horizontal}
            formHeaderContent={
              <FormHeader
                title={`${"workout_type"} ${
                  data?.name && data?.name.length ? data.name : data?.id
                }`}
              >
                <Button
                  type="button"
                  disabled={updateIsLoading}
                  buttonStyle={EnumButtonStyle.Secondary}
                  icon="trash_2"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button type="submit" disabled={updateIsLoading}>
                  Save
                </Button>
              </FormHeader>
            }
          >
            <div>
              <TextField label="name" name="name" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
