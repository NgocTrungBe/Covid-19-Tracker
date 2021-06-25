import React, { Component } from 'react';
import  FontAwesome  from 'react-native-vector-icons/FontAwesome5';
import { View,StyleSheet,Text,Dimensions } from 'react-native';

const {width ,height} = Dimensions.get("window");
const Header = () => {
    return (
      <View style={styles.header}>
            <View style={{width:"20%"}}>
            <FontAwesome name ="shield-virus" size={35} color="green" ></FontAwesome>
            </View>
            <View style={{width:"80%"}}>  
            <Text style={styles.headerTitle}>COVID-Tracker</Text>
            </View>
      </View>
    )
}

const styles = StyleSheet.create({
    header:{
     width:width,
     padding:20,
     flexDirection:"row",
     alignItems:"center",
   
   },
   headerTitle:{
       fontSize:22,
       fontWeight:"bold",
       color:"#060667"
       
   }
});
export default Header;