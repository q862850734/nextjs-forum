import * as React from "react";
import { Box, Typography, Breadcrumbs, Link } from "@mui/material";
import RouteLink from "./RouteLink";
interface Link {
  href: string;
  title: string;
}
type Props = {
  links: [Link];
  title: string;
};
function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function BasicBreadcrumbs({ links, title }: Props) {
  return (
    <Box
      sx={{
        width: 1,
      }}
    >
      <Breadcrumbs aria-label="breadcrumb">
        {links.map((x) => (
          <RouteLink href={x.href} title={x.title} key={x.href} />
        ))}
        <Typography color="text.primary">{title}</Typography>
      </Breadcrumbs>
    </Box>
  );
}
