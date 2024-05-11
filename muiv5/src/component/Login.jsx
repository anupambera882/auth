import { LockOutlined } from '@mui/icons-material'
import { Avatar, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material'
import React from 'react'

const Login = () => {
  const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "12vh auto" }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  return (
    <Grid>
      <Paper elevation={24} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}><LockOutlined /></Avatar>
          <h2>Sign In</h2>
        </Grid>
        <TextField style={{ margin: '8px 0' }} label='Email' placeholder='Enter email' fullWidth required type='email' autoFocus/>
        <TextField style={{ margin: '8px 0' }} label='Password' placeholder='Enter password' type='password' fullWidth required />
        <FormControlLabel
          control={
            <Checkbox
              name="checkedB"
              color="primary"
            />
          }
          label="Remember me"
        />
        <Button type='submit' color='primary' variant="contained" style={{ margin: '8px 0' }} fullWidth>Sign in</Button>
        <Typography >
          <Link href="#" >
            Forgot password ?
          </Link>
        </Typography>
        <Typography > Do you have an account ?
          <Link href="#" >
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Grid>
  )
}


export default Login;
