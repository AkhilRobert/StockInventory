import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Loader,
  NativeSelect,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { GoCheck } from "react-icons/go";
import { z } from "zod";
import { AppContainer } from "../../../components/app-container";
import { AuthenticatedView } from "../../../components/authenticatedv-view";
import { trpc } from "../../../utils/trpc";
import { purchaseCreateValidator } from "../../../validators/purchase-validator";
import { calculateTax } from "../../../utils/tax";

type InputType = z.infer<typeof purchaseCreateValidator>;

const EditPurchase = () => {
  const { mutate: createMutation, isLoading } =
    trpc.purchase.create.useMutation();
  const router = useRouter();
  const purchaseID = parseInt((router.query as any).id, 10);

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
    control,
    reset,
  } = useForm<InputType>({
    resolver: zodResolver(purchaseCreateValidator),
  });

  const { data, isLoading: purchaseQueryLoading } =
    trpc.purchase.getByID.useQuery(
      {
        id: purchaseID,
      },
      {
        enabled: !!purchaseID,
        onSuccess: () => {
          if (data) {
            reset({ ...data });
          }
        },
      }
    );

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
        {purchaseQueryLoading ? (
          <Loader />
        ) : (
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
                {...register("rate", { valueAsNumber: true })}
              />

              <NativeSelect
                data={["VAT", "GST"]}
                defaultValue="VAT"
                label="Tax Type"
                withAsterisk
                {...register("taxType")}
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
        )}
      </AppContainer>
    </AuthenticatedView>
  );
};

export default EditPurchase;
