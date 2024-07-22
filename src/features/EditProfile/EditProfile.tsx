import { Box } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material/styles'
import { useForm } from 'react-hook-form'
import FButton from '../../components/FButton/FButton'
import EditProfileForm from './Components/EditProfileForm'
import {
  convertDatesToISOString,
  convertISOStringToDayjs,
} from '../../framework/utils/dayjsConverter'
import { useSelector } from 'react-redux'
import { RootState } from '../../framework/state/store'
import { useAuthService } from '../../framework/state/services/authService'
import { Dayjs } from 'dayjs'
import { useUploadImage } from '../../framework/state/services/uploadImageService'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader'
import { useSnackbar } from 'notistack'

const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editProfileContainer: {
    maxWidth: 980,
    padding: '25px 25px 0px 25px',
  },
  body: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
  gridContainer: {
    marginTop: 1,
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
  bodyLeft: {
    width: '57%',
    borderRight: '1px solid black',
    borderColor: theme.palette.grey[300],
    paddingRight: 25,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      borderRight: 'none',
      paddingRight: 0,
    },
  },
  bodyRight: {
    width: '43%',
    paddingLeft: 25,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      paddingLeft: 0,
    },
  },
  fontTitle: {
    color: theme.palette.common.black,
    fontWeight: 600,
    fontSize: 16,
  },
  fontTitleSub: {
    color: theme.palette.common.black,
    fontWeight: 600,
    fontSize: 14,
  },
}))

interface FormValues {
  name: string
  dni: string
  surname: string
  birthdate: Dayjs
  contactEmail: string
  phoneNumber: string
  address: string
  city: string
  state: string
  nameToShow: string
  description: string
  profilePhoto: string
}

const EditProfile = () => {
  const { classes: styles } = useStyles()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const { userData } = useSelector((state: RootState) => state.auth)
  const { updateUserToFirestore } = useAuthService()
  const { uploadImage, uploading } = useUploadImage()
  const [photoToShow, setPhotoToShow] = useState<File | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      name: userData?.name || '',
      dni: userData?.dni || '',
      surname: userData?.surname || '',
      birthdate: convertISOStringToDayjs(userData?.birthdate) || '',
      contactEmail: userData?.contactEmail || '',
      phoneNumber: userData?.phoneNumber || '',
      address: userData?.address || '',
      city: userData?.city || '',
      state: userData?.state || '',
      nameToShow: userData?.nameToShow || '',
      description: userData?.description || '',
    },
  })

  const onHandleSaveProfile = async (data: FormValues) => {
    let photoToShowUrl = userData?.photoToShowUrl || null
    try {
      if (photoToShow) {
        photoToShowUrl = await uploadImage(photoToShow)
      }

      const parsedUserData = convertDatesToISOString(data)
      parsedUserData.photoToShowUrl = photoToShowUrl

      await updateUserToFirestore(parsedUserData, userData?.uid)
      enqueueSnackbar('Perfil actualizado', { variant: 'success' })
      navigate('/profile')
    } catch (error) {
      console.error('Error updating profile:', error)
      enqueueSnackbar('Error al actualizar el perfil', { variant: 'error' })

      // Aquí puedes agregar más lógica para manejar el error, como mostrar una notificación al usuario.
    }
  }

  return (
    <Box>
      {uploading && <Loader />}
      <Box className={styles.container}>
        <Box className={styles.editProfileContainer}>
          <EditProfileForm
            control={control}
            errors={errors}
            photoToShowUrl={userData?.photoToShowUrl}
            setPhotoToShow={setPhotoToShow}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <FButton
              title={'Guardar'}
              onClick={handleSubmit(onHandleSaveProfile)}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default EditProfile
