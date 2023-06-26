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

   const [data, setData] = useState([30, 2, 3, 4, 5]);

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
    console.log('leftBtnPressed!' + selectedDate);
    //setLeftArrowButtonHidden(!leftArrowButtonHidden);
    
  };
  
  const rightBtnPressed = () => {
    console.log('rightBtnPressed!' + selectedDate);
   // setRightArrowButtonHidden(!rightArrowButtonHidden);
    MyModule.myNativeMethod('Data from JavaScript to iOS!');
  };

  const onButtonPress = (value) => {
    setSelectedDate(value)
    console.log('selectedDate onButtonPress!' + value);
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