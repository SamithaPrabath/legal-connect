import FormCard from "@components/FormCard";
import FormField from "@components/FormField";

const CaseOppositionParty = () => {
  return (
    <FormCard id="caseOppositionParty" title="Opposition Party" mt="20px">
      <FormField fullWidth label="Name" name="name" />
      <FormField fullWidth label="Phone" name="phone" />
      <FormField fullWidth label="Lawyer Name" name="lawyerName" />
    </FormCard>
  );
};

export default CaseOppositionParty;
