import { createTheme } from "@mui/material";

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
            primary: "#191919",
            secondary:"#696969"
        },        
    },
    typography:{
        allVariants:{
            color:"black"
        },
        fontFamily:"'Be Vietnam Pro', sans-serif;",
        button:{
            fontSize:"12px !important",
            textTransform:"capitalize",
        }
    },
})

export default theme;