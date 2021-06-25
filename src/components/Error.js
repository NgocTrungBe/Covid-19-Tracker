import React, { Component } from 'react';
import { View,Text,Dimensions } from 'react-native';
import { useEffect, useState } from 'react/cjs/react.development';
const {width, height} = Dimensions.get('window');
const Error = ({info}) =>{

    const [message,setMessage] = useState();
    const [backgroundColor,setBackgroundColor] = useState();

    useEffect(()=>{
         if(info === 1){
             setMessage("Mất kết nối!");
             setBackgroundColor("red");
         }
         if(info === 2){
            setMessage("Kết nối không ổn định!");
            setBackgroundColor("yellow");
        }
    },[info])
    
   return(
     <View style={{width:width,height:16,backgroundColor:backgroundColor,alignItems:"center",justifyContent:"center"}}>
         <Text style={{fontSize:12,fontWeight:"900"}}>{message}</Text>
     </View>
   );
}

export default Error;