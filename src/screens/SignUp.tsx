import { AuthNavigatorRoutesProps } from "@/routes/auth.routes";
import { Box, Center, Pressable, Text } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";

export function SignUp() {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

  return (
    <Center flex={1} gap="$5">
      <Box p="$4" bg="$green">
        <Text fontWeight="$bold" fontSize="$3xl" color="$white">
          SignUp
        </Text>
      </Box>

      <Pressable p="$6" bg="$blue500" onPress={() => navigate("signIn")}>
        <Text color="$white">Ir para SignIn</Text>
      </Pressable>
    </Center>
  );
}
