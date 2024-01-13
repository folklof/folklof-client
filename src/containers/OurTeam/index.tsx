import { Avatar, Box, Grid, Typography } from "@mui/material";
import styles from './OurTeam.module.scss';
import avicena from '../../assets/avicena.jpeg'
import sigit from '../../assets/sigit.jpg'
import hasan from '../../assets/hasan.jpg'
import alyuza from '../../assets/alyuza.jpg'
import renaldi from '../../assets/renaldi.jpg'
import najmy from '../../assets/najmy.jpg'

const OurTeam: React.FC = () => {
  const teamMembers = [
    { name: 'Muhammad Avicena', role: 'Project Lead, Back-end', img: avicena },
    { name: 'Sigit Wiranto', role: 'Lead Front-end, UI/UX', img: sigit },
    { name: 'Mohammad Hasan', role: 'SQA', img: hasan },
    { name: 'Alyuza Satrio Prayogo', role: 'Front-end', img: alyuza },
    { name: 'Renaldi P. Basuki', role: 'Front-end', img: renaldi },
    { name: 'Muhamad Najmy', role: 'Front-end', img: najmy },
  ];

  return (
    <>
      <Box className={styles.container}>
        <Typography className={styles.header} variant="h4">
          OurTeam
        </Typography>
        <Grid container spacing={2}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box className={styles.items}>
                <Avatar src={member.img} alt={`${member.name}'s profile`} style={{ width: '150px', height: 'auto' }} />
                <Typography className={styles.name}>{member.name}</Typography>
                <Typography className={styles.role}>{member.role}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default OurTeam;
