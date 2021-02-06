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
import { InstructorSelect } from "../instructor/InstructorSelect";
import { PlatformSelect } from "../platform/PlatformSelect";
import { WorkoutTypeSelect } from "../workoutType/WorkoutTypeSelect";
import { Class as TClass } from "../api/class/Class";
import { ClassUpdateInput } from "../api/class/ClassUpdateInput";

export const Class = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/classes/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TClass,
    AxiosError,
    [string, string]
  >(["get-/api/classes", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/classes"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TClass, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/classes"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//classes");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TClass, AxiosError, ClassUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/classes"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: ClassUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.id);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () =>
      pick(data, [
        "description",
        "instructor",
        "platform",
        "time",
        "workoutType",
      ]),
    [data]
  );

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
                title={`${"class"} ${
                  data?.id && data?.id.length ? data.id : data?.id
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
              <TextField label="description" name="description" textarea />
            </div>
            <div>
              <InstructorSelect label="instructor" name="instructor.id" />
            </div>
            <div>
              <PlatformSelect label="platform" name="platform.id" />
            </div>
            <div>
              <TextField type="datetime-local" label="time" name="time" />
            </div>
            <div>
              <WorkoutTypeSelect label="workout_type" name="workoutType.id" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
