import { makeStyles } from 'tss-react/mui'
import { Theme } from '@mui/material'

export const useStyles = makeStyles()((theme: Theme) => ({
    loginContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    loginBox:{
        width: '300px',
        border: '1px solid',
        borderColor: theme.palette.primary.main,
        padding: '20px',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    }
}))
