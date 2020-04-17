import React from "react";
import HomeScreen from "../screens/Home";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from "../screens/SignUp";
import SignInScreen from "../screens/SignIn";

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IconButton } from "react-native-paper";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const AppNavigator = () => (
  <Drawer.Navigator drawerType="front">
    <Drawer.Screen name="Welcome" component={StackNavigator} />
  </Drawer.Navigator>
);

const StackNavigator = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => (
  <Stack.Navigator
    initialRouteName="SignIn" 
    headerMode="none"
    // screenOptions={{
    //   headerStyle: { backgroundColor: "#FFC200" },
    //   headerLeft: () => (
    //     <IconButton
    //       style={{ minWidth: 0, left: 4 }}
    //       icon="menu"
    //       onPress={() => navigation.toggleDrawer()}
    //     />
    //   ),
    //   headerTitleContainerStyle: { left: 44 },
    // }}
  >
    <Stack.Screen
      name="SignIn"
      component={SignInScreen}
      initialParams={{ ...route.params }}
    />

    <Stack.Screen
      name="SignUp"
      component={SignUpScreen}
      initialParams={{ ...route.params }}
    />

    <Stack.Screen
      name="Home"
      component={HomeScreen}
      initialParams={{ ...route.params }}
      options={{
        title: "Lithium KB App",
      }}
    />

  </Stack.Navigator>
);

export default AppNavigator;
