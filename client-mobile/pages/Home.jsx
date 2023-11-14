import { StyleSheet, SafeAreaView, View, FlatList } from "react-native";

import { useQuery, gql } from "@apollo/client";

import Header from "../components/Header";
import Card from "../components/Card";
import Loading from "../components/Loading";

const GET_POST = gql`
    query getPost {
        posts {
            id
            imgUrl
            title
            content
        }
    }
`;

export default function Home() {
    const { loading, error, data } = useQuery(GET_POST);
    if (loading) return <Loading style={styles.loading} />;
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.newsContainer}>
                <FlatList data={data?.posts} renderItem={({ item: post }) => <Card post={post} />} keyExtractor={(post) => post.id} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    newsContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
