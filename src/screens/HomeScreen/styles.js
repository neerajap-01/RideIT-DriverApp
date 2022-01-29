import {Dimensions, StyleSheet} from "react-native";

const styles = StyleSheet.create({
    bottomContainer: {
        height: 100,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    bottomText: {
    fontSize: 22,
    color: '#4a4a4a',
    },
    roundButton: {
        position: 'absolute',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 25,
    },
    goButton: {
        position: 'absolute',
        backgroundColor: '#1495ff',
        width: 75,
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 110,
        borderRadius: 50,
        left: Dimensions.get('window').width / 2-37,
    },
    goText: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
    },
    balanceButton: {
        position: 'absolute',
        backgroundColor: '#1c1c1c',
        width: 145,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        top: 10,
        borderRadius: 50,
        left: Dimensions.get('window').width / 2-72.5,
    },
    balanceText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    balanceTextMoney: {
        fontSize: 20,
        color: 'white',
    }
});

export default styles;
