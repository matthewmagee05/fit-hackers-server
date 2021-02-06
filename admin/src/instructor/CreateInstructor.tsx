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
import { PlatformSelect } from "../platform/PlatformSelect";
import { Instructor } from "../api/instructor/Instructor";
import { InstructorCreateInput } from "../api/instructor/InstructorCreateInput";

const INITIAL_VALUES = {} as InstructorCreateInput;

export const CreateInstructor = (): React.ReactElement => {
  useBreadcrumbs("/instructors/new", "Create instructor");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Instructor,
    AxiosError,
    InstructorCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/instructors", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/instructors"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: InstructorCreateInput) => {
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
            <FormHeader title={"Create instructor"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="about" name="about" textarea />
          </div>
          <div>
            <TextField label="image_url" name="imageUrl" />
          </div>
          <div>
            <TextField type="number" step={1} label="likes" name="likes" />
          </div>
          <div>
            <TextField label="name" name="name" />
          </div>
          <div>
            <PlatformSelect label="platform" name="platform.id" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
