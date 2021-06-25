import React, {Component} from 'react';
import {Picker} from '@react-native-picker/picker';
import {View, Dimensions, StyleSheet, ScrollView, Text} from 'react-native';
import { CountUp } from 'use-count-up'
const {width, height} = Dimensions.get('window');

const Information = ({report}) => {
  const data = report && report.length ? report[report.length - 1] : [];
  const summary = [
    {
      title: 'Số ca nhiễm',
      count: data.Confirmed,
      type: 'Confirmed',
    },
    {
      title: 'Khỏi',
      count: data.Recovered,
      type: 'Recovered',
    },
    {
      title: 'Tử vong',
      count: data.Deaths,
      type: 'Deaths',
    },
  ];

  const borderTopColor = (type) =>{
 
    if(type === "Confirmed"){
      return "red"
    } 
    if(type === "Recovered"){  
      return "green"
    }
    if(type === "Deaths"){
   
    return  "grey"
      
    }
   
}

  return (
    <View
      style={styles.wrapper}>
      <Text style={styles.title}>Số liệu</Text>
      <ScrollView  horizontal bounces showsHorizontalScrollIndicator={false}>
        {  summary.map(item => {
          return (
            <View key={item.type} style={[styles.itemView,{borderTopColor:borderTopColor(item.type)}]}>
              <Text style={styles.itemTitle}>{item.title}</Text>
               <View>
               <Text style={styles.itemContent}><CountUp isCounting={true}  end={item.count || 0} duration={3}  thousandsSeparator=" " ></CountUp></Text>
               </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemView: {
    borderTopWidth: 2.5,
    alignSelf:"flex-start",
    alignItems: 'center',
    padding: 10,
    margin: 15,
    borderRadius: 10,
    elevation: 10,
    backgroundColor: '#ffffff',
  },
  title: {
    marginTop: 20,
    color: '#060655',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemTitle: {
    height: 60,
    color: 'green',
    fontSize: 17,
    fontWeight: 'bold',
  },
  itemContent: {
    color: '#060633',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
export default Information;
