import { boxShadow } from "@assets/style/boxStyles";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Divider, IconButton, Modal, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import MUIButton from "./MUIButton";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  //   p: 3,
  borderRadius: 2,
};

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onClick: () => void;
  children?: ReactNode;
  buttonName?: string;
}

const MUIModel: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  onClick,
  buttonName
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {/* Header */}
        <Box
          {...boxShadow}
          py="15px"
          position="relative"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h3" textAlign="center">
            {title}
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{ position: "absolute", right: "7px", top: "7px" }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box py="10px" px="10px" display="flex" flexDirection="column">
          {children}
        </Box>
        <Divider />
        <Box p="10px">
          <MUIButton fullWidth color="secondary" size="small" onClick={onClick}>
           {buttonName || "Submit"}
          </MUIButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default MUIModel;
