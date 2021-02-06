import * as React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";

import {
  DataGrid,
  DataField,
  SortData,
  DataGridRow,
  DataGridCell,
  EnumTitleType,
  Button,
  Snackbar,
  TimeSince,
} from "@amplication/design-system";

import { InstructorTitle } from "../instructor/InstructorTitle";
import { PlatformTitle } from "../platform/PlatformTitle";
import { WorkoutTypeTitle } from "../workoutType/WorkoutTypeTitle";
import { Class } from "../api/class/Class";

type Data = Class[];

const SORT_DATA: SortData = {
  field: null,
  order: null,
};

const FIELDS: DataField[] = [
  {
    name: "id",
    title: "ID",
    sortable: false,
  },
  {
    name: "createdAt",
    title: "Created At",
    sortable: false,
  },
  {
    name: "description",
    title: "description",
    sortable: false,
  },
  {
    name: "instructor",
    title: "instructor",
    sortable: false,
  },
  {
    name: "platform",
    title: "platform",
    sortable: false,
  },
  {
    name: "time",
    title: "time",
    sortable: false,
  },
  {
    name: "updatedAt",
    title: "Updated At",
    sortable: false,
  },
  {
    name: "workoutType",
    title: "workout_type",
    sortable: false,
  },
];

export const ClassList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/classes",
    async () => {
      const response = await api.get("/api/classes");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"classes"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/classes/new"}>
            <Button>Create class </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: Class) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link className="entity-id" to={`${"/classes"}/${item.id}`}>
                    {item.id}
                  </Link>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.createdAt} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.description}</>
                </DataGridCell>
                <DataGridCell>
                  <InstructorTitle id={item.instructor?.id} />
                </DataGridCell>
                <DataGridCell>
                  <PlatformTitle id={item.platform?.id} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.time}</>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.updatedAt} />
                </DataGridCell>
                <DataGridCell>
                  <WorkoutTypeTitle id={item.workoutType?.id} />
                </DataGridCell>
              </DataGridRow>
            );
          })}
      </DataGrid>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
