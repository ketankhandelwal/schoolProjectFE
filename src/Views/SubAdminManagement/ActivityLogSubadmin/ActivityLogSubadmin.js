import React, { useState, useEffect } from "react";
import moment from "moment";
import Table from "../../../Components/Table/Table";
import { useNavigate, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Get } from "../../../Constants/apiMethods";
import { subadminActivityLog } from "../../../Constants/apiRoutes";
import LoadingSpinner from "../../../Components/Loader/index";

export default function ActivityLogSubadmin() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  let permissionList = useSelector((state) => state.auth.permissionList);
  const id = location.search.replace("?id=", "");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [pageCount, setPageCount] = useState();
  const [totalCount, setTotalCount] = useState();
  const [count, setCount] = useState();
  const [subAdminList, setSubAdminList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");
  const [searchTextTimeout, setSearchTextTimeout] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [sectionId, setSectionId] = useState("");
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    getSubAdminActivityLog(search, startDate, endDate);
  }, [currentPage]);

  const field = ["#", "Timestamp", "Section Name", "Activity"];

  useEffect(() => {
    if (startDate && endDate)
      getSubAdminActivityLog(search, startDate, endDate);
  }, [startDate, endDate]);

  useEffect(() => {
    getSubAdminActivityLog(search, startDate, endDate);
  }, [sectionId]);

  useEffect(() => {
    return () => clearTimeout(searchTextTimeout);
  }, [searchTextTimeout]);

  const getSubAdminActivityLog = (
    search_txt = "",
    start_date = "",
    end_date = ""
  ) => {
    setLoading(true);

    const payload = `?id=${id}&page=${currentPage}&count=${pageSize}&search=${search_txt}&start_date=${start_date}&end_date=${end_date}&section=${sectionId}`;
    Get(`${subadminActivityLog}`, token, payload)
      .then((response) => response)
      .then((data) => {
        setLoading(false);
        setSubAdminList(data?.data?.finalData);
        setPageCount(Math.ceil(data.data.count / pageSize));
        setTotalCount(Math.ceil(data.data.count));
        setCount(Math.ceil(data.data.finalData?.length));
      });
  };

  const handleDateChange = (date, type) => {
    if (type === "start") setStartDate(date);
    else setEndDate(date);
  };

  const handleSearch = (searchText) => {
    if (searchTextTimeout) {
      clearTimeout(searchTextTimeout);
    }
    setSearch(search);
    setSearchTextTimeout(
      setTimeout(() => {
        getSubAdminActivityLog(searchText, startDate, endDate);
      }, 500)
    );
  };

  const getSection = (id) => {
    return permissionList?.filter((x) => x.id === id)[0]?.name;
  };

  const filterSections = (filter_id) => {
    if (filter_id == "0") setSectionId("");
    else setSectionId(filter_id);
    setSelectedFilter(getSection(filter_id));
  };

  return (
    <>
      {loading && <LoadingSpinner />}

      <div className="mx-6 mt-2 mb-8">
        <h1 className="text-2xl">Subadmin Management</h1>
      </div>
      <div className="mx-6 mt-5 border-solid border-2 border-black-100 p-4 relative">
        <div className="flex mt-6">
          <div className="flex w-2/4 items-center">
            <input
              placeholder="Search by activity"
              type="text"
              onChange={({ target }) => handleSearch(target.value)}
              className="shadow appearance-none bg-bodyColor border border-gray-400 rounded-lg w-full py-2 pl-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-searchIcon bg-no-repeat bg-left placeholder-gray-600 shadow-customShadow"
            />
          </div>
          <div className="w-2/4 text-right">
            <button
              className="rounded-lg bg-green-700 text-white hover:shadow-customShadow font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => navigate("/sd")}
            >
              Back
            </button>
          </div>
        </div>

        <div className="flex flex-row mt-6">
          <div className="flex items-center mb-6">
            <p>Filter By-</p>
          </div>

          <div className="flex w-1/4 items-center mb-6">
            <div className="w-1/3">
              <label className="block text-right mb-1 md:mb-0 pr-4">From</label>
            </div>
            <div className="w-2/3">
              <input
                className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline date_in"
                type="date"
                value={startDate}
                max={moment().format("YYYY-MM-DD")}
                onChange={({ target }) =>
                  handleDateChange(target.value, "start")
                }
              />
            </div>
          </div>

          <div className="flex w-1/4 items-center mb-6 mr-2 -ml-4">
            <div className="w-1/3">
              <label className="block text-right mb-1 md:mb-0 pr-4">To</label>
            </div>
            <div className="w-2/3">
              <input
                className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline date_in"
                type="date"
                value={endDate}
                max={moment().format("YYYY-MM-DD")}
                onChange={({ target }) => handleDateChange(target.value, "end")}
              />
            </div>
          </div>
          <div className="w-1/4 mr-2 ml-12">
            <select
              className="shadow border border-gray-400 rounded-lg w-9/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={selectedFilter}
              onChange={(e) => filterSections(e.target.value)}
            >
              <option value={0}>Section</option>;
              {permissionList.map((permission, index) => {
                return <option value={permission.id}>{permission.name}</option>;
              })}
            </select>
          </div>
        </div>

        <Table
          pageCount={pageCount}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalCount={totalCount}
          count={count}
          headerData={field}
          scopedSlots={
            subAdminList.length > 0 &&
            subAdminList.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="border-t-0 px-2 align-middle border-l-0 border-r-0  text-center">
                    {index + 1}
                  </td>
                  <td className="border-t-0 px-2 align-middle border-l-0 border-r-0  p-4 text-center">
                    {moment(item?.created_at).format("DD/MM/YYYY h:mm a")}
                  </td>
                  <td className="border-t-0 px-2 align-middle border-l-0 border-r-0  p-4 text-center">
                    {getSection(item?.section_id)}
                  </td>
                  <td className="border-t-0 px-2 align-middle border-l-0 border-r-0  text-center">
                    {item?.activity}
                  </td>
                </tr>
              );
            })
          }
        />
      </div>
    </>
  );
}
