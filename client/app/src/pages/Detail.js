import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import queryType from '../graphql';
import { Loading, Error } from '../components/';
import StarRatings from 'react-star-ratings';

export default () => {
  const { category, id } = useParams();
  const type = category === 'movies' ? 'movie' : 'tv';
  const { loading, error, data } = useQuery(
    queryType[category].getById,
    {
      variables: {
        id,
      },
    },
  );
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error error={error} />;
  }
  return (
    <div className="flex justify-center">
      <div class="max-w-sm w-full lg:max-w-full lg:flex">
        <div
          class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style={{
            backgroundImage: `url('${data[type].poster_path}')`,
          }}
          title={data[type].title}
        ></div>
        <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div class="mb-8">
            <StarRatings
              starDimension="30px"
              rating={data[type].popularity}
              starRatedColor="orange"
              numberOfStars={5}
              name="rating"
            />
            <div class="text-gray-900 font-bold text-xl mb-2">
              {data[type].title}
            </div>
            <p class="text-gray-700 text-base">
              {data[type].overview}
            </p>
          </div>
          <div class="flex items-center">
            {data[type].tags.map((tag) => {
              return (
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  #{tag}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
