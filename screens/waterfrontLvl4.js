import React, { } from 'react';
import { StyleSheet, View, ImageBackground, TouchableOpacity, Text, Alert, Dimensions } from 'react-native';
import { Slider } from 'react-native-elements';
import { styles } from '../styles'; 
import { ScreenOrientation } from 'expo';
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";
import Ball from './gameobjects/ball';
import Wall from './gameobjects/wall';
import Physics from './gameobjects/Physics';
import * as FileSystem from 'expo-file-system';
import { grey } from 'color-name';

async function changeScreenOrientation() {
  //await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
}


const gestyles = StyleSheet.create({
  container: {
      flex: 1,
  },
  gameContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
  },
});

const createDataFiles = async (file_path, content) => {
  console.log("Writing out to new file...");
  await FileSystem.writeAsStringAsync(file_path, content);
};

let levelsObject = null; // This will hold read in unlocked levels file. Basically a global variable.....
let levelsScore = null;// This will hold current high score, for comparison to level score

class WaterfrontLvl4 extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        scorecard: false,
        running: true,
        score: 182,
        lvl1score: 0,
        lvl2score: 0,
        lvl3score: 0,
        lvl1date: "",
        lvl2date: "",
        lvl3date: "",
        newhighscore: "New best score!",
        shown: 0,
        ballx: 0,
        bally: 0,
        debug: false,
        maskColour: 'rgba(255,165,0, 0.0)'
    };

    this.gameEngine = null;

    this.entities = this.setupWorld();
}

async componentDidMount() {
  levelsObject = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "gamesettings" + "/unlockedlvls.txt");
  levelsScore = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "gamesettings" + "/score.txt");
  this.setState({
    lvl1score: JSON.parse(levelsScore).lvl1,
    lvl2score: JSON.parse(levelsScore).lvl2,
    lvl3score: JSON.parse(levelsScore).lvl3,
    lvl1date: JSON.parse(levelsScore).lvl1Time,
    lvl2date: JSON.parse(levelsScore).lvl2Time,
    lvl3date: JSON.parse(levelsScore).lvl3Time,
  });
  console.log(levelsScore);
  levelsScore = JSON.parse(levelsScore).lvl4;
  console.log("this level's best score is: " + levelsScore);

  let settingscontent = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "gamesettings" + "/volume.txt");
  //let volume = JSON.parse(content).vol;
  let debugvar = JSON.parse(settingscontent).debug;
  this.setState({debug: debugvar});
  if (debugvar == true)
  {
    this.setState({maskColour: 'rgba(255,165,0, 0.6)'});
  }
}

  setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    let ball = Matter.Bodies.rectangle(Dimensions.get("screen").width / 2 - 15, 75, 30, 30);
    let hole = Matter.Bodies.circle((Dimensions.get("screen").width / 2 - 25), Dimensions.get("screen").height - 50, 25, {isStatic: true});
    let floor = Matter.Bodies.rectangle( Dimensions.get("screen").width / 2, Dimensions.get("screen").height, Dimensions.get("screen").width, 50, { isStatic: true });
    let ceiling = Matter.Bodies.rectangle( Dimensions.get("screen").width / 2, 0, Dimensions.get("screen").width, 50, { isStatic: true });
    let leftwall = Matter.Bodies.rectangle( -10, Dimensions.get("screen").height / 2, 40, Dimensions.get("screen").height, { isStatic: true });
    let rightwall = Matter.Bodies.rectangle( Dimensions.get("screen").width+10, Dimensions.get("screen").height / 2 , 40, Dimensions.get("screen").height, { isStatic: true });
    let centerwall = Matter.Bodies.rectangle( Dimensions.get("screen").width/2, Dimensions.get("screen").height / 1.69 , Dimensions.get("screen").width/2.5, Dimensions.get("screen").height/20, { isStatic: true });
    let leftmidwall = Matter.Bodies.rectangle( Dimensions.get("screen").width/1.49, Dimensions.get("screen").height / 3 , Dimensions.get("screen").width/20, Dimensions.get("screen").height/1.71, { isStatic: true });
    let rightmidwall = Matter.Bodies.rectangle( Dimensions.get("screen").width/3.02, Dimensions.get("screen").height / 3 , Dimensions.get("screen").width/20, Dimensions.get("screen").height/1.71, { isStatic: true });


    Matter.World.add(world, [ball, centerwall, leftmidwall, rightmidwall, floor, ceiling, leftwall, rightwall]);

    Matter.Events.on(engine, "beforeUpdate", () => { 

      if((ball.position.x > this.state.ballx + 0.04 || this.state.ballx > ball.position.x + 0.04) || (ball.position.y > this.state.bally + 0.08 || this.state.bally > ball.position.y + 0.08))
      {
        this.setState({score: this.state.score + 1});
      }

        this.setState({
          ballx: ball.position.x,
          bally: ball.position.y
      });

      let ballXCoords = ball.position.x;
      let ballYCoords = ball.position.y;

      /****THIS IS WHERE YOU DEFINE WHERE THE HOLE IN THIS LEVEL IS ******/
      if(ballYCoords > 487 && ballYCoords < 515 && ballXCoords > 204 && ballXCoords < 212)
      {
        //Transport ball to one of two other holes
        let holeChoice = Math.floor(Math.random() * (2));
        /*Alert.alert(
          'Ya sunk it in the teleporty boi',
          `rand: ${holeChoice}`,
          [ {text: 'Cancel', onPress: () => console.log('no'), style: 'cancel'}],
          { cancelable: false }
        )*/

        if(holeChoice == 0)
        {
          Matter.Body.setPosition(ball, { x: Dimensions.get("screen").width/1.2, y: 70 });
        }
        else {
          Matter.Body.setPosition(ball, { x: Dimensions.get("screen").width/5.2, y: 70 });
        }
        
      }
      if(ballYCoords > 850 && ballXCoords > 205 && ballXCoords < 210)//THESE WILL HAVE TO BE CONVERTED TO WIDTH FUNCTIONS
      {
        if(this.state.shown == 0)
        {
          //Read from file, if unlocked level less than or = to 0, ++
          //levelsobject from file read on component mount
          if(JSON.parse(levelsObject).waterfront <= 3 )
          {
            console.log("Updating unlocked levels file");
            const wflevels = JSON.parse(levelsObject).waterfront + 1; // Unlock the next Waterfront Level
            const isllevels = JSON.parse(levelsObject).island;
            const forlevels = JSON.parse(levelsObject).forest;

            createDataFiles(FileSystem.documentDirectory + "gamesettings" + "/unlockedlvls.txt", '{"waterfront": ' + wflevels + ', "island": ' + isllevels + ', "forest": ' + forlevels + '}');
          }
          else {
            console.log("Youve already unlocked the next level");
          }
          //Check if score is better than saved. If it is, save it, and show 'New best score' on scorecard
          if(this.state.score < levelsScore || levelsScore == 0)
          {
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();
            today = yyyy + "-" + mm + "-" + dd;
            createDataFiles(FileSystem.documentDirectory + "gamesettings" + "/score.txt", '{"lvl1": '+this.state.lvl1score+', "lvl1Time": "'+this.state.lvl1date+'", "lvl2": '+this.state.lvl2score+', "lvl2Time": "'+this.state.lvl2date+'", "lvl3": '+this.state.lvl3score+', "lvl3Time": "'+this.state.lvl3date+'", "lvl4": '+this.state.score+', "lvl4Time": "'+today+'"}');
            this.setState({newhighscore: "New best score!"});
          }
          else {
            this.setState({newhighscore: ""});
          }
          this.setState({
            shown: 1,
            scorecard: true
          });

          //Make it freeze
          Matter.Sleeping.set(ball, true);
          Matter.Body.scale(ball, 0.6, 0.6);
        }
        
      }
      //this.gameEngine.dispatch({ type: "ball-sunk"}); 
      
    });

    return {
        physics: { engine: engine, world: world },
        ball: { body: ball, size: [20, 20], color: 'white', renderer: Ball},
        /*hole: { body: hole, size: [25, 25], color: 'grey', renderer: Ball},*/
        floor: { body: floor, size: [Dimensions.get("screen").width, 20], color: this.state.maskColour, renderer: Wall },
        ceiling: { body: ceiling, size: [Dimensions.get("screen").width, 25], color: this.state.maskColour, renderer: Wall },
        leftwall: { body: leftwall, size: [40, Dimensions.get("screen").height], color: this.state.maskColour, renderer: Wall },
        rightwall: { body: rightwall, size: [40, Dimensions.get("screen").height], color: this.state.maskColour, renderer: Wall },
        centerwall: { body: centerwall, size: [Dimensions.get("screen").width/2.5, Dimensions.get("screen").height/20], color: this.state.maskColour, renderer: Wall },
        leftmidwall: { body: leftmidwall, size: [Dimensions.get("screen").width/20, Dimensions.get("screen").height/1.71], color: this.state.maskColour, renderer: Wall },
        rightmidwall: { body: rightmidwall, size: [Dimensions.get("screen").width/20, Dimensions.get("screen").height/1.71], color: this.state.maskColour, renderer: Wall },

    }
}

  render() {
  return (
    <ImageBackground source={require('../assets/levels/lvl4.png')} style={gestyles.container}>
      <GameEngine
        ref={(ref) => { this.gameEngine = ref; }}
        style={gestyles.gameContainer}
        running={this.state.running}
        systems={[Physics]}
        entities={this.entities}
        onEvent={this.onEvent}>
      </GameEngine>
      <Text style={!this.state.debug && {display: 'none'}}>{"\n\n"}       ball{"\n"}       x: {this.state.ballx}{"\n"}       y: {this.state.bally}    score: {this.state.score}</Text>
      <View style={this.state.scorecard ? {display: "flex", flexDirection: "row", marginLeft: Dimensions.get("screen").width/4, paddingTop: 50 } : {display: "none"}}><Text style={[styles.text, {fontSize: 30, paddingLeft: 15, paddingRight: 15}]}>You sunk it!</Text></View>
      <ImageBackground source={require("../assets/scorecard.png")} resizeMode='contain' style={this.state.scorecard ? {height: 220, width: Dimensions.get("screen").width/2, marginLeft: Dimensions.get("screen").width/4, marginTop: Dimensions.get("screen").height/4 } : {display: "none"}}><Text style={[styles.text, {textAlign: "center", marginTop: 10}]}>Score:{"\n"}{this.state.score}</Text><Text style={[styles.text, {textAlign: "center", paddingTop: 20, fontSize: 22, lineHeight: 20}]}>{this.state.newhighscore}</Text></ImageBackground>
      <View style={this.state.scorecard ? {display: "flex", flexDirection: "row", marginLeft: Dimensions.get("screen").width/4 } : {display: "none"}}><TouchableOpacity><Text style={[styles.text, {fontSize: 30, paddingLeft: 15, paddingRight: 15}]} onPress = {() => {this.props.navigation.navigate('WaterfrontLevels')}}>Back</Text></TouchableOpacity><Text style={[styles.text, {fontSize: 30, marginLeft: 5, color: "lightgray"}]}>Continue</Text></View>
    </ImageBackground>
    
  );
  }
}
/*WaterfrontLvl1.navigationOptions = {
  gesturesEnabled: false,
};*/

export default WaterfrontLvl4;