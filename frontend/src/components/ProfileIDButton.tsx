import { ButtonProps } from "@mui/material";
import MUIButton from "./MUIButton";

type PropTypes = {
  profileId: string;
} & ButtonProps;

const ProfileIDButton = ({ profileId, ...rest }: PropTypes) => {
  const copyToClipBoard = () => {
    navigator.clipboard.writeText(profileId);
    // throw an success message here
  };

  return (
    <MUIButton
      variant="outlined"
      color="secondary"
      onClick={copyToClipBoard}
      {...rest}
    >
      Profile ID: {profileId}
    </MUIButton>
  );
};

export default ProfileIDButton;
