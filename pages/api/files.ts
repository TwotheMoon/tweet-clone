import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../lib/server/withHandler";
import { withApiSession } from "../../lib/server/withSession";

async function logIn(req: NextApiRequest, res: NextApiResponse) {
  const response = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/images/v2/direct_upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CF_KEY}`,
        },
      }
    )
  ).json();

  res.json({ status: "success", ...response.result });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler: logIn,
  })
);
