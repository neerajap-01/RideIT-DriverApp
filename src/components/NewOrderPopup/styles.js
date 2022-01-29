import React from "react";
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 20,
        height: '100%',
        justifyContent: 'space-between',
        backgroundColor: '#00000099'
    },
    popupContainer: {
        backgroundColor: 'black',
        borderRadius: 10,
        alignItems: 'center',
        height: 250,
        justifyContent: 'space-around'
    },
    minutes: {
        color: 'lightgrey',
        fontSize: 36,
    },
    distance: {
        color: 'lightgrey',
        fontSize: 26,
    },
    vehicleType: {
        color: 'lightgrey',
        fontSize: 20,
        marginHorizontal: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    userbg: {
        backgroundColor: '#008bff',
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60,
    },
    declineButton: {
        backgroundColor: 'black',
        padding: 20,
        borderRadius: 50,
        width: 100,
        alignItems: 'center',
    },
    declineText: {
        color: 'white',
        fontWeight: 'bold'
    }

});

export default styles;
