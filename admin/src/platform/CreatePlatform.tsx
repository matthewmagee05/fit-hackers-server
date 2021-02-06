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
import { Platform } from "../api/platform/Platform";
import { PlatformCreateInput } from "../api/platform/PlatformCreateInput";

const INITIAL_VALUES = {} as PlatformCreateInput;

export const CreatePlatform = (): React.ReactElement => {
  useBreadcrumbs("/platforms/new", "Create platform");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Platform,
    AxiosError,
    PlatformCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/platforms", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/platforms"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: PlatformCreateInput) => {
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
            <FormHeader title={"Create platform"}>
              <Button type="submit" disabled={isLoading}>
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
