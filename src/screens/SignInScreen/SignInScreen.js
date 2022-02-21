import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    useWindowDimensions,
    ScrollView,
    TextInput,
    Alert,
    ToastAndroid, PermissionsAndroid, Platform, TouchableOpacity
} from "react-native";
import Logo from "../../../assets/images/rideit.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
//import SocialSignInButtons from "../../components/SocialSignInButtons/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import {Auth} from "aws-amplify";
import Geolocation from "@react-native-community/geolocation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const SignInScreen = () => {
    const {control, handleSubmit, formState: {errors}} = useForm();
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(true);

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

    }

    const onUserNotConfirmedPressed = () => {
        navigation.navigate("notConfirmed")
    }
    const onForgotPasswordPressed = () => {
        navigation.navigate("ForgotPassword");
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
                secureTextEntry={visible}
                rules={{
                    required: 'Password is required',
                }}
              />
              <TouchableOpacity
                style={styles.passwordShow}
                onPress={()=>{
                    setVisible(!visible);
                    setShow(!show);
                }}
              >
                  <MaterialCommunityIcons
                    name={show === false ? 'eye' : 'eye-off'}
                    size={26}
                    color={'lightgrey'}
                  />
              </TouchableOpacity>

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
    passwordShow: {
        position: "relative",
        alignItems: "flex-end",
        left: 170,
        marginTop: -45,
        marginBottom: 25,
    }
});

export default SignInScreen
