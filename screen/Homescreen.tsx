import * as React from 'react';
import { View, Text, Button, SafeAreaView, StyleSheet, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tool1 from './img2d3d';
import Tool2 from './imghd';
import Tool3 from './vd3d';
const stack = createNativeStackNavigator();
function Navigationtab()
{
  return (
    <NavigationContainer >
      <stack.Navigator  initialRouteName="home">
        <stack.Screen name="home" component={HomeScreen} options={{headerShown:false}}></stack.Screen>
        <stack.Screen name="Img2Dto3D" component={Tool1}></stack.Screen>
        <stack.Screen name="ImgHD" component={Tool2}></stack.Screen>
        <stack.Screen name="vdHD" component={Tool3}></stack.Screen>
      </stack.Navigator>
    </NavigationContainer>
  )
}
function HomeScreen({navigation}:any) {
    return (
      <View >
          <ImageBackground source={require('../asset/background.jpeg')} style={{ width:'100%',
      height:'100%'}}>
        <Text style={{paddingTop:'5%',color:'white',fontSize:25}}>What do you want to do?</Text>
            <View style={styles.container}>
              <View style={styles.chose}>
              <TouchableOpacity style={styles.touch} onPress={()=>navigation.navigate("Img2Dto3D")}>
              <Text style={styles.text} >Convert Image 2D to Image 3D</Text>
              </TouchableOpacity>
              </View>
              
              <View style={styles.chose}>
              <TouchableOpacity style={styles.touch}  onPress={()=>navigation.navigate("ImgHD")}>
              <Text style={styles.text} >Enhance photo resolution</Text>
              </TouchableOpacity>
              </View>

              <View style={styles.chose}>
              <TouchableOpacity style={styles.touch}  onPress={()=>navigation.navigate("vdHD")}>
              <Text style={styles.text} >Convert Image 2D to Video 3D</Text>
              </TouchableOpacity>
              </View>
              
            </View>
          </ImageBackground>
      </View>
    );
  }
const styles = StyleSheet.create(
  {
    container:{
      flex:1,
      alignItems:'center',
      
    },
    chose:{
      width:'80%',
      height:'10%',
      borderWidth:1,
      borderRadius:20,
      borderColor:'white',
      marginEnd:30,
      alignItems:'center',
      justifyContent:'center',
      marginVertical : 20,
    },
    text:{
      color:'white',
      fontSize:20
    },
    touch:{
      width:'100%',height:'100%',justifyContent:'center',
      alignItems:'center',

    }
  }
)
export default Navigationtab; 