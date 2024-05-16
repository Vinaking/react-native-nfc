import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';

class NfcProxy {
    async init() {
        const supported = await NfcManager.isSupported();
        if (supported) {
            await NfcManager.start();
        }
        return supported;
    }

    readTag = (async () => {
        let tag = null
        try {
            // register for the NFC tag with NDEF in it
            await NfcManager.requestTechnology(NfcTech.Ndef);
            // the resolved tag object will contain `ndefMessage` property
            tag = await NfcManager.getTag();
            tag.ndefStatus = await NfcManager.ndefHandler.getNdefStatus();
            console.log('Taglog', tag);
        } catch (ex) {
            console.log('Taglog Oops!', ex);
        } finally {
            // stop the nfc scanning
            NfcManager.cancelTechnologyRequest();
        }
        return tag;
    }
    )

    writeNdef = (async (value) => {
        var result = false
        if (!value) {
            return result;
        }

        try {
            await NfcManager.requestTechnology(NfcTech.Ndef);
            let bytes = Ndef.encodeMessage([Ndef.textRecord(value)]);
            if (bytes) {
                await NfcManager.ndefHandler.writeNdefMessage(bytes);

                if (Platform.OS === 'ios') {
                    await NfcManager.setAlertMessageIOS('Success');
                }
            }

            result = true

        } catch (ex) {
            console.warn('Taglog Oops!', ex);
        } finally {
            NfcManager.cancelTechnologyRequest();
        }

        return result
    })
}

export default new NfcProxy();