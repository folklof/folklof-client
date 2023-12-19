import React from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ICategory, IAgeGroup } from '../../types';

interface SidebarProps {
  onCategoryChange: (categoryID: string) => void;
  onAgeGroupChange: (ageGroupID: string) => void;
  categories: ICategory[];
  ageGroups: IAgeGroup[];
  selectedCategory: string;
  selectedAgeGroup: string;
}

const Sidebar: React.FC <SidebarProps> = ({
  categories,
  ageGroups,
  selectedCategory,
  selectedAgeGroup,
  onCategoryChange,
  onAgeGroupChange
}) => {

  const handleCategoryChange = (categoryID: string) => {
    const newCategory = selectedCategory === categoryID ? "" : categoryID;
    onCategoryChange(newCategory);
  };

  const handleAgeGroupChange = (ageGroupID: string) => {
    const newAgeGroup = selectedAgeGroup === ageGroupID ? "" : ageGroupID;
    onAgeGroupChange(newAgeGroup);
  };

  return (
    <Box sx={{ backgroundColor: 'transparent', width: '18vw', marginTop: '8vh' }}>
      <Typography variant="h5" sx={{ color: 'white' }}>Filter by</Typography>

      <Accordion sx={{ backgroundColor: 'transparent', color: 'white' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
          <Typography>Categories</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {categories.map((category) => (
              <FormControlLabel
                key={category.ID}
                control={
                  <Checkbox
                    checked={selectedCategory === category.ID}
                    onChange={() => handleCategoryChange(category.ID)}
                    sx={{
                      color: 'white',
                      '&.Mui-checked': { color: 'white' },
                    }}
                  />
                }
                label={category.name}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ backgroundColor: 'transparent', color: 'white' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
          <Typography>Age Groups</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {ageGroups.map((ageGroup) => (
              <FormControlLabel
                key={ageGroup.ID}
                control={
                  <Checkbox
                    checked={selectedAgeGroup === ageGroup.ID}
                    onChange={() => handleAgeGroupChange(ageGroup.ID)}
                    sx={{
                      color: 'white',
                      '&.Mui-checked': { color: 'white' },
                    }}
                  />
                }
                label={ageGroup.name}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Sidebar;
