import { border, flexCenter } from "@assets/style/boxStyles";
import FormField from "@components/FormField";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import InfoCard from "./InfoCard";

const About = () => {
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const hanldeInputChange = (value: string) => {
    if (options.length > 0) {
      const tempOptions = [...options];
      tempOptions[0] = value;
      setOptions(tempOptions);
    } else setOptions([value]);
  };

  const onChange = (_: string, value: string | null) => {
    if (!value) return;
    setSelectedOptions((prev) => [...prev, value]);
  };

  return (
    <InfoCard id="about" title="About">
      <FormField fullWidth label="Bio" name="bio" multiline rows={4} />
      <FormField
        fullWidth
        label="Practice Areas"
        name="practiceAreas"
        autocomplete
        options={options}
        optionLabel={(option) => option}
        onInputChange={hanldeInputChange}
        handleChange={onChange}
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
        {selectedOptions.map((option) => (
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
            <IoClose />
          </Box>
        ))}
      </Box>
      <FormField
        fullWidth
        label="Credentials & Education"
        name="credentialsAndEducation"
        multiline
        rows={4}
      />
      <FormField
        fullWidth
        label="Work History"
        name="workHistory"
        multiline
        rows={4}
      />
    </InfoCard>
  );
};

export default About;
