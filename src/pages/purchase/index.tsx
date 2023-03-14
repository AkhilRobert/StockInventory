import { Flex, Button, Input, ScrollArea, Loader, Center } from "@mantine/core";
import { AppContainer } from "../../components/app-container";
import { AuthenticatedView } from "../../components/authenticatedv-view";
import { trpc } from "../../utils/trpc";
import { PurchaseTable } from "../../components/purchase/table";
import { useDebouncedState } from "@mantine/hooks";
import { ChangeEvent, useState } from "react";
import { isNumeric } from "../../utils/helpers";

const ListPurchase = () => {
  const [debouncedId, setDebouncedId] = useDebouncedState<number | undefined>(
    undefined,
    400
  );
  const [debouncedText, setDebouncedText] = useDebouncedState<
    string | undefined
  >(undefined, 400);

  const [id, setId] = useState<number | undefined>();
  const [text, setText] = useState<string | undefined>();

  const { isLoading, data } = trpc.purchase.list.useQuery({
    id,
    text,
  });

  const updateValue = () => {
    setText(debouncedText);
    setId(debouncedId);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.currentTarget.value;

    if (isNumeric(currentValue)) {
      setDebouncedText(undefined);
      setDebouncedId(parseInt(currentValue));
    } else {
      setDebouncedId(undefined);
      setDebouncedText(currentValue);
    }
  };

  // TODO: wrap it in form so we can use enter key to submit the form
  return (
    <AuthenticatedView>
      <AppContainer>
        <ScrollArea>
          <Flex gap="md">
            <Input onChange={handleChange} style={{ flex: 1 }} />
            <Button onClick={updateValue}>Search</Button>
          </Flex>
          {isLoading ? (
            <Center mih="calc(100vh - 300px)">
              <Loader />
            </Center>
          ) : (
            <PurchaseTable
              nothingMessage="No purchases found"
              purchase={data}
            />
          )}
        </ScrollArea>
      </AppContainer>
    </AuthenticatedView>
  );
};

export default ListPurchase;
