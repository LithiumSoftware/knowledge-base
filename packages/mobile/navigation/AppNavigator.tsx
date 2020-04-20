import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IconButton } from "react-native-paper";
import styled from "styled-components/native";

import HomeScreen from "../screens/Home";
import Sidebar from "../components/Sidebar";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const AppNavigator = () => {
  const [rootPath, setRootPath] = useState([]);
  const [selected, setSelected] = useState(null);

  return (
    <Drawer.Navigator
      drawerContent={(props: any) => (
        <Sidebar {...props} rootPath={rootPath} selected={selected} />
      )}
      drawerType="front"
      drawerStyle={{ paddingTop: -4 }}
    >
      <Drawer.Screen
        name="Welcome"
        component={StackNavigator}
        initialParams={setRootPath}
      />
    </Drawer.Navigator>
  );
};

interface StackProps {
  navigation: any;
  route: any;
  setRootPath: Function;
  setSelected: Function;
}

const StackNavigator = ({
  navigation,
  route,
  setRootPath,
  setSelected,
}: StackProps) => (
  <Stack.Navigator
    initialRouteName="Home"
    mode="modal"
    headerMode="float"
    screenOptions={{
      headerLeft: () => (
        <StyledIconButton
          color="#000"
          icon="menu"
          onPress={() => navigation.toggleDrawer()}
        />
      ),
      headerTitleContainerStyle: { left: 44 },
    }}
  >
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

const StyledIconButton = styled(IconButton)`
  min-width: 0;
  left: 4px;
`;
