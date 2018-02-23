import React, {Component} from 'react';
import { Text, View, TouchableOpacity,ScrollView, Image,StyleSheet, Button, AsyncStorage } from 'react-native';
import Eventi from './require_json/reqEventi.js'
import Luoghi from './require_json/reqLuoghi.js'
import Organizzatori from './require_json/reqOrganizzatori.js'

export default class EventoHomeContainer extends Component {
	constructor(props) {
    super(props);
    this.state = {
		Ev_Pref: []};
	}
	
	static navigationOptions = ({ navigation, screenProps }) => ({
    drawerLabel: "EVENTO",
    title: "EVENTO",
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
  
  componentDidMount = async () => {
			var getList =  await AsyncStorage.getItem('Ev_Pref');
			this.setState({
			Ev_Pref: JSON.parse(getList)
		  })
	}
  
  pres = (ev,id) => {
	  var flag = true;
	  for(var j = 0; j < ev.length; j++) {
		if(ev[j]==id){
			flag = false;
		}
	  }
	  return flag;
  }
  
  setData = (ev,id) => {
		if (this.pres(ev,id)){
			ev.push(id)
			AsyncStorage.setItem('Ev_Pref', JSON.stringify(ev));
			alert('Evento con id =   ' + id + '   aggiunto ai preferiti');
		}
		else{
			alert('Evento con id =   ' + id + '   gia presente tra i preferiti');
		}
  }
  
  delPreferiti = (ev, id) => {
	  if (!this.pres(ev,id)){
		  var index = ev.indexOf(id)
		  ev.splice(index, 1);
		  this.setState({ListaPref: ev });
		  AsyncStorage.setItem('Ev_Pref', JSON.stringify(ev));
		  alert('Evento con id =  ' + id + '   eliminato dai preferiti');
	  }
	  else{
			alert('Evento con id =   ' + id + '   non presente tra i preferiti');
		}
  }
  
  
  render() {
  const { params } = this.props.navigation.state;
  	const idEv= params ? params.idEv : null;
	
	var index_E;
	var index_L;
	var index_O;
	for(var i = 0; i < Eventi.length; i++) {
        if(Eventi[i].idEvento == idEv) {
            index_E = i;
        }
    }
	for(var j = 0; j < Luoghi.length; j++) {
		if(Luoghi[j].idLuogo == Eventi[index_E].idLuogo) {
            index_L = j;
        }
    }
	for(var k = 0; k < Organizzatori.length; k++) {
		if(Organizzatori[k].idOrg == Eventi[index_E].idOrg) {
            index_O = k;
        }
    }
        return (
          <ScrollView>
    		<View style = {styles.container}>
    			<Text> Nome Evento: {Eventi[index_E].nomeEvento} </Text>
    			<Text> Categoria: {Eventi[index_E].categoria}</Text>
    			<Image source={{uri: Eventi[index_E].imm}} style={styles.stretch}/>
    			<Text> Luogo Evento: {Luoghi[index_L].nomeLuogo}</Text>
    			<Text> Data Inizio: {Eventi[index_E].dataIn}</Text>
    			<Text> Data Fine: {Eventi[index_E].dataFin}</Text>
    			<Text> Ora Inizio: {Eventi[index_E].oraIn}</Text>
    			<Text> Ora Fine: {Eventi[index_E].oraFin}</Text>
    			<Text> Organizzatore: {Organizzatori[index_O].nomeOrg}</Text>
    			<Text> Prezzo: {Eventi[index_E].prezzo} €</Text>
    			<Text> Posti disponibili: {Eventi[index_E].postiDisponibili} </Text>
				<Button
                color= 'orange'
                title="Aggiungi ai Preferiti"
                onPress={() => {this.setData(this.state.Ev_Pref,idEv)}}/>
				<Button
                color= 'blue'
                title="Rimuovi dai Preferiti"
                onPress={() => {this.delPreferiti(this.state.Ev_Pref,idEv)}}/>
				<View style = {styles.separator2}/>
				<View style = {styles.separator}/>
				<View style = {styles.separator2}/>
    		</View>
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
  }
})
