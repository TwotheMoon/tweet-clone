import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Tweet } from "@prisma/client";
import useMutation from "../../lib/client/useMutation";
import Layout from "../../components/layout";

interface UploadProductForm {
  tweetImg?: FileList;
  message?: number;
  tweetImgId?: string;
}

interface UploadProductMutaion {
  status: string;
  tweet: Tweet;
}

const Upload: NextPage = () => {
  const { register, handleSubmit, watch } = useForm<UploadProductForm>();
  const [uploadTweet, { loading, data }] =
    useMutation<UploadProductMutaion>("/api/tweets");
  const router = useRouter();
  const [imgPreview, setImgPreview] = useState("");

  const onValid = async (data: UploadProductForm) => {
    if (loading) return;
    if (tweetImg && tweetImg.length > 0) {
      const { uploadURL } = await (await fetch(`/api/files`)).json();

      const form = new FormData();
      form.append("file", tweetImg[0]);

      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: "POST",
          body: form,
        })
      ).json();

      data.tweetImgId = id;
      uploadTweet(data);
      return;
    } else {
      uploadTweet(data);
    }
  };
  // fK9Ldk_N-eAkzLp8FgDW2A
  const tweetImg = watch("tweetImg");

  useEffect(() => {
    if (tweetImg && tweetImg.length > 0) {
      const file = tweetImg[0];
      setImgPreview(URL.createObjectURL(file));
    }
  }, [tweetImg]);

  useEffect(() => {
    if (data?.status === "success") {
      router.push(`/tweet/${data.tweet.id}`);
    }
  }, [data, router]);

  return (
    <Layout canGoBack title="Tweet 작성">
      <form className="p-4 space-y-4" onSubmit={handleSubmit(onValid)}>
        <div>
          {imgPreview ? (
            <label>
              <img src={imgPreview} />
              <input
                className="hidden"
                type="file"
                {...register("tweetImg")}
                accept="image/*"
              />
            </label>
          ) : (
            <label className="w-full cursor-pointer text-gray-600 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md">
              <svg
                className="h-12 w-12"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                className="hidden"
                type="file"
                {...register("tweetImg")}
                accept="image/*"
              />
            </label>
          )}
        </div>
        <textarea
          {...register("message", { required: true })}
          name="message"
          className="border-2 border-[#FC5200] w-full resize-none min-h-[100px] placeholder:pt-1 pl-2"
          placeholder="Write Your Text"
          required
        />
        <button className="w-full  h-9 bg-[#FC5200] hover:bg-orange-600 text-white  px-4 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">
          {loading ? "Loading" : "Upload Tweet"}
        </button>
      </form>
    </Layout>
  );
};

export default Upload;
