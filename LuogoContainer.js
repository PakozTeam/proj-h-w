import React, { Component }  from 'react';
import { ScrollView , Button, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { StackNavigator, DrawerNavigator,TabNavigator } from "react-navigation";
import Luoghi from './require_json/reqLuoghi.js';
import MapView from 'react-native-maps';
import openMap from 'react-native-open-maps';

export default class LuogoContainer extends Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
    drawerLabel: "LUOGO",
    title: "LUOGO",
	headerStyle: {
      backgroundColor: 'orange'
    },
    headerRight: (
      <View style={{ paddingHorizontal: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
          <Text style={{color:'white'}}> MENU </Text>
        </TouchableOpacity>
      </View>
    )
  });
  
  goTo = (Lat,Long) =>{
    openMap({ latitude: Lat, longitude: Long });
  }
  render() {
  const { params } = this.props.navigation.state;
  const idLg = params ? params.idLuogo : null;
	
	var index;
	for(var i = 0; i < Luoghi.length; i++) {
        if(Luoghi[i].idLuogo == idLg) {
            index = i;
        }
    }
    return (
      <ScrollView>
        <View style = {styles.container}>
			<Text> Nome Luogo: {Luoghi[index].nomeLuogo}</Text>
			<Image source={{uri: Luoghi[index].imm}} style={styles.stretch}/>
			<Text> Descrizione: {Luoghi[index].descrizione}</Text>
		</View>
	      <View style={styles.container_map}>
        <MapView style={styles.map}
          initialRegion={{
              latitude: Luoghi[index].lat,
              longitude: Luoghi[index].longi,
              latitudeDelta: 0.045,
              longitudeDelta: 0.045,
          }}
		  scrollEnabled={false}
		  zoomEnabled={true}
        >
        <MapView.Marker
            coordinate={{latitude: Luoghi[index].lat,
            longitude: Luoghi[index].longi}}
            title={Luoghi[index].nomeLuogo}
            description={Luoghi[index].indirizzo}
			pinColor={'#ff751a'}
			onPress = { () => {this.goTo(Luoghi[index].lat,Luoghi[index].longi)}}
         />
      </MapView> 
 </View> 
      </ScrollView>
    );
  }
}
var styles = StyleSheet.create({
	container: {
		//flex: 1,
        flexDirection: 'column',
		paddingTop: 10,
		backgroundColor: '#FFFFFF',
		alignItems: 'center'
	},
		stretch: {
		width: 300,
		height: 330,
		resizeMode: 'contain',
  },

  container_map: {
    flex: 1,
	justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
	paddingTop: 20,
	paddingBottom: 50,
		 
  },
    map: {
      position: 'relative',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
	  height:330,
	  width:330,
    }
});

