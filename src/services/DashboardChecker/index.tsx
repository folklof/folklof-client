// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { DashboardPage } from "../../pages"; // Sesuaikan import sesuai lokasi file Anda
// import { Dialog, DialogContent, DialogTitle, TextField, Button } from "@mui/material";

// const DashboardChecker: React.FC = () => {
//   const [user, setUser] = useState(null);
//   const [openModal, setOpenModal] = useState(false);
//   const [age, setAge] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get("{{base_url}}/api/v1/users/profile");
//         setUser(response.data);
//         if (!response.data.age) {
//           setOpenModal(true);
//         }
//       } catch (error) {
//         navigate("/signin");
//       }
//     };

//     fetchUserData();
//   }, [navigate]);

//   const handleAgeSubmit = async () => {
//     try {
//       // Ganti "{{base_url}}/api/v1/users/profile" dengan URL API yang benar
//       await axios.post("{{base_url}}/api/v1/users/profile", { age }, { withCredentials: true });
//       setOpenModal(false);
//       navigate('/dashboard');
//     } catch (error) {
//       console.error("Failed to update age", error);
//     }
//   };

//   return (
//     <>
//       <Dialog open={openModal} onClose={() => setOpenModal(false)}>
//         <DialogTitle>Complete Your Profile</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Age"
//             type="number"
//             fullWidth
//             value={age}
//             onChange={(e) => setAge(e.target.value)}
//             margin="normal"
//           />
//           <Button onClick={handleAgeSubmit} color="primary" variant="contained">
//             Submit
//           </Button>
//         </DialogContent>
//       </Dialog>
//       {user && <DashboardPage />}
//     </>
//   );
// };

// export default DashboardChecker;
