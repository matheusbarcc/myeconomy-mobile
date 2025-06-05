import { Box, Center, Text } from "@gluestack-ui/themed";

export function Profile() {
  return (
    <Center flex={1}>
      <Box p="$4" bg="$green">
        <Text fontWeight="$bold" fontSize="$3xl" color="$white">
          Profile
        </Text>
      </Box>
    </Center>
  );
}
