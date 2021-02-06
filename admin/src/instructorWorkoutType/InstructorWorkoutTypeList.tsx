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
import { WorkoutTypeTitle } from "../workoutType/WorkoutTypeTitle";
import { InstructorWorkoutType } from "../api/instructorWorkoutType/InstructorWorkoutType";

type Data = InstructorWorkoutType[];

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
    name: "instructor",
    title: "instructor",
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

export const InstructorWorkoutTypeList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/instructor-workout-types",
    async () => {
      const response = await api.get("/api/instructor-workout-types");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"instructor_workout_types"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/instructor-workout-types/new"}>
            <Button>Create instructor_workout_type </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: InstructorWorkoutType) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link
                    className="entity-id"
                    to={`${"/instructor-workout-types"}/${item.id}`}
                  >
                    {item.id}
                  </Link>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.createdAt} />
                </DataGridCell>
                <DataGridCell>
                  <InstructorTitle id={item.instructor?.id} />
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
