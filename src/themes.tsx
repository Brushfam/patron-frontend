import {createTheme} from "@mui/material";

export const patron_theme = createTheme({
    components: {
        MuiButton: {
            defaultProps: {
                color: 'secondary',
            },
        },
    },
    palette: {
        primary: {
            main: '#2A2831',
        },
        secondary: {
            main: '#4170E7',
        }
    }
});