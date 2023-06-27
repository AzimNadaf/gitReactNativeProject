import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const CalendarComponent = (props) => {

  const [date, setDate] = useState(props.date);
  const [minDate, setMinDate] = useState(props.minDate);

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    console.log('onChange = ', currentDate);
    console.log('props.date = ', props.date);
    props.onButtonPress(currentDate);
  };

  
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const formattedDate = moment(date).format('DD MMM YYYY');

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showDatepicker} style={styles.button}>
        <Text style={styles.button}>{formattedDate}</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={showTimepicker}>
        <Text>{date.toLocaleTimeString()}</Text>
      </TouchableOpacity> */}
      {show && (
         <View style={{  alignItems: 'center', justifyContent: 'center', padding: 10 ,width:100,height:'auto'}}>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="inline"
          onChange={onChange}
          maximumDate={new Date()}
          minimumDate = {minDate}
        />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#D3D3D3',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  calendarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 100,
    height:200,
    backgroundColor: 'red',
    zIndex: 1,
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default CalendarComponent;

