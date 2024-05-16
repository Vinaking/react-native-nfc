import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import { Ndef } from 'react-native-nfc-manager';
import NfcProxy from "./NfcProxy.js"


const HomeScreen = () => {
  const [value, setValue] = useState("Result")
  async function readNdef() {
    setValue("Ready to scan NFC")
    const tag = await NfcProxy.readTag();
    setValue("" + Ndef.text.decodePayload(tag.ndefMessage[0].payload))
  }

  useEffect(() => {
    // readNdef
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.wrapText}>
        <Text style={styles.textStyle}>{value}</Text>
      </View>
      <Button style={{ height: 100 }} title='Scan a Tag' onPress={readNdef}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
  },
  wrapText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'black',
    textAlign: 'center'
  },
});

export default HomeScreen