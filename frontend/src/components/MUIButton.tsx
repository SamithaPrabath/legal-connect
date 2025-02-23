import { Button, ButtonProps, styled } from '@mui/material';

const MUIButton = styled(Button)<ButtonProps>(({ theme, color, variant, size }) => {
  const isOutlined = variant === "outlined";
  const { primary, secondary } = theme.palette;
  const { main, light } = color === "secondary" ? secondary : primary;
  let paddingY = size === "small" ? 5 : 10
  if (isOutlined) paddingY--;
  return {
    backgroundColor: isOutlined ? light : main,
    border: isOutlined ? `1px solid ${main}` : undefined,
    color: isOutlined ? main : "#FFF",
    borderRadius: "48px",
    padding:`${paddingY}px 25px`
  };
});

export default MUIButton
