
import { flexCenter } from "@assets/style/boxStyles";
import { Box, Typography, useTheme } from "@mui/material";

const DetailText = ({
    Icon,
    detail,
  }: {
    Icon: React.ElementType;
    detail: string;
  }) => {
    const { text } = useTheme().palette;
  
    return (
      <Box
        color={text.secondary}
        fontSize="16px"
        {...flexCenter}
        justifyContent="start"
        gap="10px"
      >
        <Icon fontSize="inherit" />
        <Typography variant="body2">{detail}</Typography>
      </Box>
    );
  };

  export default DetailText;