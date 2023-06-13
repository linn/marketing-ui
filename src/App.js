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
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

function App() {
  console.log(process.env);

  const { data, loading } = useData(
    `https://${process.env.REACT_APP_ROOT}/users/promotions/lp12-50`
  );

  const [selectedList, setSelectedList] = React.useState(null);

  const handleChange = (event) => {
    setSelectedList(data.find((d) => d.CountryCode === event.target.value));
  };

  const columns = [
    { field: "EmailAddress", headerName: "Email", width: 250 },
    { field: "Tags", headerName: "Tags", width: 450 },
    {
      field: "DateRegistered",
      headerName: "Date Registered",
      width: 250,
      valueGetter: (params) =>
        new Date(params.row.DateRegistered).toDateString(),
    },
    {
      field: "Time Registered",
      headerName: "Time Registered",
      width: 250,
      valueGetter: (params) =>
        new Date(params.row.DateRegistered).toLocaleTimeString(),
    },
    {
      field: "UserId",
      headerName: "User",
      width: 250,
      renderCell: (params) => (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`http://${process.env.REACT_APP_ROOT}/users/${params.row.UserId}`}
        >
          {params.row.UserId}
        </a>
      ),
    },
    { field: "PostCode", headerName: "Post Code", width: 150 },
    {
      field: "CountryCode",
      headerName: "Country",
      width: 100,
      valueGetter: (params) => selectedList?.CountryCode,
    },
  ];

  return (
    <Grid container spacing={3} marginTop="30px" padding="60px">
      <Grid item xs={11}>
        <Typography variant="h3">LP12-50 Interest Lists</Typography>
      </Grid>
      <Grid item xs={1}>
        <img
          src="https://app.linn.co.uk/Content/images/linn-logo.png"
          alt="logo"
        />
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
                value={selectedList?.CountryCode}
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
          {selectedList && (
            <>
              <Grid item xs={12}>
                <Typography variant="h4">
                  Main List ({selectedList.Capacity})
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <DataGrid
                  slots={{ toolbar: GridToolbar }}
                  autoHeight
                  rows={selectedList?.List.map((r) => ({
                    ...r,
                    id: r.UserId,
                  })).slice(0, selectedList.Capacity)}
                  columns={columns}
                  hideFooter
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4">
                  Reserve List ({selectedList.ReserveCapacity})
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <DataGrid
                  autoHeight
                  slots={{ toolbar: GridToolbar }}
                  rows={selectedList?.List.map((r) => ({
                    ...r,
                    id: r.UserId,
                  })).slice(
                    selectedList.Capacity,
                    selectedList.Capacity + selectedList.ReserveCapacity
                  )}
                  columns={columns}
                  hideFooter
                />
              </Grid>
            </>
          )}
        </>
      )}
    </Grid>
  );
}

export default App;
