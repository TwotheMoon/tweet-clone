import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/server/db";
import withHandler from "../../lib/server/withHandler";
import { withApiSession } from "../../lib/server/withSession";

async function logIn(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;
  const foundUser = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (!foundUser) return res.status(404).end();

  req.session.user = {
    id: foundUser?.id,
  };
  await req.session.save();

  res.json({ status: "success" });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler: logIn,
    isPrivate: false,
  })
);
