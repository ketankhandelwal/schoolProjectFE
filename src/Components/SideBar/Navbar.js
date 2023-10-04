import React from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import iconDash from "../../assets/Icons/dashboard.svg";
import iconUserManage from "../../assets/Icons/userManagement.svg";
import iconContentManage from "../../assets/Icons/contentManagement.svg";
import iconCategoryManage from "../../assets/Icons/catergoryManagement.svg";
import iconNotificationManage from "../../assets/Icons/notification.svg";
import iconStaticContentManage from "../../assets/Icons/staticContentManagement.svg";
import iconSubAdminManage from "../../assets/Icons/sub-adminManagement.svg";
import indianCurrency from "../../assets/Icons/currency.png"
import helpIcon from "../../assets/Icons/help.svg";
import appIntroIcon from "../../assets/Icons/appIntro.svg"
import { NavLink } from "react-router-dom";
import staffCompressed from '../../assets/Icons/staffCompressed.svg'
import {GiThreeFriends} from 'react-icons/gi'
export default function Navbar(props) {
  const adminData = useSelector((state) => state.auth.adminData);
  const { pathname } = useLocation();

  const sideBarData = [
  
    {
      id: 1,
      tittle: "Student Management",
      icon: iconUserManage,
      url: "/userManagement",
      status: 1,
    },
    {
      id: 2,
      tittle: "Staff Management",
      icon: staffCompressed,
      url: "/staffManagement",
      status: 1,
    },
    {
      id: 3,
      tittle: "Sub Admin Management",
      icon: iconSubAdminManage,
      url: "/sd",
      status: 1,
    },
    {
      id:4,
      title: "Account Management",
      icon:indianCurrency,
      url:"/accountManagement",
      status:1
    }
  ];
  const getStatusPermissionData = (permissionList, permissionStatus) => {

    const finalPermissionArray = [];
    permissionList?.map((item) => {
      const permission = permissionStatus?.filter(
        (x) => x.permission_id === item.id
      )[0];
      finalPermissionArray.push({
        ...item,
        status: permission?.status,
      });
    });
    return finalPermissionArray;
  };

  const permissionArray = adminData.permission
    ? getStatusPermissionData(sideBarData, adminData.permission)
    : sideBarData;

  return (
    <>
      <div
        className={
          !props.toggleSideBar
            ? "w-1/4 bg-emerald-300"
            : "mr-2 pl-4 bg-emerald-300"
        }
      >
        <ul className="text-gray-700">
          {permissionArray.map((item) => {
            return (
              item.status === 1 && (
                <NavLink key={item.tittle} to={item.url}>
                  <li
                    className={`flex flex-row justify-start py-4 rounded-md cursor-pointer hover:shadow-customShadow ${
                      pathname.search(item.url) !== -1 && "bg-navActiveColoe"
                    }`}
                  >
                    <img className="mr-4 pl-5 w-14" src={item.icon} />
                    {!props.toggleSideBar ? (
                      <span className="my-2">{item.tittle}</span>
                    ) : (
                      ""
                    )}
                  </li>
                </NavLink>
              )
            );
          })}
        </ul>
      </div>
    </>
  );
}
