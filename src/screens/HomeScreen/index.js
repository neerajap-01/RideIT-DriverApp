import React, {useEffect, useState, useRef} from 'react';
import { View, Text, Dimensions, Pressable, ToastAndroid, Alert, Linking } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles.js";
import NewOrderPopup from "../../components/NewOrderPopup";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { getCar, listOrders } from "../../graphql/queries";
import RNRestart from 'react-native-restart';
import { updateCar , updateOrder} from "../../graphql/mutations";
import { useNavigation } from "@react-navigation/native";
import Geocoder from 'react-native-geocoding';

const GOOGLE_MAPS_APIKEY = 'Google_Maps_API_key_Paste_Here';
Geocoder.init("Google_Maps_API_key_Paste_Here");

const HomeScreen  = () => {
  const [car, setCar] = useState(null);
  const [order, setOrder] = useState(null)
  const [orderID, setOrderID] = useState(null)
  const [newOrders, setNewOrders] = useState([]);
  const [refreshPage, setRefreshPage] = useState("");
  const navigation = useNavigation();
  const fetchCar = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      const carData = await API.graphql(
        graphqlOperation(getCar, { id: userData.attributes.sub }),
      );
      setCar(carData.data.getCar);
    } catch (e) {
      console.error(e);
    }
  }
  const fetchOrders = async () => {
    try {
      const ordersData = await API.graphql(
        graphqlOperation(
          listOrders,
          { filter: { status: { eq: "NEW" } } }
        )
      );
      setNewOrders(ordersData.data.listOrders.items);
    } catch (e) {
      console.log(e);
    }
  }
  const fetchPendingOrders = async () => {
    try {
      const ordersData = await API.graphql(
        graphqlOperation(
          listOrders,
          { filter: { status: { ne: "NEW" && "DROPPING OFF" } } }
        )
      );

      if(ordersData.data.listOrders.items[0] === undefined){
        Alert.alert("Opps!! error", "Not found any Pending Orders" )
      }
      setNewOrders(ordersData.data.listOrders.items);
    } catch (e) {
      console.log(e);
    }
  }
  const pendingOrders = () => {
    if (refreshPage === true) {
      return (
        <Pressable onPress={fetchPendingOrders}
                   style={styles.balanceButton}>
          <View>
            <Text style={styles.balanceText}>
              Pending orders?
            </Text>
          </View>
        </Pressable>
      )
    }
  }
  useEffect(() => {
    if(car?.isActive === true){
      fetchOrders();
      setRefreshPage(true);
    }
    if(refreshPage === true){
      RNRestart.Restart();
    }
  }, [car?.isActive]);
  const mapRef = useRef();
  const onDecline = () => {
    setNewOrders(newOrders.slice(1));
  }
  const onAccept = async (newOrder) => {
    setOrderID(newOrder.id);
    try {
      const input = {
        id: newOrder.id,
        status: "PICKING UP",
        carId: car.id
      }
      const orderData = await API.graphql(
        graphqlOperation(updateOrder, { input })
      )
      setOrder(orderData.data.updateOrder);
    } catch (e) {
      console.error(e);
    }
    setNewOrders(newOrders.slice(1));
  }
  const onGoPress = async () => {
    // update the car and set it to active
    try {
      const userData = await Auth.currentAuthenticatedUser();
      const input = {
        id: userData.attributes.sub,
        isActive: !car.isActive,
      }
      const updatedCarData = await API.graphql(
        graphqlOperation(updateCar, { input })
      )
      setCar(updatedCarData.data.updateCar);
    } catch (e) {
      console.error(e);
    }
  }
  const onUserLocationChange = async (event) => {
    const { latitude, longitude, heading } = event.nativeEvent.coordinate;
    // update the car and set it to active
    try {
      const userData = await Auth.currentAuthenticatedUser();
      const input = {
        id: userData.attributes.sub,
        latitude,
        longitude,
        heading,
      }
      const updatedCarData = await API.graphql(
        graphqlOperation(updateCar, { input })
      )
      setCar(updatedCarData.data.updateCar);
    } catch (e) {
      console.error(e);
    }
  }
  const RideIT = async () => {
    const RideIT = 'https://www.rideit.tk';
    await Linking.openURL(RideIT);
  }
  const Neel = async () => {
    const Neel = 'https://www.patelneel.me';
    await Linking.openURL(Neel);
  }
  const Neeraj = async () => {
    const Neeraj = 'https://www.neerajpal.me';
    await Linking.openURL(Neeraj);
  }
  const msgBtn = async () => {
    // ToastAndroid.showWithGravityAndOffset(
    //   "Coming soon",
    //   ToastAndroid.SHORT,
    //   ToastAndroid.BOTTOM,
    //   25,
    //   50
    // );
    Alert.alert(
      "Contact us",
      "If you want to know or have any query contact us from our RideIT Website ot Portfolio websites.",
      [
        {text: 'Ride-IT', onPress: () => RideIT()},
        {text: 'Neel', onPress: () => Neel()},
        {text: 'Neeraj', onPress: () => Neeraj()},
      ],
      { cancelable: true }
    )
  };
  const onDirectionFound = (event) => {
    mapRef.current.fitToCoordinates(event.coordinates, {
          edgePadding: {
            right: 100,
            bottom: 100,
            left: 100,
            top: 100,
          },
    });
    if(order){
      setOrder({
        ... order,
        distance: event.distance,
        duration: event.duration,
        pickedUp: order.pickedUp || event.distance < 0.2,
        isFinished: order.pickedUp && event.distance < 0.2,
      })
    }
  }
  const getDestination = () => {
    if (order && order.pickedUp) {
      return {
        latitude: order.destLatitude,
        longitude: order.destLongitude,
      }
    }
    return {
      latitude: order.originLatitude,
      longitude: order.originLongitude,
    }
  }
  const updateOrderStatus = async () => {
    if(order && order.isFinished) {
      try {
        const input = {
          id: orderID,
          status: "DROPPING OFF",
        }
        const orderData = await API.graphql(
          graphqlOperation(updateOrder, { input })
        )
      } catch (e) {
        console.error(e);
      }
    }
  }
  const updateOrderStatus2 = async () => {
    if(order && order.pickedUp) {
      try {
        const input = {
          id: orderID,
          status: "PICKED UP "+order.user.username,
        }
        const orderData = await API.graphql(
          graphqlOperation(updateOrder, { input })
        )
      } catch (e) {
        console.error(e);
      }
    }
  }
  const updateOrderStatus3 = async () => {
    if(order) {
      try {
        const input = {
          id: orderID,
          status: "PICKING UP "+order.user.username,
        }
        const orderData = await API.graphql(
          graphqlOperation(updateOrder, { input })
        )
      } catch (e) {
        console.error(e);
      }
    }
  }
  const onOrderComplete = () => {
    Alert.alert(
      "Hurray!!",
      "The rider has reached to it's desired destination",
      [
        {text: 'OK', onPress: () => RNRestart.Restart()},
      ],
      { cancelable: false }
    )
  }
  const fetchDetails = () => {
    if(order === null) {
      Alert.alert("Order Pending...", "First accept any order and Try again later");
    } else {
      Alert.alert("Rider details", "ID no.:- "+order.user.id+", "+"Username:- "+order.user.username+".");
    }
  }
  const renderBottomTitle = () => {
    if(order && order.isFinished) {
      updateOrderStatus();
      return (
        <View style={{alignItems: 'center'}}>
          <Pressable onPress={onOrderComplete} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f63103', width: 200, padding: 10,}}>
            <Text style={{color: 'white', fontWeight:'bold'}}>Order Complete</Text>
          </Pressable>
          <Text style={styles.bottomText}>Dropping off {order.user.username}</Text>
        </View>
      )
    }
    if(order && order.pickedUp) {
      updateOrderStatus2();
      return (
        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{order.duration ? order.duration.toFixed(1) : '?'} min</Text>
            <View style={{
              backgroundColor: '#d41212',
              marginHorizontal: 10,
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20
            }}>
              <FontAwesome name={"user"} color={"white"} size={20}/>
            </View>
            <Text>{order.distance ? order.distance.toFixed(1) : '?'} km</Text>
          </View>
          <Text style={styles.bottomText}>Picked Up {order?.user?.username}</Text>
        </View>
      )
    }
    if(order) {
      updateOrderStatus3();
      return(
        <View style={{ alignItems: 'center' }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{order.duration ? order.duration.toFixed(1): '?'} min</Text>
            <View style={{ backgroundColor: '#1e9203', marginHorizontal: 10, width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 20}}>
              <FontAwesome name={"user"} color={"white"} size={20} />
            </View>
            <Text>{order.distance ? order.distance.toFixed(1): '?'} km</Text>
          </View>
          <Text style={styles.bottomText}>Picking up {order?.user?.username}</Text>
        </View>
      )
    }
    if (car?.isActive) {
      return(
        <Text style={styles.bottomText}>You're Online</Text>
      )
    }
    return(<Text style={styles.bottomText}>You're Offline</Text>);
  }
  return (
    <View>
      <MapView
        ref={mapRef}
        style={{width: '100%', height: Dimensions.get('window').height - 130}}
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton={true}
        showsUserLocation={true}
        onUserLocationChange={onUserLocationChange}
        initialRegion={{
          latitude: 20.5937,
          longitude: 78.9629,
          latitudeDelta: 60,
          longitudeDelta: 10,
        }}
      >
        {order &&  (
          <MapViewDirections
            strokeColor={'#669cf7'}
            strokeWidth={5}
            origin={{latitude:car?.latitude,
              longitude:car?.longitude,
            }}
            onReady={onDirectionFound}
            destination={getDestination()}
            apikey={GOOGLE_MAPS_APIKEY}
          />
        )}
      </MapView>

      {pendingOrders()}

      {/*<Pressable onPress={() => console.warn('Hey')}*/}
      {/*           style={[styles.roundButton, {top: 10, right: 10}]}>*/}
      {/*  <Ionicons name={"search"} size={24} color={"#4a4a4a"}/>*/}
      {/*</Pressable>*/}

      <Pressable onPress={fetchDetails}
                 style={[styles.roundButton, {bottom: 110, left: 10}]}>
        <Entypo name={"shield"} size={24} color={"#4a4a4a"}/>
      </Pressable>

      <Pressable onPress={() => msgBtn()}
                 style={[styles.roundButton, {bottom: 110, right: 10}]}>
        <Entypo name={"message"} size={24} color={"#4a4a4a"}/>
      </Pressable>

      <Pressable onPress={onGoPress}
                 style={styles.goButton}>
        <Text style={styles.goText}>
          {car?.isActive ? 'END' : 'GO'}
        </Text>
      </Pressable>

      <View style={styles.bottomContainer}>
        <Pressable onPress={() => navigation.openDrawer()}>
          <Entypo name={"list"} size={30} color={"#4a4a4a"}/>
        </Pressable>
        {renderBottomTitle()}
        <Ionicons name={"options"} size={30} color={"#4a4a4a"}/>
      </View>

      {newOrders.length > 0 && !order && <NewOrderPopup
        newOrder={newOrders[0]}
        //duration={address}
        distance={"Destination"}

        onDecline={onDecline}
        onAccept={() => onAccept(newOrders[0])}
      />}
    </View>
  );
};

export default HomeScreen;
