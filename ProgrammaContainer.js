import React, { Component }  from 'react'
import { ScrollView , View, Button, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Attivita from './require_json/reqAttivita.js'
import Luoghi from './require_json/reqLuoghi.js'

export default class ProgrammaContainer extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    drawerLabel: "PROG.",
    title: "PROG.",
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
  	const idAttivita= params ? params.idAttivita : null;
	    
	var indexAT=[];
	var indexLuoghi=[];
	
	
	for(var i = 0; i < idAttivita.length; i++)
	{
		for(var j = 0; j < Attivita.length; j++)
		{
			if(Attivita[j].idAttivita == idAttivita[i])
			{
				indexAT[i] = j;
			}
		}
    }
	for(var i = 0; i < idAttivita.length; i++)
	{
		for(var k = 0; k < Luoghi.length; k++)
		{
			if(Luoghi[k].idLuogo == Attivita[indexAT[i]].idLuogo)
			{
				indexLuoghi[i] = k;
			}
		}
	}
	
    return (
		<ScrollView>
			{
				indexAT.map((ind_vet, key) =>
				(
					<View key = { key }  style = {styles.container2}>
						<View style = {styles.container}>
							<TouchableOpacity
							  style={styles.container}
							  onPress={() => this.props.navigation.navigate('Attivita',{idAt: Attivita[ind_vet].idAttivita									
															},
													)}
							>
							<View style = {styles.container}>
								<Image source={{uri: Attivita[ind_vet].imm}} style={styles.stretch}/>
								<View style = {styles.container2}>	
									<Text>Nome Attivita': {Attivita[ind_vet].nomeAttivita}</Text>
									<Text> Luogo Attivita': {Luoghi[indexLuoghi[key]].nomeLuogo}</Text>
									<Text> Data Inizio: {Attivita[ind_vet].dataIn}</Text>	
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
