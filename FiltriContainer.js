import React, { Component } from "react";
import { Image, StyleSheet, Text, ScrollView, DatePickerAndroid,TouchableOpacity, TextInput, View } from "react-native";
import CategoriaEvento from './CategoriaEvento.js'
import Prezzo from './Prezzo.js'
import DatePicker from 'react-native-datepicker'

export default class FiltriContainer extends Component {
	 constructor(props) {
        super(props)
		// funzione per ricevere lo stato del componente PREZZO
        this.handlerPrezzo = this.handlerPrezzo.bind(this);
		// funzione per ricevere lo stato del componente CATEGORIA
		this.handlerCat = this.handlerCat.bind(this);
		//STATO
        this.state = {
			nomeEvento: '',
			luogo: '',
			organizzatore: '',
			ospite: '',
			prezzoMax: 200,
			categoria: '',
			dateIn:'',
			dateFin:'',
			sponsor:'',
		};	
    }
	// OPZIONI DI NAVIGAZIONE
	static navigationOptions = ({ navigation, screenProps }) => ({
		drawerLabel: "RICERCA",
		title: "RICERCA",
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
  	// metodi per salvare nello stato i valori desiderati	
	handlenomeEvento = (text) => {
		this.setState({ nomeEvento: text })
	}
	handleluogo = (text) => {
		this.setState({ luogo: text })
	}
	handleorganizzatore = (text) => {
		this.setState({ organizzatore: text })
	}
	handleospite = (text) => {
		this.setState({ ospite: text })
	}
	handlesponsor = (text) => {
    		this.setState({ sponsor: text })
    	}
	handlerPrezzo(p) {
        this.setState({
            prezzoMax: p
        });
    }
	handlerCat(cat) {
        this.setState({
            categoria: cat
        });
    }
	//metodo che viene invocato quando si preme RICERCA
	ricerca = () => {
		this.props.navigation.navigate('Ricerca',{filtri: this.state});
	}
	
	render() {
		return (
		  <ScrollView>
					<View style = {styles.container}>
						<TextInput style = {styles.input}
							underlineColorAndroid = "transparent"
							placeholder = "Nome Evento"
							placeholderTextColor = 'orange'
							autoCapitalize = "none"
							onChangeText = {this.handlenomeEvento}/>
						<TextInput style = {styles.input}
							underlineColorAndroid = "transparent"
							placeholder = "Luogo Evento"
							placeholderTextColor = 'orange'
							autoCapitalize = "none"
							onChangeText = {this.handleluogo}/>
						<TextInput style = {styles.input}
							underlineColorAndroid = "transparent"
							placeholder = "Organizzatore"
							placeholderTextColor = 'orange'
							autoCapitalize = "none"
							onChangeText = {this.handleorganizzatore}/>
						<View style = {{flexDirection: 'row', justifyContent: 'center'}}>
							<DatePicker
								style={{width: 185}}
								androidMode = 'spinner'
								date={this.state.dateIn}
								mode="date"
								placeholder="Data Inizio"
								placeholderTextColor = 'orange'
								format="DD-MM-YYYY"
								confirmBtnText="Conferma"
								cancelBtnText="Annulla"
								customStyles={{dateIcon: {position: 'absolute',left: 0,top: 4,marginLeft: 0},
												dateInput: {margin: 20,height: 40,borderColor: 'orange',borderWidth: 1},
												placeholderText: {color: 'orange'}
												}}
								onDateChange={(date) => {this.setState({dateIn: date})}}
							/>
							<DatePicker
								style={{width: 185}}
								date={this.state.dateFin}
								androidMode = 'spinner'
								mode="date"
								placeholder="Data Fine"
								format="DD-MM-YYYY"
								confirmBtnText="Conferma"
								cancelBtnText="Annulla"
								customStyles={{dateIcon: {position: 'absolute',left: 0,top: 4,marginLeft: 0 },
												dateInput: {margin: 20,height: 40,borderColor: 'orange',borderWidth: 1},
												placeholderText: {color: 'orange'}
												}}
								onDateChange={(date) => {this.setState({dateFin: date})}}
							/>
						</View>		
						<View style = {styles.separator}/>
						<Prezzo action={this.handlerPrezzo}/>
						<TextInput style = {styles.input}
							underlineColorAndroid = "transparent"
							placeholder = "Ospite"
							placeholderTextColor = 'orange'
							autoCapitalize = "none"
							onChangeText = {this.handleospite}/>
						<TextInput style = {styles.input}
							underlineColorAndroid = "transparent"
							placeholder = "Sponsor"
							placeholderTextColor = 'orange'
							autoCapitalize = "none"
							onChangeText = {this.handlesponsor}/>
						<CategoriaEvento action2={this.handlerCat}/>
						<TouchableOpacity
							style = {styles.searchButton}
							onPress = { () => this.ricerca()}>
							<Text style = {styles.searchButtonText}>
								RICERCA
							</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
        flexDirection: 'column',
		backgroundColor: '#FFFFFF',
	},
	input: {
		margin: 7,
		height: 40,
		borderColor: 'orange',
		borderWidth: 1
	},
	searchButton: {
		alignItems: 'center',
		backgroundColor: 'orange',
		padding: 7,
		height: 40,
	},
	searchButtonText:{
		alignItems: 'center',
		justifyContent: 'center',
		color: 'white'
	},
	dateButton: {
		backgroundColor: 'white',
		borderColor: 'orange',
		height: 40,
		borderWidth: 1,
		margin: 7,
		justifyContent: 'space-around',
		width: 120,
		height: 40,
	},
	 text: {
		color: 'orange',
    },
	separator: {
		height: 8,
		backgroundColor: 'white',
		width: '100%',
  },
})

