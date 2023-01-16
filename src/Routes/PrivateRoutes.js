import ChangePassword from "../Views/ChangePassword/ChangePassword";
import UserManagement from "../Views/UserManagement/UserManagement";
import UserDetails from "../Views/UserManagement/UserDetails/UserDetails";
import AddUser from "../Views/UserManagement/AddUser/AddUser";
import AddFees from "../Views/UserManagement/AddFees/AddFees";
import FeesDetails from "../Views/UserManagement/FeesDetails/FeesDetails";
import EditUser from "../Views/UserManagement/EditUser/EditUserDetail";

//  import AddBulkUser from "../Views/UserManagement/AddBulkUser/AddBulkUser";
// import CategoryManagement from "../View/CategoryManagement/CategoryManagement";
// import AddNewCategory from "../View/CategoryManagement/AddNewCategory/AddNewCategory";
// import ContentManagement from "../View/ContentManagement/ContentManagement";
// import AddContent from "../View/ContentManagement/AddContent/AddContent";
// import EditContent from "../View/ContentManagement/EditContent/EditContent";
// import ViewContent from "../View/ContentManagement/ViewContent/ViewContent";
// import NotificationManagement from "../View/NotificationManagement/NotificationManagement";
// import AddNotification from "../View/NotificationManagement/AddNewNotification/AddNewNotification";
// import ViewNotification from "../View/NotificationManagement/ViewNotification/ViewNotification";
// import AdminNotification from "../View/NotificationManagement/AdminNotification/AdminNotification";
// import StaticContentManagement from "../View/StaticContentManagement/StaticContentManagement";
// import FAQlist from "../View/StaticContentManagement/ListFAQs/ListFAQs";
// import AddFAQ from "../View/StaticContentManagement/ListFAQs/AddFAQ/AddFAQ";
// import PrivacyPolicy from "../View/StaticContentManagement/PrivacyPolicy/PrivacyPolicy";
// import TermCondition from "../View/StaticContentManagement/TermCondition/TermCondition";
// import EditFAQ from "../View/StaticContentManagement/ListFAQs/EditFAQ/EditFAQ";
// import AdminProfile from "../View/AdminProfile/AdminProfile";
// import Dashboard from "../View/Dashboard/Dashboard";
// import SubAdminManagement from "../View/SubAdminManagement/SubAdminManagement";
// import EditUserDetails from "../View/UserManagement/EditUser/EditUserDetail";
// import AppIntroManagement from "../View/AppIntroManagement/AppIntroManagement";
// import HelpContentManagement from "../View/HelpContentManagement/HelpContentManagement";
// import ViewHelpContentManagement from "../View/HelpContentManagement/ViewHelpContentManagement";
// import ViewIntroScreen from "../View/AppIntroManagement/ViewIntroScreen";
// import AddSubadmin from "../View/SubAdminManagement/AddSubAdmin/AddSubAdmin";
// import EditSubadmin from "../View/SubAdminManagement/EditSubAdmin/EditSubAdmin";
// import ViewSubadmin from "../View/SubAdminManagement/ViewSubAdmin/ViewSubAdmin";
// import ActivityLogSubadmin from "../View/SubAdminManagement/ActivityLogSubadmin/ActivityLogSubadmin"

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
    element: <FeesDetails />,
    path: "/userManagement/feeDetails",
    headerTittle: "Fee Details",
  },
   {
    element: <EditUser />,
    path: "/userManagement/userDetails/EditUser",
    headerTittle: "Edit User Details",
  },
//   {
//     element: <CategoryManagement />,
//     path: "categoryManagement",
//     headerTittle: "Category Management",
//   },
//   {
//     element: <AddNewCategory />,
//     path: "addNewCategory",
//     headerTittle: "Add New",
//   },
//   {
//     element: <ContentManagement />,
//     path: "/contentManagement",
//     headerTittle: "Content Management",
//   },
//   {
//     element: <AddContent />,
//     path: "/contentManagement/addContent",
//     headerTittle: "Add Content",
//   },
//   {
//     element: <ViewContent />,
//     path: "/contentManagement/viewContent",
//     headerTittle: "View Content",
//   },
//   {
//     element: <EditContent />,
//     path: "/contentManagement/editContent",
//     headerTittle: "Edit Content",
//   },
//   {
//     element: <ChangePassword />,
//     path: "/changePass",
//     headerTittle: "Change Password",
//   },
//   {
//     element: <NotificationManagement />,
//     path: "/notificationManagement",
//     headerTittle: "Notification Management",
//   },
//   {
//     element: <AddNotification />,
//     path: "/notificationManagement/addNotification",
//     headerTittle: "Add Notification",
//   },
//   {
//     element: <ViewNotification />,
//     path: "/notificationManagement/viewNotification",
//     headerTittle: "Notification Management",
//   },
//   {
//     element: <AdminNotification />,
//     path: "/notificationManagement/adminNotification",
//     headerTittle: "Admin Notification",
//   },
//   {
//     element: <StaticContentManagement />,
//     path: "/staticContentManagement",
//     headerTittle: "Static Content Management",
//   },
//   {
//     element: <FAQlist />,
//     path: "/staticContentManagement/FAQs",
//     headerTittle: "FAQ Management",
//   },
//   {
//     element: <AddFAQ />,
//     path: "/staticContentManagement/addFAQ",
//     headerTittle: "Add-Edit Management",
//   },
//   {
//     element: <EditFAQ />,
//     path: "/staticContentManagement/editFAQ",
//     headerTittle: "Add-Edit Management",
//   },
//   {
//     element: <PrivacyPolicy />,
//     path: "/staticContentManagement/privacyPolicy",
//     headerTittle: "Privacy Policy",
//   },
//   {
//     element: <TermCondition />,
//     path: "/staticContentManagement/termCondition",
//     headerTittle: "Term And Condition",
//   },
//   {
//     element: <AdminProfile />,
//     path: "/profile",
//     headerTittle: "Profile",
//   },
//   {
//     element: <Dashboard />,
//     path: "dashboard",
//     headerTittle: "Dashboard",
//   },
//   {
//     element: <SubAdminManagement />,
//     path: "sd",
//     headerTittle: "Sub-Admin Management",
//   },
//   {
//     element: <AddSubadmin />,
//     path: "sd/addSubAdmin",
//     headerTittle: "Add Sub-Admin",
//   },
//   {
//     element: <AppIntroManagement />,
//     path: "/appIntroManagement",
//     headerTittle: "App Intro Management",
//   },
//   {
//     element: <HelpContentManagement />,
//     path: "/helpConentManagement",
//     headerTittle: "Help content Management",
//   },
//   {
//     element: <ViewHelpContentManagement />,
//     path: "/helpConentManagement/view",
//     headerTittle: "Help content Management",
//   },
//   {
//     element: <ViewIntroScreen />,
//     path: "/appIntroManagement/viewIntro",
//     headerTittle: "Add Sub-Admin",
//   },
//   {
//     element: <ViewSubadmin />,
//     path: "/sd/viewSubAdmin",
//     headerTittle: "View Sub-Admin",
//   },
//   {
//     element: <EditSubadmin />,
//     path: "/sd/editSubAdmin",
//     headerTittle: "Edit Sub-Admin",
//   },
//   {
//     element: <ActivityLogSubadmin />,
//     path: "/sd/activityLog",
//     headerTittle: "Edit Sub-Admin",
//   },
];
