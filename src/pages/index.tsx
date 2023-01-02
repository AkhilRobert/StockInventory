import { trpc } from "../utils/trpc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginInput } from "../validators/auth-validtor";

const Login = () => {
  const a = trpc.auth.login.useMutation();
  const logoutMutation = trpc.auth.logout.useMutation();

  const { handleSubmit, register } = useForm({
    resolver: zodResolver(loginInput),
  });

  const onSubmit = (input: any) => {
    a.mutate(input);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("username")} />
        <input {...register("password")} />
        <button type="submit">Login Now</button>
      </form>
      <button
        onClick={() => {
          logoutMutation.mutate();
        }}
      >
        Logout
      </button>
      <h1>{a.data?.message}</h1>
    </div>
  );
};

export default Login;
