import React, { useEffect, useState } from "react";
import { PermissionsAndroid, Platform, View } from "react-native";
import RideSelection from "../../components/RideSelection/rideSelection";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { updateCar } from "../../graphql/mutations";
import Geolocation from "@react-native-community/geolocation";
import { StackActions, useNavigation } from "@react-navigation/native";

const SearchResult = props => {
    const navigation = useNavigation();
    const typeState = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        const [type] = typeState;
        if (!type) {
            return;
        }
        if(loading){
            return;
        }
        setLoading(true);

        // submit to server
        try {
            const userData = await Auth.currentAuthenticatedUser();
            const input = {
                id: userData.attributes.sub,
                type,
            }
            const updatedCarData = await API.graphql(
              graphqlOperation(updateCar, { input })
            )
            navigation.dispatch(StackActions.replace('Root'));
            //navigation.navigate('Root', { screen: 'Profile' });
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <View style={{ flex: 1 , justifyContent: 'center'}}>
            <View>
                <RideSelection typeState={typeState} onSubmit={onSubmit} loading={loading}/>
            </View>
        </View>
    );
};

export default SearchResult;
