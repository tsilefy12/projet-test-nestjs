import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box, CircularProgress, Alert } from '@mui/material';
import { login } from '../../redux/features/login/auth';
import { Link } from 'react-router-dom';
const LoginForm = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(credentials));
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
      {error && <Alert severity="error">{error}</Alert>}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Se connecter'}
      </Button>
      <Button component={Link} to="/register" variant="contained" color="primary" fullWidth>
        S'inscrire
      </Button>
    </Box>
  );
};

export default LoginForm;
