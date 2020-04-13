import React from "react";
import HomeScreen from "../screens/Home";
import ArticleScreen from "../screens/Article";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { IconButton } from "react-native-paper";
import { View } from "react-native";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Drawer.Navigator drawerType="front">
      <Drawer.Screen name="Welcome" component={StackNavigator} />
    </Drawer.Navigator>
  );
}

const StackNavigator = ({
  navigation,
  route
}: {
  navigation: any;
  route: any;
}) => (
  <Stack.Navigator
    initialRouteName="Home"
    mode="modal"
    headerMode="float"
    screenOptions={{
      headerStyle: { backgroundColor: "#FFC200" },
      headerLeft: () => (
        <IconButton
          style={{ minWidth: 0, left: 4 }}
          icon="menu"
          onPress={() => navigation.toggleDrawer()}
        />
      ),
      headerTitleContainerStyle: {
        left: 4
      }
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
    <Stack.Screen
      name="article"
      component={ArticleScreen}
      initialParams={{ ...route.params, articleId: 1 }}
      options={{
        title: "",
        headerStyle: { backgroundColor: "#fff" },
        headerLeft: () => (
          <IconButton
            color="black"
            style={{ left: 4, height: "100%" }}
            icon="menu"
            onPress={() => navigation.toggleDrawer()}
          />
        ),
        headerTitleContainerStyle: { left: 4 },
        headerRight: () => (
          <View style={{ flexDirection: "row" }}>
            <IconButton
              color="#FFC200"
              icon="heart"
              onPress={() => console.log("favorite")}
            />
            <IconButton
              color="#dadada"
              icon="magnify"
              onPress={() => console.log("search")}
            />
          </View>
        )
      }}
    />
  </Stack.Navigator>
);
