import { findLawyerAction } from "@actions/userActions";
import { flexCenter } from "@assets/style/boxStyles";
import SearchResultCard from "@components/find-a-lawyer/SearchResultCard";
import FormField from "@components/FormField";
import MUIButton from "@components/MUIButton";
import MUITextField from "@components/MUITextField";
import { Box, CircularProgress, MenuItem, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { UserStatus } from "@type/User";
import { useEffect, useState } from "react";
import caseTypes from "@assets/json/case-types.json";
import provinces from "@assets/json/provinces.json";
import languages from "@assets/json/languages.json";

enum SortOptions {
  BAST_MATCH = "Best Match",
}

const FindALawyer = () => {
  const [location, setLocation] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [caseType, setCaseType] = useState<string>("");
  const [sortBy, setSortBy] = useState(SortOptions.BAST_MATCH);
  const [message, setMessage] = useState<string>("");
  const [isSearched, setIsSearched] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { data: lawyerList, loading } = useAppSelector((state) => state.user.list);

  const handleSearch = () => {
    if (!isSearched) setIsSearched(true);
    dispatch(findLawyerAction(caseType, language, location, sortBy));
  };

  useEffect(() => {
    setMessage(`Found ${lawyerList?.length || 0} ${caseType} Attorneys  ${location && "in " + location + " Province"} `);
  },[lawyerList])

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
      <Box
        {...flexCenter}
        alignItems="end"
        gap="10px"
        maxWidth="1000px"
        margin="auto"
        mb="50px"
      >
        <FormField
          boxProps={{ mb: 0 }}
          fullWidth
          label="Case Type"
          name="caseType"
          value={caseType}
          handleChange={(_, value) => setCaseType(value || "")}
          autocomplete
          options={caseTypes}
          optionLabel={option => option}
        />
        <FormField
          boxProps={{ mb: 0 }}
          fullWidth
          label="Province"
          name="location"
          value={location}
          handleChange={(_, value) => setLocation(value || "")}
          autocomplete
          optionLabel={option => option}
          options={provinces}
        />
        <FormField
          boxProps={{ mb: 0 }}
          fullWidth
          label="Language"
          name="language"
          value={language}
          handleChange={(_, value) => setLanguage(value || "")}
          autocomplete
          options={languages}
          optionLabel={option => option}
        />
        <Box width="600px">
          <MUIButton fullWidth onClick={handleSearch}>Search</MUIButton>
        </Box>
      </Box>
      {loading ? <Box {...flexCenter} pt="100px">
        <CircularProgress />
      </Box>
       : isSearched && (
        <Box width="100%">
          <Box {...flexCenter} justifyContent="space-between" px="30px">
            <Typography variant="h5">{message}</Typography>
            <Box {...flexCenter} gap="10px">
              <Typography variant="h5">Sort By </Typography>
              <SortOptionDropdown sortBy={sortBy} setSortBy={setSortBy} />
            </Box>
          </Box>
          <Box py="10px" px="30px" display="flex" flexDirection="column" gap="20px">
            {lawyerList?.map((result) => (
              <SearchResultCard
                id={result.id}
                location={result.basicInfo.location}
                name={result.basicInfo.firstName + " " + result.basicInfo.lastName}
                occupation={result.basicInfo.occupation}
                rating={result.rating || 0}
                reviewCount={result.reviewCount || 0}
                status={result.status as UserStatus}
                image={result.basicInfo.image || ""}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};



interface SortOptionDropdownProps {
  sortBy: SortOptions;
  setSortBy: (value: SortOptions) => void;
}

const SortOptionDropdown: React.FC<SortOptionDropdownProps> = ({ sortBy, setSortBy }) => {
  return (
    <MUITextField
      select
      name=""
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value as SortOptions)}
      variant="outlined"
      sx={{ width: "150px" }}
      defaultValue={SortOptions.BAST_MATCH}
    >
      <MenuItem value={SortOptions.BAST_MATCH}>Best Match</MenuItem>
    </MUITextField>
  );
};

export default FindALawyer;
