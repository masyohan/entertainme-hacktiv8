import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

export default ({
  setShowModal,
  title,
  data,
  type,
  queryType,
  action,
}) => {
  const [inputData, setInputData] = useState(data);
  const [submitData, { loading, error, data: result }] = useMutation(
    queryType[type][action],
    {
      refetchQueries: [{ query: queryType[type].getAll }],
    },
  );
  function onChange(e) {
    const { name, value } = e.target;
    const newInput = { ...inputData, [name]: value };
    setInputData(newInput);
  }
  function onSubmit(e) {
    e.preventDefault();
    let submitObject = {
      data: {
        title: inputData.title,
        overview: inputData.overview,
        poster_path: inputData.poster_path,
        popularity: Number(inputData.popularity),
        tags: Array.isArray(inputData.tags)
          ? inputData.tags
          : inputData.tags.split(','),
      },
    };
    if (action == 'edit') {
      submitObject.id = inputData._id;
    }
    submitData({
      variables: submitObject,
    });
    setInputData({});
    setShowModal(false);
  }
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-3xl font-semibold">{title}</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <form
              onSubmit={(e) => onSubmit(e)}
              class="w-full max-w-xl px-3"
            >
              <div class="flex flex-wrap -mx-3 mb-6 py-2">
                <div class="w-full px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="title"
                  >
                    Title
                  </label>
                  <input
                    onChange={(e) => onChange(e)}
                    name="title"
                    value={inputData.title}
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="title"
                    type="text"
                    placeholder="Title"
                  />
                </div>
                <div class="w-full px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="overview"
                  >
                    Overview
                  </label>
                  <input
                    onChange={(e) => onChange(e)}
                    name="overview"
                    value={inputData.overview}
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="overview"
                    type="text"
                    placeholder="Overview"
                  />
                </div>
                <div class="w-full px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="poster_path"
                  >
                    Poster Path
                  </label>
                  <input
                    onChange={(e) => onChange(e)}
                    name="poster_path"
                    value={inputData.poster_path}
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="poster_path"
                    type="text"
                    placeholder="http://gambar.co.id/gambar.jpeg"
                  />
                </div>
                <div class="w-full px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="popularity"
                  >
                    Popularity
                  </label>
                  <input
                    onChange={(e) => onChange(e)}
                    name="popularity"
                    value={inputData.popularity}
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="popularity"
                    type="text"
                    placeholder="4.8"
                  />
                </div>
                <div class="w-full px-3 mb-6">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="tags"
                  >
                    Tags
                  </label>
                  <input
                    onChange={(e) => onChange(e)}
                    name="tags"
                    value={inputData.tags}
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="tags"
                    type="text"
                    placeholder="drama,comedy"
                  />
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  style={{ transition: 'all .15s ease' }}
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="submit"
                  style={{ transition: 'all .15s ease' }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
