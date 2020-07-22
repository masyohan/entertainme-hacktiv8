import React from 'react';
import { useQuery } from '@apollo/client';
import queryType from '../graphql';
import { Card, Loading, Error } from '../components';

const { all } = queryType;

export default () => {
  const { loading, error, data } = useQuery(all);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error error={error} />;
  }
  return (
    <div className="flex flex-wrap justify-center px-5 py-10">
      {Object.keys(data).map((category) => {
        return data[category].map((item) => {
          return (
            <Card data={item} key={item._id} type={item.__typename} />
          );
        });
      })}
    </div>
  );
};
