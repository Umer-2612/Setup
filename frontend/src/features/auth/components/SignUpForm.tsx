import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  Typography,
  CircularProgress,
  useTheme,
  useMediaQuery,
  alpha,
  LinkProps,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useSignUpMutation } from "../services/auth.api";
import toast from 'react-hot-toast';

const FormWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "440px",
  padding: theme.spacing(4, 3),
  borderRadius: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  boxShadow: `0 2px 24px ${alpha(theme.palette.primary.dark, 0.08)}`,
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(5, 4),
  },
}));

const Form = styled("form")({
  width: "100%",
});

const FormHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  textAlign: "center",
}));

const FormFields = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(2.5),
  marginBottom: theme.spacing(3),
}));

const InputField = styled(FormControl)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.spacing(1.5),
    backgroundColor: alpha(theme.palette.primary.main, 0.02),
    transition: theme.transitions.create(["box-shadow", "background-color"]),
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.03),
    },
    "&.Mui-focused": {
      backgroundColor: alpha(theme.palette.primary.main, 0.03),
      boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`,
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: alpha(theme.palette.text.primary, 0.08),
  },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
}));

const NameFields = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: theme.spacing(2.5),
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  height: "48px",
  borderRadius: theme.spacing(1.5),
  textTransform: "none",
  fontSize: "1rem",
  fontWeight: 600,
  boxShadow: "none",
  "&:hover": {
    boxShadow: "none",
    backgroundColor: alpha(theme.palette.primary.main, 0.9),
  },
}));

const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: "0.75rem",
  marginTop: theme.spacing(0.5),
  marginLeft: theme.spacing(1.5),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
}));

const Footer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  textAlign: "center",
}));

// Extend styled Link with RouterLink
const StyledLink = styled(Link)<LinkProps & { to?: string }>(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
  fontWeight: 500,
  transition: theme.transitions.create("color"),
  "&:hover": {
    color: theme.palette.primary.dark,
  },
}));

export const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signUp, { isLoading }] = useSignUpMutation();
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        await signUp(values).unwrap();
        toast.success('Account created successfully!');
        navigate('/dashboard');
      } catch (error) {
        toast.error('Failed to create account. Please try again.');
      }
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <FormWrapper>
      <Form onSubmit={formik.handleSubmit} noValidate>
        <FormHeader>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            gutterBottom
            sx={{
              fontWeight: 700,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            Create Account
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.95rem" }}
          >
            Join us and start your journey
          </Typography>
        </FormHeader>

        <FormFields>
          <NameFields>
            <InputField
              error={Boolean(
                formik.touched.firstName && formik.errors.firstName
              )}
              fullWidth
            >
              <InputLabel>First Name</InputLabel>
              <OutlinedInput
                id="firstName"
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <ErrorMessage>{formik.errors.firstName}</ErrorMessage>
              )}
            </InputField>

            <InputField
              error={Boolean(formik.touched.lastName && formik.errors.lastName)}
              fullWidth
            >
              <InputLabel>Last Name</InputLabel>
              <OutlinedInput
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <ErrorMessage>{formik.errors.lastName}</ErrorMessage>
              )}
            </InputField>
          </NameFields>

          <InputField
            error={Boolean(formik.touched.email && formik.errors.email)}
            fullWidth
          >
            <InputLabel>Email</InputLabel>
            <OutlinedInput
              id="email"
              type="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <ErrorMessage>{formik.errors.email}</ErrorMessage>
            )}
          </InputField>

          <InputField
            error={Boolean(formik.touched.password && formik.errors.password)}
            fullWidth
          >
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                    sx={{
                      color: theme.palette.text.secondary,
                      "&:hover": {
                        backgroundColor: alpha(
                          theme.palette.primary.main,
                          0.08
                        ),
                      },
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {formik.touched.password && formik.errors.password && (
              <ErrorMessage>{formik.errors.password}</ErrorMessage>
            )}
          </InputField>
        </FormFields>

        <SubmitButton
          type="submit"
          variant="contained"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Create Account"
          )}
        </SubmitButton>

        <Footer>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{" "}
            <StyledLink component={RouterLink} to="/signin">
              Sign In
            </StyledLink>
          </Typography>
        </Footer>
      </Form>
    </FormWrapper>
  );
};
