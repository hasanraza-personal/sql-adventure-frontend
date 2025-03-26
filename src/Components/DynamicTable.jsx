/* eslint-disable react/prop-types */
import { XCircle } from "lucide-react"; // Importing an icon for better UX

const DynamicTable = ({ data, setTableVisible, setSQLResponse }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <p className="text-white text-center">No data available</p>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => {
              setSQLResponse([]);
              setTableVisible(false);
            }}
            className="flex items-center gap-2 px-5 py-2 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition duration-200"
          >
            <XCircle size={20} /> Close Table
          </button>
        </div>
      </div>
    );
  }

  // Extract dynamic column names (keys)
  const columns = Object.keys(data[0]);

  return (
    <div className="p-6 bg-white shadow-xl rounded-xl">
      {/* Table Header with Close Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          SQL Query Results
        </h2>
        <button
          onClick={() => {
            setSQLResponse([]);
            setTableVisible(false);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition duration-200"
        >
          <XCircle size={18} /> Close
        </button>
      </div>

      {/* Scrollable Table Container */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border border-gray-300 text-gray-800">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-sm uppercase tracking-wide">
              {columns.map((col) => (
                <th key={col} className="border px-6 py-3 text-left">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className="even:bg-gray-100 hover:bg-gray-50 transition duration-200"
              >
                {columns.map((col) => (
                  <td key={col} className="border px-6 py-3 whitespace-nowrap">
                    {row[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DynamicTable;
