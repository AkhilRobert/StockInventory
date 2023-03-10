import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { trpc } from "../../utils/trpc";
import { purchaseCreateValidator } from "../../validators/purchase-validator";
import { z } from "zod";
import { AuthenticatedView } from "../../components/authenticatedv-view";
import { AppContainer } from "../../components/app-container";
import {
  Button,
  Select,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { GoCheck } from "react-icons/go";
import { calculateTax } from "../../utils/tax";

type InputType = z.infer<typeof purchaseCreateValidator>;

const CreatePurchase = () => {
  const { mutate: createMutation, isLoading } =
    trpc.purchase.create.useMutation();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
    control,
  } = useForm<InputType>({
    resolver: zodResolver(purchaseCreateValidator),
  });

  const onSubmit = (input: InputType) => {
    createMutation(input, {
      onSuccess: ({ id }) => {
        showNotification({
          title: "Success",
          message: "Purchase created success",
          icon: <GoCheck />,
          color: "green",
        });
        router.replace(`/purchase/${id}`);
      },
    });
  };

  return (
    <AuthenticatedView>
      <AppContainer>
        <Title>Create </Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack mt="md" spacing="md" maw="65%">
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
              {...register("totalCost", { valueAsNumber: true, min: 0 })}
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

            <Button loading={isLoading} type="submit">
              Create
            </Button>
          </Stack>
        </form>
      </AppContainer>
    </AuthenticatedView>
  );
};

export default CreatePurchase;
