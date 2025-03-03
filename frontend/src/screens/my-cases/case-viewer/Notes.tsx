import { noteCreateAction, noteListAction } from "@actions/noteActions";
import NoteCard from "@components/case/note/NoteCard";
import FormField from "@components/FormField";
import MUIButton from "@components/MUIButton";
import MUIModel from "@components/MUIModal";
import ParentCard from "@components/ParentCard";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { tempGetAllNotes } from "@temporaryActions/tempNoteActions";
import { NoteRequest } from "@type/Note";
import { isBackendConnected } from "@utils/env-config";
import LocalStorageHandler from "@utils/localStorageHandler";
import { useEffect, useState } from "react";

const CaseNotes = () => {
  const [noteModal, setNoteModal] = useState(false);
  const [note, setNote] = useState("");

  const { data: notesList } = useAppSelector((state) => state.note.list);
  const { success: noteDeleteSuccess } = useAppSelector((state) => state.note.delete);
  const { data: caseObj } = useAppSelector((state) => state.case.case);

  const dispatch = useAppDispatch();

  const userId = new LocalStorageHandler().profileId;

  const handleClose = () => {
    setNoteModal(false);
  };

  const handleOpen = () => {
    setNoteModal(true);
  };

  const handleSubmitNote = () => {
    if (!(userId && caseObj)) return;

    const noteRequest: NoteRequest = {
      caseId: caseObj.id,
      date: new Date().toISOString().substring(0, 10),
      time: new Date().toLocaleTimeString(),
      note,
      userId,
    };

    noteCreateAction(noteRequest);
    fetchAllNotes();
    handleClose();
  };

  const fetchAllNotes = () => {
    if (!(userId && caseObj)) return;
    if (isBackendConnected) dispatch(noteListAction(userId, caseObj.id));
    else dispatch(tempGetAllNotes());
  }

  useEffect(() => {
    fetchAllNotes();
  }, [userId, caseObj, noteDeleteSuccess]);

  return (
    <Box p="30px">
      <ParentCard
        title="Notes"
        display="flex"
        flexDirection="column"
        gap="10px"
        sideCompo={
          <MUIButton color="secondary" size="small" onClick={handleOpen}>
            Add Notes
          </MUIButton>
        }
      >
        {notesList?.map((note) => (
          <NoteCard {...note} />
        ))}
      </ParentCard>
      <MUIModel
        open={noteModal}
        title="Add Note"
        onClose={handleClose}
        onClick={handleSubmitNote}
      >
        <FormField
          fullWidth
          label="Description"
          name="note"
          multiline
          rows={5}
          value={note}
          handleChange={(_, value) => setNote(value || "")}
        />
      </MUIModel>
    </Box>
  );
};

export default CaseNotes;
