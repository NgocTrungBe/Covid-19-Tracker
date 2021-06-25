import React, {Component} from 'react';
import {Picker} from '@react-native-picker/picker';
import {LineChart} from 'react-native-chart-kit';
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  Text,
  Modal,
} from 'react-native';
import {useEffect, useState} from 'react/cjs/react.development';
import moment from 'moment';
const {width, height} = Dimensions.get('window');
const Chart = ({report}) => {
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState('');
  const [x, setX] = useState('');
  const [y, setY] = useState('');

  useEffect(() => {
    if (report.length > 0) {
      const labelData = report.map(item => moment(item.Date).format('DD/MM'));
      const confirmData = report.map(item => item.Confirmed);
      setLabels(labelData.slice(labelData.length - 10));
      setData(confirmData.slice(confirmData.length - 10));
    }
  }, [report]);

  const formatXLabel = label => {
    return <Text style={{color: 'red'}}>{label}</Text>;
  };

  const handleModal = e => {
    setVisible(true);
    setValue(e.value);
    if (e.y < 100) {
      setY(e.y + e.y + 100);
    } else {
      setY(e.y);
    }
    setX(e.x);

    setTimeout(() => {
      setVisible(false);
      setValue('');
      setX(0);
      setY(0);
    }, 800);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.chartTitle}>Tổng ca nhiễm</Text>
      <ScrollView
        bounces
        endFillColor="green"
        showsHorizontalScrollIndicator={false}
        horizontal>
        <LineChart
          data={{
            labels: labels.length > 0 ? labels : ['/'],

            datasets: [
              {
                data: data.length > 0 ? data : [0],
              },
            ],
          }}
          xLabelsOffset={7}
          width={width}
          height={height / 3}
          yAxisInterval={1}
          verticalLabelRotation={330}
          segments={data.length > 0 ? 8 : 1}
          onDataPointClick={handleModal}
          chartConfig={{
            backgroundColor: '#f0ffff',
            backgroundGradientFrom: '#fff8dc',
            backgroundGradientTo: '#fff8dc',
            decimalPlaces: 0,
            color: (opacity = 2) => `rgba(200, 0, 0, ${opacity})`,
            labelColor: (opacity = 2) => `rgba(0, 0 , 6, ${opacity})`,
            strokeWidth: 1.5,
            style: {
              borderRadius: 1,
              marginLeft: 20,
            },
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#ffffff',
            },
          }}
          bezier
          style={{
            padding: 10,
            marginVertical: 8,
            marginHorizontal: 10,
            borderRadius: 5,
          }}
        />
      </ScrollView>
      <Modal
        style={{position: 'relative'}}
        transparent={true}
        animationType="fade"
        visible={visible}>
        <View style={[styles.modal, {left: x, bottom: y}]}>
          <Text style={styles.modalTitle}>Ca nhiễm</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  chartTitle: {
    color: '#060655',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modal: {
    position: 'absolute',
    width: 80,
    height: 50,
    padding: 5,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 20,
  },
  modalTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  value: {
    marginTop: 5,
    fontSize: 12,
    color: 'red',
    fontWeight: 'bold',
  },
});
export default Chart;
