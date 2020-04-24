import React, { } from 'react';
import {  Text, View, TouchableOpacity, ImageBackground, TouchableWithoutFeedback, Image, Dimensions } from 'react-native';
import { styles } from './styles';
import * as FileSystem from 'expo-file-system';
//import { PlaySound, StopSound, PlaySoundRepeat, PlaySoundMusicVolume } from 'react-native-play-sound';

const defSprite = require('./assets/skins/default-eddie.png');
const astSprite = require('./assets/skins/astro-eddie.png');
const gangSprite = require('./assets/skins/gangster-eddie.png');
const grandSprite = require('./assets/skins/grandma-eddie.png');

const defBall = require('./assets/skins/default-ball.png');
const drkBall = require('./assets/skins/dark-ball.png');
const bombBall = require('./assets/skins/bomb-ball.png');
const tenBall = require('./assets/skins/tennis-ball.png');

const defClub = require('./assets/skins/default-club.png');
const colClub = require('./assets/skins/colourful-club.png');
const carbClub = require('./assets/skins/carbon-club.png');


class Homescreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      count: 0,
      name: "Eddie's",
      spritename: defSprite,
      ballname: defBall,
      clubname: defClub,
      resizeball: false,
      resizeclub: true,
    }

}
/*************************************************************************************
 * This listener and componentDidMount have nearly identical code.
 * Thats because in react-native-navigation components are not unmounted
 * when they are navigated away from. This is supposed to improve performance,
 * but at the cost that their state is not reset on returning.
 * 
 * This lister activates each time the screen becomes focused. Both the listener
 * and the componentDidMount are needed because the listener doesnt trip the first
 * time the homescreen is launched. They cant both direct to the same function, as
 * react doest support functions in this context. (between constructor() and render())
 * 
 * This behaviour is repeated on multiple screens in the project
 **************************************************************************************/
navFocusListener = this.props.navigation.addListener('focus', async () => {
  console.log("On the HOMESCREEN!!!");
  let fcontent = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "gamesettings" + "/customize.txt");
  let sprite = JSON.parse(fcontent).sprite;
  let ball = JSON.parse(fcontent).ball;
  let club = JSON.parse(fcontent).club;
  console.log("Sprite: " + JSON.parse(fcontent).sprite + " Ball: " + JSON.parse(fcontent).ball + " Club: " + JSON.parse(fcontent).club);

  //Set users sprite on the homepage
  if(sprite == "default-eddie")
  {
    this.setState({spritename: defSprite});
  }
  else if (sprite == "astro-eddie")
  {
    this.setState({spritename: astSprite});
  }
  else if (sprite == "gangster-eddie")
  {
    this.setState({spritename: gangSprite});
  }
  else {
    this.setState({spritename: grandSprite});
  }

  //Set users ball on the homepage
  if(ball == "default-ball")
  {
    this.setState({ballname: defBall, resizeball: false});
  }
  else if (ball == "dark-ball")
  {
    this.setState({ballname: drkBall, resizeball: true});
  }
  else if (ball == "bomb-ball")
  {
    this.setState({ballname: bombBall, resizeball: true});
  }
  else {
    this.setState({ballname: tenBall, resizeball: true});
  }

  if(club == "default-club")
  {
    this.setState({clubname: defClub, resizeclub: true});
  }
  else if (club == "colourful-club")
  {
    this.setState({clubname: colClub, resizeclub: true});
  }
  else {
    this.setState({clubname: carbClub, resizeclub: false});
  }
});


  async componentDidMount(){
    console.log("On the First Load");
    let fcontent = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "gamesettings" + "/customize.txt");
    let sprite = JSON.parse(fcontent).sprite;
    let ball = JSON.parse(fcontent).ball;
    let club = JSON.parse(fcontent).club;
    console.log("Sprite: " + JSON.parse(fcontent).sprite + " Ball: " + JSON.parse(fcontent).ball + " Club: " + JSON.parse(fcontent).club);
  
    if(sprite == "default-eddie")
    {
      this.setState({spritename: defSprite});
    }
    else if (sprite == "astro-eddie")
    {
      this.setState({spritename: astSprite});
    }
    else if (sprite == "gangster-eddie")
    {
      this.setState({spritename: gangSprite});
    }
    else {
      this.setState({spritename: grandSprite});
    }
    //Set users ball on the homepage
    if(ball == "default-ball")
    {
      this.setState({ballname: defBall, resizeball: false});
    }
    else if (ball == "dark-ball")
    {
      this.setState({ballname: drkBall, resizeball: true});
    }
    else if (ball == "bomb-ball")
    {
      this.setState({ballname: bombBall, resizeball: true});
    }
    else {
      this.setState({ballname: tenBall, resizeball: true});
    }
    //Set users Club on homepage
    if(club == "default-club")
    {
      this.setState({clubname: defClub, resizeclub: true});
    }
    else if (club == "colourful-club")
    {
      this.setState({clubname: colClub, resizeclub: true});
    }
    else {
      this.setState({clubname: carbClub, resizeclub: false});
    }

  }
  

  render() {
  return (

  <ImageBackground source={require('./assets/background.jpg')} style={styles.container}>

      <TouchableWithoutFeedback onPress = {() => {this.setState((prevState) => ({count: prevState.count + 1})); this.state.count == 4 && this.setState({name: "Ian's"});}}><Text style = {styles.title}
      >{this.state.name} Golf Simulator {this.state.name == "Eddie's"? "2": ""}</Text></TouchableWithoutFeedback>

      <TouchableOpacity onPress = {() => {this.props.navigation.navigate('PlaySelection')}}>
        <View style = {styles.button}>
          <Text style = {styles.text}>   Play   </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress = {() => {this.props.navigation.navigate('CustomizeMenu')}}>
        <View style = {styles.button}>
          <Text style = {styles.text}>   Customize   </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress = {() => {this.props.navigation.navigate('HighScores')}}>
        <View style = {styles.button}>
          <Text style = {styles.text}>   High Scores   </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress = {() => {this.props.navigation.navigate('Credits')}}  style = {{zIndex: 2}}>
        <View style = {[styles.button, {zIndex: 2}]}>
          <Text style = {styles.text}>   Credits   </Text>
        </View>
      </TouchableOpacity>
          <Image
            style={{resizeMode: 'contain', position: 'absolute', bottom: 5, height:  Dimensions.get("screen").height/6, alignSelf: 'center', zIndex: 1}}
            source={this.state.spritename}
          />
          <Image
            style={this.state.resizeball ? {resizeMode: 'contain', position: 'absolute', left: -20, bottom: -100, transform: [{ scale: 0.11 }]} : {resizeMode: 'contain', position: 'absolute', left: 75, bottom: 5}}
            source={this.state.ballname}
          />
          <Image
            style={this.state.resizeclub ? {resizeMode: 'contain', position: 'absolute', bottom: 50, right: -100, height:  Dimensions.get("screen").height/10, alignSelf: 'center', zIndex: 1, transform: [{ rotate: '57deg' }]} : {resizeMode: 'contain', position: 'absolute', bottom: 50, right: -80, height:  Dimensions.get("screen").height/10, alignSelf: 'center', zIndex: 1, transform: [{ rotate: '57deg' }]}}
            source={this.state.clubname}
          />
    </ImageBackground>
    
  );
  }
  
}

export default Homescreen;