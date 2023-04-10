import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/server/db";
import withHandler from "../../lib/server/withHandler";

async function createAccount(req: NextApiRequest, res: NextApiResponse) {
  let user;
  const { name, email } = req.body;
  const reqData = { name, email };
  user = await db.user.findUnique({
    where: {
      email: reqData.email,
    },
  });

  // 이미 회원이라면
  if (user) {
    return res.json({
      status: "exist",
      msg: "이미 존재하는 계정이에요.",
    });
  } else {
    user = await db.user.create({
      data: {
        name,
        email,
      },
    });

    return res.json({
      status: "create",
      msg: "생성이 완료 되었습니다.",
    });
  }
}

export default withHandler({
  methods: ["POST"],
  handler: createAccount,
  isPrivate: false,
});
