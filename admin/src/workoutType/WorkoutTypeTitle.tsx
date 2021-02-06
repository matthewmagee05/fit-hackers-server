import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { WorkoutType } from "../api/workoutType/WorkoutType";

type Props = { id: string };

export const WorkoutTypeTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    WorkoutType,
    AxiosError,
    [string, string]
  >(["get-/api/workout-types", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/workout-types"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/workout-types"}/${id}`} className="entity-id">
      {data?.name && data?.name.length ? data.name : data?.id}
    </Link>
  );
};
