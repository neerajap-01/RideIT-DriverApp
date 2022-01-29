import React from "react";
import {View, Text} from "react-native";
import CustomButton from "../CustomButton";

const SocialSignInButtons = () => {    
    
    const onSignInfacebook = () => {
        console.warn('Sign In with Facebook');
    }

    const onSignInGoogle = () => {
        console.warn('Sign In with Google');
    }

    return (
        <>
            <CustomButton 
                text="Sign In with Facebook" 
                onPress={onSignInfacebook}
                bgColor="#E7EAF4"
                fgColor="#4765A9"
            />

            <CustomButton 
                text="Sign In with Google" 
                onPress={onSignInGoogle}
                bgColor="#FAE9EA"
                fgColor="#DD4D44"
            />
        </>
    );
};


export default SocialSignInButtons