import React, { Component } from "react";
import { Image, Button, StyleSheet, Text, TouchableOpacity, ScrollView, View, AsyncStorage } from "react-native";
import Eventi from './require_json/reqEventi.js'
import Luoghi from './require_json/reqLuoghi.js'

var dati_utente = require("./database_json/data_user.json");

export default class EvPreferitiContainer extends Component {
	constructor(props) {
    super(props);
    this.state = {ListaPref: []};
	}
	
  static navigationOptions = ({ navigation, screenProps }) => ({
    drawerLabel: "Preferiti",
    title: "Preferiti",
	headerStyle: {
      backgroundColor: 'orange',
	  
    },
	headerBackTitleStyle: {color: 'white'
    },
    headerRight: (
      <View style={{ paddingHorizontal: 10}}>
        <TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
          <Text style={{color:'white'}}> MENU </Text>
        </TouchableOpacity>
      </View>
    )
  });
  
  componentDidMount = async () => {
			var getList =  await AsyncStorage.getItem('Ev_Pref');
			this.setState({
			ListaPref: JSON.parse(getList)
		  })
	}
  
  
  
  render() {
	var indexEP=[];
	var indexLuoghi=[];
	
	
	for(var i = 0; i < this.state.ListaPref.length; i++)
	{
		for(var j = 0; j < Eventi.length; j++)
		{
			if(Eventi[j].idEvento == this.state.ListaPref[i])
			{
				indexEP[i] = j;
			}
		}
    }
	for(var i = 0; i < this.state.ListaPref.length; i++)
	{
		for(var k = 0; k < Luoghi.length; k++)
		{
			if(Luoghi[k].idLuogo == Eventi[indexEP[i]].idLuogo)
			{
				indexLuoghi[i] = k;
			}
		}
	}
	
    return (
		<ScrollView>
			{	
				indexEP.map((ind_vet, key) =>
				(
					<View key = { key }  style = {styles.container2}>
						<View style = {styles.container}>
							<TouchableOpacity
							  style={styles.container}
							  onPress={() => this.props.navigation.navigate('TabEv',{
															idEv: Eventi[ind_vet].idEvento,
															idLuogo: Eventi[ind_vet].idLuogo,
															idOrg: Eventi[ind_vet].idOrg,
															idOspiti: Eventi[ind_vet].idOspiti,
															idSponsor: Eventi[ind_vet].idSponsor,
															idAttivita: Eventi[ind_vet].idAttivita										
															},
													)}
							>
								<View style = {styles.container}>
									<Image source={{uri: Eventi[ind_vet].imm}} style={styles.stretch}/>
									<View style = {styles.container2}>	
										<Text>Nome Evento: {Eventi[ind_vet].nomeEvento}</Text>
										<Text> Luogo Evento: {Luoghi[indexLuoghi[key]].nomeLuogo}</Text>
										<Text> Data Inizio: {Eventi[ind_vet].dataIn}</Text>
				
									</View>
								</View>
							</TouchableOpacity>
						</View>
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
    flex: 1,
	flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center"
  },
  container2: {
    flex: 1,
	flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center"
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
  
});
