import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { FormControlLabel, Checkbox } from '@mui/material';
import server from '../server';

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

export default function BlogSubscriptionModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [email, setEmail] = React.useState("");
  const [partnersSelected, setPartnersSelected] = React.useState(false);
  const handleChange = (event) => {
    setEmail(event.target.value);
  }
  const handleToggle = () => {
    setPartnersSelected(!partnersSelected);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    server.subscribeToBlog(email, partnersSelected);
    setOpen(false);
  }

  return (
    <div>
      <Button size="small" onClick={handleOpen}>Subscribe</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox id="includePartners" value="includePartners" color="primary" onChange={handleToggle}/>}
                  label="I want to receive inspiration, marketing promotions and updates from HippoTech's carefully chosen partners too!"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              id="subscribeButton"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Subscribe
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}