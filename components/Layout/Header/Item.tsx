import { MenuItem, Stack } from "@mui/material";
import RouteLink from "components/RouteLink";
import React from "react";

interface Props {
  href: string;
  title: string;
  children?: React.ReactNode;
  onClick: any;
}

export default function Item({ href, title, children, onClick }: Props) {
  return (
    <MenuItem onClick={onClick}>
      <Stack direction="row" spacing={2}>
        {children}
        <RouteLink href={href} title={title} />
      </Stack>
    </MenuItem>
  );
}
