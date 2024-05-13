import { ErrorMessage, Field, Form, Formik } from "formik";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "../common/axios";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('auth/profile');
        setUser(response.data.response);
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.error(err);
        setLoading(false); // Set loading to false even in case of error
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Render loading indicator while fetching data
  }

  const initialValues = {
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    roles: user.roles || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(3, "It's too short").required("Required"),
    email: Yup.string().email("Enter valid email").required("Required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits")
      .required("Required"),
  });

  const onSubmit = (values, props) => {
    console.log(values);
    console.log(props);
  };

  const handleImgUpload = async (image) => {
    const formData = new FormData();
    formData.append("picture", image);
    try {
      await axios.post("", formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(values) => (
          <Form>
            <div>
              <h1>Profile</h1>
              <div>
                <Box>
                  <label htmlFor="profilePicUpload">
                    {user.picture ? (
                      <img
                        src={`${'http://localhost:3000/'}${user.picture}`}
                        alt="profile pic"
                      />
                    ) : (
                      <img
                        src="/user_pic.png"
                        alt="profile pic"
                        height={'200vh'}
                      />
                    )}
                  </label>
                  <Typography component="label">
                    <TextField
                      sx={{ display: "none" }}
                      type="file"
                      id="profilePicUpload"
                      name="profilePicUpload"
                      accept="image/jpg, image/png, image/jpeg"
                      onChange={(e) => {
                        handleImgUpload(e.currentTarget.files[0]);
                      }}
                    />
                  </Typography>
                </Box>
              </div>
              <div>
                <Field
                  as={TextField}
                  style={{ margin: '9px 0' }}
                  name="name"
                  label='Name'
                  type='text'
                  helperText={<ErrorMessage name="name" />}
                />
              </div>
              <div>
                <Field
                  as={TextField}
                  style={{ margin: '9px 0' }}
                  name="email"
                  label='Email'
                  type='email'
                  helperText={<ErrorMessage name="email" />}
                />
              </div>
              <div>
                <Field
                  as={TextField}
                  style={{ margin: '9px 0' }}
                  name="phone"
                  label='Phone'
                  type='text'
                  helperText={<ErrorMessage name="phone" />}
                />
              </div>
              <div>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default UserProfile;
