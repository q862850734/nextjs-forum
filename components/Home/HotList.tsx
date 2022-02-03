import { Box, Typography } from "@mui/material";
import RouteLink from "../RouteLink";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

export default function HotList({ data }) {
  console.log(data);

  return (
    <Box
      sx={{
        p: 2,
        height: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        "&>aside": {
          display: "flex",
          alignItems: "center",
          height: 1,
        },
      }}
    >
      <Typography component="h2" variant="h4">
        热门文章
      </Typography>
      {data.map((x, i) => (
        <Box key={x.id} component="aside">
          <LocalFireDepartmentIcon />
          <RouteLink href="/test" title={i + 1 + ". " + x.title} />
        </Box>
      ))}
    </Box>
  );
}