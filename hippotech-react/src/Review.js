import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function Review({ addresses, cardDetails }) {
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Property address
          </Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            <React.Fragment>
              <Grid item xs={6}>
                <Typography gutterBottom sx={{ fontWeight: 'bold' }}>Card type</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>Visa</Typography>
              </Grid>
            </React.Fragment>
            <React.Fragment>
              <Grid item xs={6}>
                <Typography gutterBottom sx={{ fontWeight: 'bold' }}>Card holder</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{cardDetails.cardName}</Typography>
              </Grid>
            </React.Fragment>
            <React.Fragment>
              <Grid item xs={6}>
                <Typography gutterBottom sx={{ fontWeight: 'bold' }}>Card number</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{cardDetails.cardNumber}</Typography>
              </Grid>
            </React.Fragment>
            <React.Fragment>
              <Grid item xs={6}>
                <Typography gutterBottom sx={{ fontWeight: 'bold' }}>Expiry date</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{cardDetails.expDate}</Typography>
              </Grid>
            </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}