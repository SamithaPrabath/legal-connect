import { border } from "@assets/style/boxStyles";
import FormField from "@components/FormField";
import MUIModel from "@components/MUIModal";
import { Box, Typography } from "@mui/material";
import { EventResponse } from "@type/Event";
import { useEffect, useState } from "react";

const CilentScheduleCard = ({
  date,
  time,
  description,
  title,
  clientId,
  lawyerId,
}: EventResponse) => {
  const [modelOpen, setModelOpen] = useState(false);
  const [meetingLink, setMeetingLink] = useState<string | null>();

  useEffect(() => {
    setMeetingLink(generateMeetingLink());
  }, [clientId, lawyerId]);

  const closeMeeting = () => {
    setModelOpen(false);
  };

  console.log("Open", modelOpen);

  const handleSubmit = () => {
    if (!meetingLink) return;
    window.open(meetingLink, "_blank");
    setModelOpen(false);
  };

  const generateMeetingLink = () => {
    const ids = `user${clientId}-user${lawyerId}`
    const meetingId = btoa(ids)
      .replace(/[^a-zA-Z0-9]/g, "")
      .substring(0, 12); // base64 + clean
    const host = window.location.origin;

    return `${host}/meets/${meetingId}`;
  };

  const modelChildren = (
    <FormField
      label="Meeting Link"
      name="meetingLink"
      value={meetingLink}
      readOnly
      fullWidth
    />
  );

  return (
    <>
      <Box
      {...border}
      p="10px"
      width="200px"
      height="150px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      sx={{ ":hover": { borderColor: "black", transition: "all 0.25s" } }}
      onClick={() => setModelOpen(true)}
    >
      <Typography variant="body2">
        {new Date(date).toUTCString().substring(0, 16)}, {time}
      </Typography>
      <Box>
        <Typography variant="h4">{title}</Typography>
        <Typography>{description}</Typography>
      </Box>
    </Box>
      <MUIModel
        title="Appointment Meeting Details"
        children={modelChildren}
        open={modelOpen}
        onClick={handleSubmit}
        onClose={closeMeeting}
        buttonName="Open Meeting"
      />
    </>
  );
};

export default CilentScheduleCard;
