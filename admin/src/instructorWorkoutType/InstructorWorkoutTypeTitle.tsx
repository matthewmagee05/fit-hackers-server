import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { InstructorWorkoutType } from "../api/instructorWorkoutType/InstructorWorkoutType";

type Props = { id: string };

export const InstructorWorkoutTypeTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    InstructorWorkoutType,
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

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/instructor-workout-types"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
