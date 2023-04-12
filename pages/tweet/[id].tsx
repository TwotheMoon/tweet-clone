import type { NextPage } from "next";
import { Tweet, User } from "@prisma/client";
import Layout from "../../components/layout";
import useSWR from "swr";
import { useRouter } from "next/router";

interface ProductWithUser extends Tweet {
  user: User;
}

interface TweetDetailResponse {
  status: string;
  tweet: ProductWithUser;
  relatedTweet: Tweet[];
}

const TweetDetail: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<TweetDetailResponse>(
    router.query.id ? `/api/tweets/${router.query.id}` : null
  );

  console.log(data);

  return (
    <Layout canGoBack title="Tweet Detail">
      <div className="p-4 space-y-4">
        <label>
          <img
            src={`https://imagedelivery.net/fK9Ldk_N-eAkzLp8FgDW2A/${data?.tweet.image}/public`}
          />
          <input className="hidden" type="file" accept="image/*" />
        </label>
        <div className="border-2 border-[#FC5200] w-full resize-none min-h-[100px] placeholder:pt-1 pl-2">
          {data?.tweet.message}
        </div>
      </div>
    </Layout>
  );
};

export default TweetDetail;
