import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useMutation from "../lib/client/useMutation";

interface EnterForm {
  email: string;
}

interface MutationResult {
  status: string;
}

export default function LogIn() {
  const [logIn, { loading, data }] =
    useMutation<MutationResult>("/api/users/logIn");
  const { register, handleSubmit } = useForm<EnterForm>();
  const router = useRouter();
  const onValid = (data: EnterForm) => {
    logIn(data);
  };

  useEffect(() => {
    if (data?.status === "success") {
      console.log(data);
      router.push("/");
    }
  }, [data, router]);

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <label>Email: </label>
          <input {...register("email", { required: true })} type="email" />
        </div>
        <button>{loading ? "Loading" : "Login"}</button>
      </form>
    </div>
  );
}
