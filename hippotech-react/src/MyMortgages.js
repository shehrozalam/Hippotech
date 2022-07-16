import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import server from './server';
import { formatDate } from './utils';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell className="mortgageAddress" component="th" scope="row">
          {row.address1}
        </TableCell>
        <TableCell className="mortgageStatus" align="right">{row.status}</TableCell>
        <TableCell className="mortgagePurchasePrice" align="right">${row.purchasePrice}</TableCell>
        <TableCell className="mortgageAmountToBorrow" align="right">${row.amountToBorrow}</TableCell>
        <TableCell className="actionButtons" align="right">
          { row.status !== "Withdrawn" && <Button color="error" onClick={ () => props.onWithdrawApplication(row.id) }>Withdraw Application</Button> }
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Party</TableCell>
                    <TableCell align="right">Event</TableCell>
                    <TableCell align="right">Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.id}>
                      <TableCell component="th" scope="row">
                        {formatDate(historyRow.date)}
                      </TableCell>
                      <TableCell>{historyRow.party}</TableCell>
                      <TableCell align="right">{historyRow.event}</TableCell>
                      <TableCell align="right">
                        {historyRow.details}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    address1: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    purchasePrice: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        event: PropTypes.string.isRequired,
        party: PropTypes.string.isRequired,
        date: PropTypes.object.isRequired,
        details: PropTypes.string
      }),
    ).isRequired,
    amountToBorrow: PropTypes.number.isRequired
  }).isRequired,
};

export default function MyMortgages() {
  const [rows, setRows] = React.useState([]);
  const [dataLoaded, setDataLoaded] = React.useState(false);

  React.useEffect(() => {
    async function loadData() {
      const myMortgages = await server.getMyMortgagesAsync();
      setRows(myMortgages);
    }
    if (!dataLoaded) {
      loadData().catch((error) => {
        console.log("Error during loadData()");
        console.log(error);
      });
      setDataLoaded(true);
    }
  }, [dataLoaded]);

  async function handleWithdrawApplication(id) {
    await server.withdrawApplication(id);
    setDataLoaded(false);
  }

  return (
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="top"
    style={{ minHeight: '100vh', padding: '50px' }}
  >
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell >Address</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Purchase Price</TableCell>
            <TableCell align="right">Amount To Borrow</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.address1} row={row} onWithdrawApplication={handleWithdrawApplication}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
  );
}