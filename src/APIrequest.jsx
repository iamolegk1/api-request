import React from "react";
import axios from "axios";

import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import StorageIcon from "@mui/icons-material/Storage";
import ImageListItem from "@mui/material/ImageListItem";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import { height } from "@mui/system";

function APIrequest() {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/photos"
      );
      if (!data) return;
      setPosts(data.slice(0, 2000));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  let arrSkeleton = new Array(10).fill(
    <Stack>
      <Skeleton variant="text" sx={{ width: "300px" }} />
      <Skeleton variant="text" sx={{ width: "300px" }} />
      <Skeleton variant="rectangular" width={300} height={350} />
    </Stack>
  );

  return (
    <>
      <CssBaseline />
      <Box sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Button
            disabled={loading}
            onClick={fetchData}
            color="info"
            variant="contained"
            size="medium"
            endIcon={<StorageIcon />}
          >
            Data
          </Button>
        </Stack>
        <Grid
          container
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 10 }}
        >
          {posts &&
            posts.map((item) => (
              <Grid item xs={8} sm={4} md={2} key={item.id}>
                <Item>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Divider />
                  <ImageListItem key={item.id}>
                    <img src={item.url} alt={item.title} loading="lazy" />
                  </ImageListItem>
                </Item>
              </Grid>
            ))}
          {loading &&
            arrSkeleton.map((item, index) => (
              <Grid item xs={8} sm={4} md={2} key={index}>
                {item}
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
}

export default APIrequest;
