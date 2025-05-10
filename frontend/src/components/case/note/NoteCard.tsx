import { noteDeleteAction, noteListAction } from "@actions/noteActions";
import { border, boxShadow, flexCenter } from "@assets/style/boxStyles";
import MUIButton from "@components/MUIButton";
import { Box, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { NoteResponse } from "@type/Note";
import LocalStorageHandler from "@utils/localStorageHandler";

const NoteCard = ({ id, note, date, time }: NoteResponse) => {

  const dispatch = useAppDispatch();
  const { data: caseObj } = useAppSelector((state) => state.case.case);
  const localStorageHandler = new LocalStorageHandler();

  const noteDelete = () => {
    const profileId = localStorageHandler.profileId;
    if (!profileId || !caseObj) return
    dispatch(noteDeleteAction(id));
    dispatch(noteListAction(profileId, caseObj.id ))
  }

  return (
    <Box {...border} {...boxShadow} {...flexCenter} alignItems="start" justifyContent="space-between" px="20px" py="15px">
      <Box>
        <Typography mb="8px">{note}</Typography>
        <Typography variant="body2">{new Date(date).toUTCString().substr(0,16)}, {time}</Typography>
      </Box>
      <MUIButton color="secondary" size="small" variant="outlined" onClick={noteDelete}>Delete</MUIButton>
    </Box>
  );
};

export default NoteCard;
