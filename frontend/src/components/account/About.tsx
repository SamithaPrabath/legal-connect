import { border, flexCenter } from "@assets/style/boxStyles";
import FormField from "@components/FormField";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import FormCard from "../FormCard";
import { AboutInfo } from "@type/User";

type PropTypes = {
  form: AboutInfo | null,
  handleData: (name: string, value: string |  null) => void
  removePracticeArea: (value:string) => void
}

const About = ({form, handleData, removePracticeArea}:PropTypes) => {

  if (!form) return null;

  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    setOptions(form.practiceAreas);
  },[form.practiceAreas])

  const hanldeInputChange = (value: string) => {
    if (options.length > 0) {
      const tempOptions = [...options];
      tempOptions[0] = value;
      setOptions(tempOptions);
    } else setOptions([value]);
  };

  return (
    <FormCard id="about" title="About">
      <FormField fullWidth value={form.bio} handleChange={handleData} label="Bio" name="bio" multiline rows={4} />
      <FormField
        fullWidth
        label="Practice Areas"
        name="practiceAreas"
        autocomplete
        options={options}
        optionLabel={(option) => option}
        onInputChange={hanldeInputChange}
        handleChange={handleData}
        value={null}
      />
      <Box
        p="10px"
        borderRadius="4px"
        height="100px"
        mb={2}
        {...border}
        flexWrap="wrap"
        display="flex"
        alignItems="start"
        alignContent="start"
        gap="5px"
        justifyContent="start"
      >
        {form.practiceAreas.map((option) => (
          <Box
            bgcolor="black"
            width="fit-content"
            px={1}
            borderRadius="4px"
            color="white"
            {...flexCenter}
            gap="3px"
            py="5px"
            sx={{ color: "white", fontSize: "14px" }}
          >
            <Typography variant="body1" color="inherit">
              {option}
            </Typography>
            <IoClose onClick={() => removePracticeArea(option)} />
          </Box>
        ))}
      </Box>
      <FormField
        fullWidth
        label="Credentials & Education"
        name="credentialsAndEducation"
        multiline
        rows={4}
        value={form.credentialsAndEducation}
        handleChange={handleData}
      />
      <FormField
        fullWidth
        label="Work History"
        name="workHistory"
        multiline
        rows={4}
        value={form.workHistory}
        handleChange={handleData}
      />
    </FormCard>
  );
};

export default About;
