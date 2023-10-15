import Header from "../../components/Header";
import { Box, Typography, TextField, Button } from "@mui/material";

const Dashboard = () => {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="داشبورد" subtitle="به داشورد خود خوش آمدید." />
      </Box>
    </Box>
  );
};

export default Dashboard;
