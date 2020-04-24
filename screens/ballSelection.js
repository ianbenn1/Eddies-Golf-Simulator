import React, { } from 'react';
import { Text, View, Image, TouchableOpacity, ImageBackground, Alert, Dimensions } from 'react-native';
import { Slider } from 'react-native-elements';
import { styles } from '../styles';
import * as FileSystem from 'expo-file-system';

const writeDataFiles = async (file_path, content) => {
  await FileSystem.writeAsStringAsync(file_path, content);
};

class BallSelection extends React.Component {
  state = {
    value: 1,
    defBorder: 0,
    blkBorder: 0,
    bombBorder: 0,
    tenBorder: 0,
    saveSprite: "",
    saveClub: ""
  };

  async componentDidMount(){
    console.log("On the First Load: Balls");
    let fcontent = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "gamesettings" + "/customize.txt");
    let sprite = JSON.parse(fcontent).sprite;
    let ball = JSON.parse(fcontent).ball;
    let club = JSON.parse(fcontent).club;
  
    if(ball == "default-ball")
    {
      this.setState({defBorder: 2, blkBorder: 0, bombBorder: 0, tenBorder: 0, saveClub: club, saveSprite: sprite});
    }
    else if (ball == "black-ball" || ball == "dark-ball")
    {
      this.setState({defBorder: 0, blkBorder: 2, bombBorder: 0, tenBorder: 0, saveClub: club, saveSprite: sprite});
    }
    else if (ball == "bomb-ball")
    {
      this.setState({defBorder: 0, blkBorder: 0, bombBorder: 2, tenBorder: 0, saveClub: club, saveSprite: sprite});
    }
    else {
      this.setState({defBorder: 0, blkBorder: 0, bombBorder: 0, tenBorder: 2, saveClub: club, saveSprite: sprite});
    }

  }

  navFocusListener = this.props.navigation.addListener('focus', async () => {
    console.log("On the 2+ Load: Balls");
    let fcontent = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "gamesettings" + "/customize.txt");
    let sprite = JSON.parse(fcontent).sprite;
    let ball = JSON.parse(fcontent).ball;
    let club = JSON.parse(fcontent).club;

    console.log("second load: ball: " + ball)
  
    if(ball == "default-ball")
    {
      this.setState({defBorder: 2, blkBorder: 0, bombBorder: 0, tenBorder: 0, saveClub: club, saveSprite: sprite});
    }
    else if (ball == "black-ball" || ball == "dark-ball")
    {
      this.setState({defBorder: 0, blkBorder: 2, bombBorder: 0, tenBorder: 0, saveClub: club, saveSprite: sprite});
    }
    else if (ball == "bomb-ball")
    {
      this.setState({defBorder: 0, blkBorder: 0, bombBorder: 2, tenBorder: 0, saveClub: club, saveSprite: sprite});
    }
    else {
      this.setState({defBorder: 0, blkBorder: 0, bombBorder: 0, tenBorder: 2, saveClub: club, saveSprite: sprite});
    }

  });

  render() {
  return (
  <ImageBackground source={require('../assets/background.jpg')} style={styles.container}>

    <View style={{paddingBottom: 100, marginTop: 100, height: Dimensions.get("screen").height - 100}}>
      <TouchableOpacity onPress = {() => {
          writeDataFiles(FileSystem.documentDirectory + "gamesettings" + "/customize.txt", '{"sprite": "'+this.state.saveSprite+'", "ball": "default-ball", "club": "'+this.state.saveClub+'"}');
          this.setState({defBorder: 2, blkBorder: 0, bombBorder: 0, tenBorder: 0});
        }} style={{zIndex: 1}}>
        <View style={{height: 150, marginBottom: 15, borderWidth: this.state.defBorder, borderColor: 'white', paddingHorizontal: 100}}>
          <Image
            style={{resizeMode: 'contain', height:  Dimensions.get("screen").height/6, alignSelf: 'center', transform: [{ scale: 4 }]}}
            source={require('../assets/skins/default-ball.png')}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress = {() => {
        writeDataFiles(FileSystem.documentDirectory + "gamesettings" + "/customize.txt", '{"sprite": "'+this.state.saveSprite+'", "ball": "dark-ball", "club": "'+this.state.saveClub+'"}');
        this.setState({defBorder: 0, blkBorder: 2, bombBorder: 0, tenBorder: 0});
      }} style={{zIndex: 2}}>
        <View style={{height: 150, marginBottom: 15, borderWidth: this.state.blkBorder, borderColor: 'white', paddingHorizontal: 100}}>
          <Image
            style={{resizeMode: 'contain', height:  Dimensions.get("screen").height/6, alignSelf: 'center'}}
            source={require('../assets/skins/dark-ball.png')}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress = {() => {
        writeDataFiles(FileSystem.documentDirectory + "gamesettings" + "/customize.txt", '{"sprite": "'+this.state.saveSprite+'", "ball": "bomb-ball", "club": "'+this.state.saveClub+'"}');
        this.setState({defBorder: 0, blkBorder: 0, bombBorder: 2, tenBorder: 0});
      }}>
        <View style={{height: 150, marginBottom: 15, borderWidth: this.state.bombBorder, borderColor: 'white', paddingHorizontal: 100}}>
          <Image
            style={{resizeMode: 'contain', height:  Dimensions.get("screen").height/6 + 10, alignSelf: 'center'}}
            source={require('../assets/skins/bomb-ball.png')}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress = {() => {
        writeDataFiles(FileSystem.documentDirectory + "gamesettings" + "/customize.txt", '{"sprite": "'+this.state.saveSprite+'", "ball": "tennis-ball", "club": "'+this.state.saveClub+'"}');
        this.setState({defBorder: 0, blkBorder: 0, bombBorder: 0, tenBorder: 2});
      }}>
        <View style={{height: 150, marginBottom: 15, borderWidth: this.state.tenBorder, borderColor: 'white', paddingHorizontal: 100}}>
          <Image
            style={{resizeMode: 'contain', height:  Dimensions.get("screen").height/6, alignSelf: 'center'}}
            source={require('../assets/skins/tennis-ball.png')}
          />
        </View>
      </TouchableOpacity>
    </View>

    </ImageBackground>
    
  );
  }
  
}

export default BallSelection;