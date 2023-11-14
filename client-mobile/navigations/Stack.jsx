import { createStackNavigator } from "@react-navigation/stack";
import Home from "../pages/Home";
import Navigator from "./Navigator";
import Detail from "../pages/Detail";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Navigator} options={{ headerShown: false }} />
            <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>
    );
}
export default MyStack;
