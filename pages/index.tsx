import { Tweet } from "@prisma/client";
import Head from "next/head";
import React from "react";
import useSWR from "swr";
import FloatingButton from "../components/floating-button";
import Item from "../components/item";
import Layout from "../components/layout";
import useUser from "../lib/client/useUser";

interface TweetsResponse {
  status: string;
  tweets: Tweet[];
}

export default function Home() {
  const { user, isLoading } = useUser();
  const { data } = useSWR<TweetsResponse>("/api/tweets");

  return (
    <>
      {user && !isLoading && (
        <Layout title="홈" hasTabBar>
          <Head>
            <title>Storva : Home</title>
          </Head>
          <div className="flex flex-col space-y-5 divide-y">
            {data?.tweets?.map((tweet) => (
              <Item
                id={tweet.id}
                key={tweet.id}
                message={tweet.message!}
                tweetImg={tweet.image!}
                createDate={tweet.createdAt}
                userId={tweet.userId}
              />
            ))}
            <FloatingButton href="/tweets/upload">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </FloatingButton>
          </div>
        </Layout>
      )}
    </>
  );
}
