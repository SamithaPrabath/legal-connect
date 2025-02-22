import FormField from '@components/FormField'
import MUIButton from '@components/MUIButton'
import { Box } from '@mui/material'
import React from 'react'

export type SignForm = {
    email: string,
    password: string
}

type PropTypes = {
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    form: SignForm
    formType: "signin" | "signup"
}

const EmailAndPasswordField = ({handleChange, form, formType}: PropTypes) => {
  return (
    <Box>
      <Box>
        <FormField label="Email" name="email" value={form.email} onChange={handleChange} />
        <FormField label="Password" name="password" value={form.password} type="password" onChange={handleChange} />
      </Box>

      <MUIButton>{formType === "signin" ? "Login" : "Continue"}</MUIButton>
    </Box>
  )
}

export default EmailAndPasswordField
