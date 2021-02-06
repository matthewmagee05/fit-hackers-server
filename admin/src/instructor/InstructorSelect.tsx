import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Instructor } from "../api/instructor/Instructor";

type Data = Instructor[];

type Props = Omit<SelectFieldProps, "options">;

export const InstructorSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/instructors",
    async () => {
      const response = await api.get("/api/instructors");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.name && item.name.length ? item.name : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
