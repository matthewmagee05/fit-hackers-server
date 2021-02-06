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
import { InstructorSelect } from "../instructor/InstructorSelect";
import { PlatformSelect } from "../platform/PlatformSelect";
import { WorkoutTypeSelect } from "../workoutType/WorkoutTypeSelect";
import { Class } from "../api/class/Class";
import { ClassCreateInput } from "../api/class/ClassCreateInput";

const INITIAL_VALUES = {} as ClassCreateInput;

export const CreateClass = (): React.ReactElement => {
  useBreadcrumbs("/classes/new", "Create class");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Class,
    AxiosError,
    ClassCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/classes", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/classes"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: ClassCreateInput) => {
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
            <FormHeader title={"Create class"}>
              <Button type="submit" disabled={isLoading}>
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
