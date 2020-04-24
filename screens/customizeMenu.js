import React, { } from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { styles } from '../styles';

class CustomizeMenu extends React.Component {
  render() {

  return (

  <ImageBackground source={require('../assets/background.jpg')} style={styles.container}>

      <Text style = {styles.title}
      > Customize </Text>

      <TouchableOpacity onPress = {() => {this.props.navigation.navigate('Settings')}}>
        <View style = {styles.button}>
          <Text style = {styles.text}>   Settings   </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress = {() => {this.props.navigation.navigate('OutfitSelection')}}>
        <View style = {styles.button}>
          <Text style = {styles.text}>   Outfits   </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress = {() => {this.props.navigation.navigate('BallSelection')}}>
        <View style = {styles.button}>
          <Text style = {styles.text}>   Balls   </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress = {() => {this.props.navigation.navigate('ClubSelection')}}>
        <View style = {styles.button}>
          <Text style = {styles.text}>   Clubs   </Text>
        </View>
      </TouchableOpacity>

    </ImageBackground>
    
  );
  }
  
}

export default CustomizeMenu;