import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    title: {
        color: 'white', 
        fontSize: 65, 
        textAlign: 'center', 
        fontFamily: 'pacifico', 
        textShadowColor: 'black',
        textShadowRadius: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    text: {
        color: 'white',
        fontSize: 40,
        fontFamily: 'pacifico',
        textShadowColor: 'black',
        textShadowRadius: 5,
        width: '100%',
        /*textAlign: 'center'*/
    },
    creditText: {
        color: 'white', 
        fontSize: 25, 
        textAlign: 'center', 
        fontFamily: 'pacifico',
        textShadowColor: 'black',
        textShadowRadius: 5,
        paddingRight: 20,
        paddingLeft: 20,
    },
    button: {
        alignItems: 'center', 
        justifyContent: 'center',
        padding: 10,
        width: '100%',
    },
    volumeslider: {
        marginTop: 0,
        marginBottom: 0,
        paddingBottom: 0,
        paddingTop: 0
    },
    nametext: {
        fontSize: 24,
        color: 'white',
        fontFamily: 'pacifico',
        textShadowColor: 'black',
        textShadowRadius: 5,
        padding: 15,
        margin: -20
    },
    pointtext: {
        fontSize: 22,
        color: 'white',
        fontFamily: 'pacifico',
        textShadowColor: 'black',
        textShadowRadius: 5,
        padding: 15,
        margin: -20
    },
    timetext: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'pacifico',
        textShadowColor: 'black',
        textShadowRadius: 5,
        padding: 15,
        margin: -20
    },
  });