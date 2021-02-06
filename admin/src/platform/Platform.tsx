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
import { Platform as TPlatform } from "../api/platform/Platform";
import { PlatformUpdateInput } from "../api/platform/PlatformUpdateInput";

export const Platform = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/platforms/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TPlatform,
    AxiosError,
    [string, string]
  >(["get-/api/platforms", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/platforms"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TPlatform, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/platforms"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//platforms");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TPlatform, AxiosError, PlatformUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/platforms"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: PlatformUpdateInput) => {
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
    () => pick(data, ["color", "iconUrl", "name"]),
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
                title={`${"platform"} ${
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
              <TextField label="color" name="color" />
            </div>
            <div>
              <TextField label="icon_url" name="iconUrl" />
            </div>
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
