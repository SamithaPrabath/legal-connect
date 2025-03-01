import ParentCard from "@components/ParentCard";
import { Circle } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";

const LawyerProfileAbout = () => {
  const firstname = "Sarah";
  const bio =
    "Sarah Johnson is a dedicated corporate law expert with over 10 years of experience providing legal solutions for startups, small businesses, and multinational corporations. Her practice focuses on contract law, mergers and acquisitions, and compliance.";

  const praticeAreas = [
    "Corporate Law",
    "Intellectual Property",
    "Employment Law",
    "Business Contracts",
  ];

  const credentialsAndEducation = [
    "Juris Doctor (JD): Harvard Law School",
    " BA in Political Science: Stanford University",
    " Bar Admissions: State of New York, California",
  ];
  const workHistory = [
    "Senior Partner: Johnson & Smith LLP (2016 - Present)",
    " Associate Attorney: Global Legal Solutions (2010 - 2016)",
  ];

  return (
    <Box display="flex" flexDirection="column" gap="20px" mt="20px">
      <ParentCard titleVariant="h3" title={`About ${firstname}`}>
        <ProfileDetail label="Bio" detail={bio} />
        <ProfileDetail label="Pratice Areas" detail={praticeAreas} />
        <ProfileDetail
          label="Credentials & Education"
          detail={credentialsAndEducation}
        />
        <ProfileDetail label="Work History" detail={workHistory} />
      </ParentCard>
      <ParentCard titleVariant="h3" title="Contact Information">
        <ContactInformationDetail
          label="Email"
          detail="thushara.abeykoon99@gmail.com"
        />
        <ContactInformationDetail label="Phone" detail="+94 768664719" />
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
