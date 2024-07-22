import { useCallback } from 'react'
import { makeStyles } from 'tss-react/mui'
import { useDropzone, DropzoneOptions } from 'react-dropzone'
import { Box, Typography } from '@mui/material'
import UploadIcon from '../assets/icons/UploadIcon'
import InfoIcon from '../assets/icons/InfoIcon'

const useStyles = makeStyles()((theme) => ({
  dropzoneContainer: {
    background: '#EFF6FF',
    border: '1px dashed rgba(0, 122, 255, 0.86)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',
    padding: '15px 0px',
    width: '200px',
    gap: 10,
    [theme.breakpoints.down('sm')]: {
      width: 300,
    },
  },
  imagePreview: {
    width: 178,
    height: 105,
    backgroundColor: theme.palette.grey[300],
    display: 'flex',
    justifyContent: 'center',
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(2),
  },
  image: {
    maxWidth: 178,
    height: 105,
    borderRadius: theme.shape.borderRadius,
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    gap: 5,
  },
  titleText: {
    fontWeight: 600,
    color: theme.palette.common.black,
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  blueText: {
    color: 'rgba(0, 122, 255, 0.86)',
  },
}))

interface UploadImageProps {
  title: string
  subTitle?: string
  setImage: (file: File) => void
  image: string
}

const UploadImage: React.FC<UploadImageProps> = ({
  title,
  subTitle,
  setImage,
  image,
}) => {
  const { classes } = useStyles()

  const onDrop = useCallback<NonNullable<DropzoneOptions['onDrop']>>(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setImage(acceptedFiles[0])
      }
    },
    [setImage]
  )

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop })

  const previewImage = acceptedFiles[0]
    ? URL.createObjectURL(acceptedFiles[0])
    : image

  return (
    <>
      <Box className={classes.titleContainer}>
        <Typography className={classes.titleText}>{title}</Typography>
        <InfoIcon />
      </Box>
      {subTitle && <Typography>{subTitle}</Typography>}
      <div {...getRootProps()} role='button' aria-label='Upload Image Dropzone'>
        <input {...getInputProps()} />
        {isDragActive ? (
          <Box className={classes.columnContainer}>
            <Box
              className={classes.dropzoneContainer}
              sx={{
                border: '1px dashed rgba(0, 122, 255, 0.86)',
              }}
            >
              <UploadIcon />
              <Typography className={classes.blueText}>
                Adjuntar una imagen
              </Typography>
            </Box>
          </Box>
        ) : previewImage ? (
          <Box className={classes.imagePreview}>
            <img src={previewImage} alt='preview' className={classes.image} />
          </Box>
        ) : (
          <Box className={classes.columnContainer}>
            <Box className={classes.dropzoneContainer}>
              <UploadIcon />
              <Typography className={classes.blueText}>
                Adjuntar una imagen
              </Typography>
            </Box>
          </Box>
        )}
      </div>
    </>
  )
}

export default UploadImage
