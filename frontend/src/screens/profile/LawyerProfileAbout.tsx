import ParentCard from "@components/ParentCard";
import { Circle } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import { useAppSelector } from "@redux/hooks";
import { AboutInfo } from "@type/User";
import { useEffect, useState } from "react";

const LawyerProfileAbout = () => {
  const [firstName, setFirstName] = useState("");
  const [about, setAbout] = useState<AboutInfo | null>(null);

  const credentialsAndEducation = about?.credentialsAndEducation?.split("\n") || [];
  const workHistory = about?.workHistory?.split("\n") || [];

  const user = useAppSelector(state => state.user.user.data);

  useEffect(() => {
    if (!user) return;
    if (user.basicInfo) setFirstName(user.basicInfo.firstName);
    if (user.aboutInfo) setAbout(user.aboutInfo);
  },[user])

  return (
    <Box display="flex" flexDirection="column" gap="20px" mt="20px" height="calc(100dvh - 190px)">
      <ParentCard titleVariant="h3" title={`About ${firstName}`}>
        <ProfileDetail label="Bio" detail={about?.bio || ""} />
        <ProfileDetail label="Pratice Areas" detail={about?.practiceAreas || []} />
        <ProfileDetail
          label="Credentials & Education"
          detail={credentialsAndEducation}
        />
        <ProfileDetail label="Work History" detail={workHistory} />
      </ParentCard>
      <ParentCard titleVariant="h3" title="Contact Information">
        <ContactInformationDetail
          label="Email"
          detail={user?.contactInfo.email || ""}
        />
        <ContactInformationDetail label="Phone" detail={user?.contactInfo.phone || ""} />
        <ContactInformationDetail label="Consultation Fee" detail="$200/hour" />
      </ParentCard>
    </Box>
  );
};

type ProfileAboutDetailProps = {
  label: string;
  detail: string | string[];
};

type ContactInformationDetailProps = {
  label: string;
  detail: string;
};

const ContactInformationDetail = ({
  label,
  detail,
}: ContactInformationDetailProps) => {
  return (
    <Box display="flex" gap="20px" alignItems="center" justifyContent="space-between" width="800px">
      <Typography variant="body2">{label}</Typography>
      <Typography variant="body1" width="400px" textOverflow="ellipsis">{`: ${detail}`}</Typography>
    </Box>
  );
};

const ProfileDetail = ({ label, detail }: ProfileAboutDetailProps) => {

    const { text } = useTheme().palette;

  return (
    <Box>
      <Typography variant="h5" my="15px">
        {label}
      </Typography>
      {typeof detail === "string" ? (
        <Typography ml="5px" variant="body2">{detail}</Typography>
      ) : (
        Array.isArray(detail) &&
        detail.map((detail) => (
          <Box ml="5px" display="flex" gap="10px" alignItems="center" fontSize="5px" color={text.secondary}>
            <Circle fontSize="inherit" />
            <Typography variant="body2">{detail}</Typography>
          </Box>
        ))
      )}
    </Box>
  );
};

export default LawyerProfileAbout;
