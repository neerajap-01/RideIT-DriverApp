import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    useWindowDimensions,
    ScrollView,
    TextInput,
    Alert,
    PermissionsAndroid, Platform,
} from "react-native";
import Logo from "../../../assets/images/rideit.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons/SocialSignInButtons";
import { StackActions, useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import {Auth} from "aws-amplify";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Geolocation from "@react-native-community/geolocation";

const SignInScreen = () => {
    const {control, handleSubmit, formState: {errors}} = useForm();
    const [loading, setLoading] = useState(false);

    const androidPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the location');
            } else {
                console.log('Location permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    useEffect(() => {
        if (Platform.OS === 'android') {
            androidPermission();
        } else {
            // IOS
            Geolocation.requestAuthorization();
        }
    }, []);

    const onSignInPressed = async (data) => {
        if(loading){
            return;
        }
        setLoading(true);
        //validate user
        try{
            const response = await Auth.signIn(data.username, data.password);
            console.log(response);
        }catch (e) {
            Alert.alert('Oops, Something is wrong', e.message);
        }
        setLoading(false);

        //navigation.navigate('Home');
    }

    const onForgotPasswordPressed = () => {
        navigation.navigate("ForgotPassword");
    }

    const onUserNotConfirmedPressed = () => {
        navigation.navigate("notConfirmed")
    }

    const onSignUpPressed = () => {
        navigation.navigate("SignUp");
    }

    const {height} = useWindowDimensions();
    const navigation = useNavigation();
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Image
                    source={Logo}
                    style={[styles.logo, {height: height * 0.3}]}
                    resizeMode="contain"
                />

                <CustomInput
                    name="username"
                    placeholder="Username"
                    control={control}
                    rules={{
                        required: 'Username is required',
                        minLength: {
                            value: 5,
                            message: 'Username should be minimum 5 characters long',
                        },
                        maxLength: {
                            value: 24,
                            message: 'Username should be maximum 24 characters long',
                        },
                    }}
                />

                <CustomInput
                    name="password"
                    placeholder="Password"
                    control={control}
                    secureTextEntry
                    rules={{
                        required: 'Password is required',
                    }}
                />

                <CustomButton text={loading ? "Loading..." : "Sign In"} onPress={handleSubmit(onSignInPressed)}/>

                <View style={styles.new}>
                    <View style={styles.forgotPwd}>
                        <CustomButton
                          text="Forgot Password?"
                          onPress={onForgotPasswordPressed}
                          type="TERTIARY"
                        />
                    </View>
                    <View style={styles.notConfirmed}>
                        <CustomButton
                          text="User not confirmed?"
                          onPress={onUserNotConfirmedPressed}
                          type="TERTIARY"
                        />
                    </View>
                </View>

                {/*<SocialSignInButtons />*/}

                <CustomButton
                    text="Don't have an account? Create one"
                    onPress={onSignUpPressed}
                    type="TERTIARY"
                />

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 10,
    },
    logo: {
        width: '70%',
        maxWidth: 400,
        maxHeight: 300,
    },
    new: {
        display: "flex",
        flexDirection: 'row',
    },
    forgotPwd: {
        marginRight: 25,
    },
    notConfirmed: {
        marginLeft: 25,
    },
});

export default SignInScreen
