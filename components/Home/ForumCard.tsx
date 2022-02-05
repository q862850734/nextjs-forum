import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  BoxProps,
  GridProps,
} from "@mui/material";
import RouteLink from "../RouteLink";
import { NexusGenObjects } from "../../@types/nexus-typegen";

interface Props {
  data: NexusGenObjects["Forum"];
  option?: GridProps;
}

export default function MediaControlCard({
  data: { id, title, description },
  option = {},
}: Props) {
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
}
