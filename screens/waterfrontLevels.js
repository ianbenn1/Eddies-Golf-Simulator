import React, { } from 'react';
import { Text, View, Image, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { Slider } from 'react-native-elements';
import { styles } from '../styles';
import { ScreenOrientation } from 'expo';
import * as FileSystem from 'expo-file-system';
import { useIsFocused } from '@react-navigation/native';

/*async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
}*/

  /*if(useIsFocused())
  {
    changetheState();
  }

  async function changetheState() {
    const levelsObject = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "gamesettings" + "/unlockedlvls.txt");
    let wflevels =  JSON.parse(levelsObject).waterfront;
    console.log("Waterfront JSON extract level: " + wflevels);
    let i = 0;
    for (i = 0; i < wflevels + 1; i++)
    {
      console.log("Setting state unlocked for : " + `lvl${i+1}Unlocked`);
      this.setState({[`lvl${i+1}Unlocked`]: true});
    }
  }*/

class WaterfrontLevels extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      lvl1Unlocked: true,
      lvl2Unlocked: false,
      lvl3Unlocked: false,
      lvl4Unlocked: false,
      lvl5Unlocked: false,
      lvl6Unlocked: false,
      lvl7Unlocked: false,
      lvl8Unlocked: false,
    };

  }

  async componentDidMount() {
    const levelsObject = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "gamesettings" + "/unlockedlvls.txt");
    let wflevels =  JSON.parse(levelsObject).waterfront;
    console.log("Waterfront JSON extract level: " + wflevels);
    let i = 0;
    for (i = 0; i < wflevels + 1; i++)
    {
      console.log("Setting state unlocked for : " + `lvl${i+1}Unlocked`);
      this.setState({[`lvl${i+1}Unlocked`]: true});
    }
    //this.setState({value: parseInt(await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "gamesettings" + "/volume.txt"))/100});
  }
  navFocusListener = this.props.navigation.addListener('focus', async () => {
    const levelsObject = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "gamesettings" + "/unlockedlvls.txt");
    let wflevels =  JSON.parse(levelsObject).waterfront;
    console.log("Waterfront JSON extract level: " + wflevels);
    let i = 0;
    for (i = 0; i < wflevels + 1; i++)
    {
      console.log("Setting state unlocked for : " + `lvl${i+1}Unlocked`);
      this.setState({[`lvl${i+1}Unlocked`]: true});
    }
  });

  render() {
  return (
  <ImageBackground source={require('../assets/background.jpg')} style={styles.container}>

    <View style={{paddingBottom: 100, display: 'flex', flexDirection: 'row'}}>
    <View style={{display: 'flex', flexDirection: 'column', paddingRight: 20, marginRight: -30}}>
        <TouchableOpacity onPress = {() => {this.props.navigation.navigate('WaterfrontLvl1')}} style={{zIndex: 4}} disabled={!this.state.lvl1Unlocked}>
          <View style={{height: 150}}>
            <Image
              style={[{resizeMode: 'contain', width: 200, height: 150, alignSelf: 'center', transform: [{ rotate: '90deg' }]}, this.state.lvl1Unlocked == false && {opacity: 0.5}]}
              source={require('../assets/levels/lvl1.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => {this.props.navigation.navigate('WaterfrontLvl3')}} style={{zIndex: 3}} disabled={!this.state.lvl3Unlocked}>
          <View style={{height: 150}}>
            <Image
              style={[{resizeMode: 'contain', width: 200, height: 150, alignSelf: 'center', transform: [{ rotate: '90deg' }]}, this.state.lvl3Unlocked == false && {opacity: 0.5}]}
              source={require('../assets/levels/lvl3.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => {Alert.alert(
            'Upgrade to Eddies Golf Simulator 2 Pro!',
            `Upgrade to Eddies Golf Simulator 2 Pro to unlock level 5, Island and Forest levels!`,
            [ {text: 'Cancel', onPress: () => console.log('no'), style: 'cancel'}],
            { cancelable: false }
          )}} style={{zIndex: 2}} disabled={!this.state.lvl5Unlocked}>
          <View style={{height: 150}}>
            <Image
              style={[{resizeMode: 'contain', width: 200, height: 150, alignSelf: 'center', transform: [{ rotate: '90deg' }]}, this.state.lvl5Unlocked == false && {opacity: 0.5}]}
              source={require('../assets/levels/lvl5.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => {}} style={{zIndex: 1}} disabled={!this.state.lvl7Unlocked}>
          <View style={{height: 150}}>
            <Image
              style={[{resizeMode: 'contain', width: 200, height: 150, alignSelf: 'center', transform: [{ rotate: '90deg' }]}, this.state.lvl7Unlocked == false && {opacity: 0.5}]}
              source={require('../assets/levels/lvl7.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{display: 'flex', flexDirection: 'column'}}>
        <TouchableOpacity onPress = {() => {this.props.navigation.navigate('WaterfrontLvl2')}} style={{zIndex: 4}} disabled={!this.state.lvl2Unlocked}>
          <View style={{height: 150}}>
            <Image
              style={[{resizeMode: 'contain', width: 200, height: 150, alignSelf: 'center', transform: [{ rotate: '90deg' }]}, this.state.lvl2Unlocked == false && {opacity: 0.5}]}
              source={require('../assets/levels/lvl2.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => {this.props.navigation.navigate('WaterfrontLvl4')}} style={{zIndex: 3}} disabled={!this.state.lvl4Unlocked}>
          <View style={{height: 150}}>
            <Image
              style={[{resizeMode: 'contain', width: 200, height: 150, alignSelf: 'center', transform: [{ rotate: '90deg' }]}, this.state.lvl4Unlocked == false && {opacity: 0.5}]}
              source={require('../assets/levels/lvl4.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => {}} style={{zIndex: 2}} disabled={!this.state.lvl6Unlocked}>
          <View style={{height: 150}}>
            <Image
              style={[{resizeMode: 'contain', width: 200, height: 150, alignSelf: 'center', transform: [{ rotate: '90deg' }]}, this.state.lvl6Unlocked == false && {opacity: 0.5}]}
              source={require('../assets/levels/lvl6.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => {}} style={{zIndex: 1}} disabled={!this.state.lvl8Unlocked}>
          <View style={{height: 150}}>
            <Image
              style={[{resizeMode: 'contain', width: 200, height: 150, alignSelf: 'center', transform: [{ rotate: '90deg' }]}, this.state.lvl8Unlocked == false && {opacity: 0.5}]}
              source={require('../assets/levels/lvl8.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
      
    </View>

    </ImageBackground>
    
  );
  }
  
}

export default WaterfrontLevels;