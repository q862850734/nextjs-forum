import Link from "next/link";
import { Typography, Link as MLink } from "@mui/material";

type Props = {
  href: any;
  title: String;
  option?: any;
};

export default function RouteLink({ href, title, option }: Props) {
  return (
    <Link href={href} passHref>
      <MLink color={option?.color || "inherit"} underline="none">
        <Typography {...option} component="h2">
          {title}
        </Typography>
      </MLink>
    </Link>
  );
}
