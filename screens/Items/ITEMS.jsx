import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React, {useContext, useCallback, useState, useEffect} from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../Theme/Dimension';
import {storage} from '../../server';
import {Light} from '../../Theme/Appearance';
import Items from './passwordItems';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from './Header';
import {Data} from '../../GlobalData';
import {useFocusEffect} from '@react-navigation/native';
import Animated, { FadeIn } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import { useTheme } from '../../ThemeProvider';

const ITEMS = () => {
  const {storedPasswords, setStoredPasswords} = useContext(Data);
  const {THEME} = useTheme()

  const [gridPasswordItems, setGridPasswordItems] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletedArray, setDeletedArray] = useState([]);
  const [slectedIndex, setSlectedIndex] = useState([]);

  useFocusEffect(
    useCallback(() => {
      try {
        const data = JSON.parse(storage.getString('UserPassword'));
        if (data) {
          setStoredPasswords(data)
        }
      } catch(error) {
        console.log(`errror in ITEMS ${error}`);
      }
    }, []),
  );

  useEffect(() => {
    setGridPasswordItems(() => {
      const empty = {id: 'empty'};
      if (storedPasswords.length % 2 !== 0) {
        return [...storedPasswords,empty]
      }else{
        return storedPasswords
      }
    });
  }, [storedPasswords]);

  return storedPasswords.length === 0 ? (
    <View style={[styles.emptyContainer,{backgroundColor: THEME.BGCOLOR}]}>
      <LottieView
      source={require('../../assets/Lottie Json/empty.json')}
      autoPlay
      loop
      style={styles.emptyLottieAnimation}
      />
    </View>
  ) : (
    <>
      <SafeAreaView style={[styles.container,{backgroundColor: THEME.BGCOLOR}]}>
        <Animated.FlatList
          data={gridPasswordItems}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <Items
                gridPasswordItems={gridPasswordItems}
                storedPasswords={storedPasswords}
                isDeleting={isDeleting}
                setIsDeleting={setIsDeleting}
                deletedArray={deletedArray}
                setDeletedArray={setDeletedArray}
                slectedIndex={slectedIndex}
                setSlectedIndex={setSlectedIndex}
                item={item}
                index={index}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={16}
          contentContainerStyle={[styles.flatlist]}
          numColumns={2}
          ListHeaderComponent={
            <Header
              storedPasswords={storedPasswords}
              setStoredPasswords={setStoredPasswords}
              isDeleting={isDeleting}
              setIsDeleting={setIsDeleting}
              slectedIndex={slectedIndex}
              setSlectedIndex={setSlectedIndex}
              deletedArray={deletedArray}
              setDeletedArray={setDeletedArray}
            />
          }
        />
      </SafeAreaView>
    </>
  );
};

export default ITEMS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlist: {
    alignItems: 'center',
    gap: SCREEN_HEIGHT * 0.02,
    paddingTop: SCREEN_HEIGHT * 0.02,
  },
  emptyContainer: {
    flex:1,
    justifyContent:'center',
    alignItems:"center"
  },
  emptyLottieAnimation: {
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_HEIGHT * 0.5
  }
});
