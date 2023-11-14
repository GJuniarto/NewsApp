import { StyleSheet, Text, View } from "react-native";

export default function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>News</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 75
    },
    title: {
        fontWeight: "600",
        fontSize: 30
    }
});
