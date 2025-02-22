import { createTheme } from "@mui/material";

const textPrimary = "#191919"
const textSecondary = "#696969"

const theme = createTheme({
    palette:{
        background: {
            default:"#F9F9F9",
            paper:"#FFF"
        },
        divider: "#CFCFCF",
        primary:{
            main: "#058900",
            light:"#EAFFE4"
        },
        secondary:{
            main:"#0057FF",
            light: "#EDF7FF"
        },
        text: {
            primary: textPrimary,
            secondary: textSecondary
        },        
    },
    typography:{
        fontFamily:"'Be Vietnam Pro', sans-serif;",
        button:{
            fontSize:"12px !important",
            textTransform:"capitalize",
        },
        h2:{
            fontSize:"28px",
            fontWeight: 500
        },
        h5: {
            fontSize: "12px",
            fontWeight: 500
        },
        body1: {
            fontSize: "12px",
            fontWeight: 400, 
            color: textPrimary
        },
        body2: {
            fontSize: "12px",
            fontWeight: 400, 
            color: textSecondary
        }
    },
})

export default theme;