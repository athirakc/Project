import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [emailError,setEmailError] = useState();
  const [passwordError,setPasswordError] = useState();
  const navigate = useNavigate();
  const handleSubmit = async(event) => {
    event.preventDefault();

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

    if(email && password) {
      try {
        let response = await fetch("http://localhost:5000/api/users/login",{
          method:"POST",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        });

        let data = await response.json();
        if(response.ok) {
          alert(data.message);
          console.log(data);
          localStorage.setItem("token",data.token);
          let getItem = localStorage.getItem("token");
          if(getItem) {
          navigate("/");
          }
        }else{
          alert(data.message);
          console.log(data);
        }
      } catch (error) {
        console.log(error); 
      }
    }

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
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
            <form>
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
                  emailError && <p style={{color:"red"}}>{emailError}</p>
                }
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {
                  passwordError && <p style={{color:"red"}}>{passwordError}</p>
                }
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 , background:"#222B59", "&hover": {background: "#262f5d"} }}
                    onClick={handleSubmit}
                >
                    Sign In
                </Button>
            </form>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" sx={{ color:"#222B59"}} underline="hover">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signUp" variant="body2"  sx={{ color:"#222B59"}} underline="hover">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}