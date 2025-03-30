import FormField from "@components/FormField";
import { useAppSelector } from "@redux/hooks";
import { CaseForm } from "@type/Case";
import { useEffect, useState } from "react";
import FormCard from "../FormCard";

type PropTypes = {
  form: CaseForm;
  handleChange: (name: string, value: string | null) => void;
};

const CaseBasicInformation = ({ form, handleChange }: PropTypes) => {
  const [options, setOptions] = useState<string[]>([]);

  const { data: caseTypeList } = useAppSelector(
    (state) => state.case.caseTypes
  );

  useEffect(() => {
    setOptions(caseTypeList || []);
  }, [caseTypeList]);

  const onInputChange = (value: string) => {
    if (options.length > 0) {
      const tempOptions = [...options];
      tempOptions[0] = value;
      setOptions(tempOptions);
    } else setOptions([value]);
  };

  return (
    <FormCard id="caseBasicInfo" title="Basic Information" mt="20px">
      <FormField
        handleChange={handleChange}
        value={form.caseNumber}
        fullWidth
        label="Case Number"
        name="caseNumber"
      />
      <FormField
        handleChange={handleChange}
        value={form.caseName}
        fullWidth
        label="Case Name"
        name="caseName"
      />
      <FormField
        handleChange={handleChange}
        value={form.caseType}
        autocomplete
        fullWidth
        label="Case Type"
        name="caseType"
        onInputChange={onInputChange}
        options={options}
        optionLabel={(option) => option}
      />
    </FormCard>
  );
};

export default CaseBasicInformation;
