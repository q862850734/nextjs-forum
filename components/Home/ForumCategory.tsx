import { Box, Grid, Icon, Typography } from "@mui/material";
import { NexusGenFieldTypes } from "../../@types/nexus-typegen";
import ForumCard from "./ForumCard";
export default function ForumCategory({
  name,
  forum,
  icon,
}: NexusGenFieldTypes["ForumCategory"]) {
  return (
    <Box
      component="section"
      sx={{
        p: 4,
        my: 1,
        h: 1,
        width: 1,
        boxShadow: 4,
        borderRadius: 3,
        bgcolor: "primary.light",
        backgroundImage: icon ? `url(${icon})` : "",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right top",
        backgroundSize: "45%",
      }}
    >
      <Typography variant="h5" component="h2">
        {name}
      </Typography>
      <Grid container spacing={3}>
        {forum.map((x) => (
          <ForumCard key={x.id} data={x} option={{ xs: 4 }} />
        ))}
      </Grid>
    </Box>
  );
}
