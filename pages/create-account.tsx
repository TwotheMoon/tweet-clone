import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useMutation from "../lib/client/useMutation";

interface EnterForm {
  name: string;
  phone: string;
}

interface MutationResult {
  status: string;
  msg: string;
}

export default function createAccount() {
  const [createAccount, { loading, data }] =
    useMutation<MutationResult>("/api/createAccount");
  const { register, handleSubmit } = useForm<EnterForm>();
  const router = useRouter();
  const onValid = (data: EnterForm) => {
    createAccount(data);
  };

  useEffect(() => {
    if (data?.status) {
      alert(data.msg);
      router.push("/log-in");
    }
  }, [data, router]);
  return (
    <div className="space-y-5 px-10 h-screen flex flex-col items-center justify-center">
      <img className="max-w-[200px]" src="/images/logo.png" />
      <h1 className="text-xl font-bold">Create Account</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <div className="space-x-3 mb-4 rounded-md relative flex  items-center shadow-sm">
          <input
            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            {...register("name", { required: true })}
            type="text"
            placeholder="Write Name"
          />
        </div>
        <div className="flex mb-4 rounded-md shadow-sm">
          <span className="flex items-center justify-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 select-none text-sm">
            +82
          </span>
          <input
            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md rounded-l-none shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            {...register("phone", { required: true })}
            type="number"
            placeholder="1012345678"
          />
        </div>
        <button className="w-full  h-9 bg-orange-500 hover:bg-orange-600 text-white  px-4 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">
          {loading ? "Loading" : "Create"}
        </button>
      </form>
    </div>
  );
}
