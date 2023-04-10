import type { NextPage } from "next";
import { Tweet, User } from "@prisma/client";

interface ProductWithUser extends Tweet {
  user: User;
}

interface TweetDetailResponse {
  ok: boolean;
  tweet: ProductWithUser;
  relatedTweet: Tweet[];
}

const TweetDetail: NextPage = () => {
  return <div className="px-4  py-4"></div>;
};

export default TweetDetail;
