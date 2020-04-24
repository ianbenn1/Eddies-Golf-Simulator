import React, { Component } from "react";
import { View, Image } from "react-native";

export default class Ball extends Component {
    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.body.position.x - width / 2;
        const y = this.props.body.position.y - height / 2;
        const ballname = this.props.ballname;

        return (
            <View
                style={{
                    position: "absolute",
                    left: x,
                    top: y,
                    width: width,
                    height: height,
                    backgroundColor: this.props.color,
                    borderWidth: 0.75,
                    borderColor: 'black',
                    borderRadius: '50%'
                }} />
    );
  }
}
/*
export class DefBall extends Component {
    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.body.position.x - width / 2;
        const y = this.props.body.position.y - height / 2;
        const ballname = this.props.ballname;

        return (
            <Image
                style={{
                    position: 'absolute',
                    height:  height,
                    width: width,
                    left: x,
                    top: y,
                    alignSelf: 'center'
                }}
            source={require('../../assets/skins/default-ball_20.png')}
    );
  }
}
export class DrkBall extends Component {
    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.body.position.x - width / 2;
        const y = this.props.body.position.y - height / 2;
        const ballname = this.props.ballname;

        return (
            <Image
                style={{
                    position: 'absolute',
                    height:  height,
                    width: width,
                    left: x,
                    top: y,
                    alignSelf: 'center'
                }}
            source={require('../../assets/skins/dark-ball_20.png')}
    );
  }
}
export class BombBall extends Component {
    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.body.position.x - width / 2;
        const y = this.props.body.position.y - height / 2;
        const ballname = this.props.ballname;

        return (
            <Image
                style={{
                    position: 'absolute',
                    height:  height+5,
                    width: width+5,
                    left: x,
                    top: y,
                    alignSelf: 'center'
                }}
            source={require('../../assets/skins/bomb-ball_20.png')}
    );
  }
}
export class TenBall extends Component {
    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.body.position.x - width / 2;
        const y = this.props.body.position.y - height / 2;

        return (
            <Image
                style={{
                    position: 'absolute',
                    height:  height,
                    width: width,
                    left: x,
                    top: y,
                    alignSelf: 'center'
                }}
            source={require('../../assets/skins/tennis-ball_20.png')}
    );
  }
}
*/