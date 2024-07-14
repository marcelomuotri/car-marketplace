import React from 'react'
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material'
import { Controller, Control, FieldError } from 'react-hook-form'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme) => ({
  input: {
    marginBottom: theme.spacing(2),
  },
}))

interface GenericInputProps {
  name: string
  control: Control<any>
  label: string
  error?: FieldError
  rules?: any
  type: 'text' | 'number' | 'date' | 'select' | 'phone' | 'checkbox' | 'radio'
  placeholder?: string
  options?: { value: string; label: string }[] // For select and radio
  defaultValue?: any
  helperText?: string
}

const FInput: React.FC<GenericInputProps> = ({
  name,
  control,
  label,
  error,
  rules,
  type,
  placeholder,
  options = [],
  defaultValue,
  helperText = '',
  ...props
}) => {
  const { classes } = useStyles()

  const renderInput = (field) => {
    switch (type) {
      case 'text':
      case 'number':
      case 'date':
      case 'phone':
        return (
          <TextField
            type={type === 'phone' ? 'tel' : type}
            {...field}
            {...props}
            label={label}
            placeholder={placeholder}
            error={!!error}
            helperText={error ? error.message : helperText}
            variant='outlined'
            fullWidth
            InputLabelProps={{
              shrink: false,
            }}
          />
        )
      case 'select':
        return (
          <FormControl
            className={classes.input}
            error={!!error}
            fullWidth
            variant='outlined'
          >
            <InputLabel>{label}</InputLabel>
            <Select
              {...field}
              {...props}
              label={label}
              defaultValue={defaultValue}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {helperText && (
              <FormHelperText>
                {error ? error.message : helperText}
              </FormHelperText>
            )}
          </FormControl>
        )
      case 'checkbox':
        return (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} {...props} />}
            label={label}
          />
        )
      case 'radio':
        return (
          <FormControl
            component='fieldset'
            className={classes.input}
            error={!!error}
          >
            <RadioGroup {...field} {...props}>
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
            {helperText && (
              <FormHelperText>
                {error ? error.message : helperText}
              </FormHelperText>
            )}
          </FormControl>
        )
      default:
        return null
    }
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => renderInput(field)}
    />
  )
}

export default FInput
