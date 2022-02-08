import { Box, Typography } from "@mui/material";
import RouteLink from "components/RouteLink";
import HeadTitle from "components/HeadTitle";
export default function Custom404() {
  return (
    <>
      <HeadTitle title="404 T T" />
      <Box
        sx={{
          textAlign: "center",
          mt: 10,
        }}
      >
        <Typography variant="h2">404</Typography>
        <Typography variant="h4">此页没有内容，催下作者更新吧</Typography>
        <RouteLink title="返回首页" href="/" option={{ p: 2 }} />
      </Box>
    </>
  );
}
