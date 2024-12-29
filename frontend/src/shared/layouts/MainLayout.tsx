import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: 'background.default',
                py: 4,
            }}
        >
            <Container maxWidth="lg">
                <Outlet />
            </Container>
        </Box>
    );
};
