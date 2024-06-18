import { Asset } from 'expo-asset';
import { EncodingType, readAsStringAsync } from 'expo-file-system';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      try {
      const [asset] = await Asset.loadAsync(require('./assets/icon.png'));

      const b64 = await readAsStringAsync(asset.localUri, { encoding: EncodingType.Base64 }); // error in iOS standalone app on iPhone XS and older versions. 
      setData(b64.slice(0, 64)); // iVBORw0KGgoAAAANSUhEUgAABAAAAAQA...
      } catch (e) {
        setError(e.message);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {!data && !error && <Text>Reading asset data...</Text>}
      {!!data && <Text>base64 data: {data}</Text>}
      {!!error && <Text>error: {error}</Text>}
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
