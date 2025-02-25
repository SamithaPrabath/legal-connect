import FormCard from "@components/FormCard";
import FormField from "@components/FormField";
import { Box, Typography } from "@mui/material";

const CaseClient = () => {
  const profileIdField = (
    <Box display="flex" alignItems="center" justifyContent="center" gap="10px" width="200px">
      <Typography variant="h6" width="100px">Profile ID</Typography>
      <FormField label="" name="profileId" placeholder="Profile ID" />
    </Box>
  );

  return (
    <FormCard
      id="caseClient"
      title="Client"
      mt="20px"
      sideCompo={profileIdField}
    >
      <FormField fullWidth label="Name" name="caseNumber" />
      <FormField fullWidth label="Case Name" name="caseName" />
      <FormField fullWidth label="Case Name" name="caseName" />
    </FormCard>
  );
};

export default CaseClient;
