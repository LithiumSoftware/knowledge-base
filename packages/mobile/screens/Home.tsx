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
import { Button } from "react-native-paper";

/*const StackButton = props => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("StackOpen");
        }}
      >
        <Image source={require("../img/iconImage.png")} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};*/

/*const StackNavigatorConfig = {
  options: {
    header: (props: any) => <AppBar {...props} searchable />,
    headerStyle: {
      backgroundColor: "transparent"
    },
    gesturesEnabled: false
  }
};*/

const Stack = createStackNavigator();
//
const HomeScreen = ({ navigation, route }) => (
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
      component={HomeComponent}
      initialParams={{ ...route.params }}
      options={{
        title: "Lithium KB App - Friday 27/03 Demo"
      }}
    />
  </Stack.Navigator>
);

/*options = {{
  header: (props: any) => <HomeComponent {...props} searchable />
}}*/

const HomeComponent = props => {
  console.log(props);
  const filteredTodos = [
    "one",
    "two",
    "three",
    "one",
    "two",
    "three",
    "one",
    "two",
    "three"
  ];

  return (
    <View style={styles.main}>
      <Text>
        {" "}
        Es muy importante para nosotros que se tomen este desafío muy
        seriamente, que se enfoquen en desarrollar dicha tarea de manera que el
        código generado pueda ser re-utilizado en el futuro (esto último, es muy
        importante para Lithium ya que nuestra rapidez de delivery de soluciones
        depende de ello), cumpla con las mejores prácticas, comentarios
        pertinentes y justificación de decisiones tomadas
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    display: "flex",
    flex: 1,
    width: "100%",
    flexDirection: "column",
    padding: 18,
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: "center",
    backgroundColor: "#fff"
  },

  todoList: {
    flex: 1,
    width: "100%",
    backgroundColor: "red"
  },
  todoListG: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFC200"
  },
  todoListB: {
    flex: 1,
    width: "100%",
    backgroundColor: "green"
  }
});

export default HomeScreen;
