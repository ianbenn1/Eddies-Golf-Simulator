import React, { } from 'react';
import { Text, View, Image, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { Slider } from 'react-native-elements';
import { styles } from '../styles';

class CampaignSelection extends React.Component {
  state = {
    value: 1
  };

  render() {
  return (
  <ImageBackground source={require('../assets/background.jpg')} style={styles.container}>

    <View style={{paddingBottom: 100}}>
      <TouchableOpacity onPress = {() => {this.props.navigation.navigate('WaterfrontLevels')}} style={{zIndex: 2}}>
        <View style={{height: 150}}>
          <Image
            style={{resizeMode: 'contain', width: 200, alignSelf: 'center'}}
            source={require('../assets/waterfrontLevels.jpg')}
          />
        </View>
        <Text style={[styles.text, {textAlign: 'center', paddingTop: 45, marginBottom: -45, paddingRight: 10, paddingLeft: 10}]}>Waterfront</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress = {() => {Alert.alert(
            'Upgrade to Eddies Golf Simulator 2 Pro!',
            `Upgrade to Eddies Golf Simulator 2 Pro to unlock Island and Forest levels!`,
            [ {text: 'Cancel', onPress: () => console.log('no'), style: 'cancel'}],
            { cancelable: false }
          )}} style={{zIndex: 1}}>
        <View style={{height: 150}}>
          <Image
            style={{resizeMode: 'contain', width: 200, alignSelf: 'center'}}
            source={require('../assets/islandLevels.jpg')}
          />
        </View>
        <Text style={[styles.text, {textAlign: 'center', paddingTop: 45, marginBottom: -45}]}>Island</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress = {() => {Alert.alert(
            'Upgrade to Eddies Golf Simulator 2 Pro!',
            `Upgrade to Eddies Golf Simulator 2 Pro to unlock Island and Forest levels!`,
            [ {text: 'Cancel', onPress: () => console.log('no'), style: 'cancel'}],
            { cancelable: false }
          )}}>
        <View style={{height: 150}}>
          <Image
            style={{resizeMode: 'contain', width: 200, alignSelf: 'center'}}
            source={require('../assets/forestLevels.jpg')}
          />
        </View>
        <Text style={[styles.text, {textAlign: 'center', paddingTop: 45, marginBottom: -45}]}>Forest</Text>
      </TouchableOpacity>
    </View>

    </ImageBackground>
    
  );
  }
  
}

export default CampaignSelection;