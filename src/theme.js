import createTheme from '@mui/material/styles/createTheme'

export const theme = createTheme({
    palette: {
        light: '#EEEEEE',
        main: '#0075FF',
        dark: '#000000'
    },
    typography: {
        color: 'red',
        sizes: {
            small: '15px',
            medium: '18px'
        },
        placeholder: {

        }
    },
    button: {
        width: '74vw',
        border: 'none',
        borderRadius: '20px',
        fontSize: '18px',
        fontWeight: '600',
        color: 'white',
        padding: '14px 70px',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        backgroundColor: '#0075FF',
    },
    input: {
        width: '74vw',
        border: 'none',
        borderRadius: '20px',
        fontSize: '18px',
        fontWeight: '600',
        color: '#000000',
        padding: '14px 25px',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        textAlign: 'left',
        '&::placeholder': {
            color: '#FFFFFF',
        },
    }
})