import { NativeBaseProvider } from "native-base";

import { NavigationContainer } from "@react-navigation/native";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from "@apollo/client";

import MyStack from "./navigations/Stack";

const client = new ApolloClient({
    uri: "https://movies.gjuniarto.com/",
    cache: new InMemoryCache()
});

export default function App() {
    return (
        <ApolloProvider client={client}>
            <NavigationContainer>
                <NativeBaseProvider>
                    <MyStack />
                </NativeBaseProvider>
            </NavigationContainer>
        </ApolloProvider>
    );
}
