import ParentCard from "@components/ParentCard"
import NoteCard from "@components/case/note/NoteCard"
import MUIButton from "@components/MUIButton"
import { Box } from "@mui/material"
import MUIModel from "@components/MUIModal"
import { useState } from "react"
import FormField from "@components/FormField"

const CaseNotes = () => {
  const [noteModal, setNoteModal] = useState(false);

  const handleClose = () => {
    setNoteModal(false);
  }

  const handleOpen = () => {
    setNoteModal(true);
  }

  const handleSubmitNote = () => {

  }

  const notes = [
    {note: "Reviewed initial case details and documents provided by the client. Identified areas requiring further evidence.", dateTime: "Feb 15, 2025, 10:30 AM"},
    {note: "Reviewed initial case details and documents provided by the client. Identified areas requiring further evidence.", dateTime: "Feb 15, 2025, 10:30 AM"},
    {note: "Reviewed initial case details and documents provided by the client. Identified areas requiring further evidence.", dateTime: "Feb 15, 2025, 10:30 AM"},
  ]

  return (
    <Box p="30px">
      <ParentCard title="Notes" display="flex" flexDirection="column" gap="10px" sideCompo={<MUIButton color="secondary" size="small" onClick={handleOpen}>Add Notes</MUIButton>}>
        {notes.map(note => <NoteCard {...note} />)}
      </ParentCard>
      <MUIModel
        open={noteModal}
        title="Add Note"
        onClose={handleClose}
        onClick={handleSubmitNote}
      >
          <FormField fullWidth label="Description" name="note" multiline rows={5} />
      </MUIModel>
    </Box>
  )
}

export default CaseNotes
