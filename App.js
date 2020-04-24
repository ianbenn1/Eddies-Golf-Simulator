import 'react-native-gesture-handler';
import React, {useState, Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import * as FileSystem from 'expo-file-system';

import Homescreen from './homescreen';
import CustomizeMenu from './screens/customizeMenu';
import OutfitSelection from './screens/outfitSelection';
import BallSelection from './screens/ballSelection';
import ClubSelection from './screens/clubSelection';
import HighScores from './screens/highScores';
import Credits from './screens/credits';
import Settings from './screens/settings';
import PlaySelection from './screens/playSelection';
import CampaignSelection from './screens/campaignSelection';
import WaterfrontLevels from './screens/waterfrontLevels';
import WaterfrontLvl1 from './screens/waterfrontLvl1';
import WaterfrontLvl2 from './screens/waterfrontLvl2';
import WaterfrontLvl3 from './screens/waterfrontLvl3';
import WaterfrontLvl4 from './screens/waterfrontLvl4';


const Stack = createStackNavigator();

const getFonts = () => {
  return Font.loadAsync({
    'pacifico': require('./assets/fonts/Pacifico.ttf')
  })
}

// Create any app folders that don't already exist
const checkAndCreateFolder = async folder_path => {
  const folder_info = await FileSystem.getInfoAsync(folder_path);
  if (!Boolean(folder_info.exists)) {
    // Create folder
    try {
      const testval = await FileSystem.makeDirectoryAsync(folder_path, {
        intermediates: true
      });
      
      createDataFiles(FileSystem.documentDirectory + "gamesettings" + "/volume.txt", '{"vol": 100, "debug": false}');
      createDataFiles(FileSystem.documentDirectory + "gamesettings" + "/unlockedlvls.txt", '{"waterfront": 0, "island": 0, "forest": 0}');
      createDataFiles(FileSystem.documentDirectory + "gamesettings" + "/score.txt", '{"lvl1": 0, "lvl1Time": " ", "lvl2": 0, "lvl2Time": " ", "lvl3": 0, "lvl3Time": " ", "lvl4": 0, "lvl4Time": " "}');
      createDataFiles(FileSystem.documentDirectory + "gamesettings" + "/customize.txt", '{"sprite": "default-eddie", "ball": "default-ball", "club": "default-club"}');
    } catch (error) {
      // Report folder creation error, include the folder existence before and now
      const new_folder_info = await FileSystem.getInfoAsync(folder_path);
      const debug = `checkAndCreateFolder: ${
        error.message
      } old:${JSON.stringify(folder_info)} new:${JSON.stringify(new_folder_info)}`;
      console.log(debug);
    }
  }
  else {
    console.log("Folder must already exist :)");// WE SHOULD PROBABLY TEST THAT EACH OF THE SUBFILES HAVENT BEEN DELETED.
  }
};

const createDataFiles = async (file_path, content) => {
  await FileSystem.writeAsStringAsync(file_path, content);
};

const testDataFiles = async file_path => {
  const fcontent = await FileSystem.readAsStringAsync(file_path);
  console.log(file_path + "Content: " + fcontent);
};

//All storage in the app needs to be initialized here
const createApplicationStorage = () => {
  console.log("Building storage now...");
  checkAndCreateFolder(FileSystem.documentDirectory + "gamesettings");
  //createDataFiles(FileSystem.documentDirectory + "gamesettings" + "/volume.txt", '{"vol": 100, "debug": false}');
  //createDataFiles(FileSystem.documentDirectory + "gamesettings" + "/score.txt", '{"lvl1": 0, "lvl1Time": " ", "lvl2": 0, "lvl2Time": " ", "lvl3": 0, "lvl3Time": " ", "lvl4": 0, "lvl4Time": " "}');
  //createDataFiles(FileSystem.documentDirectory + "gamesettings" + "/unlockedlvls.txt", '{"waterfront": 0, "island": 0, "forest": 0}');
/*testDataFiles(FileSystem.documentDirectory + "gamesettings" + "/volume.txt");
  testDataFiles(FileSystem.documentDirectory + "gamesettings" + "/unlockedlvls.txt");
  testDataFiles(FileSystem.documentDirectory + "gamesettings" + "/score.txt");
  testDataFiles(FileSystem.documentDirectory + "gamesettings" + "/customize.txt");*/

};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  if(fontsLoaded) {
    return (
      <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen
          name="Home"
          component={Homescreen}
        />
        <Stack.Screen name="CustomizeMenu" component={CustomizeMenu} />
        <Stack.Screen name="HighScores" component={HighScores} />
        <Stack.Screen name="Credits" component={Credits} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="PlaySelection" component={PlaySelection} />
        <Stack.Screen name="CampaignSelection" component={CampaignSelection} />
        <Stack.Screen name="WaterfrontLevels" component={WaterfrontLevels} />
        <Stack.Screen name="WaterfrontLvl1" component={WaterfrontLvl1} />
        <Stack.Screen name="WaterfrontLvl2" component={WaterfrontLvl2} />
        <Stack.Screen name="WaterfrontLvl3" component={WaterfrontLvl3} />
        <Stack.Screen name="WaterfrontLvl4" component={WaterfrontLvl4} />
        <Stack.Screen name="OutfitSelection" component={OutfitSelection} />
        <Stack.Screen name="BallSelection" component={BallSelection} />
        <Stack.Screen name="ClubSelection" component={ClubSelection} />
      </Stack.Navigator>
    </NavigationContainer>
    );
  } else {
    createApplicationStorage();
    return (
    <AppLoading
      startAsync={getFonts}
      onFinish={()=> setFontsLoaded(true)}
    />
    )
}
}
