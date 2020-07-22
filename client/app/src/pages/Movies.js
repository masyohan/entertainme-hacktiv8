import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import queryType from '../graphql';
import { Card, Form, Loading, Error, Confirm } from '../components';

const { movies } = queryType;

export default () => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [actionForm, setActionForm] = useState({});
  const { loading, error, data } = useQuery(movies.getAll);
  const [confirmInfo, setConfirmInfo] = useState({
    text: '',
    title: '',
  });
  const [deleteMovie, { data: deleted }] = useMutation(
    movies.delete,
    {
      refetchQueries: [{ query: movies.getAll }],
    },
  );
  function doDelete() {
    deleteMovie({
      variables: {
        id: selectedData._id,
      },
    });
    setShowConfirm(false);
  }
  function confirmDelete(data) {
    setConfirmInfo({
      title: 'Delete',
      text: 'Are you sure to delete this item ?',
    });
    setSelectedData(data);
    setShowConfirm(true);
  }
  function openModal(type, data = {}) {
    setActionForm(type);
    setSelectedData(data);
    console.log(actionForm);
    setShowModal(true);
  }
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error error={error} />;
  }
  return (
    <div>
      <div className="flex justify-center py-5">
        <button
          className="bg-teal-500 text-white hover:bg-teal-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
          type="button"
          style={{ transition: 'all .15s ease' }}
          onClick={() => openModal('add')}
        >
          Add Movie
        </button>
        {showModal && (
          <Form
            setShowModal={setShowModal}
            title={`${actionForm} Movie`}
            data={selectedData}
            type={`movies`}
            queryType={queryType}
            action={actionForm}
          />
        )}
        {showConfirm && (
          <Confirm
            confirmDelete={confirmDelete}
            onDelete={doDelete}
            info={confirmInfo}
            setShowConfirm={setShowConfirm}
          />
        )}
      </div>
      <div className="flex flex-wrap justify-center px-5 py-10">
        {data.movies.map((movie) => {
          return (
            <Card
              data={movie}
              key={movie._id}
              type={movie.__typename}
              showAction={true}
              openModal={openModal}
              confirmDelete={confirmDelete}
            />
          );
        })}
      </div>
    </div>
  );
};
