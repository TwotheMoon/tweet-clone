import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/server/db";
import withHandler from "../../lib/server/withHandler";
import { withApiSession } from "../../lib/server/withSession";

async function me(req: NextApiRequest, res: NextApiResponse) {
  const profile = await db.user.findUnique({
    where: { id: req.session.user?.id },
  });

  return res.json({ status: "ok", profile });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler: me,
  })
);
