import { getUserByProfileId } from "@actions/userActions";
import FormCard from "@components/FormCard";
import FormField from "@components/FormField";
import { Box, Typography } from "@mui/material";
import { useAppDispatch } from "@redux/hooks";
import { tempGetUserByProfileId } from "@temporaryActions/tempUserActions";
import { CaseForm } from "@type/Case";
import { isBackendConnected } from "@utils/env-config";
import { useState } from "react";

type PropTypes = {
  form: CaseForm,
  handleChange: (name: string, value: string | null) => void
}

const CaseClient = ({form, handleChange}: PropTypes) => {

  const [profileId, setProfileId] = useState("");

  const dispatch = useAppDispatch();

  const handleSearchByProfileId = () => {
    if (isBackendConnected)
      dispatch(getUserByProfileId(profileId));
    else dispatch(tempGetUserByProfileId(profileId))
  }

  const profileIdField = (
    <Box display="flex" alignItems="center" justifyContent="center" gap="10px" width="200px">
      <Typography variant="h6" width="100px">Profile ID</Typography>
      <FormField value={profileId} handleChange={(_, value) => setProfileId(value || "")} label="" name="profileId" placeholder="Profile ID" onKeyDown={(e) => {
        if (e.key === "Enter") handleSearchByProfileId()
      }}/>
    </Box>
  );

  return (
    <FormCard
      id="caseClient"
      title="Client"
      mt="20px"
      sideCompo={profileIdField}
    >
      <FormField value={form.client.name} handleChange={handleChange} fullWidth label="Name" name="name" />
      <FormField value={form.client.phone} handleChange={handleChange} fullWidth label="Phone" name="phone" />
      <FormField value={form.client.email} handleChange={handleChange} fullWidth label="Email" name="email" />
    </FormCard>
  );
};

export default CaseClient;
