import React, { useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';

const SegmentComponent = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleIndexChange = (index) => {
    setSelectedIndex(index);
    props.onButtonPress(index);
  };

  useEffect(() => {
    console.log('Selected index: ' + selectedIndex);
  }, [selectedIndex]);

  return (
    <View>
      <SegmentedControlTab 
        values={['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']}
        selectedIndex={selectedIndex}
        onTabPress={handleIndexChange}
        tabTextStyle={{ color: '#5A5A5A' }}
      activeTabStyle={{ backgroundColor: 'white' }}
      activeTabTextStyle={{ color: '#5A5A5A' }}
      tabStyle={{ borderColor: '#5A5A5A',backgroundColor: '#D3D3D3' }
    }
      />
    </View>
  );
};

export default SegmentComponent;
