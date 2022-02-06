import { Box, Grid, Typography, GridProps } from "@mui/material";
import RouteLink from "../RouteLink";
import { NexusGenObjects } from "../../@types/nexus-typegen";

interface Props {
  data: NexusGenObjects["Forum"];
  option?: GridProps;
}

const ForumCard = ({
  data: { id, title, description },
  option = {},
}: Props) => {
  return (
    <Grid item {...option} sx={{ display: "flex", flexDirection: "column" }}>
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
};

export default ForumCard;
