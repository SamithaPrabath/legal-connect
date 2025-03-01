import FormCard from "@components/FormCard";
import FormField from "@components/FormField";
import { CaseRequest } from "@type/Case";

type PropTypes = {
  form: CaseRequest;
  handleChange: (name: string, value: string | null) => void;
};

const CaseOppositionParty = ({ form, handleChange }: PropTypes) => {
  return (
    <FormCard id="caseOppositionParty" title="Opposition Party" mt="20px">
      <FormField
        value={form.oppositionParty.name}
        handleChange={handleChange}
        fullWidth
        label="Name"
        name="name"
      />
      <FormField
        value={form.oppositionParty.phone}
        handleChange={handleChange}
        fullWidth
        label="Phone"
        name="phone"
      />
      <FormField
        value={form.oppositionParty.lawyerName}
        handleChange={handleChange}
        fullWidth
        label="Lawyer Name"
        name="lawyerName"
      />
    </FormCard>
  );
};

export default CaseOppositionParty;
