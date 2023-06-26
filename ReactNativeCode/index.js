import React, { useState,useEffect,useRef } from 'react';
import {
  AppRegistry,StyleSheet,Text,View,Button,SafeAreaView
} from 'react-native';
import SegmentComponent from './SegmentComponent';
import styles from './ComponentStyles';
import CalendarComponent from './CalendarComponent';
import ArrowButton from './ArrowButton';
import WebComponent from './WebComponent';
import { NativeModules } from 'react-native';
import BridgeModule from './BridgeModule';
import WebView from 'react-native-webview';
import ListComponent from './ListComponent';
import MyModule from './MyModule'; 

const GraphPage = () => {


  const url="http://192.168.2.141:3000";//http://192.168.2.141:3000 http://192.168.2.125:3000
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [leftArrowButtonHidden, setLeftArrowButtonHidden] = useState(false);
  const [rightArrowButtonHidden, setRightArrowButtonHidden] = useState(false);
  const [regDate, setRegDate] = useState(new Date(2023, 5, 23));
  const [currentDate, setCurrentDate] = useState(new Date());

   const fai = {
    key1: 'value1',
    key2: 'value2',
    key3: 'value3',
  };

  const [receivedData, setReceivedData] = useState({});
  

  const handleNavigationStateChange = event => {
    if (event.loading) {
      return;
    }
    setWebViewHeight(event.jsEvaluationValue);
  };

  const leftBtnPressed = () => {
    setSelectedDate(subtractOneDay(selectedDate))
    console.log('leftBtnPressed!' + selectedDate);
    setButtonState()
  };
  

  const rightBtnPressed = () => {
    setSelectedDate(addOneDay(selectedDate))
    console.log('rightBtnPressed!' + selectedDate);
    setButtonState()
  };


  const setButtonState= () =>{
    setLeftArrowButton()
    setRightArrowButton() 
  }

  const setLeftArrowButton = () => {
    if(compareDates(regDate,selectedDate)){
      setLeftArrowButtonHidden(false);
    }else{
       setLeftArrowButtonHidden(true);
    }
  }

  const setRightArrowButton = () => {
    if(compareDates(selectedDate,currentDate)){
      setRightArrowButtonHidden(false);
    }else{
      setRightArrowButtonHidden(true);
    }
  }
  const onButtonPress = (value) => {
    setSelectedDate(value)
    console.log('selectedDate onButtonPress!' + value);
    setButtonState()
    
    MyModule.myNativeMethod('Data from JavaScript to iOS!');
  };

  const compareDates = (dateString1, dateString2) => {
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);
  
    // Set hours, minutes, seconds, and milliseconds to zero
    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);
  
    console.log('date1 = ' + date1 + ' date2 = ' + date2);
    
    if (date1.getTime() < date2.getTime()) {
      return true;
    } else {
      return false;
    }
  };

  const subtractOneDay = (date) => {
    const previousDate = new Date(date);
    previousDate.setDate(previousDate.getDate() - 1);
    return previousDate;
  };

  const addOneDay = (date) => {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    return nextDate;
  };

  const fetchDataFromNative = () => {


    // MyModule.getDataFromNative((error, data) => {
    //   if (error) {
    //     console.error(error);
    //   } else {
    //     console.log('Data from iOS to JavaScript:', data);
    //   }
    // });

    MyModule.callApi('store/fetch_store_home_components?', fai)
    .then((response) => {
      console.log('API call Data', response);

     // this.setState({ cardsArray: response.data.cards, loading: false })
     setReceivedData(response)
    })
    .catch((error) => {
      console.log('API call failed: ', error);
    });
  };


  useEffect(() => {
    fetchDataFromNative();
  }, []);

  return (

<View style={styles.container}>
  <SegmentComponent />
  <View style={{flex:0, flexDirection: 'row', justifyContent: 'center' }}>
    <View style={{ flexDirection: 'row', marginVertical: 20 ,height:'auto'}}>
      <ArrowButton direction="left" enabled={!leftArrowButtonHidden} onPress={leftBtnPressed} />
    </View>
    <View style={{ width: 200 ,height:'auto'}}>
      <CalendarComponent onButtonPress={onButtonPress} />
    </View>
    <View style={{ flexDirection: 'row', marginVertical: 20 ,height:'auto'}}>
      <ArrowButton direction={'right'} enabled={!rightArrowButtonHidden} onPress={rightBtnPressed} />
    </View>
  </View>
  <View style={{ flex:1,flexDirection: 'row', marginVertical: 20 }}>
    <ListComponent receivedData={receivedData}/>
  </View>
</View>

  );
};



AppRegistry.registerComponent(
  'myapp',
  () => GraphPage
);