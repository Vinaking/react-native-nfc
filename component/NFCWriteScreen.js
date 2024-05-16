import { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Button,
  Text
} from 'react-native';
import NfcProxy from "./NfcProxy.js"

const NFCWriteScreen = () => {
  const [value, setValue] = useState('')
  const [message, setMessage] = useState('')

  async function writeNdef() {
    if (!value) {
      return;
    }
    setMessage("Ready to scan NFC")
    let result = await NfcProxy.writeNdef(value)
    let message = result ? 'Write NFC success' : 'Write NFC faild'
    setMessage(message)
  };

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="Text"
        multiline={true}
        value={value}
        autoCapitalize={false}
        onChangeText={setValue}
        style={styles.textInput}
        autoFocus={true}
      />
      <Text style={{color: 'black', padding: 12, textAlign: 'center'}}>{message}</Text>
      <Button title='Write NFC' onPress={writeNdef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    color: 'black'
  }
});

export default NFCWriteScreen