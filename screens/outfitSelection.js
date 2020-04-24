import React, { } from 'react';
import { Text, View, Image, TouchableOpacity, ImageBackground, Alert, Dimensions } from 'react-native';
import { Slider } from 'react-native-elements';
import { styles } from '../styles';
import * as FileSystem from 'expo-file-system';

const writeDataFiles = async (file_path, content) => {
  await FileSystem.writeAsStringAsync(file_path, content);
};

class OutfitSelection extends React.Component {
  state = {
    value: 1,
    defBorder: 0,
    astBorder: 0,
    gangBorder: 0,
    grandBorder: 0,
    saveClub: "",
    saveBall: ""
  };

  async componentDidMount(){
    console.log("On the First Load: Outfits");
    let fcontent = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "gamesettings" + "/customize.txt");
    let sprite = JSON.parse(fcontent).sprite;
    let ball = JSON.parse(fcontent).ball;
    let club = JSON.parse(fcontent).club;
  
    if(sprite == "default-eddie")
    {
      this.setState({defBorder: 2, astBorder: 0, gangBorder: 0, grandBorder: 0, saveClub: club, saveBall: ball});
    }
    else if (sprite == "astro-eddie")
    {
      this.setState({defBorder: 0, astBorder: 2, gangBorder: 0, grandBorder: 0, saveClub: club, saveBall: ball});
    }
    else if (sprite == "gangster-eddie")
    {
      this.setState({defBorder: 0, astBorder: 0, gangBorder: 2, grandBorder: 0, saveClub: club, saveBall: ball});
    }
    else {
      this.setState({defBorder: 0, astBorder: 0, gangBorder: 0, grandBorder: 2, saveClub: club, saveBall: ball});
    }

  }
  navFocusListener = this.props.navigation.addListener('focus', async () => {
    console.log("On the 2+ Load: Outfits");
    let fcontent = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "gamesettings" + "/customize.txt");
    let sprite = JSON.parse(fcontent).sprite;
    let ball = JSON.parse(fcontent).ball;
    let club = JSON.parse(fcontent).club;
  
    if(sprite == "default-eddie")
    {
      this.setState({defBorder: 2, astBorder: 0, gangBorder: 0, grandBorder: 0, saveClub: club, saveBall: ball});
    }
    else if (sprite == "astro-eddie")
    {
      this.setState({defBorder: 0, astBorder: 2, gangBorder: 0, grandBorder: 0, saveClub: club, saveBall: ball});
    }
    else if (sprite == "gangster-eddie")
    {
      this.setState({defBorder: 0, astBorder: 0, gangBorder: 2, grandBorder: 0, saveClub: club, saveBall: ball});
    }
    else {
      this.setState({defBorder: 0, astBorder: 0, gangBorder: 0, grandBorder: 2, saveClub: club, saveBall: ball});
    }

  });

  render() {
  return (
  <ImageBackground source={require('../assets/background.jpg')} style={styles.container}>

    <View style={{paddingBottom: 100, marginTop: 100, height: Dimensions.get("screen").height - 100}}>
      <TouchableOpacity onPress = {() => {
        writeDataFiles(FileSystem.documentDirectory + "gamesettings" + "/customize.txt", '{"sprite": "default-eddie", "ball": "'+this.state.saveBall+'", "club": "'+this.state.saveClub+'"}');
        this.setState({defBorder: 2, astBorder: 0, gangBorder: 0, grandBorder: 0});
      }} style={{zIndex: 2}}>
        <View style={{height: 150, marginBottom: 15, borderWidth: this.state.defBorder, borderColor: 'white'}}>
          <Image
            style={{resizeMode: 'contain', height:  Dimensions.get("screen").height/6, alignSelf: 'center', marginLeft: 55}}
            source={require('../assets/skins/default-eddie.png')}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress = {() => {
        writeDataFiles(FileSystem.documentDirectory + "gamesettings" + "/customize.txt", '{"sprite": "astro-eddie", "ball": "'+this.state.saveBall+'", "club": "'+this.state.saveClub+'"}');
        this.setState({defBorder: 0, astBorder: 2, gangBorder: 0, grandBorder: 0});
      }} style={{zIndex: 1}}>
        <View style={{height: 150, marginBottom: 15, borderWidth: this.state.astBorder, borderColor: 'white'}}>
          <Image
            style={{resizeMode: 'contain', height:  Dimensions.get("screen").height/6, alignSelf: 'center'}}
            source={require('../assets/skins/astro-eddie.png')}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress = {() => {
        writeDataFiles(FileSystem.documentDirectory + "gamesettings" + "/customize.txt", '{"sprite": "gangster-eddie", "ball": "'+this.state.saveBall+'", "club": "'+this.state.saveClub+'"}');
        this.setState({defBorder: 0, astBorder: 0, gangBorder: 2, grandBorder: 0});
      }}>
        <View style={{height: 150, marginBottom: 15, borderWidth: this.state.gangBorder, borderColor: 'white'}}>
          <Image
            style={{resizeMode: 'contain', height:  Dimensions.get("screen").height/6 + 10, alignSelf: 'center'}}
            source={require('../assets/skins/gangster-eddie.png')}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress = {() => {
        writeDataFiles(FileSystem.documentDirectory + "gamesettings" + "/customize.txt", '{"sprite": "grandma-eddie", "ball": "'+this.state.saveBall+'", "club": "'+this.state.saveClub+'"}');
        this.setState({defBorder: 0, astBorder: 0, gangBorder: 0, grandBorder: 2});
      }}>
        <View style={{height: 150, marginBottom: 15, borderWidth: this.state.grandBorder, borderColor: 'white'}}>
          <Image
            style={{resizeMode: 'contain', height:  Dimensions.get("screen").height/6, alignSelf: 'center'}}
            source={require('../assets/skins/grandma-eddie.png')}
          />
        </View>
      </TouchableOpacity>
    </View>

    </ImageBackground>
    
  );
  }
  
}

export default OutfitSelection;