import React, {useEffect} from 'react';
import {View, Text, StyleSheet, useWindowDimensions, Image, SafeAreaView} from 'react-native';
import LottieView from 'lottie-react-native';
import {StackActions, useNavigation} from "@react-navigation/native";
import Logo from "../../../assets/images/rideit_splash.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignInScreen from "../SignInScreen";


const SplashScreen = () => {
    const navigation = useNavigation();
    const {height} = useWindowDimensions();
    const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);
    useEffect(() => {
        AsyncStorage.getItem('alreadyLaunched').then((value) => {
            if (value == null) {
                AsyncStorage.setItem('alreadyLaunched', 'true');
                setIsFirstLaunch(true);
            } else {
                setIsFirstLaunch(false);
            }
        });
    }, []);
    return (
        <View style={styles.container}>
            <Image
                source={Logo}
                style={[styles.logo, {height: height * 0.3}]}
                resizeMode="contain"
            />

            <LottieView
                style={styles.lottie}
                source={require('../../../assets/lottieFiles/splash.json')}
                autoPlay
                speed={1.3}
                loop={false}
                onAnimationFinish={()=>{
                    if(isFirstLaunch === null) {
                        return null;
                    }else if (isFirstLaunch === true) {
                        return (
                            navigation.dispatch(
                                StackActions.replace('Onboard')
                            )
                        )
                    } else {
                        return (
                            navigation.dispatch(
                                StackActions.replace('SignIn', { navigationKey: "SignIn" })
                            )
                        )
                    }
                }}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: '#ffffff',
    },
    logo: {
        width: '70%',
        top: '15%',
        maxWidth: 400,
        maxHeight: 300,
    },
    lottie: {
        width: '100%',
        top: '28%',
    },
});

export default SplashScreen;
