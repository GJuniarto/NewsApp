import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Card({ post }) {
    const navigation = useNavigation();
    const navigateToDetail = () => {
        navigation.navigate("Detail", { id: post.id });
    };
    return (
        <Pressable onPress={navigateToDetail}>
            <View style={styles.container}>
                <Image
                    style={styles.imageCard}
                    source={{
                        uri: post?.imgUrl
                    }}
                />
                <View style={styles.contentCard}>
                    <Text numberOfLines={1} style={styles.title}>
                        {post?.title}
                    </Text>
                    <Text numberOfLines={3} style={styles.content}>
                        {post?.content}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        borderStyle: "solid",
        borderColor: "#cccccc",
        borderWidth: 2,
        borderRadius: 6,
        flexDirection: "row",
        marginVertical: 10
    },
    contentCard: {
        padding: 10
    },
    imageCard: {
        width: 100,
        height: 100
    },
    title: {
        fontWeight: "600",
        maxWidth: 200,
        fontSize: 18
    },
    content: {
        paddingTop: 6,
        maxWidth: 200
    }
});
