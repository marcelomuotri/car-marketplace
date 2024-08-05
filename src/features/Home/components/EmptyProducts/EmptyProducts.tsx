import BoyThinking from '../../../../assets/images/BoyThinking'
import { useStyles } from './emptyProducts.styles'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import FButton from '../../../../components/FButton/FButton'
import { useNavigate } from 'react-router-dom'

interface EmptyProductsProps {
  userRejected: boolean
}

const EmptyProducts = ({ userRejected }: EmptyProductsProps) => {
  const { classes: styles } = useStyles()
  const { t } = useTranslation()
  const navigation = useNavigate()
  const onHandleCreatePublication = () => {
    navigation('/createPublication')
  }
  return (
    <>
      <Box className={styles.container}>
        <Box className={styles.boxContainer}>
          <Box>
            <Typography className={styles.title}>
              {t('stillDontHavePublications')}
            </Typography>
            <Typography className={styles.title}>
              {t('createTheFirstOne')}
            </Typography>
          </Box>
          <BoyThinking />
        </Box>
      </Box>
      {!userRejected && (
        <Box className={styles.buttonContainer}>
          <FButton
            onClick={onHandleCreatePublication}
            title={t('createPublication')}
          />
        </Box>
      )}
    </>
  )
}

export default EmptyProducts
