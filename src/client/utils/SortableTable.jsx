import React, { useMemo, useState } from "react";

const SortableTable = ({ headNames, head, body }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const sortedData = useMemo(() => {
    let sortableData = [...body];
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        if (typeof aValue === "string") aValue = aValue.toLowerCase();
        if (typeof bValue === "string") bValue = bValue.toLowerCase();
        console.log(aValue, bValue);

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortableData;
  }, [body, sortConfig]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="sortable-table-wrapper">
      <table>
        <thead>
          <tr className="sortable-table-head-row">
            {headNames.map((th, index) => (
              <th
                key={index}
                onClick={() => handleSort(head[index])}
                className="sortable-table-head"
              >
                {th}{" "}
                {sortConfig.key === th
                  ? sortConfig.direction === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="sortable-table-body">
          {sortedData.map((row, index) => (
            <tr key={index} className="sortable-table-row">
              {Object.values(row).map((data, index) => (
                <td key={index} className="sortable-table-data">
                  {data === true ? "✅" : data === false ? "❌" : data}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SortableTable;
