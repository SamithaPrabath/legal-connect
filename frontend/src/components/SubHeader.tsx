import { boxShadow } from "@assets/style/boxStyles";
import { Box, BoxProps, useTheme } from "@mui/material";
import { ReactNode } from "react";

const SubHeader = ({
  children,
  ...rest
}: { children?: ReactNode } & BoxProps) => {
  const { divider, background } = useTheme().palette;
  return (
    <Box
      position="sticky"
      top="60px"
      height="40px"
      width="100%"
      bgcolor={background.paper}
      zIndex={3}
      borderBottom={`1px solid ${divider}`}
      {...boxShadow}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default SubHeader;
