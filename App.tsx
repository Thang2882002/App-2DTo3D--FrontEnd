
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigationtab from "./screen/Homescreen";
const stack = createNativeStackNavigator();
function App()
{
  return (
    <Navigationtab></Navigationtab>
  )
}
export default App;