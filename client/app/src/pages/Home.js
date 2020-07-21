import React from 'react';
import { useQuery } from '@apollo/client';
import queryType from '../graphql';
import { Card } from '../components';

const { all } = queryType;

export default () => {
  const { loading, error, data } = useQuery(all);
  return <>{JSON.stringify(data)}</>;
};
