import React from 'react'


const Table = () => {
  const records = sessionStorage.getItem("records")
  const parse = records ? JSON.parse(records) : [];

  return (
    <div className="overflow-x-auto relative mt-12 ">
      <table className="m-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" className="py-3 px-6">
                      Time
                  </th>
                  <th scope="col" className="py-3 px-6">
                      WPM
                  </th>
                  <th scope="col" className="py-3 px-6">
                      Correct
                  </th>
                  <th scope="col" className="py-3 px-6">
                      Incorrect
                  </th>
              </tr>
          </thead>
          <tbody>
            {parse.sort((a,b) => - (a.id - b.id)).map( (item) => 
              <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item.time}
                    </th>
                    <td className="py-4 px-6">
                        {item.wpm}
                    </td>
                    <td className="py-4 px-6">
                        {item.correct}
                    </td>
                    <td className="py-4 px-6">
                      {item.incorrect}
                    </td>
                </tr>
              )}
          </tbody>
      </table>
  </div>
  )
}

export default Table