import React, { useState } from "react";
import { View } from "react-native";
//import RouteMap from "../../components/RouteMap/routemap";
import RideSelection from "../../components/RideSelection/rideSelection";
//import { useRoute, useNavigation } from "@react-navigation/native";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { updateCar } from "../../graphql/mutations";
import { StackActions, useNavigation } from "@react-navigation/native";
//import { createOrder } from "../../graphql/mutations";

const SearchResult = props => {
    const navigation = useNavigation();
    const typeState = useState(null);

    const onSubmit = async () => {
        const [type] = typeState;
        if (!type) {
            return;
        }

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
                <RideSelection typeState={typeState} onSubmit={onSubmit}/>
            </View>
        </View>
    );
};

export default SearchResult;
