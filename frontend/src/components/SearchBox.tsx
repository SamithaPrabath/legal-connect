import { InputAdornment } from "@mui/material";
import FormField from "./FormField";
import { Search } from "@mui/icons-material";

type SearchBoxProps = {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
  };
  
  

const SearchBox = ({ name, setName }: SearchBoxProps) => {
    return (
      <FormField
        label=""
        name=""
        variant="outlined"
        placeholder="Search Box"
        value={name}
        handleChange={(_, value) => setName(value || "")}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search fontSize="small" />
            </InputAdornment>
          ),
          style: { fontSize: 14 }, // Adjust text size if needed
        }}
        sx={{
          width: 300, // Adjust width
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px", // Rounded corners
          },
        }}
      />
    );
  };

  export default SearchBox;