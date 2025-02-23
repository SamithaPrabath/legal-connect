import { boxShadow } from '@assets/style/boxStyles';
import { Box, BoxProps, Typography, useTheme } from '@mui/material';
import { ReactNode } from 'react';

type PropTypes = {
    title: string;
    children?: ReactNode
} & BoxProps

const InfoCard = ({title, children, ...rest}: PropTypes) => {
    const { divider, background } = useTheme().palette;
    return (
      <Box p="20px" border={`1px solid ${divider}`} bgcolor={background.paper} {...boxShadow}>
        <Typography variant='h4' mb="10px">{title}</Typography>
        <Box {...rest}>
            {children}
        </Box>
      </Box>
    )
  }

export default InfoCard
