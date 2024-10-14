import React from 'react';
import {useState} from 'react';
import {View, Text, StyleSheet, Clipboard} from 'react-native';
import Btn from './components/Btn';
import Output from './components/Output';
import InputBox from './components/InputBox';
import FormCheckBox from './components/FormCheckBox';
import * as utils from './utility/Consts';
import * as snackbar from './utility/utils';
import {generatePasswordString} from './utility/passwordGenerator';

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

  const [checkboxes, setCheckboxes] = useState([
    {
      id: utils.ID_UPPER_CASE_CHECKBOX,
      color: '#4FA3D9',
      text: 'Upper Case Letter',
      isChecked: false,
    },
    {
      id: utils.ID_LOWER_CASE_CHECKBOX,
      color: '#57725E',
      text: 'Lower Case Letter',
      isChecked: false,
    },
    {
      id: utils.ID_SPECIAL_CHAR_CHECKBOX,
      color: '#FD611E',
      text: 'Special Character',
      isChecked: false,
    },
    {
      id: utils.ID_NUMBERS_CHECKBOX,
      color: '#B138E3',
      text: 'Numbers',
      isChecked: false,
    },
  ]);
  const [password, setPassword] = useState('');

  console.log(
    `length: ${length}, upper: ${includeUpper}, lower: ${includeLower}, special: ${includeSpecial}, number: ${includeNumber}`,
  );

  const handleLength = (newTxt: string) => {
    setLength(newTxt);
  };

  const handleCheckbox = (checked: boolean, id: string) => {
    switch (id) {
      case utils.ID_UPPER_CASE_CHECKBOX:
        setIncludeUpper(checked);
        break;
      case utils.ID_LOWER_CASE_CHECKBOX:
        setIncludeLower(checked);
        break;
      case utils.ID_SPECIAL_CHAR_CHECKBOX:
        setIncludeSpecial(checked);
        break;
      case utils.ID_NUMBERS_CHECKBOX:
        setIncludeNumber(checked);
        break;
      default:
        break;
    }
    setCheckboxes(
      checkboxes.map(item => {
        return item.id === id ? {...item, isChecked: checked} : item;
      }),
    );
  };

  const checkboxComponents = checkboxes.map(item => {
    return (
      <FormCheckBox
        handleCheckBox={handleCheckbox}
        checked={item.isChecked}
        id={item.id}
        color={item.color}
        text={item.text}
        key={item.id}
      />
    );
  });

  const handleCopy = () => {
    Clipboard.setString(password);
    snackbar.showSuccessSnackBar('Password Copied');
  };

  const handleGenerate = () => {
    const lengthToNum = Number(length);
    if (
      !isNaN(lengthToNum) &&
      lengthToNum >= 8 &&
      lengthToNum <= 16 &&
      (includeUpper || includeLower || includeNumber || includeSpecial)
    ) {
      const passwordRequirements: utils.PasswordRequirement = {
        length: lengthToNum,
        includeUpper: includeUpper,
        includeLower: includeLower,
        includeNumber: includeNumber,
        includeSymbol: includeSpecial,
      };
      setPassword(generatePasswordString(passwordRequirements));
    } else {
      snackbar.showErrorSnackbar('Invalid length value');
    }
  };

  const handleReset = () => {
    setLength(utils.DEFAULT_PASSWORD_REQ.length);
    setIncludeUpper(utils.DEFAULT_PASSWORD_REQ.upper);
    setIncludeLower(utils.DEFAULT_PASSWORD_REQ.lower);
    setIncludeSpecial(utils.DEFAULT_PASSWORD_REQ.symbol);
    setIncludeNumber(utils.DEFAULT_PASSWORD_REQ.number);
    setPassword('');
    setCheckboxes(
      checkboxes.map(item => {
        return {...item, isChecked: false};
      }),
    );
    snackbar.showInfoSnackBar('Cleared');
  };

  return (
    <View style={style.app}>
      <Text style={style.txt}>Password Generator</Text>
      <InputBox handleLength={handleLength} lengthTxt={length} />
      {checkboxComponents}
      <Output
        generatedPassword={password}
        placeholder="Select Options..."
        handleCopy={handleCopy}
      />
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
