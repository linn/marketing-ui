import * as React from "react";
import "./App.css";
import useData from "./hooks/useData";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function App() {
  const appRoot =
    process.env.NODE_ENV === "production"
      ? "app.linn.co.uk"
      : "app-sys.linn.co.uk";

  const { data, loading } = useData(
    `https://${appRoot}/users/promotions/lp12-50`
  );

  const [country, setCountry] = React.useState("");

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <Grid container spacing={3} marginTop="30px" padding="60px">
      <Grid item xs={12}>
        <Typography variant="h3">LP12-50 Interest Lists</Typography>
      </Grid>

      {loading && (
        <>
          <Grid item xs={5} />
          <Grid item xs={2}>
            <CircularProgress />
          </Grid>
          <Grid item xs={5} />
        </>
      )}
      {data && (
        <>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="simple-select-label">Select A Country</InputLabel>
              <Select
                labelId="select-label"
                id="simple-select"
                value={country}
                label="Select A Country"
                onChange={handleChange}
              >
                {data.map((d) => (
                  <MenuItem key={d.CountryCode} value={d.CountryCode}>
                    {d.CountryCode}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {country && (
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Email</TableCell>
                      <TableCell>User</TableCell>
                      <TableCell>Date Registered</TableCell>
                      <TableCell>Time Registered</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data
                      .find((d) => d.CountryCode === country)
                      ?.List.map((row) => (
                        <TableRow key={row.EmailAddress}>
                          <TableCell component="th" scope="row">
                            {row.EmailAddress}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={`http://${appRoot}/users/${row.UserId}`}
                            >
                              {row.UserId}
                            </a>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {new Date(row.DateRegistered).toDateString()}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {new Date(row.DateRegistered).toLocaleTimeString()}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
}

export default App;
