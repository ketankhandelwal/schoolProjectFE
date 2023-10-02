import ChangePassword from "../Views/ChangePassword/ChangePassword";
import UserManagement from "../Views/UserManagement/UserManagement";
import UserDetails from "../Views/UserManagement/UserDetails/UserDetails";
import AddUser from "../Views/UserManagement/AddUser/AddUser";
import AddFees from "../Views/UserManagement/AddFees/AddFees";
import FeesDetails from "../Views/UserManagement/FeesDetails/FeesDetails";
import EditUser from "../Views/UserManagement/EditUser/EditUserDetail";
import AddLeaves from "../Views/StaffManagement/AddLeaves/AddLeaves";
import AddStaff from "../Views/StaffManagement/AddStaff/AddStaff";
import EditStaff from "../Views/StaffManagement/EditStaff/EditStaff";
import StaffDetails from "../Views/StaffManagement/StaffDetails/StaffDetails";
import StaffManagement from "../Views/StaffManagement/StaffManagement";
import LeavesDetails from "../Views/StaffManagement/LeaveDetails/LeaveDetails";
import AdminProfile from "../Views/AdminProfile/AdminProfile";
import SubAdminManagement from "../Views/SubAdminManagement/SubAdminManagement";
import AddSubadmin from "../Views/SubAdminManagement/AddSubAdmin/AddSubAdmin";
import ViewSubadmin from "../Views/SubAdminManagement/ViewSubAdmin/ViewSubAdmin";
import EditSubadmin from "../Views/SubAdminManagement/EditSubAdmin/EditSubAdmin";
import SetFees from '../Views/AccountProfile/SetFees';
import MyPDFViewer from "../Views/TransferCertifcate/TransferCertificate";






export const PrivateRoutes = [
  {
    element: <UserManagement />,
    path: "/userManagement",
    headerTittle: "User Management",
  },
  {
    element: <UserDetails />,
    path: "userManagement/userDetails",
    headerTittle: "User Details",
  },
  {
    element: <AddUser />,
    path: "userManagement/addUser",
    headerTittle: "Add User",
  },


  {
    element: <AddFees/>,
    path: "userManagement/addFees",
    headerTittle: "Add Fees",
  },
  {
    element: <MyPDFViewer />,
    path: "/userManagement/transferCertificate",
    headerTittle: "Transfer Certificate",
  },
   {
    element: <EditUser />,
    path: "/userManagement/userDetails/EditUser",
    headerTittle: "Edit User Details",
  },

  {
    element:<EditStaff/>,
    path:"/staffManagement/staffDetails/EditStaff",
    headerTittle:"Edit Staff Details",
  },
  {
    element: <LeavesDetails/>,
    path:"/staffManagement/LeaveDetails",
    headerTittle: "Leave Details"
  }, 
  {
    element: <AddLeaves/>,
    path:"/staffManagement/addLeaves",
    headerTittle:"Add Leaves"
  },
  {
    element: <StaffManagement />,
    path: "/staffManagement",
    headerTittle: "Staff Management",
  },
  {
    element: <StaffDetails />,
    path: "staffManagement/staffDetails",
    headerTittle: "Staff Details",
  },
  {
    element: <AddStaff />,
    path: "staffManagement/addstaff",
    headerTittle: "Add Staff",
  },

  {
    element: <ChangePassword/>,
    path:"changePass",
    headerTittle: "Change Password"

  }
  ,
  {
    element: <AdminProfile/>,
    path:"profile",
    headerTittle:"Admin Profile"
  },

  {
    element: <SubAdminManagement />,
    path: "sd",
    headerTittle: "Sub-Admin Management",
  },
  {
    element: <AddSubadmin />,
    path: "sd/addSubAdmin",
    headerTittle: "Add Sub-Admin",
  },

  {
    element: <ViewSubadmin />,
    path: "/sd/viewSubAdmin",
    headerTittle: "View Sub-Admin",
  },
  {
    element: <EditSubadmin />,
    path: "/sd/viewSubAdmin/editSubAdmin",
    headerTittle: "Edit Sub-Admin",
  },
  {
    element: <SetFees />,
    path: "/accountManagement",
    headerTittle: "Account Management",
  },
  {
    element: <MyPDFViewer/>,
    path:"transferCertificate",
    headerTittle:"Transfer Certificate"
  },














];
