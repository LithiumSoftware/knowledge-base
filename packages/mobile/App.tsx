import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  DefaultTheme,
  Provider as PaperProvider,
  Theme
} from "react-native-paper";
import { ApolloClient, ApolloClientOptions } from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "./screens/sign_up";
import SignIn from "./screens/sign_in";

import AppNavigator from "./navigation/AppNavigator";

const theme: Theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    accent: "#f1c40f"
  }
};

const client: ApolloClient<{}> = new ApolloClient({
  ssrMode: typeof window === "undefined", // Disables forceFetch on the server (so queries are only run once)
  link: new HttpLink({
    uri: "http://localhost:3000/api/graphql", // Server URL (must be absolute)
    credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
    fetch
  }),
  cache: new InMemoryCache()
});

const { Navigator, Screen } = createStackNavigator();

export default () => (
  <ApolloProvider client={client}>
    <PaperProvider theme={theme}>
      <NavigationContainer>
        {/* <AppNavigator /> */}
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
          </Navigator>
      </NavigationContainer>
    </PaperProvider>
  </ApolloProvider>
);
