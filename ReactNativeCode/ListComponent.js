import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import WebComponent from './WebComponent';
import DataDisplayInRowComponent from './DataDisplayInRowComponent.js';

const ListItem = ({ item,xAxisValues,yAxisValues,listData,allData }) => {
  const url = "http://192.168.2.55:3000";
  
  
  if (item.type === 'text') {
    
    return (

      <DataDisplayInRowComponent item={item} />
   
    );
  } else if (item.type === 'web') {

    //console.log('xAxisValues = '+xAxisValues)

    return (
      
        <View>
        <WebComponent url={url} xAxisValues={xAxisValues} data={yAxisValues} testData={allData} />
      </View>
     
    );
  }

  return null;
};

const ListComponent = ({ receivedData }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([
    { id: 1, type: 'web', source: '', dateValue: 'abc', subTitle: 'xyz', title: 'Item 1' },
  ]);

  const [xAxisValues, setxAxisValues] = useState([]);
  const [yAxisValues, setyAxisValues] = useState([]);
  const [listData, setListData] = useState([{}]);
  const [allData, setAllData] = useState({});

  const loadMoreData = () => {
    setIsLoading(true);
    var newData = [];

    setTimeout(() => {
      if(receivedData != null){
      if (receivedData && receivedData.data && receivedData.data.yAxisValues) {
        
        try{
        console.log('List data 2 ' + receivedData)

        // const jsonString = JSON.stringify(receivedData);
        setAllData(receivedData)
        setListData(receivedData.data.listData)
        setxAxisValues(receivedData.data.xAxisValues)
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
        { id: data.length + 1, type: 'text', dateValue: `${listData[data.length - 1].title}`, subTitle: `${listData[data.length - 1].subTitle}`, title: `Item ${data.length + 1}` },
      ];

    }else{
      newData = [...data];
    }
  };


  return (
    <FlatList
      style={{ flex: 1, height: 'auto' }}
      data={data}
      renderItem={({ item }) => <ListItem item={item} xAxisValues={xAxisValues} yAxisValues={yAxisValues} listData={listData} allData={allData}/>}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.2}
      ListFooterComponent={isLoading && <ActivityIndicator />}
    />
  );
};

export default ListComponent;