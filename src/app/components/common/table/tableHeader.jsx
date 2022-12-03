import React from "react";
import PropTypes from "prop-types";
const TableHeader = ({ selectedSort, onSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        scope="col"
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        {...{ role: columns[column].path && "button" }}
                    >
                        {columns[column].name}
                        {columns[column].path &&
                            columns[column].path === selectedSort.path &&
                            (selectedSort.order === "asc" ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-caret-down-fill"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-caret-up-fill"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                                </svg>
                            ))}
                    </th>
                ))}

                {/* <th scope="col">Качество</th>
        <th scope="col" onClick={() => handleSort("profession.name")}>
          Профессия
        </th>
        <th scope="col" onClick={() => handleSort("completedMeetings")}>
          Встретился, раз
        </th>
        <th scope="col" onClick={() => handleSort("rate")}>
          Оценка
        </th>
        <th scope="col" onClick={() => handleSort("bookmark")}>
          Избранное
        </th>
        <th scope="col"></th> */}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    selectedSort: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired,
    columns: PropTypes.object.isRequired
};
export default TableHeader;
