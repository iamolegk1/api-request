import React from "react";
import axios from "axios";

import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";

function APIrequest() {
  const [value, setValue] = React.useState(() => []);

  React.useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then(({ data }) => {
      setValue(data);
    });
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <CssBaseline />
      <Box sx={{ p: 2 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 10 }}
        >
          {value.map((item) => (
            <Grid item xs={8} sm={4} md={2} key={item.id}>
              <Item>
                {item.title} {item.body}
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default APIrequest;
