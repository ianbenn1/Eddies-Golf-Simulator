import React, { } from 'react';
import { Text, View, Image, TouchableOpacity, ImageBackground, Alert, Dimensions } from 'react-native';
import { Slider } from 'react-native-elements';
import { styles } from '../styles';
import * as FileSystem from 'expo-file-system';

const writeDataFiles = async (file_path, content) => {
  await FileSystem.writeAsStringAsync(file_path, content);
};

class ClubSelection extends React.Component {
  state = {
    value: 1,
    defBorder: 0,
    colBorder: 0,
    carbBorder: 0,
    saveSprite: "",
    ballSprite: ""
  };
  async componentDidMount(){
    console.log("On the First Load: club");
    let fcontent = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "gamesettings" + "/customize.txt");
    let sprite = JSON.parse(fcontent).sprite;
    let ball = JSON.parse(fcontent).ball;
    let club = JSON.parse(fcontent).club;
  
    if(club == "default-club")
    {
      this.setState({defBorder: 2, colBorder: 0, carbBorder: 0, saveBall: ball, saveSprite: sprite});
    }
    else if (club == "colourful-club")
    {
      this.setState({defBorder: 0, colBorder: 2, carbBorder: 0, saveBall: ball, saveSprite: sprite});
    }
    else if (club == "carbon-club")
    {
      this.setState({defBorder: 0, colBorder: 0, carbBorder: 2, saveBall: ball, saveSprite: sprite});
    }

  }

  navFocusListener = this.props.navigation.addListener('focus', async () => {
    console.log("On the 2+ Load: club");
    let fcontent = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "gamesettings" + "/customize.txt");
    let sprite = JSON.parse(fcontent).sprite;
    let ball = JSON.parse(fcontent).ball;
    let club = JSON.parse(fcontent).club;
  
    if(club == "default-club")
    {
      this.setState({defBorder: 2, colBorder: 0, carbBorder: 0, saveBall: ball, saveSprite: sprite});
    }
    else if (club == "colourful-club")
    {
      this.setState({defBorder: 0, colBorder: 2, carbBorder: 0, saveBall: ball, saveSprite: sprite});
    }
    else if (club == "carbon-club")
    {
      this.setState({defBorder: 0, colBorder: 0, carbBorder: 2, saveBall: ball, saveSprite: sprite});
    }

  });

  render() {
  return (
  <ImageBackground source={require('../assets/background.jpg')} style={styles.container}>

    <View style={{paddingBottom: 100, marginTop: 150, height: Dimensions.get("screen").height - 100}}>
      <TouchableOpacity onPress = {() => {
        writeDataFiles(FileSystem.documentDirectory + "gamesettings" + "/customize.txt", '{"sprite": "'+this.state.saveSprite+'", "ball": "'+this.state.saveBall+'", "club": "default-club"}');
        this.setState({defBorder: 2, colBorder: 0, carbBorder: 0});
      }} style={{zIndex: 2}}>
        <View style={{height: 150, marginBottom: 15, borderWidth: this.state.defBorder, borderColor: 'white'}}>
          <Image
            style={{resizeMode: 'contain', height:  Dimensions.get("screen").height/6, alignSelf: 'center'}}
            source={require('../assets/skins/default-club.png')}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress = {() => {
        writeDataFiles(FileSystem.documentDirectory + "gamesettings" + "/customize.txt", '{"sprite": "'+this.state.saveSprite+'", "ball": "'+this.state.saveBall+'", "club": "colourful-club"}');
        this.setState({defBorder: 0, colBorder: 2, carbBorder: 0});
      }} style={{zIndex: 1}}>
        <View style={{height: 150, marginBottom: 15, borderWidth: this.state.colBorder, borderColor: 'white'}}>
          <Image
            style={{resizeMode: 'contain', height:  Dimensions.get("screen").height/6, alignSelf: 'center'}}
            source={require('../assets/skins/colourful-club.png')}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress = {() => {
        writeDataFiles(FileSystem.documentDirectory + "gamesettings" + "/customize.txt", '{"sprite": "'+this.state.saveSprite+'", "ball": "'+this.state.saveBall+'", "club": "carbon-club"}');
        this.setState({defBorder: 0, colBorder: 0, carbBorder: 2});
      }}>
        <View style={{height: 150, marginBottom: 15, borderWidth: this.state.carbBorder, borderColor: 'white'}}>
          <Image
            style={{resizeMode: 'contain', height:  Dimensions.get("screen").height/6 - 10, alignSelf: 'center'}}
            source={require('../assets/skins/carbon-club.png')}
          />
        </View>
      </TouchableOpacity>
    </View>

    </ImageBackground>
    
  );
  }
  
}

export default ClubSelection;