import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";
import RideSelectionRows from "../RideSelectionRows/rideSelectionRows";
import typesdata from "../../assets/data/types";

const RideSelection = ({ typeState , onSubmit}) => {
  const [selectedType, setSelectedType] = typeState;

  return (
      <View>
        <View style={styles.info}>
          <Text style={styles.infoText}>Selected Your Vehicle from below options</Text>
        </View>
        {typesdata.map(type => (
            <RideSelectionRows
                type={type}
                key={type.id}
                isSelected={type.type === selectedType}
                onPress={() => setSelectedType(type.type)}
            />
        ))}
        <Pressable onPress={onSubmit} style={styles.confirm}>
          <Text style={styles.text}>
            Confirm Vehicle
          </Text>
        </Pressable>
      </View>
  );
};

export default RideSelection;
