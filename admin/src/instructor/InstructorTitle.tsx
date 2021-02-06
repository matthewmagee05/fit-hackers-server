import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Instructor } from "../api/instructor/Instructor";

type Props = { id: string };

export const InstructorTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Instructor,
    AxiosError,
    [string, string]
  >(["get-/api/instructors", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/instructors"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/instructors"}/${id}`} className="entity-id">
      {data?.name && data?.name.length ? data.name : data?.id}
    </Link>
  );
};
