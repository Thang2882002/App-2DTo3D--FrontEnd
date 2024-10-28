import HomeScreen from "./screen/Homescreen";
import Tool from "./screen/img2d3d";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const stack = createNativeStackNavigator();
function Navigationtab()
{
  return (
    <NavigationContainer >
      <stack.Navigator  initialRouteName="home">
        <stack.Screen name="home" component={HomeScreen} options={{headerShown:false}}></stack.Screen>
        <stack.Screen name="tool" component={Tool}></stack.Screen>
      </stack.Navigator>
    </NavigationContainer>
  )
}
export default Navigationtab;