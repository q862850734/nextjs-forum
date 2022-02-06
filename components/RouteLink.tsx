import Link from "next/link";
import { Typography, Link as MLink } from "@mui/material";
import React from "react";
type Props = {
  href: any;
  title: String;
  option?: any;
  children?: React.ReactNode;
};

const RouteLink = ({ href, title, option, children }: Props) => {
  return (
    <Link href={href} passHref>
      <MLink color={option?.color || "inherit"} underline="none">
        {children ? (
          children
        ) : (
          <Typography {...option} component="h2">
            {title}
          </Typography>
        )}
      </MLink>
    </Link>
  );
};

export default RouteLink;
