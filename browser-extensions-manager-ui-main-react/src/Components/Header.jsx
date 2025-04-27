import React, { useState } from "react";
import data from "/data.json";

function Header() {
  const [extensions, setExtensions] = useState(data);
  const [activeFilter, setActiveFilter] = useState("All");

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const handleToggleActive = (id) => {
    const updatedExtensions = extensions.map((ext) =>
      ext.id === id ? { ...ext, isActive: !ext.isActive } : ext
    );
    setExtensions(updatedExtensions);
  };

  const handleRemoveExtension = (id) => {
    const updatedExtensions = extensions.filter((ext) => ext.id !== id);
    setExtensions(updatedExtensions);
  };

  const filteredData = extensions.filter((item) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Active") return item.isActive;
    if (activeFilter === "Inactive") return !item.isActive;
    return true;
  });

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        <h1 className="text-2xl font-bold text-Neutral-900 dark:text-white lg:text-3xl">
          Extensions List
        </h1>
        <div className="flex items-center justify-center gap-4 mt-4 md:mt-0">
          {["All", "Active", "Inactive"].map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`rounded-full p-2 px-6 shadow transition-colors duration-300 cursor-pointer ${
                activeFilter === filter
                  ? "bg-Red-700 text-white dark:text-Neutral-900 dark:bg-Red-400"
                  : "bg-white text-Neutral-900 dark:bg-Neutral-700 dark:border dark:border-Neutral-600 dark:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="grid grid-cols-1 items-center justify-center my-8 gap-2 md:grid-cols-2 lg:grid-cols-3">
          {filteredData.length === 0 ? (
            <p className="text-center text-Neutral-600 dark:text-Neutral-300 mt-12">
              No extensions found for this filter.
            </p>
          ) : (
            filteredData.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-start justify-between h-[12em] p-4 bg-white border border-Neutral-200 rounded-xl w-[22em] md:w-[24em] lg:w-[26em] shadow-lg dark:bg-Neutral-800 dark:border-Neutral-600"
              >
                <div className="flex gap-4 items-start justify-start w-full">
                  <img src={item.logo} alt={item.name} className="w-14" />
                  <div>
                    <b className="text-Neutral-900 text-lg dark:text-Neutral-0">
                      {item.name}
                    </b>
                    <p className="text-sm dark:text-Neutral-300 text-Neutral-600">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full">
                  <button
                    onClick={() => handleRemoveExtension(item.id)}
                    className="text-Neutral-900 border-Neutral-200 rounded-full border-2 py-2 px-6 font-semibold cursor-pointer hover:bg-Red-700 transition-colors duration-300 hover:text-white hover:border-0 dark:border-Neutral-600 dark:text-Neutral-200 dark:hover:text-Neutral-800 dark:hover:bg-Red-400"
                  >
                    Remove
                  </button>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={item.isActive}
                      onChange={() => handleToggleActive(item.id)}
                    />
                    <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 dark:bg-Neutral-700 dark:hover:bg-Neutral-600 peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-Red-700 hover:peer-checked:bg-Red-500 dark:peer-checked:bg-Red-400 dark:hover:peer-checked:bg-Red-700"></div>
                  </label>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
