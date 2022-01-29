import React, {useEffect, useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from "../screens/SplashScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import {Auth, Hub} from "aws-amplify";
import SearchResult from "../screens/SearchResult/SearchResult";

const Stack = createNativeStackNavigator();

const config = {
    animation: 'spring',
    config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};

const Navigation = () => {
    const [user, setUser] = useState(undefined);
    const checkUser = async () => {
        try{
            const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
            setUser(authUser);
        }catch (e) {
            setUser(null);
        }
    };
    useEffect( () => {
        checkUser();
    }, []);
    useEffect(() => {
        const listener = data => {
            if(data.payload.event === 'signIn' || data.payload.event === 'signOut'){
                checkUser();
            }
        };

        Hub.listen('auth', listener);
        return () => Hub.remove('auth', listener);
    },[])

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                }}
            >
            {user ? (
                  <>
                    <Stack.Screen name="RideSelect" component={SearchResult} />
                    <Stack.Screen name="Home" component={HomeScreen} />
                  </>
            ) : (
                <>
                    <Stack.Screen name="Splash" component={SplashScreen} />
                    <Stack.Screen name="Onboard" component={OnboardingScreen} />
                    <Stack.Screen name="SignIn" component={SignInScreen}  />
                    <Stack.Screen name="SignUp" component={SignUpScreen} />
                    <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                    <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
                </>
            )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default Navigation;
