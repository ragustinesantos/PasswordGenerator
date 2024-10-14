/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

type formCheckBoxProps = {
  color: string;
  text: string;
  value: string;
  handleCheckBox: (isChecked: boolean, checkVal: string) => void;
};

function FormCheckBox(props: formCheckBoxProps): React.JSX.Element {
  const value = props.value;
  const handleCheckbox = props.handleCheckBox;
  const color = props.color;
  const text = props.text;
  return (
    <View style={style.container}>
      <BouncyCheckbox
        size={25}
        fillColor={color}
        unFillColor="#FFFFFF"
        text={text}
        iconStyle={{borderColor: color}}
        innerIconStyle={{borderWidth: 2}}
        textStyle={{
          fontFamily: 'JosefinSans-Regular',
          fontSize: 25,
          fontWeight: '800',
        }}
        onPress={(isChecked: boolean) => {
          handleCheckbox(isChecked, value);
        }}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  checkboxView: {
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: '#FFF',
    width: '100%',
    height: 60,
  },
  checkboxTxt: {
    fontSize: 25,
    fontWeight: '600',
  },
});

export default FormCheckBox;
