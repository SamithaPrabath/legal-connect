import { border } from "@assets/style/boxStyles";
import { Box, BoxProps, Typography } from "@mui/material";
import { ReactNode } from "react";

type PropTypes = {
  children?: ReactNode;
  title: string;
  sideCompo?: ReactNode;
  parentBoxProps?: BoxProps
  titleVariant?: "h2" | "h3" | "h4"
} & BoxProps;

const ParentCard = ({ children, title, sideCompo, parentBoxProps, titleVariant, ...rest }: PropTypes) => {
  return (
    <Box bgcolor="white" {...border} px="30px" py="20px" {...parentBoxProps} >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb="30px"
      >
        <Typography variant={titleVariant || "h2"}>{title}</Typography>
        {sideCompo}
      </Box>
      <Box {...rest}>
        {children}
      </Box>
    </Box>
  );
};

export default ParentCard;
