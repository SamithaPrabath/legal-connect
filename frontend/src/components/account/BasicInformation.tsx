import DefaultProfile from "@assets/images/default_profile.png";
import FormField from "@components/FormField";
import MUIButton from "@components/MUIButton";
import { Box, useTheme } from "@mui/material";
import { BasicInfo } from "@type/User";
import FormCard from "../FormCard";
import { useRef, useState } from "react";
import { flexCenter } from "@assets/style/boxStyles";

type PropTypes = {
  form: BasicInfo;
  handleData: (name: string, value: string | null) => void;
};

const BasicInformation = ({ form, handleData }: PropTypes) => {
  const [imgStyle, setImgStyle] = useState<{ width?: string; height?: string }>(
    {
      height: "100%",
    }
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
        handleData("image", base64String);

        const img = new Image();
        img.src = base64String;
        img.onload = () => {
          if (img.width > img.height) {
            setImgStyle({ height: "100%", width: "auto" });
          } else {
            setImgStyle({ width: "100%", height: "auto" });
          }
        };
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
          <Box
            width="100px"
            height="100px"
            borderRadius="50%"
            overflow="hidden"
            {...flexCenter}
          >
            <img
              src={form.image || DefaultProfile}
              width={imgStyle.width}
              height={imgStyle.height}
            />
          </Box>

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
          />
          <FormField
            fullWidth
            value={form.language}
            handleChange={handleData}
            label="Language"
            name="language"
          />
          <Box {...formRowFlexStyle}>
            <FormField
              fullWidth
              value={form.location}
              handleChange={handleData}
              label="Location"
              name="location"
            />
            <FormField
              fullWidth
              value={form.city}
              handleChange={handleData}
              label="City"
              name="city"
            />
          </Box>
        </Box>
      </Box>
    </FormCard>
  );
};

export default BasicInformation;
