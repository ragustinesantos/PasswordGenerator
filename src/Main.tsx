import React from 'react';
import {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Btn from './components/Btn';
import Output from './components/Output';
import InputBox from './components/InputBox';
import FormCheckBox from './components/FormCheckBox';
import * as utils from './utility/Consts';

function Main(): React.JSX.Element {
  const [length, setLength] = useState(utils.DEFAULT_PASSWORD_REQ.length);
  const [includeUpper, setIncludeUpper] = useState(
    utils.DEFAULT_PASSWORD_REQ.upper,
  );
  const [includeLower, setIncludeLower] = useState(
    utils.DEFAULT_PASSWORD_REQ.lower,
  );
  const [includeNumber, setIncludeNumber] = useState(
    utils.DEFAULT_PASSWORD_REQ.number,
  );
  const [includeSpecial, setIncludeSpecial] = useState(
    utils.DEFAULT_PASSWORD_REQ.symbol,
  );
  const [password, setPassword] = useState('');

  console.log(
    `length: ${length}, upper: ${includeUpper}, lower: ${includeLower}, special: ${includeSpecial}, number: ${includeNumber}`,
  );

  const handleLength = (newTxt: string) => {
    setLength(newTxt);
  };

  const handleCheckbox = (isChecked: boolean, checkVal: string) => {
    switch (checkVal) {
      case 'upper':
        setIncludeUpper(includeUpper ? false : true);
        break;
      case 'lower':
        setIncludeLower(includeLower ? false : true);
        break;
      case 'special':
        setIncludeSpecial(includeSpecial ? false : true);
        break;
      case 'number':
        setIncludeNumber(includeNumber ? false : true);
        break;
      default:
        break;
    }
  };

  const handleGenerate = () => {};

  const handleReset = () => {
    setLength(utils.DEFAULT_PASSWORD_REQ.length);
    setIncludeUpper(utils.DEFAULT_PASSWORD_REQ.upper);
    setIncludeLower(utils.DEFAULT_PASSWORD_REQ.lower);
    setIncludeSpecial(utils.DEFAULT_PASSWORD_REQ.symbol);
    setIncludeNumber(utils.DEFAULT_PASSWORD_REQ.number);
  };

  return (
    <View style={style.app}>
      <Text style={style.txt}>Password Generator</Text>
      <InputBox handleLength={handleLength} />
      <FormCheckBox
        handleCheckBox={handleCheckbox}
        value="upper"
        color="#4FA3D9"
        text="Upper Case Letters"
      />
      <FormCheckBox
        handleCheckBox={handleCheckbox}
        value="lower"
        color="#57725E"
        text="Lower Case Letters"
      />
      <FormCheckBox
        handleCheckBox={handleCheckbox}
        value="special"
        color="#FD611E"
        text="Special Characters"
      />
      <FormCheckBox
        handleCheckBox={handleCheckbox}
        value="number"
        color="#B138E3"
        text="Numbers"
      />
      <Output />
      <Btn type={1} title="Generate Password" onPress={handleGenerate} />
      <Btn type={2} title="Reset" onPress={handleReset} />
    </View>
  );
}

const style = StyleSheet.create({
  app: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  txt: {
    fontSize: 30,
    fontWeight: '800',
    color: '#3C3D37',
  },
});

export default Main;
