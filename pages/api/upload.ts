import { Octokit } from "@octokit/core";
import { NextApiRequest, NextApiResponse } from "next";

export default async function test(req: NextApiRequest, res: NextApiResponse) {
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

  res.status(200).json({
    ...data,
  });
}
