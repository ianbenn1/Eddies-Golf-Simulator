import React, { } from 'react';
import { Text, View, TouchableOpacity, ImageBackground, Slider, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { styles } from '../styles';


class Settings extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = state = {
      value: 0,//Reset to saved value by file load in componentDidMount
      debug: false
    };

  }
  async componentDidMount() {
    let content = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "gamesettings" + "/volume.txt");
    console.log( "CDM content:   " + content);
    let volume = JSON.parse(content).vol;
    let debugvar = JSON.parse(content).debug;
    console.log("retreived file vol: " + volume);
    this.setState({value: volume/100,
                   debug: debugvar});
  }

  render() {
    const writeDataFile = async (file_path, content) => {
      await FileSystem.writeAsStringAsync(file_path, content)
    };

    const setVolume = async value => {
      this.setState({ value });
      writeDataFile(FileSystem.documentDirectory + "gamesettings" + "/volume.txt", '{"vol": '+(value.toFixed(2)*100).toFixed(0).toString()+', "debug": ' + this.state.debug + '}');
    }

  return (
  <ImageBackground source={require('../assets/background.jpg')} style={styles.container}>

      <Text style = {[styles.title, {paddingBottom: 18}]}
      >Settings</Text>

          <View>
            <Text style = {styles.text}>   Volume   </Text>
            <View>
              <Slider
                style = {styles.volumeslider}
                thumbImage={require('../assets/golfball35.png')}
                value={this.state.value}
                onValueChange={value => setVolume(value)}
                thumbTouchSize={{width: 10, height: 10}}
              />
              <Text style={[styles.text, {fontSize: 14}]}>Value: {(this.state.value.toFixed(2)*100).toFixed(0)}</Text>
            </View>
          </View>

      <TouchableOpacity onPress = {() => {Alert.alert(
        'Reset Highscores',
        'This will clear the highscores list. Are you sure?',
        [
          {text: "I'm Sure", onPress: () => writeDataFile(FileSystem.documentDirectory + "gamesettings" + "/score.txt", '{"lvl1": 0, "lvl1Time": " ", "lvl2": 0, "lvl2Time": " ", "lvl3": 0, "lvl3Time": " ", "lvl4": 0, "lvl4Time": " "}')},
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
        ],
        { cancelable: false }
      )}}>
        <View style = {styles.button}>
          <Text style = {styles.text}>   Reset Highscores   </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress = {() => {Alert.alert(
        'Reset Levels',
        'This will re-lock all unlocked levels. Are you sure?',
        [
          {text: "I'm Sure", onPress: () => writeDataFile(FileSystem.documentDirectory + "gamesettings" + "/unlockedlvls.txt", '{"waterfront": 0, "island": 0, "forest": 0}')},
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
        ],
        { cancelable: false }
      )}}>
        <View style = {styles.button}>
          <Text style = {styles.text}>   Reset Levels   </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress = {() => {
          writeDataFile(FileSystem.documentDirectory + "gamesettings" + "/volume.txt", '{"vol": '+this.state.value*100+', "debug": ' + !this.state.debug + '}');
          this.setState((state) => {return {debug: !state.debug};});
        }}>
        <View style = {styles.button}>
          <Text style = {styles.text}>   Debug Mode: {this.state.debug? "On" : "Off"}   </Text>
        </View>
      </TouchableOpacity>

    </ImageBackground>
    
  );
  }
  
}

export default Settings;