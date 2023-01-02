import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { trpc } from "../../../utils/trpc";
import { historyCreateValidtor } from "../../../validators/history-validtor";

type InputType = z.infer<typeof historyCreateValidtor>;

const CreatePurchase = () => {
  const createMutation = trpc.history.create.useMutation();
  const router = useRouter();

  const { handleSubmit, register } = useForm<InputType>({
    resolver: zodResolver(historyCreateValidtor),
  });

  const onSubmit = (input: InputType) => {
    createMutation.mutate(input);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>
          name:
          <input {...register("name")} />
        </p>
        <p>
          floor:
          <input {...register("floor")} />
        </p>
        <input
          type="hidden"
          value={router.query.id ? parseInt((router.query as any).id, 10) : 0}
          {...register("issueId", { valueAsNumber: true })}
        />
        <button type="submit">Add</button>
      </form>
      <h1>{createMutation.data?.message}</h1>
    </div>
  );
};

export default CreatePurchase;
