import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";

import { gluestackUIConfig } from "../../config/gluestack-ui.config";

import { Home } from "../screens/Home";
import { Profile } from "../screens/Profile";

import CurrencyCircleDollar from "phosphor-react-native/src/icons/CurrencyCircleDollar";
import UserCircle from "phosphor-react-native/src/icons/UserCircle";
import CaretCircleDoubleDown from "phosphor-react-native/src/icons/CaretCircleDoubleDown";
import Bank from "phosphor-react-native/src/icons/Bank";

import { Box } from "@gluestack-ui/themed";
import { Expenses } from "@/screens/Expenses";
import { Budgets } from "@/screens/Budgets";
import { History } from "@/screens/History";
import { Consult } from "@/screens/Consult";

type AppRoutes = {
  home: undefined;
  profile: undefined;
  expenses: {
    id?: string;
  };
  budgets: {
    id?: string;
  };
  history: undefined;
  consult: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { tokens } = gluestackUIConfig;
  const iconSize = tokens.space["8"];

  return (
    <Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: tokens.colors.white,
        tabBarInactiveTintColor: tokens.colors.white,
        tabBarStyle: {
          backgroundColor: tokens.colors.green,
          borderTopWidth: 0,
          height: Platform.OS === "android" ? 96 : 96,
          paddingBottom: tokens.space["12"],
          paddingTop: tokens.space["4"],
          paddingHorizontal: tokens.space["4"],
        },
        tabBarLabelStyle: {
          marginTop: 4,
          fontSize: 14,
        },
      }}
    >
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Box
              p="$1"
              rounded="$full"
              bg={focused ? "$green600" : "transparent"}
            >
              <UserCircle
                color={color}
                size={iconSize}
                weight={focused ? "fill" : "regular"}
              />
            </Box>
          ),
          tabBarLabel: "Perfil",
        }}
      />

      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Box
              p="$1"
              rounded="$full"
              bg={focused ? "$green600" : "transparent"}
            >
              <CurrencyCircleDollar
                color={color}
                size={iconSize}
                weight={focused ? "fill" : "regular"}
              />
            </Box>
          ),
          tabBarLabel: "Início",
        }}
      />

      <Screen
        name="expenses"
        component={Expenses}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Box
              p="$1"
              rounded="$full"
              bg={focused ? "$green600" : "transparent"}
            >
              <CaretCircleDoubleDown
                color={color}
                size={iconSize}
                weight={focused ? "fill" : "regular"}
              />
            </Box>
          ),
          tabBarLabel: "Despesas",
        }}
      />

      <Screen
        name="budgets"
        component={Budgets}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Box
              p="$1"
              rounded="$full"
              bg={focused ? "$green600" : "transparent"}
            >
              <Bank
                color={color}
                size={iconSize}
                weight={focused ? "fill" : "regular"}
              />
            </Box>
          ),
          tabBarLabel: "Limites",
        }}
      />
      <Screen
        name="history"
        component={History}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      />
      {/* <Screen
        name="consult"
        component={Consult}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      /> */}
    </Navigator>
  );
}
