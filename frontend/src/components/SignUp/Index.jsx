import React, {useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {useNavigate } from "react-router-dom";

export default function SignUp() {
  const [name,setName] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [nameError,setNameError] = useState();
  const [emailError,setEmailError] = useState();
  const [passwordError,setPasswordError] = useState();
  const navigate = useNavigate();

  const handleSubmit = async(event) => {
    event.preventDefault();

    if(!name) {
      setNameError("Name is required");
    } else {
      setNameError("");
    }

    if(!email) {
      setEmailError("Email is required");
    }else if(!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid");
    }else {
      setEmailError("");
    }

    if(!password) {
      setPasswordError("Password is required");
    }else {
      setPasswordError("");
    }

    if(name && email && password) {
      try {
        let res = await fetch("http://localhost:5000/api/users/register",{
          method:"POST",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            name,
            email,
            password
          })
        });

        if(res.ok) {
          alert("User Registered Successfully");
          console.log(res);
          navigate("/login");
        }else {
          console.log(res);
          alert("Something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
     

      
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" fontWeight="600" fontSize="45px" color="#222B59">
          Real-Estate
        </Typography>
        <Typography component="h1" variant="h5" color="#222B59">
          Sign Up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
            <form >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="text"
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus

                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {
                  nameError && <div style={{color:"red"}}>{nameError}</div>
                }
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="email"
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus

                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {
                  emailError && <div style={{color:"red"}}>{emailError}</div>
                }
                <FormControl sx={{m:"16px 0 8px 0",width: "100%" }} variant="outlined" required>
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"

                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                  {
                    passwordError && <div style={{color:"red"}}>{passwordError}</div>
                  }
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, background:"#222B59"}}

                    onClick={handleSubmit}
                >
                    Sign Up
                </Button>
            </form>
          <Grid container>
            <Grid item xs>
              <Link href="/login" variant="body2" sx={{ color:"#222B59"}} underline="hover">
                  Already a User? Login.
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}