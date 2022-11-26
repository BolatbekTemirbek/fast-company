import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = ({ pageSize, itemsCount, onPageChange, currentPage }) => {
    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);

    return (
        <nav className="pagination">
            {pages.map((page) => (
                <li
                    className={
                        "page-item " + (page === currentPage ? "active" : "")
                    }
                    key={page}
                >
                    <a onClick={() => onPageChange(page)} className="page-link">
                        {page}
                    </a>
                </li>
            ))}
        </nav>
    );
};
Pagination.propTypes = {
    pageSize: PropTypes.number.isRequired,
    itemsCount: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
};
export default Pagination;
