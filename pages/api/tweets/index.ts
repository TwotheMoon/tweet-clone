import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/server/db";
import withHandler from "../../../lib/server/withHandler";
import { withApiSession } from "../../../lib/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const tweets = await db.tweet.findMany({});
    res.json({
      status: "success",
      tweets,
    });
  }
  if (req.method === "POST") {
    const {
      body: { tweetImgId, message },
      session: { user },
    } = req;
    const tweet = await db.tweet.create({
      data: {
        image: tweetImgId,
        message,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      status: "success",
      tweet,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
