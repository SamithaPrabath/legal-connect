import FormField from "@components/FormField";
import ImageCompo from "@components/ImageCompo";
import MUIButton from "@components/MUIButton";
import { Box, useTheme } from "@mui/material";
import { BasicInfo, UserType } from "@type/User";
import { useEffect, useRef } from "react";
import FormCard from "../FormCard";
import provinces from "@assets/json/provinces.json";

type PropTypes = {
  userType: UserType,
  form: BasicInfo;
  handleData: (name: string, value: string | null) => void;
};

const BasicInformation = ({ userType, form, handleData }: PropTypes) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (form.occupation === "Lawyer") return;
    if (userType === UserType.LAWYER) {
      handleData("occupation", "Lawyer");
    }
  },[userType, form])

  useEffect(() => {
    if (!provinces || provinces.length === 0) return;
    handleData("location", provinces[0]);
  },[provinces]);

  useEffect(() => {
    handleData("language", "English");
  },[])

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        handleData("image", base64String.split(",")[1]);

      };
      reader.onerror = (error) =>
        console.error("Error converting file to base64:", error);
    }
  };

  const { divider } = useTheme().palette;
  const formRowFlexStyle = {
    gap: "20px",
    display: "flex",
  };

  const profileImageSectionStyle = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
    width: "15%",
    alignItems: "center",
    justifyContent: "start",
    py: "40px",
    px: "10px",
    borderRight: `1px solid ${divider}`,
  };

  return (
    <FormCard id="basicInfo" title="Basic Information">
      <Box width="100%" display="flex">
        <Box {...profileImageSectionStyle}>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <ImageCompo base64String={form.image} />

          <MUIButton
            onClick={handleButtonClick}
            variant="outlined"
            color="secondary"
          >
            Upload
          </MUIButton>
        </Box>
        <Box width="85%" p="20px" display="flex" flexDirection="column">
          <Box {...formRowFlexStyle}>
            <FormField
              fullWidth
              value={form.firstName}
              handleChange={handleData}
              label="First Name"
              name="firstName"
            />
            <FormField
              fullWidth
              value={form.lastName}
              handleChange={handleData}
              label="Last Name"
              name="lastName"
            />
          </Box>
          <FormField
            fullWidth
            value={form.occupation}
            handleChange={handleData}
            label="Occupation"
            name="occupation"
            readOnly={userType === UserType.LAWYER}
          />
          <FormField
              fullWidth
              value={form.language}
              handleChange={handleData}
              label="Language"
              name="language"
              options={["English", "Sinhala", "Tamil"]}
              optionLabel={option => option}
              autocomplete
            />
          <Box {...formRowFlexStyle}>
            <FormField
              fullWidth
              value={form.city}
              handleChange={handleData}
              label="City"
              name="city"
            />
            <FormField
              fullWidth
              value={form.location}
              handleChange={handleData}
              label="Province"
              name="location"
              options={provinces}
              optionLabel={option => option}
              autocomplete
            />
          </Box>
        </Box>
      </Box>
    </FormCard>
  );
};

export default BasicInformation;
