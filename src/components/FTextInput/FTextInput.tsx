import React from 'react'
import { TextField } from '@mui/material'
import { Controller, Control, FieldError } from 'react-hook-form'
import { useForm } from 'react-hook-form'

interface FTextInputProps {
  name: string
  control: Control<any>
  label: string
  error?: FieldError
  rules?: any
  type?: string
}

const FTextInput: React.FC<FTextInputProps> = ({
  name,
  control,
  label,
  error,
  rules,
  type = 'text',
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField
          type={type}
          {...field}
          {...props}
          label={label}
          error={!!error}
          helperText={error ? error.message : ''}
          variant='outlined'
          fullWidth
        />
      )}
    />
  )
}

export default FTextInput
