import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import styles from './OurTeam.module.scss';
import avicena from '../../assets/avicena.jpeg'
import sigit from '../../assets/sigit.jpg'
import hasan from '../../assets/hasan.jpg'
import alyuza from '../../assets/alyuza.jpg'
import renaldi from '../../assets/renaldi.jpg'
import najmy from '../../assets/najmy.jpg'

const OurTeam: React.FC = () => {
  const teamMembers = [
    {
      name: 'Muhammad Avicena',
      role: 'Project Lead, Back-end',
      img: avicena,
      linkedIn: 'https://www.linkedin.com/in/muhammad-avicena/',
      github: 'https://github.com/muhammad-avicena',
      email: 'cenarahmant.dev@gmail.com',
    },
    {
      name: 'Sigit Wiranto',
      role: 'Lead Front-end, UI/UX',
      img: sigit,
      linkedIn: 'https://www.linkedin.com/in/sigit-wiranto-699247196/',
      github: 'https://github.com/sigitwie',
      email: 'wirsigit@gmail.com',
    },
    {
      name: 'Mohammad Hasan',
      role: 'Software Quality Assurance',
      img: hasan,
      linkedIn: 'https://www.linkedin.com/in/mohammad-hasan-451811212/',
      github: 'https://github.com/h-san8664',
      email: 'moh.hasfiy93@gmail.com',
    },
    {
      name: 'Alyuza Satrio Prayogo',
      role: 'Front-end',
      img: alyuza,
      linkedIn: 'https://www.linkedin.com/in/alyuzasp/',
      github: 'https://github.com/alyuza',
      email: 'alyuza.sat@gmail.com',
    },
    {
      name: 'Renaldi P. Basuki',
      role: 'Front-end',
      img: renaldi,
      linkedIn: 'https://www.linkedin.com/in/renaldi-prasetyo-basuki/',
      github: 'https://github.com/RPrasetyoB',
      email: 'rpbasuki.dev@gmail.com',
    },
    {
      name: 'Muhammad Najmy Tsaqiby',
      role: 'Front-end',
      img: najmy,
      linkedIn: 'https://www.linkedin.com/in/muhammad-najmy-tsaqiby-1b4561173/',
      github: 'https://github.com/mnajmytsss',
      email: 'najmytsaqiby22@gmail.com',
    },
  ];

  const redirectToLinkedIn = (url: string) => {
    window.open(url, '_blank');
  };

  const redirectToGitHub = (url: string) => {
    window.open(url, '_blank');
  };

  const redirectToEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

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
                <Typography className={styles.name} variant="h4">{member.name}</Typography>
                <Typography className={styles.role}>{member.role}</Typography>
                <Box sx={{ display: 'flex' }}>
                  <IconButton sx={{ color: "#ffff", padding: '0', marginRight: '5px' }} onClick={() => redirectToLinkedIn(member.linkedIn)}>
                    <LinkedInIcon sx={{ fontSize: '28px', padding: '0' }} />
                  </IconButton>
                  <IconButton sx={{ color: "#ffff", padding: '0', marginRight: '5px' }} onClick={() => redirectToEmail(member.email)}>
                    <EmailIcon sx={{ fontSize: '30px' }} />
                  </IconButton>
                  <IconButton sx={{ color: "#ffff", padding: '0', marginRight: '6px' }} onClick={() => redirectToGitHub(member.github)}>
                    <GitHubIcon sx={{ fontSize: '24px' }} />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default OurTeam;