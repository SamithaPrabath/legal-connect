import { border, boxShadow, flexCenter } from "@assets/style/boxStyles";
import MUIButton from "@components/MUIButton";
import { Box, Typography } from "@mui/material";

type PropTypes = {
  note: string;
  dateTime: string;
};

const NoteCard = ({ note, dateTime }: PropTypes) => {
  return (
    <Box {...border} {...boxShadow} {...flexCenter} alignItems="start" justifyContent="space-between" px="20px" py="15px">
      <Box>
        <Typography mb="8px">{note}</Typography>
        <Typography variant="body2">{dateTime}</Typography>
      </Box>
      <MUIButton color="secondary" size="small" variant="outlined">Delete</MUIButton>
    </Box>
  );
};

export default NoteCard;
