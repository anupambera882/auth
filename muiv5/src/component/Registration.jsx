import { AddCircleOutlineOutlined } from '@mui/icons-material'
import { Avatar, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from '@mui/material'
import React from 'react'

const Registration = () => {
  const paperStyle = { padding: '30px 20px', width: 300, margin: "8vh auto" }
  const headerStyle = { margin: 0 }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
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
        <form>
          <TextField style={{ margin: '9px 0' }} fullWidth label='Name' placeholder="Enter your name" autoFocus type='text' />
          <TextField style={{ margin: '9px 0' }} fullWidth label='Email' placeholder="Enter your email" type='email' />
          <TextField style={{ margin: '9px 0' }} fullWidth label='Phone Number' placeholder="Enter your phone number" type='text' />
          <TextField style={{ margin: '9px 0' }} fullWidth label='Password' placeholder="Enter your password" type='password' />
          <TextField style={{ margin: '9px 0' }} fullWidth label='Confirm Password' placeholder="Confirm your password" type='password' />
          <FormControlLabel
            control={<Checkbox name="checkedA" />}
            label="I accept the terms and conditions."
          />
          <Button type='submit' variant='contained' color='primary'>Sign up</Button>
        </form>
      </Paper>
    </Grid>
  )
}

export default Registration;