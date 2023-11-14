import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/Home";
import { SimpleLineIcons } from "@expo/vector-icons";
import Detail from "../pages/Detail";
const Tab = createBottomTabNavigator();

export default function Navigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} options={{ title: "Home", tabBarIcon: () => <SimpleLineIcons name="home" size={24} color="black" /> }} />
        </Tab.Navigator>
    );
}
