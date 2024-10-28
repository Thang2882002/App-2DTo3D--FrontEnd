import * as React from 'react';
import {useState , useEffect} from 'react'
import { Image } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';

import { launchImageLibrary } from 'react-native-image-picker';
import { View, Text, Button, SafeAreaView, ImageBackground, StyleSheet, TouchableOpacity, PermissionsAndroid } from 'react-native';
function Tool1({props}:any) {
  const timestamp = new Date().getTime();
  const [img,setimg] = useState('')
  const [img2,setimg2] = useState('')

  const requestCameraPermission = async () =>
  {
    setimg2('')
    try{
      const checkpermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      if(checkpermission === PermissionsAndroid.RESULTS.GRANTED)
      {
        const result:any = await launchImageLibrary({mediaType:'photo'})
        setimg(result.assets[0].uri);
        const formData = new FormData();
        formData.append("image", {
          uri: result.assets[0].uri,
          name: 'test.png',
          type: result.assets[0].type,
    
        });
        console.log(result)
        fetch(`http://10.0.2.2:8000/upload_image?timestamp=${timestamp}`, {
        method: 'POST',
        body: formData,
        headers: {
      'Content-Type': 'multipart/form-data', 
    },
    
  }).then(Response => Response.json()).then(json =>{console.log(json);})
      }
    } catch (error)
    {
      console.log(error)
    }
  
  }

  const getImageFromFastAPI2d3d = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8000/convert2d3d');
      setimg2(`http://10.0.2.2:8000/get_image_output?timestamp=${timestamp}`)
    } catch (error) {
      console.error(error);
    }
  };
  function downloadImage()
  {
    const { config, fs } = RNFetchBlob;
let PictureDir = fs.dirs.PictureDir;

// Cấu hình tùy chọn
let options = {
  fileCache: true,
  addAndroidDownloads: {
    useDownloadManager: true,
    notification: true,
    path: PictureDir + '/image_'+ Math.random()  + '.png',
    description: 'Image',
  },
};

// Tải xuống hình ảnh
config(options)
  .fetch('GET',`http://10.0.2.2:8000/get_image_output?timestamp=${timestamp}` )
  .then(res => {
    // Hiển thị thông báo sau khi tải xuống thành công
    console.log('res -> ', JSON.stringify(res));
    console.log('Hình ảnh đã được tải xuống thành công.');
  });
  }

    return (
      <View >
        <ImageBackground source={require('../asset/background.jpeg')} style={{ width:'100%',
      height:'100%',}}>
        <View style={styles.container} >
        <View style={styles.box1}>
          <ImageBackground source={require('../asset/img.jpg') }style={{width:'70%',height:'70%'
        ,marginTop:'10%',marginLeft:'5%',position:'absolute'}} resizeMode='contain'>
          </ImageBackground>
          {img!=''? <Image source={{uri:img}}style={{width:'55%',height:'52%'
        ,marginTop:'10%',marginLeft:'3%'}}resizeMode='contain'>

          </Image>:''}
         
          <View style={{width:'30%',height:'20%',borderColor:'white'
        ,borderWidth:1,borderRadius:10,marginLeft:'11%',bottom:'10%',position:'absolute'}}>
          <TouchableOpacity style={{width:'100%',height:'100%',alignItems:'center',justifyContent:'center' }} onPress={()=>requestCameraPermission()}>
      <Text style={styles.text}>Upload</Text>
</TouchableOpacity>
          </View>
          <View style={{right:'2%',top:'10%',position:'absolute',width:'40%',height:'40%',
        borderWidth:1,borderColor:'white',padding:'2%'}}>
          </View>
          <View style={{position:'absolute',width:'40%',height:'26%',borderWidth:1,borderColor:'white',borderRadius:10,right:'2%',bottom:'10%'}} >
            <TouchableOpacity style={{width:'100%',height:'100%',alignItems:'center',justifyContent:'center'}} onPress={getImageFromFastAPI2d3d} >
              <Text style={styles.text}>Convert</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* box2 -------------------------------------*/}
        
        </View>
        <View style ={styles.container}>
        <View style={styles.box2}>
        <ImageBackground source={require('../asset/img.jpg') }style={{width:'100%',height:'70%'
        ,marginTop:'10%',marginLeft:'5%',position:'absolute'}} resizeMode='contain'>
          </ImageBackground>
          {img2!=''? <Image source={{uri:img2}}style={{width:'100%',height:'50%'
        ,marginTop:'10%'}}resizeMode='cover'>

          </Image>:''}
          <View style={{width:'30%',height:'20%',borderColor:'white'
        ,borderWidth:1,borderRadius:10,marginLeft:'11%',bottom:'10%',position:'absolute'}}>
          <TouchableOpacity style={{width:'100%',height:'100%',alignItems:'center',justifyContent:'center' }} onPress={()=>downloadImage()}>
      <Text style={styles.text}>Dowload</Text>
</TouchableOpacity>
          </View>
          </View>

        </View>
        
      </ImageBackground>
      </View>
    );
  }
 const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    paddingTop:'2%',
    flex:1
  },
  box1:{
    width:'90%',
    height:'75%',
    borderWidth:1,
    borderColor:'white',
  },
  text:{
    color:'white',
    fontSize:20,
    
  },
  note:{
    color:'white',
    fontSize:18,
    fontStyle: 'italic'
  },
  box2:{
   
    alignItems:'center',
    width:'90%',
    height:'75%',
    borderWidth:1,
    borderColor:'white',
  },
 }) 
export default Tool1; 