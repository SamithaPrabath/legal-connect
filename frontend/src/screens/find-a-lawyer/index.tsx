import { flexCenter } from "@assets/style/boxStyles";
import SearchResultCard from "@components/find-a-lawyer/SearchResultCard";
import FormField from "@components/FormField";
import MUIButton from "@components/MUIButton";
import MUITextField from "@components/MUITextField";
import { Box, MenuItem, Typography } from "@mui/material";
import { UserStatus } from "@type/User";
import { useState } from "react";

enum SortOptions {
  BAST_MATCH = "Best Match"
}

const FindALawyer = () => {

  const [selectedLocation, setSelectedLocation]  = useState<string>("New York")
  const [selectedCaseType, setSelectedCaseType]  = useState<string>("Corporate Law")

  const results = [
    {
      location: "New York, USA",
      name: "John Doe",
      status: UserStatus.AVAILABLE,
      occupation: "Software Engineer",
      rating: 4.8,
      reviewCount: 120
    },
    {
      location: "London, UK",
      name: "Emily Smith",
      status: UserStatus.AVAILABLE,
      occupation: "Graphic Designer",
      rating: 4.5,
      reviewCount: 98
    },
    {
      location: "Toronto, Canada",
      name: "Michael Johnson",
      status: UserStatus.UNAVAILABLE,
      occupation: "Data Scientist",
      rating: 4.7,
      reviewCount: 85
    },
    {
      location: "Berlin, Germany",
      name: "Sophia Müller",
      status: UserStatus.AVAILABLE,
      occupation: "Marketing Specialist",
      rating: 3.6,
      reviewCount: 112
    },
  ]

  return (
    <Box height="calc(100dvh - 150px)" bgcolor="white" pt="80px">
      <Typography
        variant="h2"
        fontWeight={700}
        sx={{ color: "#3d3d3d", textAlign: "center", fontSize: "36px" }}
        mb="50px"
      >
        Find a Laywer
      </Typography>
      <Box {...flexCenter} alignItems="end" gap="10px" maxWidth="1000px" margin="auto" mb="50px">
        <FormField boxProps={{mb:0}} fullWidth label="Case Type" name="caseType" />
        <FormField boxProps={{mb:0}} fullWidth label="Location" name="location" />
        <FormField boxProps={{mb:0}} fullWidth label="Language" name="language" />
        <Box width="600px"><MUIButton fullWidth>Search</MUIButton></Box>
      </Box>
      <Box {...flexCenter} justifyContent="space-between" px="30px">
        <Typography variant="h5">{`${selectedLocation} has ${results.length} ${selectedCaseType} Attorneys`}</Typography>
        <Box {...flexCenter} gap="10px">
          <Typography>Sort By </Typography><SortOptionDropdown />
        </Box>
      </Box>
      <Box py="10px" px="30px" display="flex" flexDirection="column" gap="20px">
        {results.map(result => <SearchResultCard {...result} />)}
      </Box>
    </Box>
  );
};

const SortOptionDropdown = () => {
  const [value, setValue] = useState(SortOptions.BAST_MATCH);
  return (
    <MUITextField
      select
      name=""
      value={value}
      onChange={(e) => setValue(e.target.value as SortOptions)}
      variant="outlined"
      sx={{ width: "150px" }}
      defaultValue={SortOptions.BAST_MATCH}
    >
      <MenuItem value={SortOptions.BAST_MATCH}>
        Best Match
      </MenuItem>
    </MUITextField>
  );
};


export default FindALawyer;
