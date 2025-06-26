import { Button } from "@/components/Button";
import { useAuth } from "@/hooks/useAuth";
import { Box, Center, Text } from "@gluestack-ui/themed";

export function Home() {
  const { signOut } = useAuth();

  return (
    <Center flex={1}>
      <Box p="$4" bg="$green">
        <Text fontWeight="$bold" fontSize="$3xl" color="$white">
          Home
        </Text>

        <Button label="signout" onPress={signOut} />
      </Box>
    </Center>
  );
}
