import React, { Component } from "react";
import PropTypes from "prop-types";
import { createStackNavigator } from "@react-navigation/stack";

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const Stack = createStackNavigator();

const DrawerButton = props => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("DrawerOpen");
        }}
      >
        <Image source={require("../img/iconImage.png")} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const HomeScreen = props => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen
      name="Home"
      component={HomeComponent}
      initialParams={{ ...props }}
      options={{
        title: "Welcome!",
        headerStyle: {
          backgroundColor: "#f4511e"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      }}
    />
  </Stack.Navigator>
);

const HomeComponent = props => {
  const filteredTodos = ["One", "Two", "Three", "Four", "Five"];

  return (
    <View style={styles.main}>
      <View style={styles.todoList}>
        {filteredTodos.map(todo => (
          <Text> {todo} </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    margin: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  todoList: {
    backgroundColor: "white"
  }
});

export default HomeScreen;
