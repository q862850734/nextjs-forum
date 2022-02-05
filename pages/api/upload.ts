import { request } from "https";
import { Octokit } from "@octokit/core";
import { NextApiRequest, NextApiResponse } from "next";

export default async function test(req: NextApiRequest, res: NextApiResponse) {
  // console.log(req.body);

  console.log(req.body.path);

  const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  });
  const { data } = await octokit.request(
    "PUT /repos/{owner}/{repo}/contents/{path}",
    {
      owner: process.env.GITHUB_REPO_OWNER,
      repo: process.env.GITHUB_REPO,
      path: req.body.path,
      message: "upload",
      content: "" + req.body.content.split(",")[1],
    }
  );

  //return the data back or just do whatever you want with it
  res.status(200).json({
    ...data,
  });
}
