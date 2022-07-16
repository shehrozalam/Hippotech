import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { FormControlLabel, Checkbox } from '@mui/material';
import server from './server';
import { Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BadLanguageModal({onClose, badPost, badWord}) {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => { 
    console.log("ONE");
    setOpen(false);
    onClose();
  }
  const [justification, setJustification] = React.useState("");
  const handleChange = (event) => {
    setJustification(event.target.value);
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    server.submitJustification(badPost, justification);
    setOpen(false);
  }

  return (
    <div>
      {/* <Button size="small" onClick={handleOpen}>Bad Hippo</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}   alignItems="center"  justifyContent="center">

              <Grid item xs={12}>
                <Typography variant="h5" align="center" color="red" component="p">
                  Keep it clean, please!
                </Typography>
              </Grid>

            <Grid item xs={6}>
              <Box
                align="center"
                component="img"
                sx={{
                  height: 100,
                  width: 100,
                  padding:5
                  // maxHeight: { xs: 233, md: 167 },
                  // maxWidth: { xs: 350, md: 250 },
                }}
                alt="The HippoTech Hippo is not a happy hippopotamus"
                src="/hippo-front.svg"
             />
            </Grid>

            <Grid item xs={12}>
                <Typography variant="h5" align="center" component="p">
                  This is a family friendly website. But if you feel the use of the word &nbsp;
                <Box display="inline" sx={{ fontWeight: 'bold' }}>
                  {badWord}
                </Box>
                &nbsp; is justified in this context, no problem: drop us a line with a quick explanation and the HippoTech Hippopotomus will be happy to review your post! 
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="justification"
                  label="Justification"
                  name="justification"
                  autoComplete="justification"
                  onChange={handleChange}
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              id="justificationButton"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit Justification
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}