import React, { } from 'react';
import { Text, View, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { Slider } from 'react-native-elements';
import { styles } from '../styles';

class PlaySelection extends React.Component {
  state = {
    value: 1
  };

  render() {
  return (
  <ImageBackground source={require('../assets/background.jpg')} style={styles.container}>

      <TouchableOpacity onPress = {() => {this.props.navigation.navigate('CampaignSelection')}}>
        <View style = {styles.button}>
          <Text style = {[styles.text, {paddingBottom: 30}]}>   Campaign   </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress = {() => {Alert.alert(
            'Upgrade to Eddies Golf Simulator 2 Pro!',
            `Upgrade to Eddies Golf Simulator 2 Pro to unlock Free Play, Island, and Forest levels!`,
            [ {text: 'Cancel', onPress: () => console.log('no'), style: 'cancel'}],
            { cancelable: false }
          )}}>
        <View style = {styles.button}>
          <Text style = {[styles.text, {paddingTop: 30}]}>   Level Select   </Text>
        </View>
      </TouchableOpacity>

    </ImageBackground>
    
  );
  }
  
}

export default PlaySelection;