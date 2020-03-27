import React from "react";
import HomeScreen from "../screens/Home";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Button } from "react-native-paper";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default AppNavigator = () => (
  <Drawer.Navigator drawerType="front">
    <Drawer.Screen name="Welcome" component={StackNavigator} />
  </Drawer.Navigator>
);

const StackNavigator = ({ navigation, route }) => (
  <Stack.Navigator
    initialRouteName="Home"
    mode="modal"
    headerMode="float"
    screenOptions={{
      headerStyle: { backgroundColor: "#FFC200" },
      headerLeft: () => (
        <Button
          style={{ minWidth: 0, left: 4 }}
          icon="menu"
          onPress={() => navigation.toggleDrawer()}
        />
      ),
      headerTitleContainerStyle: { left: 44 }
    }}
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      initialParams={{ ...route.params }}
      options={{
        title: "Lithium KB App"
      }}
    />
  </Stack.Navigator>
);
