import React, {useCallback, useState} from "react";
import {View, Text, StyleSheet, ScrollView, Alert, Linking, Button, TouchableOpacity} from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import {Auth} from "aws-amplify";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const SignUpScreen = () => {
    const {control, handleSubmit, watch} = useForm();
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(true);
    const pwd = watch('password');

    const onRegisterPressed = async (data) => {
        const {username, name, email, password} = data;
        if(loading){
            return;
        }
        setLoading(true);
        try{
            await Auth.signUp({
                username,
                password,
                attributes: {email, name, preferred_username: username},
            });
            navigation.navigate("ConfirmEmail", {username});
        }catch (e) {
            Alert.alert('Oops, Something went wrong', e.message);
        }
        setLoading(false);
    }

    const onSignInPressed = () => {
        navigation.navigate("SignIn");
    }

    const onTermsOfUsePressed = async () => {
        const url = 'https://rideit.tk/termsandconditions.html';
        await Linking.openURL(url);
        //console.warn('Term of Use');
    }

    const onPrivacyPolicyPressed = async () => {
        const url = 'https://www.privacypolicies.com/live/70975482-4e18-4610-9e4d-85e0b9902e0a';
        await Linking.openURL(url);
        //console.warn('Privacy Policy');
    }

    const navigation = useNavigation();

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.root}>
              <Text style={styles.title}>Create an account</Text>

              <CustomInput
                name="Name"
                placeholder="Name"
                control={control}
                rules={{
                    required: 'Name is required',
                    maxLength: {
                        value: 24,
                        message: 'Name should be maximum 24 characters long',
                    },
                }}
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
                name="email"
                placeholder="Email"
                control={control}
                rules={{
                    required: 'Email is required',
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$/,
                        message: 'Enter a valid email with .edu TLD'
                    }
                }}
              />

              <CustomInput
                name="password"
                placeholder="Password"
                control={control}
                secureTextEntry={visible}
                rules={{
                    required: 'Password is required',
                    minLength: {
                        value: 6,
                        message: 'Password should be minimum 6 characters long',
                    },
                    pattern: {
                        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
                        message: 'Password must contain one of 0-1,A-Z,a-z and special characters'
                    }
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

              <CustomInput
                name="password-repeat"
                placeholder="Confirm Password"
                control={control}
                secureTextEntry={visible}
                rules={{
                    validate: value => value === pwd || 'Password do not match',
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

              <CustomButton text={loading ? "Loading..." : "Register"} onPress={handleSubmit(onRegisterPressed)}/>

              <Text style={styles.text}>
                  By registering, you confirm that you accept our <Text style={styles.link} onPress={onTermsOfUsePressed}>Terms
                  of Use</Text> and <Text style={styles.link} onPress={onPrivacyPolicyPressed}>Privacy Policy</Text>.
              </Text>

              {/*<SocialSignInButtons />*/}

              <CustomButton
                text="Have an account? Sign In"
                onPress={onSignInPressed}
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

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },

    text: {
        color: 'gray',
        marginVertical: 10,
    },

    link: {
        color: '#FDB075'
    },
    passwordShow: {
        position: "relative",
        alignItems: "flex-end",
        left: 170,
        marginTop: -45,
        marginBottom: 18,
    }
});

export default SignUpScreen
