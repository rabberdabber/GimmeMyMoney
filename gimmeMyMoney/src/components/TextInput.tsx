import * as React from 'react';
import {TextInput} from 'react-native-paper';

const CustomTextInput = ({text, setText, ...otherProps}) => {
  return (
    <TextInput
      textColor="black"
      underlineColor="black"
      activeUnderlineColor="#778899"
      borderRadius={20}
      value={text}
      onChangeText={text => setText(text)}
      {...otherProps}
    />
  );
};

export default CustomTextInput;
