import {StatusBar} from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  Button,
} from 'react-native';
import useBearStore from './store/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import './i18n/config';

import {useTranslation} from 'react-i18next';

const Stack = createNativeStackNavigator();

function LanguagePicker() {
  const {t, i18n} = useTranslation();

  return (
    <View style={{flexDirection: 'row', gap: 20, marginRight: 20}}>
      <Button onPress={() => i18n.changeLanguage('en')} title={t('en')} />
      <Button onPress={() => i18n.changeLanguage('me')} title={t('me')} />
    </View>
  );
}

function HomeScreen({navigation}) {
  // const [isBootstrapping, setIsBootstrapping] = useState(true);
  const {t} = useTranslation();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{marginBottom: 20}}>{t('title')}</Text>
      <Button title={t('button')} onPress={() => navigation.navigate('Bear')} />
    </View>
  );
}

function BearScreen() {
  const {t} = useTranslation('bear');

  const [dim, setDim] = useState(800);
  const [changeColor, setChangeColor] = useState(false);

  const bears = useBearStore(state => state.bears);
  const bearCover = useBearStore(state => state.bearCover);
  const fetchBear = useBearStore(state => state.fetchBear);
  const addBear = useBearStore(state => state.increase);
  const removeBear = useBearStore(state => state.decrease);
  const reset = useBearStore(state => state.reset);
  const autoIncrease = useBearStore(state => state.autoIncrease);
  const resetAutoIncrease = useBearStore(state => state.resetAutoIncrease);

  const handleFetchBear = () => {
    setDim(dim + 1);
    fetchBear(`https://placebear.com/${dim}/${dim}`);
  };

  useEffect(() => {
    setChangeColor(true);
    setTimeout(() => {
      setChangeColor(false);
    }, 200);
  }, [bears]);

  return (
    <ImageBackground source={{uri: bearCover}} style={styles.container}>
      <View style={bearCover ? styles.wrapperPlus : styles.wrapper}>
        <Text style={styles.title}>{t('title')}</Text>
        <Text style={[styles.amount, changeColor ? styles.amountGreen : null]}>
          {bears}
        </Text>
        <View style={styles.containerFlex}>
          <Pressable style={styles.button} onPress={() => addBear(1)}>
            <Text style={styles.text}>{t('add')}</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => removeBear(1)}>
            <Text style={styles.text}>{t('remove')}</Text>
          </Pressable>
        </View>
        <View style={styles.containerFlex}>
          <Pressable style={styles.button} onPress={() => autoIncrease()}>
            <Text style={styles.text}>{t('autoAdd')}</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handleFetchBear()}>
            <Text style={styles.text}>{t('fetch')}</Text>
          </Pressable>
        </View>
        <View style={styles.containerFlex}>
          <Pressable style={styles.button} onPress={() => reset()}>
            <Text style={styles.text}>{t('reset')}</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => resetAutoIncrease()}>
            <Text style={styles.text}>{t('resetAutoAdd')}</Text>
          </Pressable>
        </View>
      </View>

      <StatusBar style="auto" />
    </ImageBackground>
  );
}

export default function App() {
  const {t} = useTranslation('nav');
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            options={() => ({
              title: t('home'),
              headerRight: () => <LanguagePicker />,
            })}
            component={HomeScreen}
          />
          <Stack.Screen
            name="Bear"
            options={() => ({
              title: t('bear'),
              headerRight: () => <LanguagePicker />,
            })}
            component={BearScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 120,
    resizeMode: 'cover',
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperPlus: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.4)',
    paddingRight: 30,
    paddingLeft: 30,
  },
  containerFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  title: {
    fontSize: 26,
    lineHeight: 40,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  amount: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    borderRadius: 50,
    backgroundColor: 'red',
    width: 100,
    lineHeight: 0,
    height: 100,
    marginTop: 20,
    marginBottom: 20,
    borderColor: 'black',
    borderWidth: 15,
  },
  amountGreen: {
    backgroundColor: 'green',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
