import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, Textarea, TextInput, Select, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { showNotification } from "@mantine/notifications";
import { Controller, useForm } from "react-hook-form";
import { GoCheck } from "react-icons/go";
import { VscError } from "react-icons/vsc";
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
        reset({
          id: null,
          description: null,
          receiptDate: null,
          numbersReceived: null,
          invoiceNumber: null,
          rate: null,
          taxType: null,
          hodName: null,
          warrantyPeriod: null,
          totalCost: null,
          supplierName: null,
          fundingAgency: null,
          taxPercentage: null,
          authorizedDate: null,
          fundingAgencyId: null,
          supplierAddress: null,
          superintendentName: null,
        });
      },
      onError(error, _variables, _context) {
        if (error.message.includes("(`id`)"))
          showNotification({
            title: "Error",
            message: "Purchase with SI.NO already exists",
            icon: <VscError />,
            color: "red",
          });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack my="lg" spacing="md" maw="65%" m="auto">
        <TextInput
          type="number"
          error={errors.id?.message}
          withAsterisk
          label="SI.NO"
          {...register("id", {
            valueAsNumber: true,
          })}
        />

        <TextInput
          error={errors.receiptDate?.message}
          withAsterisk
          label="Receipt Date"
          {...register("receiptDate", {
            valueAsDate: true,
          })}
        />

        <Textarea
          label="Description"
          withAsterisk
          error={errors.description && errors.description.message}
          autosize
          {...register("description")}
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
          error={errors.rate && errors.rate.message}
          label="Rate"
          withAsterisk
          type="number"
          step="any"
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
          step="any"
          withAsterisk
          {...register("taxPercentage", {
            valueAsNumber: true,
            onChange: () => {
              const [rate, numbersReceived, taxPercentage] = getValues([
                "rate",
                "numbersReceived",
                "taxPercentage",
              ]);

              if (!rate || !numbersReceived || !taxPercentage) return;
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
          error={errors.warrantyPeriod?.message}
          withAsterisk
          label="Warranty Period"
          {...register("warrantyPeriod", {
            valueAsDate: true,
          })}
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

        <TextInput
          error={errors.invoiceNumber && errors.invoiceNumber.message}
          label="Invoice Number"
          withAsterisk
          {...register("invoiceNumber")}
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
          error={errors.authorizedDate?.message}
          withAsterisk
          label="Authorized Date"
          {...register("authorizedDate", {
            valueAsDate: true,
          })}
        />

        <TextInput
          label="Superintendent Name"
          error={errors.superintendentName?.message}
          {...register("superintendentName")}
        />

        <Button loading={isLoading} type="submit">
          Create
        </Button>
      </Stack>
    </form>
  );
};

export default Entry;
