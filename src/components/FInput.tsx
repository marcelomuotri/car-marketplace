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
  label?: string
  error?: FieldError
  rules?: any
  type:
    | 'text'
    | 'number'
    | 'date'
    | 'select'
    | 'phone'
    | 'checkbox'
    | 'radio'
    | 'password'
  placeholder?: string
  options?: { value: string; label: string }[] // For select and radio
  defaultValue?: any
  helperText?: string
  width?: string | number // Prop para el ancho
  height?: string | number // Prop para la altura
  rows?: number // Prop para el número de filas
  sx?: any
  validationType?: 'email' | 'phone' | 'number' | 'text'
  disabled?: boolean
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
  rows = 1,
  validationType,
  disabled,
  ...props
}) => {
  const { classes } = useStyles()

  const getValidationRules = (validationType: string) => {
    switch (validationType) {
      case 'email':
        return {
          pattern: {
            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: 'La direccion de email es invalida',
          },
        }
      case 'phone':
        return {
          pattern: {
            value: /^\d{10}$/,
            message: 'el telefono es invalido',
          },
        }
      case 'number':
        return {
          pattern: {
            value: /^\d+$/,
            message: 'Solo se admiten numeros',
          },
        }
      case 'text':
        return {
          pattern: {
            value: /^[a-zA-Z ]*$/,
            message: 'Solo se admite texto',
          },
        }
      default:
        return {}
    }
  }

  const validationRules = { ...rules, ...getValidationRules(validationType) }

  const renderInput = (field) => {
    switch (type) {
      case 'text':
      case 'number':
      case 'phone':
      case 'password':
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
              rows={rows}
              multiline={rows > 1}
              disabled={disabled}
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
              inputProps={{ 'aria-label': 'Without label' }}
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
                disabled={disabled}
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
      rules={validationRules}
      render={({ field }) => renderInput(field)}
    />
  )
}

export default FInput
