import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  DefaultTheme,
  Provider as PaperProvider,
  Theme,
} from "react-native-paper";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import HomeScreen from "./screens/Home";

import { InMemoryCache } from "apollo-cache-inmemory";

import AppNavigator from "./navigation/AppNavigator";

const theme: Theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    accent: "#f1c40f",
  },
};

const link = new HttpLink({
  uri: "http://192.168.1.4:3000/api/graphql", // Server URL (must be absolute)
});
const cache = new InMemoryCache();

const client = new ApolloClient({
  link: link,
  cache: cache,
});

const { Navigator, Screen } = createStackNavigator();

const MyApp = () => (
  <PaperProvider theme={theme}>
    <ApolloProvider client={client}>
      <NavigationContainer>
        <AppNavigator />
        <Navigator screenOptions={{
            headerShown: false
          }}>
            <Screen name="SignUp" component={SignUp}  initialParams={{
                parameter:
                  "Message shown when you didn't specify any params when navigating to the screen"
              }}/>
               <Screen name="SignIn" component={SignIn}  initialParams={{
                parameter:
                  "Message shown when you didn't specify any params when navigating to the screen"
              }}/>
               <Screen name="HomeScreen" component={HomeScreen}  initialParams={{
                parameter:
                  "Message shown when you didn't specify any params when navigating to the screen"
              }}/>
          </Navigator>
      </NavigationContainer>
    </ApolloProvider>
  </PaperProvider>
);

export default MyApp;
