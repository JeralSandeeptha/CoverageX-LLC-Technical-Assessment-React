import './LoginPage.scss';
import { getCurrentYear } from '../../utils/getCurrentYear';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Avatar, AvatarGroup, Backdrop, Button, CircularProgress, TextField } from '@mui/material';
import cartLogo from '../../assets/svgs/approved.png';
import curlyarrow from '../../assets/svgs/curl-arrow.png';
import logo from '../../assets/icons/pfizer.png';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import CheckIcon from '@mui/icons-material/Check';
import loginUser from '../../services/user-service/loginUser/loginUser';
import { HandleLoginFunctionProps } from '../../types/functions.types';
import useLocalStorage from '../../hooks/useLocalStorage';
import useAuthContext from '../../hooks/useAuthContext';
import googleIcon from '../../assets/icons/google.png';
import { useGoogleLogin } from '@react-oauth/google';
import googleLogin from '../../services/user-service/googleLogin/googleLogin';
import getUserInfoFromGoogle from '../../services/user-service/getUserInfoFromGoogle/getUserInfoFromGoogle';

const LoginPage = () => {

  const navigate = useNavigate();
  const { setLocalStorageItem } = useLocalStorage();
  const { setToken } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const loginGoogleAuth = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
        console.log(tokenResponse);
        if(tokenResponse) {
          const email = await getUserInfoFromGoogle({
            access_token: tokenResponse.access_token
          });
          console.log(email);
          googleLogin({
            navigate: navigate,
            setIsError: setIsError,
            setIsLoading: setIsLoading,
            setIsSuccess: setIsSuccess,
            setLocalStorageItem: setLocalStorageItem,
            setToken: setToken,
            email: email
          });
        }
      },
      onError(errorResponse) {
        setIsError(true);
        console.log(errorResponse);
        setTimeout(() => {
          setIsError(false);
        }, 5000);
      },
  });
  
  const yupValidationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
      .min(3, 'Password must be at least 3 characters')
      .required('Password is required'),
  });

  const handleLogin = (values: HandleLoginFunctionProps) => {
    loginUser({
      navigate: navigate,
      setIsError: setIsError,
      setIsLoading: setIsLoading,
      setIsSuccess: setIsSuccess,
      user: values,
      setLocalStorageItem: setLocalStorageItem,
      setToken: setToken
    });
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yupValidationSchema,
    onSubmit: async (values) => {
      console.log(values);
      handleLogin(values);
      formik.resetForm();
    },
  });

  const handleGoogleAuth = () => {
    console.log('Google Authentication');
    loginGoogleAuth();
  }

  return (

    <div className='login' data-testid="login">
      
      <div className="login-left">

        <div className="login-content">

          <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>

          {
            isError && (
              <Alert className='alert-message' icon={<CheckIcon fontSize="inherit" />} severity="error">
                Please try again later
              </Alert>
            )
          }
          
          {
            isSuccess && (
              <Alert className='alert-message' icon={<CheckIcon fontSize="inherit" />} severity="success">
                Login Successful
              </Alert>
            )
          }
          
          <div className="logo-content">
            <img src={logo} alt="logo" className="logo" data-testid="logo"/>
          </div>

          <div className="header-section">
            <h1 className="header" data-testid="header">Welcome Back</h1>
            <h1 className="subheader" data-testid="subheader">Login to your account</h1>
          </div>

          <form onClick={formik.handleSubmit} className="form">
            <div className="text-input-container">
              <div className="error">
                <h6 className="error-texts" data-testid="email-validation">
                  {formik.touched.email && formik.errors.email}
                </h6>
              </div>
              <TextField
                label="Email Address"
                id="outlined-size-small"
                size="small"
                className="text-field"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                data-testid='email'
              />
            </div>
            <div className="text-input-container">
              <div className="error">
                <h6 className="error-texts" data-testid="passsword-validation">
                  {formik.touched.password && formik.errors.password}
                </h6>
              </div>
              <TextField
                label="Password"
                id="outlined-size-small"
                size="small"
                className="text-field"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                data-testid='password'
              />
            </div>
            <Button data-testid='loginBtn' type="submit" variant="contained" size="small" className='control-button'>Login</Button>
            <h6 className="questionText" data-testid='screensplit'>Didn't here before? <span><Link to='/register' data-testid='registernavlink'>Register</Link></span></h6>
          
            <hr className='separete-line'/>

            <div className="google-btn" onClick={handleGoogleAuth}>
              <img src={googleIcon} alt="google-auth-btn" className='google-icon'/>
              <h5>Sign in with Google</h5>
            </div>
            
          </form>

        </div>

        <div className="left-footer">
          <div className="left">
            <h5 className="link" data-testid="date">© { getCurrentYear() } Company</h5>
          </div>
          <div className="right" data-testid="terms">
            <h5 className="link">Term</h5>
            <h5 className="link">Privacy</h5>
          </div>
        </div>
        
      </div>
      
      <div className="login-right">

        <img data-testid="curlyarrow" src={curlyarrow} alt="curlyarrow" className="curlyarrow" />

        <div className="logo-container">
          <img src={cartLogo} alt="logo-img" className="logo-img" data-testid="logoimg"/>
        </div>
        <h2 className="right-header" data-testid="mainHeader">Manage thousands of your tasks</h2>
        <h5 className="right-para" data-testid="mainHeader">Join our platform to manage thousands of your tasks valuable for every minute.</h5>
        <div className="right-users">
          <AvatarGroup max={4} data-testid="avatarGroup">
            <Avatar alt="Remy Sharp" src="https://plus.unsplash.com/premium_photo-1689606093808-3cb4393248d2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <Avatar alt="Travis Howard" src="https://images.unsplash.com/photo-1685903772095-f07172808761?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <Avatar alt="Cindy Baker" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <Avatar alt="Trevor Henderson" src="https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <Avatar alt="Agnes Walker" src="https://images.unsplash.com/photo-1599110364868-364162848518?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          </AvatarGroup>
          <h5 className="users-text" data-testid="usersText">
            Join 60,000+ users
          </h5>
        </div>
      </div>
      
    </div>
  );

}

export default LoginPage;