import React, {Component, useEffect, useState} from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Header from '../Header/Index';
import HighLight from '../HighLight/Index';
import Chart from '../Chart/Index';
import Information from '../Infomation/Infomation';
import {getCountries, getReportByCountryId} from '../../apis/Index';
import axios from 'axios';
import {sortBy} from 'lodash';
import {baseProps} from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import Error from '../Error';
const Home = props => {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [report, setReport] = useState([]);
  const [netWorkError, setNetWorkError] = useState(0);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected == true) {
        if (state.isInternetReachable === true) {
          getCountries().then(res => {
            if (res.status === 200) {
              const countries = sortBy(res.data, 'Country');
              setCountries(countries);
              setSelectedCountryId('vn');
              setNetWorkError(0);
            }
            if (res.status === 400) {
              setNetWorkError(2);
            }
          })
        } else {
          setNetWorkError(2);
        }
      } 
      else {
        setNetWorkError(1);
      }
    });

    return () => {
      unsubscribe;
    };
  }, []);

  const handleOnchange = e => {
    setSelectedCountryId(e.toLowerCase());
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected == true) {
        if(state.isInternetReachable === true){
          if (selectedCountryId) {
            const {Slug} = countries.find(
              country => country.ISO2.toLowerCase() === selectedCountryId,
            );
  
            getReportByCountryId(Slug).then(res => {
              if (res.status === 200) {
                res.data.pop();
                setReport(res.data);
                setNetWorkError(0);
              }
              if (res.status === 400) {
                setNetWorkError(2);
              }
               
            })
          }
          else{
            setNetWorkError(2)
          }
        }
       
      } else {
        setNetWorkError(1);
      }
    });

    return () => {
      unsubscribe;
    };
  }, [countries, selectedCountryId]);

  return (
    <ScrollView style={styles.wrapper}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>
      <Header></Header>
      {netWorkError > 0 ? <Error info={netWorkError}></Error> : null}
      <HighLight
        navigation={props.navigation}
        value={selectedCountryId}
        handleOnchange={handleOnchange}
        countries={countries}></HighLight>
      <Information report={report}></Information>
      <Chart report={report}></Chart>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default Home;
