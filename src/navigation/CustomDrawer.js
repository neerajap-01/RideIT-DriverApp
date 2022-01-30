import React from 'react';
import {Pressable, Text, View, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItemList,} from '@react-navigation/drawer';
import { Auth } from "aws-amplify";

const CustomDrawer = props => {
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
              backgroundColor: '#cacaca',
              width: 50,
              height: 50,
              borderRadius: 25,
              marginRight: 10,
            }}
          />

          <View>
            <Text style={{color: 'white', fontSize: 24}}>Neeraj Pal</Text>
            <Text style={{color: 'lightgrey'}}>5.00 *</Text>
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
            onPress={() => {
              console.warn('Messages');
            }}>
            <Text style={{color: '#dddddd', paddingVertical: 5}}>Messages</Text>
          </Pressable>
        </View>

        {/* Do more */}
        <Pressable
          onPress={() => {
            console.warn('Make Money Driving');
          }}>
          <Text style={{color: '#dddddd', paddingVertical: 5}}>
            Do more with your account
          </Text>
        </Pressable>

        {/* Make money */}
        <Pressable
          onPress={() => {
            console.warn('Make Money Driving');
          }}>
          <Text style={{color: 'white', paddingVertical: 5}}>
            Make money driving
          </Text>
        </Pressable>
      </View>

      <DrawerItemList {...props} />

        <Pressable
            onPress={() => {
                Auth.signOut()
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
