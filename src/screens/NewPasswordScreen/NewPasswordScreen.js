import React, {useState} from "react";
import {View, Text, StyleSheet, ScrollView, Alert} from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import {useNavigation, useRoute} from "@react-navigation/native";
import {useForm} from "react-hook-form";
import {Auth} from "aws-amplify";

const NewPasswordScreen = () => {
    const route = useRoute();
    const [loading, setLoading] = useState(false);
    const throwError = "PostConfirmation failed with error Cannot read property 'done' of undefined."
    const {control, handleSubmit} = useForm({ defaultValues: { username: route?.params?.username } });

    const onSubmitPressed = async (data) => {
        if(loading){
            return;
        }
        setLoading(true);
        try{
            await Auth.forgotPasswordSubmit(data.username, data.code, data.password);
            navigation.navigate("SignIn");
        }catch (e) {
            if(e.message === throwError){
                navigation.navigate("SignIn");
            } else {
                Alert.alert('Oops, Something went wrong', "Please enter a valid code sent to you email.");
            }
        }
        setLoading(false);
        // console.log(data);
        // navigation.navigate("Home");
    }

    const onSignInPressed = () => {
        navigation.navigate("SignIn");
    }

    const navigation = useNavigation();

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Reset your password</Text>

                <CustomInput
                    name="username"
                    control={control}
                    placeholder="Username"
                    rules={{
                        required: 'Username is required'
                    }}
                />

                <CustomInput
                    name='code'
                    control={control}
                    placeholder="Enter your confirmation code"
                    rules={{
                        required: 'Confirmation code is required'
                    }}
                />

                <CustomInput
                    name="password"
                    placeholder="Password"
                    control={control}
                    secureTextEntry
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

                <CustomButton text={loading ? "Loading..." : "Submit"} onPress={handleSubmit(onSubmitPressed)}/>

                <CustomButton
                    text="Back to Sign In"
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
});

export default NewPasswordScreen
