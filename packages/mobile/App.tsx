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

export default () => (
  <ApolloProvider client={client}>
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  </ApolloProvider>
);
