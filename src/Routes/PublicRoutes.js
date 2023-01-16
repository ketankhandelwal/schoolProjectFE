import Login from '../Views/Onboarding/Login/Login';
import ForgotPassword from '../Views/Onboarding/Forgot-Password/Forgot-Password';
import VerifyOtp from '../Views/Onboarding/VerifyOtp/VerifyOtp';
import ResetPassword from '../Views/Onboarding/ResetPassword/ResetPassword'


export const PublicRoutes = [
  {
    'element': <Login />,
    'path': '/login'
  },
  {
    'element': <ForgotPassword />,
    'path': '/forgot-password'
  },
  {
    'element': <VerifyOtp />,
    'path': `/verifyOtp`  
  },
  {
    'element': <ResetPassword />,
    'path': '/resetPassword'
  },
]