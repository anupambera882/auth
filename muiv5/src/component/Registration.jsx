import { AddCircleOutlineOutlined } from '@mui/icons-material';
import { Avatar, Button, Checkbox, FormControlLabel, FormHelperText, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const Registration = () => {
  const paperStyle = { padding: '30px 20px', width: 300, margin: "8vh auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: '#1bbd7e' };

  const initialValues = {
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    termsAndConditions: false
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "It's too short").required("Required"),
    email: Yup.string().email("Enter valid email").required("Required"),
    phoneNumber: Yup.number().typeError("Enter valid Phone Number").required('Required'),
    password: Yup.string().min(8, "Password minimum length should be 8").required("Required"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Password not matched").required("Required"),
    termsAndConditions: Yup.string().oneOf(["true"], "Accept terms & conditions")
  });

  const onSubmit = (values, props) => {
    setTimeout(() => {
      props.resetForm()
      props.setSubmitting(false)
    }, 2000)
  }

  return (
    <Grid>
      <Paper margin elevation={24} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlined />
          </Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
        </Grid>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {(props) => (
            <Form>
              <Field as={TextField} style={{ margin: '9px 0' }} fullWidth name="name" label='Name' placeholder="Enter your name" autoFocus type='text' helperText={<ErrorMessage name="name" />} />
              <Field as={TextField} style={{ margin: '9px 0' }} fullWidth name="email" label='Email' placeholder="Enter your email" type='email' helperText={<ErrorMessage name="email" />} />
              <Field as={TextField} style={{ margin: '9px 0' }} fullWidth name="phoneNumber" label='Phone Number' placeholder="Enter your phone number" type='text' helperText={<ErrorMessage name="phoneNumber" />} />
              <Field as={TextField} style={{ margin: '9px 0' }} fullWidth name="password" label='Password' placeholder="Enter your password" type='password' helperText={<ErrorMessage name="password" />} />
              <Field as={TextField} style={{ margin: '9px 0' }} fullWidth name="confirmPassword" label='Confirm Password' placeholder="Confirm your password" type='password' helperText={<ErrorMessage name="confirmPassword" />} />
              <FormControlLabel
                control={<Field as={Checkbox} name="termsAndConditions" />}
                label="I accept the terms and conditions."
              />
              <FormHelperText><ErrorMessage name="termsAndConditions" /></FormHelperText>
              <Button type='submit' variant='contained' disabled={props.isSubmitting} color='primary'>{props.isSubmitting ? "Loading" : "Sign up"}</Button>
            </Form>
          )}
        </Formik>
        <Typography > Do you have an account ?
          <Link href="#" >Sign In</Link>
        </Typography>
      </Paper>
    </Grid>
  )
}

export default Registration;