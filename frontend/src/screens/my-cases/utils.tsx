import { Box, darken, lighten, Theme, Typography } from "@mui/material";
import { CaseStatus } from "@type/Case";

export const getStatusChip = (status: CaseStatus, theme: Theme) => {
    const { primary, warning, text } = theme.palette;
    let color = "default";
    if (status === CaseStatus.IN_PROGRESS) color = primary.main;
    if (status === CaseStatus.ON_HOLD) color = warning.main;
    if (status === CaseStatus.CLOSED) color = text.secondary;
    if (status === CaseStatus.AWAIT_HEARING) color = warning.main;

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