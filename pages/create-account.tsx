import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useMutation from "../lib/client/useMutation";

interface EnterForm {
  name: string;
  email: string;
}

interface MutationResult {
  status: string;
  msg: string;
}

export default function createAccount() {
  const [createAccount, { loading, data }] = useMutation<MutationResult>(
    "/api/users/createAccount"
  );
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
    <div>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <label>Name: </label>
          <input {...register("name", { required: true })} type="text" />
        </div>
        <div>
          <label>Email: </label>
          <input {...register("email", { required: true })} type="email" />
        </div>
        <button>{loading ? "Loading" : "Create"}</button>
      </form>
    </div>
  );
}
