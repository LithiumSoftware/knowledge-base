<<<<<<< HEAD
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  DefaultTheme,
  Provider as PaperProvider,
  Theme
} from "react-native-paper";
=======
import * as React from "react";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Theme } from "react-native-paper";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
>>>>>>> b3e3019ca1d8079464a0fbedad270d9ff9a725dd
import { ApolloClient, ApolloClientOptions } from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { apollo } from "@workspace-library/core";

import HomeScreen from "./screens/Home";

const theme: Theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    accent: "#f1c40f",
  },
};

<<<<<<< HEAD
=======
const { Navigator, Screen } = createStackNavigator();

function HomeScreen({ route }: { route: any }) {
  React.useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center" }}>
        Hello! This is the first template from where we are going to work!
      </Text>
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate("Details", {
            parameter: "you can pass a parameter here",
          })
        }
      />
      {/* Pass data to previous screen: */}
      <Button title="Create post" onPress={() => navigation.navigate("CreatePost")} />
      <Text style={{ textAlign: "center", color: "red" }}>Post: {route.params?.post}</Text>
      <Text style={{ textAlign: "center" }}>Lithium team</Text>
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  const { parameter } = route.params;

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center" }}>Details Screen</Text>
      <Text style={{ textAlign: "center", color: "red" }}>{parameter}</Text>
      <Button
        title="Go to Details... again (navigate)"
        onPress={() =>
          navigation.navigate("Details", {
            parameter: parameter,
          })
        }
      />
      <Button
        title="Go to Details... again (push)"
        onPress={() =>
          navigation.push("Details", {
            parameter:
              parameter == "and change it on each call"
                ? "this is good"
                : parameter == "this is good"
                ? parameter
                : "and change it on each call",
          })
        }
      />
      <Button title="Go to Home (navigate)" onPress={() => navigation.navigate("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="Go back to first screen in stack" onPress={() => navigation.popToTop()} />
    </View>
  );
}

function CreatePostScreen({ navigation }) {
  const [postText, setPostText] = React.useState("");

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: "white" }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass params back to home screen
          navigation.navigate("Home", { post: postText });
        }}
      />
    </>
  );
}

>>>>>>> b3e3019ca1d8079464a0fbedad270d9ff9a725dd
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:4000/",
});

const Drawer = createDrawerNavigator(
  {
    Home: {
      screen: MyHomeScreen
    }
  },
  {
    initialRouteName: "Home"
  }
);

/*const test = <Icon
  name="bars"
  style={{ color: "white", padding: 10, marginLeft: 10, fontSize: 20 }}
/>*/

export default function App() {
  return (
    <ApolloProvider client={apollo}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
<<<<<<< HEAD
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: "Welcome"
=======
          <Navigator>
            <Screen name="Home" component={HomeScreen} />
            <Screen
              name="Details"
              component={DetailsScreen}
              initialParams={{
                parameter:
                  "Message shown when you didn't specify any params when navigating to the screen",
>>>>>>> b3e3019ca1d8079464a0fbedad270d9ff9a725dd
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>
  );
}
<<<<<<< HEAD
=======

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    padding: 30,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
>>>>>>> b3e3019ca1d8079464a0fbedad270d9ff9a725dd
