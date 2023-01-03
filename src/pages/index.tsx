import { trpc } from "../utils/trpc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginInput } from "../validators/auth-validtor";
import { Button, Center, PasswordInput, Stack, TextInput } from "@mantine/core";
import { z } from "zod";
import { showNotification } from "@mantine/notifications";
import { BiError } from "react-icons/bi";
import { useRouter } from "next/router";

type InputType = z.infer<typeof loginInput>;

const Login = () => {
  const router = useRouter();

  const loginMutation = trpc.auth.login.useMutation({
    onError: () => {
      showNotification({
        title: "Error",
        message: "Invalid credentials",
        icon: <BiError />,
        color: "red",
      });
    },

    onSuccess: () => {
      router.replace("/purchase");
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(loginInput),
  });

  const onSubmit = (input: InputType) => {
    loginMutation.mutate(input);
  };

  return (
    <Center mih="100vh">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack miw="400px">
          <TextInput
            error={errors.username?.message && errors.username.message}
            label="username"
            {...register("username")}
          />
          <PasswordInput
            error={errors.password?.message && errors.password.message}
            label="password"
            {...register("password")}
          />
          <Button loading={loginMutation.isLoading} type="submit">
            Login
          </Button>
        </Stack>
      </form>
    </Center>
  );
};

export default Login;
