import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import WebComponent from './WebComponent';
import DataDisplayInRowComponent from './DataDisplayInRowComponent.js';

const ListItem = ({ item, xAxisValues, yAxisValues, listData, allData }) => {
  const url = "http://192.168.2.55:3000";

  if (item.type === 'text') {
    return (
      <DataDisplayInRowComponent item={item} />
    );
  } else if (item.type === 'web') {
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
  const [data, setData] = useState([]);
  const [xAxisValues, setxAxisValues] = useState([]);
  const [yAxisValues, setyAxisValues] = useState([]);
  const [listData, setListData] = useState([{}]);

  useEffect(() => {
    setIsLoading(true);

    if (receivedData != null) {
      if (receivedData.data && receivedData.data.yAxisValues) {
        console.log('new data called');
        
        setListData(receivedData.data.listData);
        setxAxisValues(receivedData.data.xAxisValues);
        setyAxisValues(receivedData.data.yAxisValues);
        

        const updatedData = [
          {
            id: 1,
            type: 'web',
            source: '',
            dateValue: 'abc',
            subTitle: 'xyz',
            title: 'Item 1',
          },
          ...receivedData.data.listData.map((item, index) => ({
            id: index + 2,
            type: 'text',
            dateValue: item.title,
            subTitle: item.subTitle,
            title: `Item ${index + 2}`,
          })),
        ];

        setData(updatedData);
      }
    }

    setIsLoading(false);
  }, [receivedData]);

  return (
    <FlatList
      style={{ flex: 1, height: 'auto' }}
      data={data}
      renderItem={({ item }) => <ListItem item={item} xAxisValues={xAxisValues} yAxisValues={yAxisValues} listData={listData} allData={receivedData} />}
      keyExtractor={(item) => item.id.toString()}
      ListFooterComponent={isLoading && <ActivityIndicator />}
    />
  );
};

export default ListComponent;
