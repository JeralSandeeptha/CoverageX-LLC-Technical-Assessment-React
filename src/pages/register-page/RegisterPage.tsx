import './RegisterPage.scss';
import { Alert, Avatar, AvatarGroup, Backdrop, Button, CircularProgress, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import cartLogo from '../../assets/svgs/approved.png';
import { getCurrentYear } from '../../utils/getCurrentYear';
import curlyarrow from '../../assets/svgs/curl-arrow.png';
import logo from '../../assets/icons/pfizer.png';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Helmet } from 'react-helmet';

const RegisterPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const yupValidationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
      .min(3, 'Password must be at least 3 characters')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: yupValidationSchema,
    onSubmit: async (values) => {
      console.log(values);
      formik.resetForm();
    },
  });

  return (
    <div className="register">

      <Helmet>
        <title>Explore products - IruSri Products</title>
        <meta
            name="description"
            content="Create a new account on IruSri Products to purchase your products and explore our new products. Access all features by signing in securely."
        />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:title" content="Explore Products - IruSri Products" />
        <meta
            property="og:description"
            content="Create a new account in to your IruSri Products account and manage your tasks efficiently. Secure access to all features."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="register-left">
        <div className="register-content">

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
                Account has been created
              </Alert>
            )
          }
          
          <div className="logo-content">
            <img src={logo} alt="logo" className="logo" />
          </div>

          <div className="header-section">
            <h1 className="header">Create an account</h1>
            <h1 className="subheader">Start your journey now</h1>
          </div>

          <form onSubmit={formik.handleSubmit} className="form">
            <div className="text-input-container">
              <div className="error">
                <h6 className="error-texts">
                  {formik.touched.firstName && formik.errors.firstName}
                </h6>
              </div>
              <TextField
                label="First Name"
                id="outlined-size-small"
                size="small"
                className="text-field"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="text-input-container">
              <div className="error">
                <h6 className="error-texts">
                  {formik.touched.lastName && formik.errors.lastName}
                </h6>
              </div>
              <TextField
                label="Last Name"
                id="outlined-size-small"
                size="small"
                className="text-field"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="text-input-container">
              <div className="error">
                <h6 className="error-texts">
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
              />
            </div>
            <div className="text-input-container">
              <div className="error">
                <h6 className="error-texts">
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
              />
            </div>
            <h6 className="instruction-text">Must be at least 3 characters</h6>
            <Button
              variant="contained"
              size="small"
              className="control-button"
              type="submit"
            >
              Create account
            </Button>
            <h6 className="questionText">
              Been here before?{' '}
              <span>
                <Link to="/">Login</Link>
              </span>
            </h6>
          </form>
        </div>

        <div className="left-footer">
          <div className="left">
            <h5 className="link">© {getCurrentYear()} Company</h5>
          </div>
          <div className="right">
            <h5 className="link">Term</h5>
            <h5 className="link">Privacy</h5>
          </div>
        </div>
      </div>

      <div className="register-right">
        <img src={curlyarrow} alt="curlyarrow" className="curlyarrow" />

        <div className="logo-container">
          <img src={cartLogo} alt="logo-img" className="logo-img" />
        </div>
        <h2 className="right-header">Purchase thousands of products</h2>
        <h5 className="right-para">
          Join our platform to purchase thousands of highly valuable products in
          minutes.
        </h5>
        <div className="right-users">
          <AvatarGroup max={4}>
            <Avatar alt="Remy Sharp" src="https://plus.unsplash.com/premium_photo-1689606093808-3cb4393248d2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <Avatar alt="Travis Howard" src="https://images.unsplash.com/photo-1685903772095-f07172808761?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <Avatar alt="Cindy Baker" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <Avatar alt="Trevor Henderson" src="https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <Avatar alt="Agnes Walker" src="https://images.unsplash.com/photo-1599110364868-364162848518?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          </AvatarGroup>
          <h5 className="users-text">Join 60,000+ users</h5>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;