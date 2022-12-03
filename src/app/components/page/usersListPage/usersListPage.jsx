import React, { useState, useEffect } from "react";
import { paginate } from "../../../utils/paginate";

import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import API from "../../../API";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    const pageSize = 8;
    const [users, setUsers] = useState();
    useEffect(() => {
        API.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleSearchQuery = ({ target }) => {
        setSearchQuery(target.value);
        setCurrentPage(1);
        setSelectedProf(undefined);
    };
    const handleDelete = (userId) =>
        setUsers(users.filter((user) => user._id !== userId));
    const handleToggleBookMark = (userId) => {
        setUsers(
            users.map((user) => {
                if (user._id === userId) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleProfessionSelect = (item) => {
        if (searchQuery !== "") setSearchQuery("");
        setCurrentPage(1);
        setSelectedProf(item);
    };
    const handleClearFilter = () => {
        setSelectedProf();
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    if (users) {
        const filteredUsers = searchQuery
            ? users.filter((user) =>
                  user.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
            : selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : users;

        const count = filteredUsers.length;
        const sortedUser = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrop = paginate(sortedUser, currentPage, pageSize);
        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                            selectedItem={selectedProf}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={handleClearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    {
                        <input
                            type="text"
                            name="searchQuery"
                            placeholder="Search..."
                            onChange={handleSearchQuery}
                            value={searchQuery}
                        />
                    }

                    {count > 0 && (
                        <UsersTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            pageSize={pageSize}
                            itemsCount={count}
                            onPageChange={handlePageChange}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "lodaing...";
};

export default UsersListPage;
