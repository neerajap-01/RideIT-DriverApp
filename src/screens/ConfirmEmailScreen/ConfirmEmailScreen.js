import React, {useState} from "react";
import {View, Text, StyleSheet, ScrollView, Alert} from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import {useNavigation, useRoute} from "@react-navigation/native";
import { useForm } from "react-hook-form";
import {Auth} from "aws-amplify";


const ConfirmEmailScreen = () => {
    const route = useRoute();
    const throwError = "PostConfirmation failed with error Cannot read property 'done' of undefined."
    const [loading, setLoading] = useState(false);
    const [loadingCode, setLoadingCode] = useState(false);
    const {control, handleSubmit, watch} = useForm({ defaultValues: { username: route?.params?.username } });

    const username = watch("username");

    const onConfirmPressed = async (data) => {
        if(loading){
            return;
        }
        setLoading(true);
        try{
            const response = await Auth.confirmSignUp(data.username, data.code);
            console.log(response);
        }catch (e) {
            if(e.message === throwError){
                navigation.navigate("SignIn");
            } else {
                Alert.alert('Oops, Something went wrong', "Please enter a valid code sent to you email.");
            }
        }
        setLoading(false);
        // console.log(data);
    }

    const onSignInPressed = () => {
        navigation.navigate("SignIn");
    }

    const onResendPressed = async() => {
        if(loadingCode){
            return;
        }
        setLoadingCode(true);
        try{
            await Auth.resendSignUp(username);
            Alert.alert('Success', 'Verification Code has been sent to you email address.')
        }catch (e) {
            Alert.alert('Oops, Something went wrong', e.message);
        }
        setLoadingCode(false);
    }

    const navigation = useNavigation();

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Confirm your email</Text>

                <CustomInput
                    name="username"
                    control={control}
                    placeholder="Username"
                    rules={{
                        required: 'Username is required'
                    }}
                />

                <CustomInput
                    name="code"
                    control={control}
                    placeholder="Enter your confirmation code"
                    rules={{
                        required: 'Confirmation code is required'
                    }}
                />

                <CustomButton text={loading ? "Loading..." : "Confirm"} onPress={handleSubmit(onConfirmPressed)}/>

                <CustomButton
                    text={loadingCode ? "Sending code" : "Resend Code"}
                    onPress={onResendPressed}
                    type="SECONDARY"
                />

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

export default ConfirmEmailScreen
