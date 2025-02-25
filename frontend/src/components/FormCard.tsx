import { boxShadow } from '@assets/style/boxStyles';
import { Box, BoxProps, Typography, useTheme } from '@mui/material';
import { ReactNode } from 'react';

type PropTypes = {
    title: string;
    children?: ReactNode,
    sideCompo?:ReactNode,
} & BoxProps

const FormCard = ({title, children, sideCompo, ...rest}: PropTypes) => {
    const { divider, background } = useTheme().palette;
    return (
      <Box p="20px" border={`1px solid ${divider}`} bgcolor={background.paper} {...boxShadow}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant='h4' mb="10px">{title}</Typography>
          {sideCompo}
        </Box>
        <Box {...rest}>
            {children}
        </Box>
      </Box>
    )
  }

export default FormCard
