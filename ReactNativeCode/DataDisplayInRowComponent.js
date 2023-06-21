import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RowComponent from './RowComponent';

const DataDisplayInRowComponent = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.itemContentContainer}>
        <Text style={styles.itemContent}>{item.content}</Text>
      </View>
      <RowComponent/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: 'space-between',
  },
  itemContentContainer: {
    flex: 1,
    
    justifyContent: 'center',
  },
  itemContent: {
    textAlign: 'left',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});


export default DataDisplayInRowComponent;
