import React, { useEffect, useState } from "react";
import {View, Text, Image} from 'react-native';
import styles from "./styles.js";
import Foundation from "react-native-vector-icons/Foundation";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import Entypo from "react-native-vector-icons/Entypo";
import Geocoder from "react-native-geocoding";

Geocoder.init("Google_Maps_API_key_Paste_Here");

const NewOrderPopup  = ({ newOrder, onAccept, onDecline, duration, distance }) => {
  const [address, setAddress] = useState("");

  const destAddress = () => {
    Geocoder.from(newOrder.destLatitude, newOrder.destLongitude)
      .then(json => {
        const addressComponent = json.results[0].formatted_address;
        setAddress(addressComponent);
      })
      .catch(error => console.warn(error));
  }
  useEffect(()=> {
    destAddress()
  }, [newOrder]);
  return (
    <View style={styles.root}>
        <Pressable onPress={onDecline} style={styles.declineButton}>
            <Text style={styles.declineText}>Decline</Text>
        </Pressable>
        <Pressable onPress={onAccept} style={styles.popupContainer}>

            <View style={styles.row}>
                <Text style={styles.vehicleType}>{newOrder.type}</Text>
                <View style={styles.userbg}>
                    <FontAwesome name={"user"} color={"white"} size={35} />
                </View>
                <Text style={styles.vehicleType}>
                    {newOrder.user.username}

                </Text>
            </View>

            <Text style={styles.minutes}>{address}</Text>
            <Text style={styles.lines}>----------</Text>
            <Text style={styles.distance}>{distance}</Text>

        </Pressable>
    </View>
  );
};

export default NewOrderPopup;
