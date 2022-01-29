import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import {StackActions, useNavigation} from "@react-navigation/native";


const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal: 8, marginRight: 15}}
        {...props}
    ><Text style={{fontSize: 16, fontWeight: "600", color: '#111111'}}>Done</Text></TouchableOpacity>
);
const OnboardingScreen = props => {
    const navigation = useNavigation();
  return (
      <Onboarding
          DoneButtonComponent={Done}
          onSkip={()=> navigation.dispatch(StackActions.replace('SignIn', { user: null }))}
          onDone={()=> navigation.dispatch(StackActions.replace('SignIn', { user: null }))}
          pages={[
              {
                  backgroundColor: '#ffffff',
                  image: (
                      <LottieView
                          style={{ height: 500}}
                          autoSize
                          autoPlay
                          loop
                          source={require('../../../assets/lottieFiles/rideConfirm.json')}
                      />
                  ),
                  title: 'Confirm Your Ride',
                  subtitle: 'Choose from the variety of vehicles options available within the application',
              },{
                  backgroundColor: '#ffffff',
                  image: (
                      <LottieView
                          style={{ height: 500}}
                          autoSize
                          autoPlay
                          loop
                          source={require('../../../assets/lottieFiles/pickUp.json')}
                      />
                  ),
                  title: 'Hope In Your Ride',
                  subtitle: 'Get the ride nearest to your location with your chosen driver and vehicle',
              },{
                  backgroundColor: '#ffffff',
                  image: (
                      <LottieView
                          style={{ height: 500}}
                          autoSize
                          autoPlay
                          loop
                          source={require('../../../assets/lottieFiles/dropOff.json')}
                      />
                  ),
                  title: 'Enjoy The Ride',
                  subtitle: 'Finally enjoy the ride to your desired destination',
              },
          ]}
          transitionAnimationDuration={300}
      />
  );
};

export default OnboardingScreen;
