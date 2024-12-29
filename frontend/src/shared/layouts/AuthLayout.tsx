import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

const AuthRoot = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  width: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
  overflow: 'auto',
}));

export const AuthLayout = () => {
  return (
    <AuthRoot>
      <Outlet />
    </AuthRoot>
  );
};
