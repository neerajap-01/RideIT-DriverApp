import React, {useState} from "react";
import {View, Text, StyleSheet, ScrollView, Alert} from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import {useForm} from "react-hook-form";
import {Auth} from "aws-amplify";

const ForgotPasswordScreen = () => {
    const {control, handleSubmit} = useForm();
    const [loading, setLoading] = useState(false);

    const onSendCodePressed = async (data) => {
        const {username} = data;
        if(loading){
            return;
        }
        setLoading(true);
        try{
            await Auth.forgotPassword(data.username);
            navigation.navigate("NewPassword", {username});
        }catch (e) {
            Alert.alert('Oops, Something went wrong', e.message);
        }
        setLoading(false);
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
                    placeholder="Username"
                    control={control}
                    rules={{
                        required: 'Username is required',
                    }}
                />

                <CustomButton text={loading ? "Sending" : "Send Code"} onPress={handleSubmit(onSendCodePressed)}/>

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

export default ForgotPasswordScreen
