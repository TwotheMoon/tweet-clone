import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/server/db";
import withHandler, { ResponseType } from "../../../lib/server/withHandler";
import { withApiSession } from "../../../lib/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id } = req.query;
  const tweet = await db.tweet.findUnique({
    where: {
      id: +id!,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
