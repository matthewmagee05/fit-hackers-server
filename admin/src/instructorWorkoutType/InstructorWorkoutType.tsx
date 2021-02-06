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
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { InstructorSelect } from "../instructor/InstructorSelect";
import { WorkoutTypeSelect } from "../workoutType/WorkoutTypeSelect";
import { InstructorWorkoutType as TInstructorWorkoutType } from "../api/instructorWorkoutType/InstructorWorkoutType";
import { InstructorWorkoutTypeUpdateInput } from "../api/instructorWorkoutType/InstructorWorkoutTypeUpdateInput";

export const InstructorWorkoutType = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/instructor-workout-types/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TInstructorWorkoutType,
    AxiosError,
    [string, string]
  >(
    ["get-/api/instructor-workout-types", id],
    async (key: string, id: string) => {
      const response = await api.get(
        `${"/api/instructor-workout-types"}/${id}`
      );
      return response.data;
    }
  );

  const [deleteEntity] = useMutation<TInstructorWorkoutType, AxiosError>(
    async (data) => {
      const response = await api.delete(
        `${"/api/instructor-workout-types"}/${id}`,
        data
      );
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//instructor-workout-types");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<
    TInstructorWorkoutType,
    AxiosError,
    InstructorWorkoutTypeUpdateInput
  >(async (data) => {
    const response = await api.patch(
      `${"/api/instructor-workout-types"}/${id}`,
      data
    );
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: InstructorWorkoutTypeUpdateInput) => {
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
    () => pick(data, ["instructor", "workoutType"]),
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
                title={`${"instructor_workout_type"} ${
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
              <InstructorSelect label="instructor" name="instructor.id" />
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
