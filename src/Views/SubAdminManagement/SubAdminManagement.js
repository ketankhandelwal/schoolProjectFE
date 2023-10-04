import React, { useState, useEffect } from "react";
import viewIcon from "../../assets/Icons/viewIcon.svg";
import editIcon from "../../assets/Icons/editIcon.svg";
import blockIcon from "../../assets/Icons/block.svg";
import moment from "moment";
import Table from "../../Components/Table/Table";
import { useNavigate } from "react-router";
import Modal from "../../Components/Modal/Modal";
import { Get, Post } from "../../Constants/apiMethods";
import {
  subAdminListing,
  deleteSubAdmin,
} from "../../Constants/apiRoutes";
import LoadingSpinner from "../../Components/Loader/index";
import { Link } from "react-router-dom";

export default function   () {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize =10;
  const [pageCount, setPageCount] = useState();
  const [totalCount, setTotalCount] = useState();
  const [statusModal, setStatusModal] = useState(false);
  const [userDetail, setUserDetails] = useState({});
  const [count, setCount] = useState();
  const [subAdminList, setSubAdminList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");
  const [searchTextTimeout, setSearchTextTimeout] = useState(null);

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    getSubAdminList();
  }, [currentPage]);

  const field = [
    "#",
    "Name",
    "Email address",
    "Phone Number",
    "Designation",
    "Status",
    "Joined On",
    "Action",
  ];

  useEffect(() => {
    if (startDate && endDate) getSubAdminList(search, startDate, endDate);
  }, [startDate, endDate]);

  useEffect(() => {
    return () => clearTimeout(searchTextTimeout);
  }, [searchTextTimeout]);

  const getSubAdminList = (search = "", startDate = "", endDate = "") => {
    setLoading(true);

    const payload = `?page=${currentPage}&count=${pageSize}&search=${search}&start_date=${startDate}&end_date=${endDate}`;
    Get(subAdminListing, token, payload)
      .then((response) => response)
      .then((data) => {
        setLoading(false);
        setSubAdminList(data?.data?.finalData);
        setPageCount(Math.ceil(data.data.count / pageSize));
        setTotalCount(data.data.count);
        setCount(Math.ceil(data.data.finalData?.length));
      });
  };

  const submitStatus = () => {
    setLoading(true);
    Post(`${deleteSubAdmin}?id=${userDetail.id}`, token)
      .then((response) => response)
      .then((data) => {
        setLoading(false);
        setStatusModal(false);
        getSubAdminList();
      });
  };

  const handleDateChange = (date, type) => {
    if (type === "start") setStartDate(date);
    else setEndDate(date);
  };

  const handleSearch = (search) => {
    if (searchTextTimeout) {
      clearTimeout(searchTextTimeout);
    }
    setSearch(search);
    setSearchTextTimeout(
      setTimeout(() => {
        getSubAdminList(search, startDate, endDate);
      }, 500)
    );
  };

  const handleDeactivateUser = (user) => {

    setStatusModal(true);
    setUserDetails(user);
  };







  const getPageIndex = (index) => {
    return  (currentPage - 1) * pageSize + index;
   };

  return (
    <>
      {loading && <LoadingSpinner />}

      <div className="mx-6 mt-2 mb-8">
        <h1 className="text-2xl">Sub-Admin Management</h1>
      </div>
      <div className="mx-6 mt-5 border-solid border-2 border-black-100 p-4 relative">
        <div className="flex mt-6">
          <div className="flex w-2/4 items-center">
            <input
              placeholder="Search Sub-Admin by name, email address"
              type="text"
              onChange={({ target }) => handleSearch(target.value)}
              className="shadow appearance-none bg-bodyColor border border-gray-400 rounded-lg w-full py-2 pl-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-searchIcon bg-no-repeat bg-left placeholder-gray-600 shadow-customShadow"
            />
          </div>
          <div className="w-2/4 text-right">
            <button
              className="rounded-lg bg-green-700 text-white hover:shadow-customShadow font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => navigate("/sd/addSubAdmin")}
            >
              Add New
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
                    {getPageIndex(index + 1)}
                  </td>
                  <td className="border-t-0 px-2 align-middle border-l-0 border-r-0  p-4 text-center">
                  <Link
                      to={{
                        
                        pathname: "viewSubAdmin",
                        search: `id=${item.id}`,
                      }}
                      className="text-sky-500 underline"
                    >
                      {item.name}
                    </Link>
                  </td>
                  <td className="border-t-0 px-2 align-middle border-l-0 border-r-0  p-4 text-center">
                    {item?.email}
                  </td>
                  <td className="border-t-0 px-2 align-middle border-l-0 border-r-0  text-center">
                    {item?.phone_number}
                  </td>
                  <td className="border-t-0 px-2 align-middle border-l-0 border-r-0  text-center">
                   {item.designation}
                  </td>
                  <td className="border-t-0 px-2 align-middle border-l-0 border-r-0  text-center">
                    {item?.status === 1 ? "Active" : "Not Active"}
                  </td>
                  <td className="border-t-0 px-2 align-middle border-l-0 border-r-0  text-center">
                    {moment(item?.created_at).format("DD-MM-YYYY")}
                  </td>
                  <td className="flex flex-auto mt-4 ml-6 cursor-pointer">
                    <img
                      className="mr-2 w-1/6 w-6"
                      onClick={() => handleDeactivateUser(item)}
                      src={blockIcon}
                    />
                  </td>
                </tr>
              );
            })
          }
        />
      </div>
      {statusModal && (
        <Modal tittle="Are you  sure ?" hide={() => setStatusModal(false)}>
          <div className="flex items-center justify-between">
            <p>
              You want to delete
              this Sub-Admin account ?{" "}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setStatusModal(false);
              }}
              className="bg-bodyColor hover:shadow-customShadow text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Cancel
            </button>
            <button
              onClick={submitStatus}
              className="rounded-lg bg-green-700 text-white hover:shadow-customShadow font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Yes
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
