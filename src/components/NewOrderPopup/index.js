import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from "./styles.js";
import Foundation from "react-native-vector-icons/Foundation";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import Entypo from "react-native-vector-icons/Entypo";

const NewOrderPopup  = ({ newOrder, onAccept, onDecline, duration, distance }) => {

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
                    <Foundation name={"burst-new"} size={50} />
                    {/*{newOrder.user.rating}*/}

                </Text>
            </View>

            <Text style={styles.minutes}>{duration} order</Text>
          <Entypo name={"shield"} size={30} color={"white"}/>
            <Text style={styles.distance}>Safe Ride</Text>

        </Pressable>
    </View>
  );
};

export default NewOrderPopup;
