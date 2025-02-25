import ParentCard from "@components/ParentCard"
import NoteCard from "@components/case/note/NoteCard"
import MUIButton from "@components/MUIButton"
import { Box } from "@mui/material"

const CaseNotes = () => {

  const notes = [
    {note: "Reviewed initial case details and documents provided by the client. Identified areas requiring further evidence.", dateTime: "Feb 15, 2025, 10:30 AM"},
    {note: "Reviewed initial case details and documents provided by the client. Identified areas requiring further evidence.", dateTime: "Feb 15, 2025, 10:30 AM"},
    {note: "Reviewed initial case details and documents provided by the client. Identified areas requiring further evidence.", dateTime: "Feb 15, 2025, 10:30 AM"},
  ]

  return (
    <Box p="30px">
      <ParentCard title="Notes" display="flex" flexDirection="column" gap="10px" sideCompo={<MUIButton color="secondary" size="small">Add Notes</MUIButton>}>
        {notes.map(note => <NoteCard {...note} />)}
      </ParentCard>
    </Box>
  )
}

export default CaseNotes
