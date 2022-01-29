/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from "react";
import {SafeAreaView, StyleSheet} from 'react-native';
import Navigation from './src/navigation';
import config from './aws-exports'
import Amplify, { API, Auth, graphqlOperation } from 'aws-amplify';
import { getCarId } from "./src/graphql/queries";
import { createCar } from "./src/graphql/mutations";

Amplify.configure(config)

const App = () => {

  useEffect(() => {
    const updateUserCar =  async () => {
      //Get Authenticated user
      const authenticatedUser = await Auth.currentAuthenticatedUser({ bypassCache: true })
      if (!authenticatedUser) {
        return;
      }

      // Check if user has already a car
      const carData = await API.graphql(
        graphqlOperation(
          getCarId,
          { id: authenticatedUser.attributes.sub }
        )
      )

      if (!!carData.data.getCar) {
        console.log("User already has a car assigned");
        return;
      }

      //if not, create a new car for user
      const newCar = {
        id: authenticatedUser.attributes.sub,
        type: 'Car',
        userId: authenticatedUser.attributes.sub,
      }
      await API.graphql(graphqlOperation(
        createCar,{ input: newCar }
      ))
    };

    updateUserCar();
  }, [])

  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});


export default App;
