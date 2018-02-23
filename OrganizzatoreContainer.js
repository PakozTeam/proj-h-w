import React, { Component }  from 'react'
import { ScrollView , TouchableOpacity,Button, View, Text, StyleSheet, Image } from 'react-native';
import Organizzatori from './require_json/reqOrganizzatori.js'

export default class OrganizzatoreContainer extends Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
    drawerLabel: "ORG.",
    title: "ORG.",
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
	const idOrg = params ? params.idOrg : null;
	
	var index;
	for(var i = 0; i < Organizzatori.length; i++) {
		if(Organizzatori[i].idOrg == idOrg) {
			index = i;
		}
	}
    return (
		<ScrollView>
		{
				<View style = {styles.container}>
					<Text> Nome Organizzatore: {Organizzatori[index].nomeOrg}</Text>
					<Image source={{uri: Organizzatori[index].logo}} style={styles.stretch}/>
					<Text> Sede Organizzatore: {Organizzatori[index].sede}</Text>
					<Text> Descrizione: {Organizzatori[index].descrizione}</Text>
					<Text> Contatti: {Organizzatori[index].contatti}</Text>
					<View style = {styles.separator2}/>
					<View style = {styles.separator}/>
					<View style = {styles.separator2}/>
				</View>
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
  }
})
