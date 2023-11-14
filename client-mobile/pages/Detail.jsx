import { useRoute } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useQuery, gql } from "@apollo/client";
import Loading from "../components/Loading";

const GET_DETAIL_POST = gql`
    query GetPostById($getPostByIdId: ID!) {
        getPostById(id: $getPostByIdId) {
            User {
                username
            }
            imgUrl
            title
            content
            Category {
                name
            }
            createdAt
        }
    }
`;
export default function Detail() {
    const { id } = useRoute().params;
    const { loading, error, data } = useQuery(GET_DETAIL_POST, { variables: { getPostByIdId: id } });
    if (loading) return <Loading />;
    const post = data.getPostById;
    return (
        <ScrollView>
            <View style={styles.container}>
                <Image
                    style={styles.imageDetail}
                    source={{
                        uri: post?.imgUrl
                    }}
                />
                <View style={styles.content}>
                    <Text style={styles.title}>
                        {post?.title} <Text style={styles.author}>by {post?.User?.username}</Text>
                    </Text>
                    <Text style={styles.date}>
                        {new Date(post?.createdAt).toLocaleDateString("id-ID", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        })}
                    </Text>
                    <Text style={styles.contentText}>{`${post?.content}`}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        flex: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    imageDetail: {
        width: 350,
        height: 200
    },
    content: {
        paddingVertical: 20
    },
    title: {
        fontWeight: "700",
        fontSize: 20,
        marginBottom: 5
    },
    contentText: {
        whiteSpace: "pre-line",
        fontSize: 15
    },
    author: {
        fontSize: 13,
        fontWeight: "600",
        color: "#666666"
    },
    date: {
        paddingBottom: 15,
        color: "#999999"
    }
});
