import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, Textarea, TextInput, Select, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { showNotification } from "@mantine/notifications";
import { Controller, useForm } from "react-hook-form";
import { GoCheck } from "react-icons/go";
import { z } from "zod";
import { calculateTax } from "../utils/tax";
import { trpc } from "../utils/trpc";
import { entryValidator } from "../validators/purchase-validator";

type InputType = z.infer<typeof entryValidator>;

const Entry = () => {
  const { mutate: entryMutation, isLoading } =
    trpc.purchase.entry.useMutation();

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
    control,
    reset,
  } = useForm<InputType>({
    resolver: zodResolver(entryValidator),
  });

  const onSubmit = (input: InputType) => {
    entryMutation(input, {
      onSuccess: () => {
        showNotification({
          title: "Success",
          message: "Purchase created success",
          icon: <GoCheck />,
          color: "green",
        });

        reset();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack my="lg" spacing="md" maw="65%" m="auto">
        <Textarea
          label="Description"
          withAsterisk
          error={errors.description && errors.description.message}
          autosize
          {...register("description")}
        />

        <Controller
          name="receiptDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              error={errors.receiptDate && errors.receiptDate.message}
              label="Receipt Date"
              {...field}
              withAsterisk
            />
          )}
        />

        <TextInput
          type="number"
          error={errors.numbersReceived && errors.numbersReceived.message}
          withAsterisk
          label="Numbers Received"
          {...register("numbersReceived", {
            valueAsNumber: true,
          })}
        />

        <TextInput
          error={errors.invoiceNumber && errors.invoiceNumber.message}
          label="Invoice Number"
          withAsterisk
          {...register("invoiceNumber")}
        />

        <TextInput
          error={errors.rate && errors.rate.message}
          label="Rate"
          withAsterisk
          type="number"
          {...register("rate", { valueAsNumber: true })}
        />

        <Controller
          name="taxType"
          control={control}
          render={({ field }) => (
            <Select
              data={["VAT", "GST"]}
              label="Tax Type"
              withAsterisk
              {...field}
            />
          )}
        />

        <TextInput
          type="number"
          label="Tax Percentage"
          error={errors.taxPercentage?.message}
          withAsterisk
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
        />

        <TextInput
          type="number"
          label="Total Cost"
          error={errors.totalCost?.message}
          {...register("totalCost", { valueAsNumber: true })}
          step="any"
        />

        <TextInput
          label="Funding Agency"
          error={errors.fundingAgency?.message}
          withAsterisk
          {...register("fundingAgency")}
        />

        <TextInput
          label="Funding Agency ID"
          error={errors.fundingAgencyId?.message}
          withAsterisk
          {...register("fundingAgencyId")}
        />

        <TextInput
          label="Supplier Name"
          error={errors.supplierName?.message}
          withAsterisk
          {...register("supplierName")}
        />

        <Textarea
          label="Supplier Address"
          error={errors.supplierAddress?.message}
          withAsterisk
          autosize
          {...register("supplierAddress")}
        />

        <Controller
          name="warrantyPeriod"
          control={control}
          render={({ field }) => (
            <DatePicker
              error={errors.warrantyPeriod?.message}
              label="Warranty Period"
              {...field}
              withAsterisk
            />
          )}
        />

        <Controller
          name="hodName"
          control={control}
          render={({ field }) => (
            <Select
              data={[
                "Dr.P.NARAYANASWAMY",
                "Dr.G.V.UMA",
                "Dr.A.KANNAN",
                "Dr.SASWATI MUKHERJEE",
                "Dr.S.SRIDHAR",
              ]}
              label="HOD Name"
              withAsterisk
              {...field}
            />
          )}
        />

        <TextInput
          label="Superintendent Name"
          error={errors.superintendentName?.message}
          {...register("superintendentName")}
        />

        <Controller
          name="authorizedDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              error={errors.authorizedDate?.message}
              label="Authorized Date"
              {...field}
              withAsterisk
            />
          )}
        />

        <Button loading={isLoading} type="submit">
          Create
        </Button>
      </Stack>
    </form>
  );
};

export default Entry;
