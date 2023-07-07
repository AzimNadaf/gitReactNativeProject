import { View } from 'react-native';
import React, { useState,useEffect,useRef } from 'react';
import { WebView } from 'react-native-webview';
import AutoHeightWebView from 'react-native-autoheight-webview';

const WebComponent = ( props ) => {

  const [webViewHeight, setWebViewHeight] = useState(0);
  const [data, setData] = useState(props.data);
  const webViewRef = useRef();
  
  const handleNavigationStateChange = event => {
    if (event.loading) {
      return;
    }
    setWebViewHeight(event.jsEvaluationValue);
    console.log(`handleNavigationStateChange: ${event}`);

    if (event.title) {
      setWebViewHeight(Number(event.title));
    }

  };

  const handleMessage = (event) => {
    const { data: message } = event.nativeEvent;
    console.log(`Received message: ${message}`);
  };

  useEffect(() => {
    if(props.data == null){
      console.log('data is null')
      return
    }
    const jsonString = JSON.stringify(props.testData);
    //console.log('useEffect data: ' + jsonString);
    sendMessageToWebView(props.testData);
  }, [props.testData]);
  

  function sendMessageToWebView(data) {
    const jsonString = JSON.stringify(data);
   // console.log('WebComponent data: ' + jsonString);
     webViewRef.current.postMessage(jsonString);
  }

  return (
    <View style={{ flex: 1 ,flexDirection: 'row' }}>
<AutoHeightWebView
  ref={webViewRef}
  source={{ uri: props.url }}
  onMessage={handleMessage}
/>

 </View>

  );
};

export default WebComponent;