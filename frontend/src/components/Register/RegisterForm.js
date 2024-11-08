import { useState } from "react";
import { register } from "../../redux/features/login/auth";
import { useDispatch } from "react-redux";
import { Box, Button, FormLabel, TextField } from "@mui/material";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({
    username: String,
    password: String,
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(credentials));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        width: '300px',
        margin: 'auto',
        padding: 4,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <FormLabel component="legend">Inscription</FormLabel>
      <TextField
        label="Nom d'utilisateur"
        variant="outlined"
        name="username"
        value={credentials.username}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Mot de passe"
        type="password"
        variant="outlined"
        name="password"
        value={credentials.password}
        onChange={handleChange}
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
      >
        S'inscrire
      </Button>
    </Box>
  );
};

export default RegisterForm;