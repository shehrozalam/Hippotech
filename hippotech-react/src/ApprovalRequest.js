import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm.js';
import PaymentForm from './PaymentForm';
import Review from './Review';
import UserContext from './UserContext.js';
import { useNavigate } from 'react-router-dom';
import Copyright from './Copyright.js';
import server from './server';
import Grid from '@mui/material/Grid';

const steps = ['Property details', 'Payment details', 'Review and submit'];

export default function ApprovalRequest() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isValid, setIsValid] = React.useState(false);
  const [addressState, setAddressState] = React.useState({
    address1: "",
    address2: "",
    zip: "",
    state: "",
    purchasePrice: "",
    amountToBorrow: "", 
    iUnderstand: false,
    valid: false
  });
  const [paymentState, setPaymentState] = React.useState({
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
    iAgree: "no",
    valid: false
  });

  function addressToArray() {
    let result = [];
    if (addressState.address1) result.push(addressState.address1);
    if (addressState.address2) result.push(addressState.address2);
    if (addressState.state) result.push(addressState.state);
    if (addressState.zip) result.push(addressState.zip);
    return result;
  }

  function handleAddressFormChange(newState) {
    setAddressState(newState);
    setIsValid(newState.valid);
  }

  function handlePaymentFormChange(newState) {
    setPaymentState(newState);
    setIsValid(newState.valid);
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm fields={addressState} onChange={handleAddressFormChange}/>;
      case 1:
        return <PaymentForm fields={paymentState} onChange={handlePaymentFormChange}/>;
      case 2:
        return <Review addresses={addressToArray()} cardDetails={paymentState} />;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = () => {
    if (activeStep === 0) {
      setIsValid(paymentState.valid);
    } else if (activeStep === 1) {
      setIsValid(true);
    } else if (activeStep === 2) {
      server.requestApproval({
        address1: addressState.address1,
        address2: addressState.address2, 
        zip: addressState.zip, 
        state: addressState.state, 
        purchasePrice: addressState.purchasePrice, 
        amountToBorrow: addressState.amountToBorrow
      }, {});
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 2) {
      setIsValid(paymentState.valid);
    } else if (activeStep === 1) {
      setIsValid(addressState.valid);
    }
    setActiveStep(activeStep - 1);
  };

  return (
  
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Get an Agreement in Principle!
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your mortgage approval request
                </Typography>
                <Typography variant="subtitle1">
                  We have emailed you confirmation of the request,
                  and will send you an update when your request has
                  processed. You can check on the status of your
                  request at any time: just click on the menu at the
                  top left and select "My Mortages"!
                </Typography>
                <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="top"
          style={{ padding: '50px' }}
        >
                <Box
            align="center"
            component="img"
            sx={{
              height: 200,
              width: 200,
              padding:5
              // maxHeight: { xs: 233, md: 167 },
              // maxWidth: { xs: 350, md: 250 },
            }}
            alt="The house from the offer."
            src="hippo-back.svg"
          />

          </Grid>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    id="nextButton"
                    variant="contained"
                    disabled={!isValid}
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Submit !' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
  );
}