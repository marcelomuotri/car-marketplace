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
  Typography,
  Box,
} from '@mui/material'
import { Controller, Control, FieldError } from 'react-hook-form'
import { makeStyles } from 'tss-react/mui'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

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
  width?: string | number // Prop para el ancho
  height?: string | number // Prop para la altura
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
  width = '100%', // Valor predeterminado de 230px
  ...props
}) => {
  const { classes } = useStyles()

  //todo, ver que onda con field, si sirve para algo
  const renderInput = (field) => {
    switch (type) {
      case 'text':
      case 'number':
      case 'phone':
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <Typography>{placeholder}</Typography>
            <TextField
              type={type === 'phone' ? 'tel' : type}
              {...field}
              {...props}
              placeholder={label}
              error={!!error}
              helperText={error ? error.message : helperText}
              variant='outlined'
              InputLabelProps={{
                shrink: false,
              }}
              fullWidth
              size='small'
            />
          </Box>
        )
      case 'select':
        return (
          <FormControl
            className={classes.input}
            error={!!error}
            fullWidth
            variant='outlined'
            style={{ width }} // Aplicar el ancho personalizado
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
            style={{ width }} // Aplicar el ancho personalizado
          />
        )
      case 'radio':
        return (
          <FormControl
            component='fieldset'
            className={classes.input}
            error={!!error}
            style={{ width }} // Aplicar el ancho personalizado
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
      case 'date':
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <Typography>{placeholder}</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                {...field}
                onChange={(date) => field.onChange(date)}
                format={'DD/MM/YYYY'}
                value={field.value || null}
                slotProps={{
                  textField: {
                    variant: 'outlined',
                    error: !!error,
                    helperText: error ? error.message : helperText,
                    fullWidth: true,
                    size: 'small',
                  },
                }}
              />
            </LocalizationProvider>
          </Box>
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
