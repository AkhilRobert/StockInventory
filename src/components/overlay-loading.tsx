import { Center, LoadingOverlay } from "@mantine/core";

export const OverlayBlur = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Center mih="100vh">
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
    </Center>
  );
};
