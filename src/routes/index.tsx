import { Box } from "@gluestack-ui/themed";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  // const { authState, isLoading } = useAuth()

  const theme = DefaultTheme;
  theme.colors.background = gluestackUIConfig.tokens.colors.white;

  // if (isLoading) {
  //   return <Loading />
  // }

  return (
    <Box flex={1} bg="$background">
      <NavigationContainer>
        {/* {authState?.authenticated ? <AppRoutes /> : <AuthRoutes />} */}
        <AppRoutes />
        {/* <AuthRoutes /> */}
      </NavigationContainer>
    </Box>
  );
}
