import Matter from "matter-js";
import {Alert, Dimensions} from 'react-native';

const Physics = (entities, { touches, time }) => {
    let engine = entities.physics.engine;
    let ball = entities.ball.body;

    engine.world.gravity.y = 0;

    touches.filter(t => t.type === "press").forEach(t => {

        let amountX_scaled;       //X = width   Y = Height
        let amountY_scaled;

        if(t.event.pageY >= ball.position.y)
        {
            amountY_scaled = t.event.pageY - ball.position.y;
        }
        else {
            amountY_scaled = ball.position.y - t.event.pageY;
            amountY_scaled *= -1;
        }

        if(t.event.pageX >= ball.position.x)
        {
            amountX_scaled = t.event.pageX - ball.position.x;
        }
        else {
            amountX_scaled = ball.position.x - t.event.pageX;
            amountX_scaled *= -1;
        }

        amountX_scaled = (amountX_scaled / Dimensions.get("screen").width) * 0.04; // Got these dialed in MINT
        amountY_scaled = (amountY_scaled / Dimensions.get("screen").height) * 0.08;// Theyre perfect on my device rn

        /*Alert.alert(
            'Ya poked it',
            `X: ${t.event.pageX}
            Y: ${t.event.pageY}
            scaledX: ${amountX_scaled}   scaledY: ${amountY_scaled}
            ballx: ${ball.position.x}  bally: ${ball.position.y}`,
            [ {text: 'Cancel', onPress: () => console.log('no'), style: 'cancel'}],
            { cancelable: false }
          )*/
        Matter.Body.applyForce( ball, ball.position, {x: amountX_scaled, y: amountY_scaled});
    });

    Matter.Engine.update(engine, time.delta);

    return entities;
};

export default Physics;