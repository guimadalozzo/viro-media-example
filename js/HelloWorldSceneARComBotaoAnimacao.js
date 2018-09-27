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
  ViroNode,
  ViroButton,
  ViroText
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();
    this.isPlay = true;
	this._onClick = this._onClick.bind(this);
  }
  
  render() {
    return (
      <ViroARScene >
        <ViroARImageMarker  target={"targetOne"}>
          <ViroNode rotation={[-90, 0, 0]} scale={[.2, .2, .2]} dragType="FixedDistance" onDrag={()=>{}}>
            <ViroAmbientLight color="#aaaaaa" />
            <Viro3DObject
              source={require("./res/cervi/cervi2.obj")}
              resources={[require('./res/cervi/cervi2.mtl'),
                          require('./res/pele.jpg')]}
              highAccuracyGaze={true}
              position={[0, 0, 0]}
              scale={[.0005, .0005, .0005]}
              rotation={[0, 0, 0]}
              type="OBJ"
              onClick={this._onClick}
              animation={{name:'animateImage', run:true, loop:true}}
              visible={true}
			  ref={this._setIsPlayRef.bind(this)}
            />          
            <ViroText text="Cervo Girando" scale={[.5, .5, .5]} position={[.5, 0, 0]} visible={true} />
            </ViroNode>
			<ViroImage source={require('./res/btn.png')} 
			 position={[0, 0, 0.05]} 
			 scale={[.05, .05, .05]} 
			 rotation={[90, 0, 180]}
			 onClick={this._onClick} 
			 dragType="FixedDistance" 
			 onDrag={()=>{}}/>

          </ViroARImageMarker> 
      </ViroARScene>
    );
  }
  
 _setIsPlayRef(component) {
        this._isPlay = component;
    };

 _onClick(source) {
    if(this.isPlay) this.isPlay = false;
    else this.isPlay = true;
    console.log("Ativa animação!");
	this._isPlay.setNativeProps({animation:{name:'animateImage', run:this.isPlay, loop:true}});
  };

}

ViroAnimations.registerAnimations({
  animateImage:{properties:{rotateY:"+=45"},  
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
