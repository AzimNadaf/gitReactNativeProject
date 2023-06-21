import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import WebComponent from './WebComponent';
import DataDisplayInRowComponent from './DataDisplayInRowComponent.js';

const ListItem = ({ item,yAxisValues }) => {
  const url = "http://192.168.2.141:3000";
  const testData = "abc";
  
  if (item.type === 'text') {
    return (
      <DataDisplayInRowComponent item={item} />
    );
  } else if (item.type === 'web') {

    console.log('yAxisValues = '+yAxisValues)

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
    { id: 1, type: 'web', source: '', title: 'Item 1' },
    { id: 2, type: 'text', content: 'Hello, world!', title: 'Item 2' },
    { id: 3, type: 'text', content: 'Hello, world!', title: 'Item 3' },
    { id: 4, type: 'text', content: 'Hello, world!', title: 'Item 4' },
    { id: 5, type: 'text', content: 'Hello, world!', title: 'Item 5' },
  ]);

  const [yAxisValues, setyAxisValues] = useState([]);

  const loadMoreData = () => {
    // Simulate loading more data from an API or another source
    setIsLoading(true);

    // Example: Adding 5 more items to the data array
    const newData = [
      ...data,
      { id: data.length + 1, type: 'text', content: 'New Item', title: `Item ${data.length + 1}` },
      { id: data.length + 2, type: 'text', content: 'New Item', title: `Item ${data.length + 2}` },
      { id: data.length + 3, type: 'text', content: 'New Item', title: `Item ${data.length + 3}` },
      { id: data.length + 4, type: 'text', content: 'New Item', title: `Item ${data.length + 4}` },
      { id: data.length + 5, type: 'text', content: 'New Item', title: `Item ${data.length + 5}` },
    ];

    // Simulate an API delay with setTimeout
    setTimeout(() => {
      if(receivedData != null){

      

      if (receivedData && receivedData.data && receivedData.data.yAxisValues) {
        setyAxisValues(receivedData.data.yAxisValues)
        console.log('List data ' + yAxisValues)
      }


      }
      

      setData(newData);
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    loadMoreData(); // Load initial data
  }, []);

  return (
    <FlatList
      style={{ flex: 1, height: 'auto' }}
      data={data}
      renderItem={({ item }) => <ListItem item={item} yAxisValues={yAxisValues}/>}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.2} // Adjust the threshold as needed (e.g., 0.2 means 80% of the list must be scrolled to trigger loading)
      ListFooterComponent={isLoading && <ActivityIndicator />}
    />
  );
};

export default ListComponent;