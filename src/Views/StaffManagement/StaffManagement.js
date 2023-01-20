import React, { useState, useEffect } from "react";
import editIcon from "../../assets/Icons/editIcon.svg";
import blockIcon from "../../assets/Icons/block.svg";
import viewIcon from "../../assets/Icons/viewIcon.svg";
import moment from "moment";
import Table from "../../Components/Table/Table";
import StaffDetails from "./StaffDetails/StaffDetails";
import Modal from "../../Components/Modal/Modal";
import { useLocation, useNavigate } from "react-router";
import { Get, Post } from "../../Constants/apiMethods";
import iconAdd from "../../assets/Icons/add.svg";
import { Link } from "react-router-dom";

import {
  changeStatus,
  getStaffList,
  makeCorporateUser,
  sendEmailApi,
  addStaff,
  addLeaves,
  deleteStaff,
} from "../../Constants/apiRoutes";
import LoadingSpinner from "../../Components/Loader/index";
import Switch from "react-switch";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Editor } from "react-draft-wysiwyg";
import { useDispatch } from "react-redux";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function StaffManagement() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [staffList, setStaff] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState();
  const [totalCount, setTotalCount] = useState();
  const [count, setCount] = useState();
  const [type, setType] = useState("general");
  const [searchValue, setSearchValue] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [roleValue, setRoleValue] = useState(null);

  const [sendMail, setSendMail] = useState(false);
  const [staffDetail, setStaffDetail] = useState(false);
  const [changeCorporate, setChangeCorporate] = useState(false);
  const [clickCount, setclickCount] = useState(0);
  const [sortOrder, setSortOrder] = useState("");
  const token = localStorage.getItem("access_token");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [subject, setSubjectValue] = useState("");
  useEffect(() => {
    convertContentToHTML();
  }, [editorState]);

  const [convertedContent, setConvertedContent] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(state);
  };
  const convertContentToHTML = () => {
    let rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);
    setConvertedContent(markup);
  };
  useEffect(() => {
    const payload = `${location.state}`;
    if (payload == "general" && type == "general") {
      setType("general");
    } else if (payload == "corporate" && type == "corporate") {
      setType("corporate");
    } else if (payload == "corporatefromAdd") {
      setType("corporate");
      location.state = "corporate";
    }
    getStaff(type);
  }, [
    currentPage,
    type,
    roleValue,
    startDate,
    endDate,
    searchValue,
    changeCorporate,
    sortOrder,
  ]);
  const wrapperStyle = {
    // padding: '1rem',
    border: "1px solid",
    width: "579px",
    height: "395px",
    borderRadius: "0.5rem",
  };
  const editorStyle = {
    padding: "1rem",
    overflow: "auto",
    height: "300px",
    paddingTop: "0px",
  };
  const handleChecked = (e) => {
    let tempUser;
    const { name, checked } = e.target;
    if (name == "All") {
      tempUser = staffList.map((user) => {
        return {
          ...user,
          isChecked: checked,
        };
      });
    } else {
      tempUser = staffList.map((user) =>
        user.email == name ? { ...user, isChecked: checked } : user
      );
    }
    setStaff(tempUser);
  };

  const field = sendMail
    ? [
        "#",
        "Name",
        "Email",
        "Phone Number",
        "Role",
        "YOE",
        "Gender",
        "Status",
        "Joined On",
        "Action",
      ]
    : [
        "#",
        "Name",
        "Email",
        "Phone Number",
        "Role",
        "YOE",
        "Gender",
        "Status",
        "Joined On",
        "Action",
      ];
  const {
    formState: { errors },
  } = useForm();

  const onChangeFrom = (data) => {
    const start = data.target.value;
    setStartDate(start);
  };
  const onChangeTo = (data) => {
    const end = data.target.value;
    setEndDate(end);
  };

  const filterRole = (role) => {
    setRoleValue(role);
  };

  const getStaff = (type) => {
    setLoading(true);
    let payload = `?type=${type}&page=${currentPage}&count=${pageSize}`;
    if (roleValue && roleValue != 0) {
      console.log(roleValue);
      payload = payload + `&role=${roleValue}`;
      console.log(payload);
    }
    if (startDate) {
      payload = payload + `&start_date=${startDate}`;
    }
    if (endDate) {
      payload = payload + `&end_date=${endDate}`;
    }
    if (searchValue) {
      payload = payload + `&search=${searchValue}`;
    }

    if (sortOrder) payload += `&order_by=${sortOrder}`;

    Get(getStaffList, token, payload)
      .then((response) => response)
      .then((data) => {
        setLoading(false);
        const userData = data.data.data.map((el) => {
          return {
            ...el,
            toggle: false,
            isChecked: false,
          };
        });
        setStaff(userData);
        setPageCount(Math.ceil(data.data.count / pageSize));
        setTotalCount(Math.ceil(data.data.count));
        setCount(Math.ceil(data.data.data?.length));
      });
  };

  const handleSortOrder = () => {
    const sortDir = !sortOrder || sortOrder === "desc" ? "asc" : "desc";
    setSortOrder(sortDir);
  };

  const search = (data) => {
    setSearchValue(data);
  };

  const handleStatus = (id) => {
    const detail = staffList.filter((el) => el.id == id);
    setStaffDetail(detail[0]);
    setStatusModal(true);
  };

  const submitStatus = () => {
    let request = {
      id: staffDetail.id,
      status: 3,
    };
    Post(deleteStaff, token, request)
      .then((res) => {
        setLoading(false);

        navigate("/staffManagement");
        toast.success("Staff Deleted  successfully");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
    setStatusModal(false);
    setStaffDetail({});
    getStaff(type);
  };

  const getPageIndex = (index) => {
    return (currentPage - 1) * pageSize + index;
  };

  return (
    <>
      {loading && <LoadingSpinner />}

      <div className="mx-6 mt-2 mb-8">
        <h1 className="text-2xl">Staff Management</h1>
      </div>
      <div className="mx-6 mt-5 border-solid border-2 border-black-100 p-4 relative">
        <div className="flex mt-6">
          <div className="flex w-2/4 items-center">
            <input
              placeholder="Search by Staff Name"
              type="text"
              onChange={(event) => search(event.target.value)}
              value={searchValue}
              className="shadow appearance-none bg-bodyColor border border-gray-400 rounded-lg w-full py-2 pl-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-searchIcon bg-no-repeat bg-left placeholder-gray-600 shadow-customShadow"
            />
          </div>
          <div className="w-2/4 text-right">
            <button
              className="rounded-lg bg-green-700 text-white hover:shadow-customShadow font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => navigate("addStaff")}
            >
              Add Staff
            </button>
          </div>
        </div>

        <div className="flex">
          <div className="w-1/3 ml-4 side">
            <div className="text-left mt-4">
              <p>Filter By-</p>
            </div>
          </div>

          <div className="w-2/3"></div>
        </div>
        <div className="flex flex-row justify-between mt-6">
          <div className="flex w-1/4 items-center mb-6">
            <div className="w-1/3">
              <label className="block text-right mb-1 md:mb-0 pr-4">From</label>
            </div>
            <div className="w-2/3">
              <input
                className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline date_in"
                type="date"
                // defaultValue={moment().subtract(1, 'month').format("YYYY-MM-DD")}
                max={moment().format("YYYY-MM-DD")}
                onChange={onChangeFrom}
              />
            </div>
          </div>

          <div className="flex w-1/4 items-center mb-6 mr-2 -ml-4">
            <div className="w-1/3">
              <label className="block text-right mb-1 md:mb-0 pr-4">To</label>
            </div>
            <div className="w-2/3">
              <input
                className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline date_in"
                type="date"
                // defaultValue={moment().utc().format("YYYY-MM-DD")}
                max={moment().format("YYYY-MM-DD")}
                onChange={onChangeTo}
              />
            </div>
          </div>

          <div className="w-1/4 mr-2">
            <select
              className="shadow border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={roleValue}
              onChange={(e) => filterRole(e.target.value)}
             
            >
              <option value={0}>Role</option>
              <option value={1}>Admin</option>
              <option value={2}>Sub Admin</option>
              <option value={3}>Teacher</option>
              <option value={4}>Transport</option>
              <option value={5}>Gate Keeper</option>
              <option value={6}>Other</option>
            </select>
          </div>
        </div>
        <div className="flex">
          <div className="flex-auto">
            <Table
              pageCount={pageCount}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              totalCount={totalCount}
              count={count}
              headerData={field}
              sortBy="Name"
              handleSortOrder={handleSortOrder}
              scopedSlots={
                staffList &&
                staffList.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td className="border-t-0 px-2 align-middle border-l-0 border-r-0  p-4 text-center">
                        {getPageIndex(index + 1)}
                      </td>
                      <td className="border-t-0 px-2 align-middle border-l-0 border-r-0  p-4 text-center">
                        <Link
                          to={{
                            pathname: "staffDetails",
                            search: `id=${item.id}`,
                          }}
                          className="text-sky-500 underline"
                        >
                          {item.name}
                        </Link>
                      </td>

                    
                      <td className="border-t-0 px-2 align-middle border-l-0 border-r-0  p-4 text-center">
                        {/* {item.sec == 1 ? "A" : item.sec == 2 ? "B" : item.sec == 3 ? "C" : item.sec == 4 ? "D" : item.sec == 5 ? "E" : item.sec == 6 ? "F" : item.sec == 7 ? "G" : item.sec == 8 ?"H" : item.sec == 9 ? "I" : "" } */}
                        {item.email}
                      </td>
                      {/* <td className="border-t-0 px-2 align-middle border-l-0 border-r-0  p-4 text-center">
                        {item.date_of_birth != null
                          ? moment(item.date_of_birth).format("DD-MM-YYYY")
                          : "-"}
                      </td> */}
                      <td className="border-t-0 px-2 align-middle border-l-0 border-r-0  p-4 text-center">
                        {item.phone_number}
                      </td>
                   

                      <td className="border-t-0 px-2 align-middle border-l-0 border-r-0  p-4 text-center">
                        {item.role == 1
                          ? "Admin"
                          : item.role == 2
                          ? "Sub Admin"
                          : item.role == 3
                          ? "Teacher"
                          : item.role == 4
                          ? "Transport"
                          : item.role == 5
                          ? "Cleaner"
                          : item.role == 6
                          ? "Gate Keeper" : item.role == 7 ? "Other" : ""
                          }
                      </td>
                      <td className="border-t-0 px-2 align-middle border-l-0 border-r-0  p-4 text-center">
                        {/* {item.sec == 1 ? "A" : item.sec == 2 ? "B" : item.sec == 3 ? "C" : item.sec == 4 ? "D" : item.sec == 5 ? "E" : item.sec == 6 ? "F" : item.sec == 7 ? "G" : item.sec == 8 ?"H" : item.sec == 9 ? "I" : "" } */}
                        {item.YOE} Years
                      </td>

                      <td className="border-t-0 px-2 align-middle border-l-0 border-r-0  p-4 text-center">
                        {item.gender == 1
                          ? "Male"
                          : item.gender == 2
                          ? "Female"
                          : item.gender == 3
                          ? "Other"
                          : ""}
                      </td>

                      <td className="border-t-0 px-2 align-middle border-l-0 border-r-0  p-4 text-center">
                        {item.status === 1 ? "Active" : "Inactive"}
                      </td>
                      <td className="border-t-0 px-2 align-middle border-l-0 border-r-0  p-4 text-center">
                        {item.created_at != null
                          ? moment(item.created_at).format("DD-MM-YYYY")
                          : "-"}
                      </td>


                      <td className="flex flex-auto mt-3 ml-6">
                        <img
                          title="Delete Staff"
                          className="mr-2 w-1/6 w-7"
                          onClick={() => handleStatus(item.id)}
                          src={blockIcon}
                        />

                        <img
                          title="Add Fees"
                          className="mr-2 w-1/6 w-7"
                          onClick={() => {
                            console.log(item);
                            navigate("addLeaves", {
                              state: item.id,
                            });
                          }}
                          src={iconAdd}
                        />
                      </td>
                    </tr>
                  );
                })
              }
            />
          </div>
        </div>
        {/* <Pagination /> */}
      </div>
      {showModal && (
        <Modal show={showModal} hide={() => setShowModal(false)}>
          <StaffDetails />
        </Modal>
      )}

      {statusModal && (
        <Modal tittle="Are you  sure ?" hide={() => setStatusModal(false)}>
          <div className="flex items-center justify-between">
            <p>
              You want to delete this staff
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
      {/* 
      {typeModal && (
        <Modal tittle="Are you  sure ?" hide={() => setTypeModal(false)}>
          <div className="flex items-center justify-between">
            <p>You want to upgrade this user as corporate user ?</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center py-3">
              <div className="w-2/4">
                <label className="block text-xl text-left mb-2 md:mb-0 pr-4">
                  Company -
                </label>
              </div>
              <div className="w-2/3">
                <select
                  {...register("company_id", { required: true })}
                  defaultValue={userList[indexValue].company_id}
                  onChange={handleCompanyChange}
                  className="shadow border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value={0}>Select company</option>
                  {companyList &&
                    companyList?.map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                </select>
                {errors.company_id && (
                  <p className="text-red-500 text-xs italic">
                    Company is required
                  </p>
                )}
              </div>
            </div>
            <div className="flex">
              <div className="w-2/4"></div>
              <div className="w-2/3">
                <p
                  onClick={() =>
                    setAddNewCompany(!addNewCompany)
                  }
                  className="text-left text-blue-700 mt-1 cursor-pointer"
                >
                  Add new company name
                </p>
                {addNewCompany && selectedCompany !=0 &&
                <p className="text-orange-400 text-sm text-left mb-2">Please deselect the company dropdown for adding new company</p>
                }
              </div>
            </div>
            {addNewCompany && selectedCompany == 0? (
              <div className="flex items-center  py-3">
                <div className="w-2/4"></div>
                <div className="w-2/3">
                  <input
                    {...register("company_name", { required: true })}
                    placeholder="Company Name"
                    className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                  />
                  {errors.company_name && (
                    <p className="text-red-500 text-xs italic">
                      Company Name is required
                    </p>
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  handleToggle(indexValue);
                }}
                className="bg-bodyColor hover:shadow-customShadow text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Cancel
              </button>
              <button
                className="bg-emerald-600 hover:shadow-customShadow text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Yes
              </button>
            </div>
          </form>
        </Modal>
      )} */}
      {/* {emailModal && (
        <div className="flex overflow-x-hidden overflow-y-auto fixed h-modal top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center bg-modalbackColor">
          <div className="relative w-9/12">
            <div className="w-11/12 bg-white rounded-lg shadow relative dark:bg-gray-700">
              <div className="items-start justify-between p-3 border-b rounded-t dark:border-gray-600">
                <div className="flex items-center px-10 pt-10 ">
                  <div className="w-1/4">
                    <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                      Subject -
                    </label>
                  </div>
                  <div className="w-9/12">
                    <input
                      id={1}
                      className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      onChange={handleSubject}
                    />
                  </div>
                </div>
                <div className="flex p-10 mb-0">
                  <div className="w-1/4">
                    <label className="block text-xl text-left mb-1 md:mb-0 pr-4">
                      Email Body -
                    </label>
                  </div>
                  <div className="w-1/12">
                    <Editor
                      wrapperStyle={wrapperStyle}
                      editorStyle={editorStyle}
                      editorState={editorState}
                      onEditorStateChange={handleEditorChange}
                      toolbar={{
                        options: [
                          "inline",
                          "blockType",
                          "fontSize",
                          "textAlign",
                          "history",
                          "colorPicker",
                        ],
                        inline: {
                         options: ['italic', 'bold'],
                          bold: { className: 'demo-option-custom' },
                        italic: { className: 'demo-option-custom' },
                          underline: { className: 'demo-option-custom' },
                          strikethrough: { className: 'demo-option-custom' },
                          monospace: { className: 'demo-option-custom' },
                          superscript: { className: 'demo-option-custom' },
                           subscript: { className: 'demo-option-custom' }
                         },
                        blockType: {
                          className: 'demo-option-custom-wide',
                          dropdownClassName: 'demo-dropdown-custom'
                       },
                       fontSize: { className: 'demo-option-custom-medium' }
                      }}
                    />
                    <div className="flex items-center justify-between">
                    </div> 
                  </div>
                </div>
                <div className="flex justify-end mr-11">
                  <button
                    onClick={() => cancelMail()}
                    className=" w-52 bg-emerald-600 hover:shadow-customShadow text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="w-52 bg-emerald-600 hover:shadow-customShadow text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    onClick={() => {
                      handleSendEmail();
                    }}
                  >
                    Send Mail
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}
