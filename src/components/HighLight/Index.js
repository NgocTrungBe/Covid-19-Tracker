import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Dropdown from '../Dropdown/Dropdown';
const {width, height} = Dimensions.get('window');
const HighLight = ({value, countries, handleOnchange, navigation}) => {
  const [visible, setVisible] = useState(false);
  const [selectedCountry,setSelectedCountry] = useState("Việt Nam");
  const handleModal = bool => {
    setVisible(bool);
  };
  const handleSelectedCountry = (country) =>{
    setSelectedCountry(country);
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Quốc gia:</Text>
      <TouchableOpacity
        style={styles.pickerView}
        onPress={() => {
          handleModal(true);
        }}>
        <Text style={styles.countryName}>{selectedCountry}</Text>
        <FontAwesome name="angle-down" size={18}></FontAwesome>
      </TouchableOpacity>

      <View>
        <Modal
          transparent={true}
          animationType="fade"
          visible={visible}>
                 <Dropdown handleSelectedCountry={handleSelectedCountry} handleModal={handleModal} handleOnchange={handleOnchange} countries={countries}></Dropdown>
          </Modal>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    width: width / 2,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerView: {
    padding: 10,
    marginTop: 10,
    marginLeft: 20,
    width: width / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 5,
    backgroundColor: '#ffffff',
  },
  title: {
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
  },
  countryName: {
    color: '#060612',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default HighLight;
