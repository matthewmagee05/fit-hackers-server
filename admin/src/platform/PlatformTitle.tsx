import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Platform } from "../api/platform/Platform";

type Props = { id: string };

export const PlatformTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Platform,
    AxiosError,
    [string, string]
  >(["get-/api/platforms", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/platforms"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/platforms"}/${id}`} className="entity-id">
      {data?.name && data?.name.length ? data.name : data?.id}
    </Link>
  );
};
