import { ErrorMessage, Field, Form, Formik } from "formik";
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import React from 'react';
import * as Yup from 'yup';
import axios from "../common/axios";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../Redux/AuthProvider";
import { useSetRecoilState } from "recoil";


const Login = ({ handleChange }) => {
  const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "6vh auto" }
  const avatarStyle = { backgroundColor: '#1bbd7e' }

  const initialValues = {
    email: '',
    password: '',
    remember: false
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('please enter valid email').required("Required"),
    password: Yup.string().required("Required")
  });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";
  const setAuth = useSetRecoilState(auth);


  const onSubmit = async ({ email, password }, props) => {
    try {
      const response = await axios.post('auth/login', { email, password });
      localStorage.setItem("jwt", response?.data?.response?.access_token);
      const accessToken = response?.data?.response?.access_token;
      const roles = response?.data?.response?.user?.role;
      setAuth({ user: email, accessToken, roles });
      props.resetForm();
      props.setSubmitting(false);
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Grid>
      <Paper elevation={24} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}><LockOutlined /></Avatar>
          <h2>Sign In</h2>
        </Grid>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          {(props) => (
            <Form>
              <Field as={TextField} name='email' style={{ margin: '8px 0' }} label='Email' placeholder='Enter email' fullWidth required autoFocus helperText={<ErrorMessage name="email" />} />
              <Field as={TextField} name='password' style={{ margin: '8px 0' }} label='Password' placeholder='Enter password' type='password' fullWidth required helperText={<ErrorMessage name="password" />} />
              <Field as={FormControlLabel}
                name='remember'
                control={<Checkbox color="primary" />}
                label="Remember me"
              />
              <Button type='submit' color='primary' variant="contained" style={{ margin: '8px 0' }} disabled={props.isSubmitting} fullWidth>{props.isSubmitting ? "Loading" : "Sign in"}</Button>
              <Typography >
                <Link href="#" >
                  Forgot password ?
                </Link>
              </Typography>
            </Form>
          )}
        </Formik>
        <Typography > Do you have an account ?
          <Link href="#" onClick={() => handleChange("event", 1)} >
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Grid>
  )
}


export default Login;
