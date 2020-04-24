import React, { } from 'react';
import {  Text,  ImageBackground } from 'react-native';
import { styles } from '../styles';

class Credits extends React.Component {
  render() {

  return (

  <ImageBackground source={require('../assets/background.jpg')} style={styles.container}>

      <Text style = {[styles.title]}
      >Credits</Text>

      <Text style = {styles.creditText}>
      <Text style = {[styles.creditText, {fontSize: 35}]}>
        Development:{"\n"}
        Ian Bennett{"\n"}</Text>
        Quinn DiPaolo{"\n"}
        {"\n"}
        Inspiration: Eddie{"\n"}
        Assets: Eddie{"\n"}
        Eddie: Elod{"\n"}
        {"\n"}
        <Text style = {{ fontSize: 18 }}>Developed for UoGuelph CIS*4030 Mobile Development, ©2020</Text>
      </Text>
      

    </ImageBackground>
    
  );
  }
  
}

export default Credits;