import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { trpc } from "../../utils/trpc";
import { purchaseCreateValidator } from "../../validators/purchase-validator";
import { z } from "zod";

// formulat from https://vatcalconline.com/
// Both GST and VAT have the same formula
const calculateTax = (amount: number, percentage: number): number => {
  return amount + amount * (percentage / 100);
};

const CreatePurchase = () => {
  const createMutation = trpc.purchase.create.useMutation();

  const { handleSubmit, register, getValues, setValue } = useForm<
    z.infer<typeof purchaseCreateValidator>
  >({
    resolver: zodResolver(purchaseCreateValidator),
  });

  const onSubmit = (input: any) => {
    createMutation.mutate(input);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>
          receiptDate:{" "}
          <input
            {...register("receiptDate", { valueAsDate: true })}
            type="date"
          />
        </p>
        <p>
          description: <textarea {...register("description")} />
        </p>
        <p>
          numbersReceived:{" "}
          <input
            {...register("numbersReceived", { valueAsNumber: true })}
            type="number"
          />
        </p>
        <p>
          Invoice number
          <input
            {...register("invoiceNumber", { valueAsNumber: true })}
            type="number"
          />
        </p>
        <p>
          rate:{" "}
          <input {...register("rate", { valueAsNumber: true })} type="number" />
        </p>
        <p>
          taxType:
          <select {...register("taxType")}>
            <option value="VAT">VAT</option>
            <option value="GST">GST</option>
          </select>
        </p>
        <p>
          taxPercentage:
          <input
            {...register("taxPercentage", {
              valueAsNumber: true,
              onChange: () => {
                const [rate, numbersReceived, taxPercentage] = getValues([
                  "rate",
                  "numbersReceived",
                  "taxPercentage",
                ]);

                const totalCost = calculateTax(
                  rate * numbersReceived,
                  taxPercentage
                );
                setValue("totalCost", totalCost, { shouldValidate: true });
              },
            })}
            type="number"
          />
        </p>
        <p>
          totalcost:{" "}
          <input
            {...register("totalCost", { valueAsNumber: true })}
            type="number"
          />
        </p>
        <p>
          supplier: <input {...register("supplier")} />
        </p>
        <p>
          warrantyPeriod:{" "}
          <input {...register("warrantyPeriod")} type="string" />
        </p>
        <button type="submit">Create now</button>
      </form>
      <h1>{createMutation.data?.message}</h1>
    </div>
  );
};

export default CreatePurchase;
