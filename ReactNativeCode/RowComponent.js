import React from 'react';
import { View, StyleSheet } from 'react-native';

const RowComponent = () => {
  return (
    <View style={styles.line} />
  );
};

const styles = StyleSheet.create({
      line: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
      },
});

export default RowComponent;
