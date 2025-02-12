import { Box, styled } from "@mui/material";

const Background = styled(Box)(({theme}) => {
    const backgroundColor = theme.palette.background.default;

    return {
        backgroundColor,
        position:"fixed",
        top:0,
        left:0,
        width:"100dvw",
        height:"100dvh",
        overflow:"auto",
    }
})

export default Background;