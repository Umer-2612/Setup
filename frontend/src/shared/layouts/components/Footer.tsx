import { Box, Container, Typography, Link, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

export const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: 'background.paper',
                borderTop: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        © {new Date().getFullYear()} Your Company. All rights reserved.
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Link href="#" color="text.secondary" sx={{ textDecoration: 'none' }}>
                            Privacy Policy
                        </Link>
                        <Link href="#" color="text.secondary" sx={{ textDecoration: 'none' }}>
                            Terms of Service
                        </Link>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton color="primary" aria-label="GitHub" component="a" href="#">
                            <GitHubIcon />
                        </IconButton>
                        <IconButton color="primary" aria-label="LinkedIn" component="a" href="#">
                            <LinkedInIcon />
                        </IconButton>
                        <IconButton color="primary" aria-label="Twitter" component="a" href="#">
                            <TwitterIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};
