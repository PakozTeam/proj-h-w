import React, { Component } from "react";
import { Image, Button, StyleSheet, Text, TouchableOpacity, ScrollView, View, AsyncStorage } from "react-native";
import Eventi from './require_json/reqEventi.js'
import Luoghi from './require_json/reqLuoghi.js'

var dati_utente = require("./database_json/data_user.json");

export default class TopTenContainer extends Component {
	constructor(props) {
    super(props);
    this.state = {ListTT: []};
	}
	
	
  static navigationOptions = ({ navigation, screenProps }) => ({
    drawerLabel: "TOP TEN",
    title: "TOP TEN",
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
  
  componentWillMount = async () => { 
			
			AsyncStorage.getItem('ListaTT').then((item) => {
				if(item){}
				else{
					AsyncStorage.setItem('ListaTT', JSON.stringify(dati_utente.ListaTT));
				}
			});
			
			AsyncStorage.getItem('Ev_Pref').then((item) => {
				if(item){}
				else{
					AsyncStorage.setItem('Ev_Pref', JSON.stringify(dati_utente.Ev_Pref));
				}
			});
  
			var getLista =  await AsyncStorage.getItem('ListaTT');
			this.setState({
			ListTT: JSON.parse(getLista)
		  });
	}
  
  render() {
	  
	var indexTT=[];
	var indexLuoghi=[];
	for(var i = 0; i < this.state.ListTT.length; i++)
	{
		for(var j = 0; j < Eventi.length; j++)
		{
			if(Eventi[j].idEvento == this.state.ListTT[i])
			{
				indexTT[i] = j;
			}
		}
    }
	for(var i = 0; i < this.state.ListTT.length; i++)
	{
		for(var k = 0; k < Luoghi.length; k++)
		{
			if(Luoghi[k].idLuogo == Eventi[indexTT[i]].idLuogo)
			{
				indexLuoghi[i] = k;
			}
		}
	}

    return (
		<ScrollView>
			{
				indexTT.map((ind_vet, key) =>
				(
					<View key = { key }  style = {styles.container2}>
						<View style = {styles.container}>
							 <TouchableOpacity
							  style={styles.container}
							  onPress={() => this.props.navigation.navigate('TabEv',{idEv: Eventi[ind_vet].idEvento,
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
  }
});
