import React, { useEffect, useState } from "react";
import { Pressable, Text, View, StyleSheet, Image, ToastAndroid } from "react-native";
import {DrawerContentScrollView, DrawerItemList,} from '@react-navigation/drawer';
import { API, Auth, graphqlOperation } from "aws-amplify";
import { getUser } from "../graphql/queries";
import logo from "../../assets/images/rideit.png"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const CustomDrawer = props => {
  const [name, setName] = useState(null);
  const msg = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Coming soon",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  }
  const moreWithAccount = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Coming soon",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  }
  const moneyDrive = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Coming soon",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  }
  const logout = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Logged out successfully",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  }
  const fetchName = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      const userName = await API.graphql(
        graphqlOperation(getUser, { id: userData.attributes.sub }),
      );
      setName(userName.data.getUser)
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(()=>{
    fetchName();
  },[])
  return (
    <DrawerContentScrollView {...props}>
      <View style={{backgroundColor: '#212121', padding: 15}}>
        {/* User Row */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#ffffff',
              maxWidth: 50,
              maxHeight: 50,
              borderRadius: 25,
              marginRight: 10,
            }}
          >
            <Image source={logo} style={{
              backgroundColor: '#ffffff',
              maxWidth: 50,
              maxHeight: 50,
              borderRadius: 25,
              marginRight: 10,
            }}/>
          </View>

          <View>
            <Text style={{color: 'white', fontSize: 24}}>{name?.username}</Text>
            <View style={{display: 'flex', flexDirection: "row-reverse"}}>
              <Text style={{color: 'lightgrey', marginTop: -2, left: 3}}>verified user</Text>
              <FontAwesome5 style={{ position: 'relative', left: 10, }} name={"user-check"} size={14} color={'white'} />
            </View>
          </View>
        </View>

        {/* Messages Row */}
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#919191',
            borderTopWidth: 1,
            borderTopColor: '#919191',
            paddingVertical: 5,
            marginVertical: 10,
          }}>
          <Pressable
            onPress={() => msg()}>
            <Text style={{color: '#dddddd', paddingVertical: 5}}>Messages</Text>
          </Pressable>
        </View>

        {/* Do more */}
        <Pressable
          onPress={() => moreWithAccount()}>
          <Text style={{color: '#dddddd', paddingVertical: 5}}>
            Do more with your account
          </Text>
        </Pressable>

        {/* Make money */}
        <Pressable
          onPress={() => moneyDrive()}>
          <Text style={{color: 'white', paddingVertical: 5}}>
            Make money driving
          </Text>
        </Pressable>
      </View>

      <DrawerItemList {...props} />

        <Pressable
            onPress={() => {
                Auth.signOut();
                logout();
            }}
            style={styles.container}
        >
            <Text
                style={styles.text}>
                Logout
            </Text>
        </Pressable>

    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        width: '80%',
        marginLeft: 25,

        padding: 15,
        marginVertical: 5,

        alignItems: 'center',
        borderRadius: 5,

        borderColor: '#3B71F3',
        borderWidth: 2,
    },
    text: {
        fontWeight: 'bold',
        color: 'black',
    },
})

export default CustomDrawer;
