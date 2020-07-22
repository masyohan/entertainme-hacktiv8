import React from 'react';
import { Link } from 'react-router-dom';

export default ({
  data,
  type,
  showAction,
  openModal,
  confirmDelete,
}) => {
  return (
    <div class="lg:w-1/3 max-w-sm rounded overflow-hidden shadow-lg mx-3 my-3">
      <Link
        to={`/${type === 'Movie' ? 'movies' : 'tvseries'}/${
          data._id
        }`}
      >
        <img
          class="w-full object-cover"
          src={data.poster_path}
          alt={data.title}
          style={{ height: '350px' }}
        />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{data.title}</div>
        </div>
      </Link>
      {showAction && (
        <div class="px-6 py-4 flex justify-between">
          <button
            onClick={() => openModal('edit', data)}
            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
          >
            Edit
          </button>
          <button
            onClick={() => confirmDelete(data)}
            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
