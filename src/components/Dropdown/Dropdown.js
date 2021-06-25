import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {FlatList} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');
const Dropdown = ({countries,handleModal,handleOnchange,handleSelectedCountry, navigation}) => {


  const [filterData,setFilterData] = useState([]);
  const [rootData,setRootData] = useState([]);
  const [countryName ,setCountryName] = useState('');
  const handleItemPress = (item) =>{
    handleOnchange(item.ISO2);
    handleSelectedCountry(item.Country);
    handleModal(false);
    
  }

  const searchHandle = countryName => {
    if (countryName) {
      const formatQuery = countryName.toLowerCase();
      const dataBackup = rootData;
      const data = dataBackup.filter(item =>
        item.Country.toLowerCase().match(formatQuery),
      );

      setFilterData(data);
      setCountryName(countryName);
    } else {
      setFilterData(rootData);
      setCountryName(countryName);
    }
  };

  useEffect(()=>{
     if(countries){
      setFilterData(countries);
      setRootData(countries);
     }
  },[countries])

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={()=>handleItemPress(item)}  style={styles.item}>
    <View style={styles.itemView}>
      <Text style={styles.itemTitle}>{item.Country}</Text>
    </View>
  </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <Feather
            style={styles.backButton}
            name="arrow-left"
            size={23}
            onPress={() => {
              handleModal(false)
            }}></Feather>
        </View>
        <View style={styles.searchView}>
          <TextInput
            multiline={true}
            blurOnSubmit={true}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            autoFocus={false}
            value={countryName}
            onChangeText={countryName => searchHandle(countryName)}
            style={styles.textInput}
            placeholder="email..."></TextInput>
          <Feather
            style={styles.searchButton}
            name="search"
            onPress={() => {
              Keyboard.dismiss();
            }}></Feather>
        </View>
      </View>

      <FlatList
        backgroundColor="#ffffff"
        data={filterData}
        initialNumToRender={10}
        maxToRenderPerBatch={13}
        renderItem={renderItem}
        keyExtractor={(item) => item.ISO2}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  itemView:{
    marginTop:5,
    padding:15,  
    borderBottomColor:"#060606",
    borderBottomWidth:0.5,

    
  },
  itemTitle:{
       fontSize:18
  },
  header: {
    width: width,
    height: height / 9,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  leftHeader: {
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  backButton: {
    color: '#C576F6',
    marginRight: 20,
  },
  textInput: {
    marginLeft: 10,
    height: 45,
    width: '80%',
    fontSize: 19,
    fontFamily: 'AntDesign',
    color: '#05375a',
  },
  searchButton: {
    width: '20%',
    marginRight: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#060606',
  },
  searchView: {
    width: width / 1.32,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: 5,
    backgroundColor: '#F7EEEB',
    borderRadius: 12,
  },
});
export default Dropdown;
