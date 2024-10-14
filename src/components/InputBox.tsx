import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

type inputBoxProps = {
  handleLength: (newTxt:string) => void;
}

function InputBox(props : inputBoxProps): React.JSX.Element {
  const handleLength = props.handleLength;

  return (
    <View style={style.container}>
      <View style={style.inputView}>
        <TextInput
          style={style.inputTxt}
          placeholder="Password Length 8-16"
          maxLength={2}
          onChangeText={handleLength}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  inputView: {
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: '#FFF',
    width: '100%',
    height: 60,
  },
  inputTxt: {
    fontSize: 25,
    fontWeight: '400',
  },
});

export default InputBox;
