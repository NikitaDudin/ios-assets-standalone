import { Asset } from 'expo-asset';
import { readAsStringAsync } from 'expo-file-system';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  useEffect(() => {
    (async () => {
      const [asset] = Asset.loadAsync(require('./assets/icon.png'));

      await readAsStringAsync(asset.localUri); // error in iOS standalone app in iPhone XS and older versions. 
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
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
