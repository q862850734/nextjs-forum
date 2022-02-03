import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import RouteLink from "../RouteLink";

export default function MediaControlCard({
  id,
  title,
  description,
  sx = {},
  option = { xs: 4 },
}) {
  const theme = useTheme();
  console.log(id);

  return (
    <Grid
      item
      {...option}
      sx={{ display: "flex", flexDirection: "column", ...sx }}
    >
      <Box sx={{ p: 2 }}>
        <RouteLink
          href={`/forum/${id}`}
          title={title}
          option={{ variant: "h6" }}
        />

        <Typography variant="subtitle1" color="text.secondary" component="h4">
          {description}
        </Typography>
      </Box>
    </Grid>
  );
}
