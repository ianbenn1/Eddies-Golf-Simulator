import React, { } from 'react';
import {  Text, View, ImageBackground } from 'react-native';
import { Divider } from 'react-native-elements'
import { styles } from '../styles';
import * as FileSystem from 'expo-file-system';

class HighScores extends React.Component {
  state={
    lvl1: 0,
    lvl1Date: "",
    lvl2: 0,
    lvl2Date: "",
    lvl3: 0,
    lvl3Date: "",
    lvl4: 0,
    lvl4Date: ""
  }
  async componentDidMount() {
    //levelsObject = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "gamesettings" + "/unlockedlvls.txt");
    let levelsScore = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "gamesettings" + "/score.txt");
    this.setState({
      lvl1: JSON.parse(levelsScore).lvl1,
      lvl2: JSON.parse(levelsScore).lvl2,
      lvl3: JSON.parse(levelsScore).lvl3,
      lvl4: JSON.parse(levelsScore).lvl4,
      lvl1Date: JSON.parse(levelsScore).lvl1Time,
      lvl2Date: JSON.parse(levelsScore).lvl2Time,
      lvl3Date: JSON.parse(levelsScore).lvl3Time,
      lvl4Date: JSON.parse(levelsScore).lvl4Time,
    });
    console.log("lvl1 score: " + this.state.lvl1 + " d8: " + this.state.lvl1Date + " lvl2 score: " + this.state.lvl2 + " d8: " + this.state.lvl2Date + " lvl3 score: " + this.state.lvl3 + " d8: " + this.state.lvl3Date +  " lvl4 score: " + this.state.lvl4 + " d8: " + this.state.lvl4Date);
  }

  render() {

    
  return (

  <ImageBackground source={require('../assets/background.jpg')} style={styles.container}>

      <Text style = {[styles.title, {paddingBottom: 18}]}
      >High Scores</Text>

        <View style = {styles.button}>
          <Divider />
            <React.Fragment key="1">
              <Text style = {styles.nametext} >Waterfront - Level 1</Text>
              <Text style = {styles.pointtext} >{this.state.lvl1 == 0 ? "No Score" : "-- "+this.state.lvl1+" --"}</Text>
              <Text style = {styles.timetext} >{this.state.lvl1Date == " " ? "No Date" : "[ "+this.state.lvl1Date+" ]"}</Text>
              <Divider style={{ backgroundColor: 'blue' }} />
            </React.Fragment>
            <React.Fragment key="2">
              <Text style = {styles.nametext} >Waterfront - Level 2</Text>
              <Text style = {styles.pointtext} >{this.state.lvl2 == 0 ? "No Score" : "-- "+this.state.lvl2+" --"}</Text>
              <Text style = {styles.timetext} >{this.state.lvl2Date == " " ? "No Date" : "[ "+this.state.lvl2Date+" ]"}</Text>
              <Divider style={{ backgroundColor: 'blue' }} />
            </React.Fragment>
            <React.Fragment key="3">
              <Text style = {styles.nametext} >Waterfront - Level 3</Text>
              <Text style = {styles.pointtext} >{this.state.lvl3 == 0 ? "No Score" : "-- "+this.state.lvl3+" --"}</Text>
              <Text style = {styles.timetext} >{this.state.lvl3Date == " " ? "No Date" : "[ "+this.state.lvl3Date+" ]"}</Text>
              <Divider style={{ backgroundColor: 'blue' }} />
            </React.Fragment>
            <React.Fragment key="4">
              <Text style = {styles.nametext} >Waterfront - Level 4</Text>
              <Text style = {styles.pointtext} >{this.state.lvl4 == 0 ? "No Score" : "-- "+this.state.lvl4+" --"}</Text>
              <Text style = {styles.timetext} >{this.state.lvl4Date == " " ? "No Date" : "[ "+this.state.lvl4Date+" ]"}</Text>
              <Divider style={{ backgroundColor: 'blue' }} />
            </React.Fragment>
        </View>

    </ImageBackground>
    
  );
  }
  
}

export default HighScores;