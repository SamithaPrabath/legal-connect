import FormField from "@components/FormField";
import { ContactInfo } from "@type/User";
import FormCard from "../FormCard";

type PropTypes = {
  form: ContactInfo;
  handleData?: (name: string, value: string | null) => void;
  readonly: boolean;
};

const ContactInformation = ({ form, handleData, readonly }: PropTypes) => {
  return (
    <FormCard id="contactInfo" title="Contact Information" mt="20px">
      <FormField
        readOnly
        value={form.email}
        handleChange={handleData}
        fullWidth
        label="Email"
        name="email"
      />
      <FormField
        readOnly
        value={form.phone}
        handleChange={handleData}
        fullWidth
        label="Phone"
        name="phone"
      />
      <FormField
        readOnly
        value={form.address}
        handleChange={handleData}
        fullWidth
        label="Address"
        name="address"
      />
    </FormCard>
  );
};

export default ContactInformation;
