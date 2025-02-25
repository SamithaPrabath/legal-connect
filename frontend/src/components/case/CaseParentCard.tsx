import { border } from "@assets/style/boxStyles";
import { Box, BoxProps, Typography } from "@mui/material";
import { ReactNode } from "react";

type PropTypes = {
  children?: ReactNode;
  title: string;
  sideCompo?: ReactNode;
  parentBoxProps?: BoxProps
} & BoxProps;

const CaseParentCard = ({ children, title, sideCompo, parentBoxProps, ...rest }: PropTypes) => {
  return (
    <Box bgcolor="white" {...border} px="30px" py="20px" {...parentBoxProps} >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb="30px"
      >
        <Typography variant="h2">{title}</Typography>
        {sideCompo}
      </Box>
      <Box {...rest}>
        {children}
      </Box>
    </Box>
  );
};

export default CaseParentCard;
