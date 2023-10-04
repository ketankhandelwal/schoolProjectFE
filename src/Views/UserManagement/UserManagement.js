import React, { useState, useEffect } from "react";
import editIcon from "../../assets/Icons/editIcon.svg";
import blockIcon from "../../assets/Icons/block.svg";
import viewIcon from "../../assets/Icons/viewIcon.svg";
import moment from "moment";
import Table from "../../Components/Table/Table";
import UserDetails from "./UserDetails/UserDetails";
import Modal from "../../Components/Modal/Modal";
import { useLocation, useNavigate } from "react-router";
import { Get, Post } from "../../Constants/apiMethods";
import iconAdd from "../../assets/Icons/add.svg";
import { Link } from "react-router-dom";
import idCard from "../../assets/Icons/idCard.svg";
import {
  changeStatus,
  getUserList,
  makeCorporateUser,
  sendEmailApi,
  addUser,
  addFees,
  deleteStudent,
  subAdminPermissionList,
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

export default function UserManagement() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [feesModal, setFeesModal] = useState(false);
  const [uts, updateTopicStress] = useState({
    categoryName: "",
    subCategoryName: "",
    editStressTopic: false,
    topicTitle: "",
    topicDetail: "",
    categoryId: 0,
    topicId: 0,
    topic_type: false,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [userList, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState();
  const [totalCount, setTotalCount] = useState();
  const [count, setCount] = useState();
  const [type, setType] = useState("general");
  const [searchValue, setSearchValue] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [classValue, setClassValue] = useState(null);
  const [indexValue, setIndex] = useState();
  const [typeModal, setTypeModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [sendMail, setSendMail] = useState(false);
  const [userDetail, setUserDetail] = useState(false);
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
    getUsers(type);
    fetchPermissionList();
  }, [
    currentPage,
    type,
    classValue,
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
      tempUser = userList.map((user) => {
        return {
          ...user,
          isChecked: checked,
        };
      });
    } else {
      tempUser = userList.map((user) =>
        user.email == name ? { ...user, isChecked: checked } : user
      );
    }
    setUsers(tempUser);
  };

  const field = sendMail
    ? [
        "#",
        "Name",
        "Class",
        "Section",
        "D.O.B.",
        "Phone Number",
        "Gender",
        "Status",
        "Joined On",
        "Action",
      ]
    : [
        "#",
        "Name",
        "Class",
        "Section",
        "D.O.B.",
        "Phone Number",
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

  const filterClass = (classes) => {
    setClassValue(classes);
  };

  const fetchPermissionList = () => {
    Get(subAdminPermissionList, token)
      .then((response) => response)
      .then((data) => {
        dispatch({
          type: "PERMISSION_DATA",
          payload: data.data,
        });
      });
  };

  const getUsers = (type) => {
    setLoading(true);
    let payload = `?type=${type}&page=${currentPage}&count=${pageSize}`;
    if (classValue && classValue != 0) {
      payload = payload + `&classes=${classValue}`;
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

    Get(getUserList, token, payload)
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
        setUsers(userData);
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

  const sendEmail = () => {
    let count = clickCount;
    setclickCount(++count);
    setSendMail(true);
    if (clickCount > 0 && sendMail) {
      setEmailModal(true);
    }
  };

  const cancelMail = () => {
    let tempUser = userList.map((user) => {
      return {
        ...user,
        isChecked: false,
      };
    });
    setUsers(tempUser);
    setclickCount(0);
    setSendMail(false);
    setEmailModal(false);
    setEditorState(() => EditorState.createEmpty());
    setSubjectValue("");
    setConvertedContent("");
  };

  const handleStatus = (id) => {
    const detail = userList.filter((el) => el.id == id);
    setUserDetail(detail[0]);
    setStatusModal(true);
  };

  const submitStatus = () => {
    let request = {
      id: userDetail.id,
      status: 3,
    };

    Post(deleteStudent, token, request)
      .then((res) => {
        setLoading(false);

        navigate("/userManagement");
        toast.success("Student has been deleted successfully");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
    setStatusModal(false);
    setUserDetail({});
    getUsers(type);
  };

  const getPageIndex = (index) => {
    return (currentPage - 1) * pageSize + index;
  };

  return (
    <>
      {loading && <LoadingSpinner />}

      <div className="mx-6 mt-2 mb-8">
        <h1 className="text-2xl">Student Management</h1>
      </div>
      <div className="mx-6 mt-5 border-solid border-2 border-black-100 p-4 relative">
        <div className="flex mt-6">
          <div className="flex w-2/4 items-center">
            <input
              placeholder="Search by Student Name"
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
              onClick={() => navigate("addUser")}
            >
              Add Student
            </button>
          </div>
        </div>

        <div className="flex">
          <div className="w-1/3 ml-4 side">
            <div className="text-left mt-4">
              <p>Filter By-</p>
            </div>
          </div>

          <div className="w-2/3">
            {/* <div className="text-right mt-4">
              {" "}
              {type == "corporate" ? (
                <div className="">
                  <button
                    className="mr-2 rounded-lg bg-green-700 text-white hover:shadow-customShadow font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => navigate("addUser")}
                  >
                    Add User
                  </button>
                  <button
                    onClick={() => navigate("/userManagement/addBulkUser")}
                    className="rounded-lg bg-green-700 text-white hover:shadow-customShadow font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Bulk Import
                  </button>
                </div>
              ) : (
                ""
              )}
            </div> */}
          </div>
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
              value={classValue}
              onChange={(e) => filterClass(e.target.value)}
            >
              <option value={0}>Class</option>
              <option value={1}>Kinder Garden</option>
              <option value={2}>L.K.G</option>
              <option value={3}>U.K.G</option>
              <option value={4}>I</option>
              <option value={5}>II</option>
              <option value={6}>III</option>
              <option value={7}>IV</option>
              <option value={8}>V</option>
              <option value={9}>VI</option>
              <option value={10}>VII</option>
              <option value={11}>VIII</option>
              <option value={12}>IX</option>
              <option value={13}>X</option>
              <option value={14}>XI</option>
              <option value={15}>XII</option>
            </select>
          </div>

          {/* {type == "corporate" ? (
            <div className="w-1/4 mr-2">
              <select
                className="shadow border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => filterCompany(e.target.value)}
              >
                <option value={0} selected>
                  Select Company
                </option>
                {companyList &&
                  companyList?.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
              </select>
            </div>
          ) : (
            <div className="w-1/3"></div>
          )} */}
        </div>
        <div className="flex">
          {/* <div className="flex">
            <ul>
              <li className="px-2 bg-blueGray-50 text-blueGray-500 align-middle  py-3 border-l-0 border-r-0 whitespace-nowrap font-semibold text-center rounded-l-xl rounded-r-xl">
                <input
                  className="mr-2"
                  type="checkbox"
                />
                <span>All</span>
              </li>
              {userList && userList.map(item => {
                return (
                  <li className=" fixedHeight border-t-0 px-2 align-middle border-l-0 border-r-0  py-4 text-center">
                    <input
                      className="h-1/1"
                      type="checkbox"
                    />
                  </li>
                )

              })
              }
            </ul>
          </div> */}
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
                userList &&
                userList.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      {/* {sendMail ? (
                        <td className=" fixedHeight border-t-0 px-2 align-middle border-l-0 border-r-0  py-4 text-center">
                          <input
                            checked={item.isChecked}
                            className="h-1/1"
                            type="checkbox"
                            name={item.email}
                            onChange={handleChecked}
                          />
                        </td>
                      ) : (
                        ""
                      )} */}
                      <td className="border-t-0 px-2 align-middle border-l-0 border-r-0  p-4 text-center">
                        {getPageIndex(index + 1)}
                      </td>
                      <td className="border-t-0 px-2 align-middle border-l-0 border-r-0  p-4 text-center">
                        <Link
                          to={{
                            pathname: "userDetails",
                            search: `id=${item.id}`,
                          }}
                          className="text-sky-500 underline"
                        >
                          {item.name}
                        </Link>
                      </td>

                      <td className="border-t-0 px-2 align-middle border-l-0 border-r-0  p-4 text-center">
                        {item.class_id == 1
                          ? "Kinder Garden"
                          : item.class_id == 2
                          ? "L.K.G"
                          : item.class_id == 3
                          ? "U.K.G"
                          : item.class_id == 4
                          ? "I"
                          : item.class_id == 5
                          ? "II"
                          : item.class_id == 6
                          ? "III"
                          : item.class_id == 7
                          ? "IV"
                          : item.class_id == 8
                          ? "V"
                          : item.class_id == 9
                          ? "VI"
                          : item.class_id == 10
                          ? "VII"
                          : item.class_id == 11
                          ? "VIII"
                          : item.class_id == 12
                          ? "IX"
                          : item.class_id == 13
                          ? "X"
                          : item.class_id == 14
                          ? "XI"
                          : item.class_id == 15
                          ? "XII"
                          : ""}
                      </td>
                      <td className="border-t-0 px-2 align-middle border-l-0 border-r-0  p-4 text-center">
                        {/* {item.sec == 1 ? "A" : item.sec == 2 ? "B" : item.sec == 3 ? "C" : item.sec == 4 ? "D" : item.sec == 5 ? "E" : item.sec == 6 ? "F" : item.sec == 7 ? "G" : item.sec == 8 ?"H" : item.sec == 9 ? "I" : "" } */}
                        {item.sec}
                      </td>
                      <td className="border-t-0 px-2 align-middle border-l-0 border-r-0  p-4 text-center">
                        {item.date_of_birth != null
                          ? moment(item.date_of_birth).format("DD-MM-YYYY")
                          : "-"}
                      </td>
                      <td className="border-t-0 px-2 align-middle border-l-0 border-r-0  p-4 text-center">
                        {item.phone_number}
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
                        <Link
                          to={`/transferCertificate/${item.id}`}
                          title="Generate Transfer Certificate"
                        >
                          <img
                            className="mr-2 w-1/6 w-8"
                            src={idCard}
                            alt="Generate Transfer Certificate"
                          />
                        </Link>
                        <img
                          title="Delete Student"
                          className="mr-2 w-1/6 w-7"
                          onClick={() => handleStatus(item.id)}
                          src={blockIcon}
                        />

                        <img
                          title="Add Fees"
                          className="mr-2 w-1/6 w-7"
                          onClick={() => {
                            navigate("addFees", {
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
          <UserDetails />
        </Modal>
      )}

      {statusModal && (
        <Modal tittle="Are you  sure ?" hide={() => setStatusModal(false)}>
          <div className="flex items-center justify-between">
            <p>You want delete this student?</p>
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
