import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { InputAdornment } from '@mui/material';

function CurrencyField(props) {
  return <TextField {...props}
    InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
  />
}


export default function AddressForm({ fields, onChange }) {
  function handleInput(event) {
    let newFields;
    if (event.target.name === 'iUnderstand') {
      newFields = { ...fields, iUnderstand: event.target.checked };
    } else {
      newFields = { ...fields, [event.target.name]: event.target.value };
    }

    newFields.valid = !!newFields.address1 
                      && !!newFields.zip 
                      && !!newFields.purchasePrice
                      && !!newFields.amountToBorrow                  
                      && newFields.iUnderstand;
                                        
    onChange(newFields);
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Your future home address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={fields.address1}
            onChange={handleInput}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            value={fields.address2}
            onChange={handleInput}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip code"
            fullWidth
            autoComplete="zipcode"
            variant="standard"
            value={fields.zip}
            onChange={handleInput}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            value={fields.state}
            onChange={handleInput}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant="h6" gutterBottom>
          Financing
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CurrencyField
            required
            id="purchasePrice"
            name="purchasePrice"
            label="Purchase price"
            fullWidth
            autoComplete="Purchase price"
            variant="standard"
            value={fields.purchasePrice}
            onChange={handleInput}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CurrencyField
            required
            id="amountToBorrow"
            name="amountToBorrow"
            label="Amount to borrow"
            fullWidth
            autoComplete="amount to borrow"
            variant="standard"
            value={fields.amountToBorrow}
            onChange={handleInput}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" id="iUnderstand" name="iUnderstand" checked={fields.iUnderstand} onChange={handleInput} />}
            label="I understand that my home may be at risk if I don't keep up payments on a mortgage."
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}