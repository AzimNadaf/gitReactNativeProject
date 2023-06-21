import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

const ArrowButton = ({ direction, enabled, onPress }) => {
  const arrowImage = direction === 'left' ? require('./left_arrow.png') : require('./right_arrow.png');

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ opacity: enabled ? 1 : 0.5 }}
      disabled={!enabled}
    >
        <Image source={arrowImage} style={{ justifyContent: 'center', alignItems: 'flex-end', paddingRight: 10,height:20,width:'auto' }}/>
    </TouchableOpacity>
  );
};

export default ArrowButton;
