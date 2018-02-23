import React, { Component }  from 'react'
import { ScrollView , View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Attivita from './require_json/reqAttivita.js'
import Luoghi from './require_json/reqLuoghi.js'

export default class AttivitaConteiner extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    drawerLabel: "ATTIVITA'",
    title: "ATTIVITA'",
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
  
  render() {
	const { params } = this.props.navigation.state;
  	const idAt= params ? params.idAt : null;
	    
	var index_AT;
	var index_L;
	
	
	for(var i = 0; i < Attivita.length; i++)
	{
		if(Attivita[i].idAttivita == idAt)
		{
			index_AT = i;
		}
    }
	
	for(var k = 0; k < Luoghi.length; k++)
	{
		if(Luoghi[k].idLuogo == Attivita[index_AT].idLuogo)
		{
			index_L = k;
		}
	}
	
    return (
		<ScrollView>
			<View style = {styles.container}>
				<Text> Nome Attivita': {Attivita[index_AT].nomeAttivita} </Text>
				<Text> Categoria: {Attivita[index_AT].categoria}</Text>
				<Image source={{uri: Attivita[index_AT].imm}} style={styles.stretch}/>
				<Text> Luogo Attivita': {Luoghi[index_L].nomeLuogo}</Text>
				<Text> Data Inizio: {Attivita[index_AT].dataIn}</Text>
				<Text> Data Fine: {Attivita[index_AT].dataFin}</Text>
				<Text> Ora Inizio: {Attivita[index_AT].oraIn}</Text>
				<Text> Ora Fine: {Attivita[index_AT].oraFin}</Text>	
				<Text> Prezzo: {Attivita[index_AT].prezzo} €</Text>
				<Text> Posti disponibili: {Attivita[index_AT].postiDisponibili} </Text>		
				<Text> Descrizione: {Attivita[index_AT].descrizione} </Text>		
			</View>
			<View style = {styles.separator2}/>
			<View style = {styles.separator}/>
			<View style = {styles.separator2}/>
		</ScrollView>
    );
  }
}
		
const styles = StyleSheet.create({
  container: {
		justifyContent: 'space-around',
        flexDirection: 'column',
		paddingTop: 23,
		backgroundColor: '#FFFFFF',
		alignItems: 'center'
  },
  stretch: {
    width: 200,
    height: 250,
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
