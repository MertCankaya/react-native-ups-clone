import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, View } from "react-native";
import RootNavigator from "./navigator/RootNavigator";

const client = new ApolloClient({
  uri: "https://neuquen.stepzen.net/api/factual-shark/__graphql",
  cache: new InMemoryCache(),
  
  headers: {
    'Content-Type': 'application/json',
    "Authorization": "apikey neuquen::stepzen.net+1000::5a5cb8e77dcbdf05167bd20ed272bf26c90c7c3f5e4a608f176680a119460fe8"
  }
});

export default function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <StatusBar style="dark" />
          <RootNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? 40 : 0,
  },
});
