import { memo } from "react";
import { Box, Typography, Stack, Grid } from "@mui/material";
import RouteLink from "../RouteLink";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { Post } from "@prisma/client";
interface Props {
  data: Post[];
}
export const HotList = memo(function HotList({ data }: Props) {
  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Typography component="h2" variant="h4">
        热门文章
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="stretch"
        columns={{ xs: 4, md: 12 }}
      >
        {data.map((x, i) => (
          <Grid
            direction="row"
            spacing={3}
            key={x.id}
            xs={2}
            md={12}
            sx={{
              display: "flex",
              alignItems: "center",
              py: 2,
              px: 1,
            }}
          >
            <LocalFireDepartmentIcon />
            <RouteLink href={"/posts/" + x.id} title={i + 1 + ". " + x.title} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});
