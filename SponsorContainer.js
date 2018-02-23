import React, { Component }  from 'react'
import { ScrollView , TouchableOpacity,Button, View, Text, StyleSheet, Image } from 'react-native';
import Sponsor from './require_json/reqSponsor.js'

export default class SponsorContainer extends Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
    drawerLabel: "SPONSOR",
    title: "SPONSOR",
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
	const idSp = params ? params.idSponsor : null;
	
	var index=[];
	for(var i = 0; i < idSp.length; i++) {
		for(var j = 0; j < Sponsor.length; j++) {
			if(Sponsor[j].idSponsor == idSp[i]) {
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
					<Text> Nome Sponsor: {Sponsor[ind_vet].nomeSponsor}</Text>
					<Image source={{uri: Sponsor[ind_vet].foto}} style={styles.stretch}/>
					<Text> Categoria Sponsor: {Sponsor[ind_vet].categoria}</Text>
					<Text> Descrizione: {Sponsor[ind_vet].descrizione}</Text>
					<Text> Contatti: {Sponsor[ind_vet].contatti}</Text>
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
  }
})
