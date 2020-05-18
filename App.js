import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
  Platform
} from 'react-native';
import { AppodealBanner, AppodealAdType, Appodeal, AppodealBannerEvent, AppodealInterstitialEvent } from 'react-native-appodeal';

const initialize = () => {
  console.log("init")
  // Setup callbacks
  registerListeners()
  const adTypes = AppodealAdType.INTERSTITIAL | AppodealAdType.REWARDED_VIDEO | AppodealAdType.BANNER;
  const consent = true;
  Appodeal.initialize('23b2781eac666d9c9c5097ab29dd1315a46afc10d0a4a120', adTypes, consent)
}

const registerListeners = () => {
  // Interstitial callbacks
  Appodeal.addEventListener(AppodealInterstitialEvent.LOADED, (event) =>
      console.log("Interstitial loaded. Precache: ", event.isPrecache)
  )
  Appodeal.addEventListener(AppodealInterstitialEvent.SHOWN, () => {
      console.log("Interstitial shown")
  })
  Appodeal.addEventListener(AppodealInterstitialEvent.EXPIRED, () => 
      console.log("Interstitial expired")
  )
  Appodeal.addEventListener(AppodealInterstitialEvent.CLICKED, () =>
      console.log("Interstitial clicked")
  )
  Appodeal.addEventListener(AppodealInterstitialEvent.CLOSED, () => 
      console.log("Interstitial closed")
  )
  Appodeal.addEventListener(AppodealInterstitialEvent.FAILED_TO_LOAD, () =>
      console.log("Interstitial failed to load")
  )
  Appodeal.addEventListener(AppodealInterstitialEvent.FAILED_TO_SHOW, () =>
      console.log("Interstitial failed to show")
  )
}

const App: () => React$Node = () => {
  // Appodeal.setAutoCache(AppodealAdType.INTERSTITIAL, true);
  initialize();
  Appodeal.cache(AppodealAdType.INTERSTITIAL)

  const onPressShowAds = () => {
    console.log("pressed button")
    Appodeal.canShow(AppodealAdType.INTERSTITIAL, 'your_placement', (result) => {
      console.log("Interstitial ", result ? "can be shown" : "can not be shown")
      if (result) Appodeal.show(AppodealAdType.INTERSTITIAL);
    })
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <TouchableOpacity onPress={onPressShowAds}><Text>show ads</Text></TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default App;
