import { Box, darken, lighten, Theme, Typography } from "@mui/material";
import { CaseStatus } from "@type/Case";
import { LawyerStatus } from "@type/User";

export const getStatusChip = (status: CaseStatus | LawyerStatus, theme: Theme) => {
    const { primary, warning, text, error } = theme.palette;
    let color = "#000";
    if (status === CaseStatus.IN_PROGRESS || status === LawyerStatus.VERIFIED) color = primary.main;
    if (status === CaseStatus.ON_HOLD || status === CaseStatus.AWAIT_HEARING || status === LawyerStatus.PENDING ) color = warning.main;
    if (status === CaseStatus.CLOSED) color = text.secondary;
    if (status === LawyerStatus.DENIED) color = error.main

    return (
      <Box
        bgcolor={lighten(color, 0.8)}
        textAlign="center"
        whiteSpace="nowrap"
        px="5px"
        py="2px"
        // borderRadius="5px"
        width="fit-content"
      >
        <Typography sx={{ color: darken(color, 0.4), fontSize: "10px", fontWeight: 600, textTransform: "capitalize" }}>{status}</Typography>
      </Box>
    );
  };