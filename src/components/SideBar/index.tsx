import React, { FC, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  FormControl,
  Checkbox,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./Sidebar.module.scss";

const categories = [
  "Action & Adventure",
  "Activities & Hobbies",
  "Animals & Nature",
  "Education & Learning",
  "Fairy Tales, Folk Tales & Myths",
  // ... add more categories as needed
];

const ageRanges = ["3 - 5 years", "6 - 8 years", "9 - 12 years"];

const durationFilters = ["1 - 2 minutes", "2 - 3 minutes", "3 - 5 minutes"];

const Sidebar: FC = () => {
  const [selectedAge, setSelectedAge] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<boolean>(false);
  const [expandedAge, setExpandedAge] = useState<boolean>(false);
  const [expandedDuration, setExpandedDuration] = useState<boolean>(false);

  const handleAgeChange = (ageRange: string) => {
    if (selectedAge === ageRange) {
      // If the age range is already selected, unselect it
      setSelectedAge("");
    } else {
      // Otherwise, set it as the selected age range
      setSelectedAge(ageRange);
    }
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.name;
    setSelectedDuration(
      selectedDuration.includes(value)
        ? selectedDuration.filter((d) => d !== value)
        : [...selectedDuration, value]
    );
  };

  const toggleCategoriesAccordion = () => {
    setExpandedCategories(!expandedCategories);
  };

  const toggleAgeAccordion = () => {
    setExpandedAge(!expandedAge);
  };

  const toggleDurationAccordion = () => {
    setExpandedDuration(!expandedDuration);
  };

  return (
    <div className={styles.sidebar}>
      <Accordion
        expanded={expandedCategories}
        onChange={toggleCategoriesAccordion}
        sx={{ background: "transparent", color: "white" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
        >
          <Typography>Categories</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {categories.map((category, index) => (
              <ListItem button key={index}>
                <ListItemText primary={category} />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expandedAge}
        onChange={toggleAgeAccordion}
        sx={{ background: "transparent", color: "white" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
        >
          <Typography>Filter by Age</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl component="fieldset" fullWidth>
            <FormGroup>
              {ageRanges.map((ageRange, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={selectedAge === ageRange}
                      onChange={() => handleAgeChange(ageRange)}
                      name={ageRange}
                      sx={{ color: "white" }} // Checkbox color
                    />
                  }
                  label={ageRange}
                  sx={{ color: "white", marginLeft: 1 }} // Label color
                />
              ))}
            </FormGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expandedDuration}
        onChange={toggleDurationAccordion}
        sx={{ background: "transparent", color: "white" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
        >
          <Typography>Filter by Duration</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl component="fieldset" fullWidth>
            <FormGroup>
              {durationFilters.map((duration) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedDuration.includes(duration)}
                      onChange={handleDurationChange}
                      name={duration}
                      sx={{ color: "white" }} // Checkbox color
                    />
                  }
                  label={duration}
                  sx={{ color: "white", marginLeft: 1 }} // Label color
                />
              ))}
            </FormGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Sidebar;
