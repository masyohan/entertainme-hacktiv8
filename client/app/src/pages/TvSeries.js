import React from 'react';
import { useQuery } from '@apollo/client';
import queryType from '../graphql';
import { Card, Loading, Error } from '../components';

const { tvseries } = queryType;

export default () => {
  const { loading, error, data } = useQuery(tvseries.getAll);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error error={error} />;
  }
  return (
    <div className="flex flex-wrap justify-center px-5 py-10">
      {data.tvseries.map((tv) => {
        return <Card data={tv} key={tv._id} type={tv.__typename} />;
      })}
    </div>
  );
};
