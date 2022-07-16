import { Typography } from "@mui/material";

export default function PasswordHint() {
  return (
    <>
      <Typography variant="body2" color="text.secondary" align="center">
        Username:siguser@synopsys.com
      </Typography>
      <br/>
      <Typography variant="body2" color="text.secondary" align="center">
        Password: password
    </Typography>
    </>
  );
}