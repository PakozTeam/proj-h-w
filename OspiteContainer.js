import React, { Component }  from 'react'
import { ScrollView , Button, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ospiti from './require_json/reqOspiti.js'

export default class OspiteContainer extends Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
    drawerLabel: "OSPITI",
    title: "OSPITI",
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
  
  render() {
    const { params } = this.props.navigation.state;
	const idOsp = params ? params.idOspiti : null;
	
	var index=[];
	for(var i = 0; i < idOsp.length; i++) {
		for(var j = 0; j < Ospiti.length; j++) {
			if(Ospiti[j].idOspite == idOsp[i]) {
				index[i] = j;
			}
		}
	}
	
    return (
      <ScrollView>
	  {
			index.map((ind_vet, key) =>
			(
				<View key = {key} style = {styles.container}>
					<Text> Nome Ospite: {Ospiti[ind_vet].nomeOspite}</Text>
					<Image source={{uri: Ospiti[ind_vet].foto}} style={styles.stretch}/>
					<Text> Categoria Ospite: {Ospiti[ind_vet].categoria}</Text>
					<Text> Descrizione: {Ospiti[ind_vet].descrizione}</Text>
					<Text> Contatti: {Ospiti[ind_vet].contatti}</Text>
					<View style = {styles.separator2}/>
					<View style = {styles.separator}/>
					<View style = {styles.separator2}/>
				</View>
			))
	  }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		//flex: 1,
        flexDirection: 'column',
		paddingTop: 23,
		backgroundColor: '#FFFFFF',
		alignItems: 'center'
	},
	stretch: {
    width: 120,
    height: 120,
	resizeMode: 'contain',
	},
	separator: {
    height: 1,
	backgroundColor: 'orange',
	width: '100%',
	},
	separator2: {
    height: 3,
	width: '100%',
  },
})
