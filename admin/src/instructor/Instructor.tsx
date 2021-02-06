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
import { PlatformSelect } from "../platform/PlatformSelect";
import { Instructor as TInstructor } from "../api/instructor/Instructor";
import { InstructorUpdateInput } from "../api/instructor/InstructorUpdateInput";

export const Instructor = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/instructors/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TInstructor,
    AxiosError,
    [string, string]
  >(["get-/api/instructors", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/instructors"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TInstructor, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/instructors"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//instructors");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TInstructor, AxiosError, InstructorUpdateInput>(
    async (data) => {
      const response = await api.patch(`${"/api/instructors"}/${id}`, data);
      return response.data;
    }
  );

  const handleSubmit = React.useCallback(
    (values: InstructorUpdateInput) => {
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

  const initialValues = React.useMemo(
    () => pick(data, ["about", "imageUrl", "likes", "name", "platform"]),
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
                title={`${"instructor"} ${
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
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
