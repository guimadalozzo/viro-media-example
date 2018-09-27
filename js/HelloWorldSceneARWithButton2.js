'use strict';

import React, { Component } from 'react';

import {StyleSheet,Linking} from 'react-native';
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
  ViroText,
  ViroMaterials
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
      super();
      this.isPlay = true;
      this.isPlay2 = true;
  	  this._onClick = this._onClick.bind(this);
      this._onClick2 = this._onClick2.bind(this);
      this._onClick3 = this._onClick3.bind(this);
  }
  
  render() {
    return (
      <ViroARScene >
        <ViroARImageMarker  target={"targetOne"}>
          <ViroNode rotation={[-90, 0, 0]} scale={[.2, .2, .2]}>
            <ViroAmbientLight color="#fff" />
            <Viro3DObject onDrag={()=>{}}
              source={require("./res/note/Lowpoly_Notebook_2.obj")}
              resources={[require('./res/note/Lowpoly_Notebook_2.mtl')]}
              materials={["note", "tela"]}            
              highAccuracyGaze={true}
              position={[0, 0, 0]}
              scale={[.2, .2, .2]}
              rotation={[0, 0, 0]}
              type="OBJ"
              onClick={this._onClick3}
              animation={{name:'animateImage', run:true, loop:true}}
              visible={true}
			        ref={this._setIsPlayRef.bind(this)}
            />          
            <ViroText text="Notebook Dell Inspiron 5100" scale={[.5, .5, .5]} position={[.6, 0, 0]} visible={true} />
          </ViroNode>
        		<ViroImage source={require('./res/btn3.png')} 
              position={[0.1, 0, 0.05]} 
              scale={[.05, .05, .05]} 
              rotation={[90, 180, 180]}
        			onClick={this._onClick} 
        			onDrag={()=>{}}/>
        </ViroARImageMarker>

        <ViroARImageMarker  target={"targetTwo"}>
          <ViroNode rotation={[-90, 0, 0]} scale={[.2, .2, .2]}>
            <ViroAmbientLight color="#fff" R/>
            <Viro3DObject
              source={require("./res/iPhone_6/iPhone6.obj")}
              resources={[require('./res/iPhone_6/iPhone6.mtl')]}
              materials={["phone"]}            
              highAccuracyGaze={true}   
              position={[0, 0, 0]}
              scale={[.1, .1, .1]}
              rotation={[0, 0, 0]}
              type="OBJ"
              onClick={this._onClick3}
              animation={{name:'animateImage', run:true, loop:true}}
              visible={true}
              ref={this._setIsPlayRef2.bind(this)}
            />          
            <ViroText text="IPhone 6" scale={[.5, .5, .5]} position={[.6, 0, 0]} visible={true} />
          </ViroNode>
            <ViroImage source={require('./res/btn3.png')} 
              position={[0.1, 0, 0.05]} 
              scale={[.05, .05, .05]} 
              rotation={[90, 180, 180]}
              onClick={this._onClick2}  
              onDrag={()=>{}}/>
       </ViroARImageMarker>
      </ViroARScene>
    );
  };

 _setIsPlayRef(component) {
        this._isPlay = component;
    };
 _setIsPlayRef2(component) {
        this._isPlay2 = component;
    };

 _onClick() {
    Linking.openURL('https://produto.mercadolivre.com.br/MLB-993688084-notebook-dell-inspiron-i15-3567-u10c-ci3-4gb-1tb-156-linux-_JM');
  };
 _onClick2() {
    Linking.openURL('https://produto.mercadolivre.com.br/MLB-1026576088-iphone-6-apple-tela-47-hd-32gb-12mp-4g-_JM');
  };

_onClick3() {
   if(this.isPlay) this.isPlay = false;
   else this.isPlay = true;
   this._isPlay.setNativeProps({animation:{name:'animateImage', run:this.isPlay, loop:true}});

   if(this.isPlay2) this.isPlay2 = false;
   else this.isPlay2 = true;
   this._isPlay2.setNativeProps({animation:{name:'animateImage', run:this.isPlay2, loop:true}});

  };
}

ViroAnimations.registerAnimations({
  animateImage:{properties:{rotateY:"+=45"},  
        easing:"Linear", duration: 1000},
});

  ViroMaterials.createMaterials({
    note: {
       lightingModel: "Blinn",
       diffuseTexture: require('./res/note/textures/Lowpoly_Laptop_2.jpg')
     },
    tela: {
       lightingModel: "Blinn",
       diffuseTexture: require('./res/note/textures/Lowpoly_Laptop_1.jpg')
     },
    phone: {
       lightingModel: "Blinn",
       diffuseTexture: require('./res/iPhone_6/Textures/iphone-6-02(1).jpg')
     },
  });

ViroARTrackingTargets.createTargets({
      "targetOne" : {
        source : require('./res/note.jpg'),
        orientation : "Up",
        physicalWidth : 0.1 // real world width in meters
      },
      "targetTwo" : {
        source : require('./res/iphone-6.jpg'),
        orientation : "Up",
        physicalWidth : 0.1 // real world width in meters
      },
      });


module.exports = HelloWorldSceneAR;
