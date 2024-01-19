import React, { useState } from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  Drawer,
  IconButton
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { ICategory, IAgeGroup } from '../../types';
import styles from './SideBar.module.scss';

interface SidebarProps {
  onCategoryChange: (categoryID: string) => void;
  onAgeGroupChange: (ageGroupID: string) => void;
  categories: ICategory[];
  ageGroups: IAgeGroup[];
  selectedCategory: string;
  selectedAgeGroup: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  ageGroups,
  selectedCategory,
  selectedAgeGroup,
  onCategoryChange,
  onAgeGroupChange
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCategoryChange = (categoryID: string) => {
    const newCategory = selectedCategory === categoryID ? "" : categoryID;
    onCategoryChange(newCategory);
  };

  const handleAgeGroupChange = (ageGroupID: string) => {
    const newAgeGroup = selectedAgeGroup === ageGroupID ? "" : ageGroupID;
    onAgeGroupChange(newAgeGroup);
  };

  const sidebarContent = (
    <Box className={styles.sidebarContainer} sx={{ backgroundColor: 'transparent'}}>
      <Typography variant="h5" sx={{ color: 'white', mb: 2 }}>Filter by</Typography>

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
                    sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }}
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
                    sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }}
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

  return (
    <>
      <Box
      sx={{ 
        display: { xs: 'flex', sm: 'none' }, 
        alignItems: 'center', 
        marginLeft: 'auto',
        color: 'white',
        justifyContent: 'flex-end',
      }}
    >
      <Typography variant="subtitle1" sx={{ marginRight: 1 }}>
        Filter
      </Typography>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleDrawerToggle}
      >
        <FilterAltIcon />
      </IconButton>
    </Box>

      <Drawer
        disableScrollLock
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ width: '66vw',
          display: { xs: 'block', sm: 'none' },
          '.MuiDrawer-paper': {
            backgroundColor: '#2e2e2e',
            color: 'white',
            width: '80vw',
            paddingLeft: 4 // Menambahkan padding di sisi kiri
          }
        }}
      >
        {sidebarContent}
      </Drawer>

      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        {sidebarContent}
      </Box>
    </>
  );
};

export default Sidebar;