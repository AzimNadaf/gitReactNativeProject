import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import WebComponent from './WebComponent';
import DataDisplayInRowComponent from './DataDisplayInRowComponent.js';

const ListItem = ({ item,yAxisValues,listData }) => {
  const url = "http://192.168.2.141:3000";
  const testData = "abc";
  
  if (item.type === 'text') {
    
    return (

      <DataDisplayInRowComponent item={item} />
   
    );
  } else if (item.type === 'web') {

    //console.log('yAxisValues = '+yAxisValues)

    return (
      
        <View>
        <WebComponent url={url} data={yAxisValues} testDate={testData} />
      </View>
     
    );
  }

  return null;
};

const ListComponent = ({ receivedData }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([
    { id: 1, type: 'web', source: '', content: 'abc', title: 'Item 1' },
  ]);

  const [yAxisValues, setyAxisValues] = useState([]);
  const [listData, setListData] = useState([{}]);

  const loadMoreData = () => {
    setIsLoading(true);
    var newData = [];
    setTimeout(() => {
      if(receivedData != null){
      if (receivedData && receivedData.data && receivedData.data.yAxisValues) {
        
        try{
        //console.log('List data 2 ' + receivedData)

        setListData(receivedData.data.listData)
        setyAxisValues(receivedData.data.yAxisValues)
        }catch{
          console.log('parcatchsedObject')
        }

      }
      }

      setData(newData);
      setIsLoading(false);

    }, 1);


    if((listData.length > 1) && (data.length > 0) && listData.length >= data.length){ 
      newData = [
        ...data,
        { id: data.length + 1, type: 'text', content: `${listData[data.length - 1].title}`, title: `Item ${data.length + 1}` },
      ];

    }else{
      newData = [...data];
    }
  };


  return (
    <FlatList
      style={{ flex: 1, height: 'auto' }}
      data={data}
      renderItem={({ item }) => <ListItem item={item} yAxisValues={yAxisValues} listData={listData}/>}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.2}
      ListFooterComponent={isLoading && <ActivityIndicator />}
    />
  );
};

export default ListComponent;