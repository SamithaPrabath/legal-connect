import { styled, Typography } from "@mui/material";

const MUITypography = styled(Typography)(({theme, color  }) => {
    const { text } = theme.palette

    const getTextColor = () => { switch(color) {
        case "primary":
            return text.primary;
        case "secondary":
            return text.secondary;
        case "textDisabled":
            return text.disabled;

        default:
            return text.primary
        
    }}

    const textColor = getTextColor();
    return {
        color: textColor
    }
})

export default MUITypography;