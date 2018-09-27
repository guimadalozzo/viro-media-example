'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import {
  ViroARScene,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroBox,
  ViroAmbientLight,
  Viro3DObject,
  ViroImage,
  ViroAnimations,
  ViroNode
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    this.rotacao = false;

    this._onClick = this._onClick.bind(this);
  }

  render() {
    return (
      <ViroARScene>
        <ViroARImageMarker target={"targetOne"}>
          <ViroAmbientLight color="#aaaaaa" />
          <Viro3DObject
          source={require("./res/cervi3.obj")}
          highAccuracyGaze={true}
          position={[0, -1, .5]}
          scale={[.0005, .0005, .0005]}
          rotation={[0, 0, 0]}
          type="OBJ"
          transformBehaviors={["billboard"]}
          //animation={{name:'animateImage', run:true}}
          />
          <ViroNode position={[0,0,0]} dragType="FixedDistance" onDrag={()=>{}} >
            <ViroImage source={require('./res/btn.png')}
            rotation={[90, 0, 180]}
            position={[0, 0, 0]}
            scale={[.05, .05, .05]}
            onClick={this._onClick}/>
          </ViroNode>
        </ViroARImageMarker>
      </ViroARScene>
    );
  }

 _onClick(source) {
    if(this.rotacao) this.rotacao=false;
    else this.rotacao=true;
    console.log("Ativa animação!");
    return this.rotacao;
  };

}

ViroAnimations.registerAnimations({
  animateImage:{properties:{rotateX:"+=90"},  
        easing:"Linear", duration: 1000},
});

ViroARTrackingTargets.createTargets({
      "targetOne" : {
        source : require('./res/cervi.jpg'),
        orientation : "Up",
        physicalWidth : 0.1 // real world width in meters
      },
      });


module.exports = HelloWorldSceneAR;
