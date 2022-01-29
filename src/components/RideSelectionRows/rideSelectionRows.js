import React from "react";
import { Image, Text, View, Pressable } from "react-native";
import styles from "./styles";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const RideSelectionRows = props => {
    const { type, onPress, isSelected } = props;

    const getImage = () => {
        if (type.type === "Car") {
            return require("../../assets/images/car.jpeg");
        }
        if (type.type === "Bike") {
            return require("../../assets/images/bike-side.png");
        }
        return require("../../assets/images/scooty-side.png");
    };

    return (
        <Pressable
            onPress={onPress}
            style={[styles.container, {
                backgroundColor: isSelected ? '#efefef' : 'white',
            }]}
        >
            {/* Image */}
            <Image style={styles.image} source={getImage()} />

            <View style={styles.middleContainer}>
                <Text style={styles.type}>
                    {type.type} <FontAwesome5 name={"user-check"} size={16} />
                </Text>
            </View>

            {isSelected?<View style={styles.rightContainer}>
                <FontAwesome name={"check-square-o"} size={25} color={"#42d742"} />
                <Text style={styles.price}>Selected</Text>
            </View>
            :
            <View style={styles.rightContainer}>
                <FontAwesome name={"square-o"} size={25} color={"#42d742"} />
                <Text style={styles.price}>Select</Text>
            </View>}
        </Pressable>
    );
};

export default RideSelectionRows;
