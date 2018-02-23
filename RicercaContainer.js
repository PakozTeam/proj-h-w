import React, { Component }  from 'react'
import { ScrollView , Button, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Eventi from './require_json/reqEventi.js'
import Ospiti from './require_json/reqOspiti.js'
import Sponsor from './require_json/reqSponsor.js'
import Luoghi from './require_json/reqLuoghi.js'
import Organizzatori from './require_json/reqOrganizzatori.js'

export default class RicercaContainer extends Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
    drawerLabel: "EVENTI TROVATI",
    title: "EVENTI TROVATI",
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
	// parametri passati dal componente RicercaContainer
    const { params } = this.props.navigation.state;
	const filtri = params ? params.filtri : null;
	// FILTRI SELEZIONATI DALL'UTENTE
	// nome evento
    nEF = filtri.nomeEvento.toLowerCase();
	// nome luogo
	lF = filtri.luogo.toLowerCase();
	// organizzatore
	orF = filtri.organizzatore.toLowerCase();
	//sponsor (lista)
	sF = filtri.sponsor.toLowerCase();
	//ospiti (lista)
	osF = filtri.ospite.toLowerCase();
	// prezzo massimo
	pF = filtri.prezzoMax;
	// categoria
	cF = filtri.categoria;
	// data inizio/fine
	dIF = filtri.dateIn;
	dFF = filtri.dateFin;
	if (dIF !=''){
		dIFarr = dIF.split('-');
		dataInF = new Date(dIFarr[2],dIFarr[1]-1,dIFarr[0]);
		dataInF = dataInF.getTime();
	} else {
		dataInF = 'a';
	}
	if (dFF !=''){
		dFFarr = dFF.split('-');
		dataFinF = new Date(dFFarr[2],dFFarr[1]-1,dFFarr[0]);
		dataFinF =dataFinF.getTime();
	} else {
		dataFinF = 'a';
	}
	
	var EventiSel = [];
		for (i = 0; i < Eventi.length; i++) {
			// nome evento
		    nE = Eventi[i].nomeEvento.toLowerCase();
			// prezzo evento
			p = Eventi[i].prezzo;
			// categoria evento
			c = Eventi[i].categoria;
			// luogo
			IDLUOGO = Eventi[i].idLuogo;
			var indexLUOGO;
			for(var j = 0; j < Luoghi.length; j++) {
				if(Luoghi[j].idLuogo == IDLUOGO) {
					indexLUOGO = j;
				}
			}
			l = Luoghi[indexLUOGO].nomeLuogo.toLowerCase();
			// organizzatore
			IDORG = Eventi[i].idOrg;
			var indexORG;
			for(var j = 0; j < Organizzatori.length; j++) {
				if(Organizzatori[j].idOrg == IDORG) {
					indexORG = j;
				}
			}
			or = Organizzatori[indexORG].nomeOrg.toLowerCase();
			// ospiti (lista)
			IDOS = Eventi[i].idOspiti;
			var indexOS=[];
			for(var k = 0; k < IDOS.length; k++) {
				for(var j = 0; j < Ospiti.length; j++) {
					if(Ospiti[j].idOspite == IDOS[k]) {
						indexOS[k] = j;
					}
				}
			}
			var os = [];
			// verifica ospiti
			IncludeOsp=false;
			if (indexOS.length == 0) {
				IncludeOsp =true;
			} else {
				for (j = 0; j < indexOS.length; j++) {
					y = indexOS[j];
					os.push(Ospiti[y].nomeOspite.toLowerCase());
				}
				
				for (k= 0; k < os.length; k++) {
					if (os[k].includes(osF)) {
						IncludeOsp=true;
					} 
				}
			}
			//sponsor (lista)
			IDSP = Eventi[i].idSponsor;
			var indexSP=[];
			for(var k = 0; k < IDSP.length; k++) {
				for(var j = 0; j < Sponsor.length; j++) {
					if(Sponsor[j].idSponsor == IDSP[k]) {
						indexSP[k] = j;
					}
				}
			}
			var s=[];
			// verifica sponsor
			IncludeSp =false;
			if (indexSP.length == 0) {
				IncludeSp =true;
			} else {
				for (j = 0; j < indexSP.length; j++) {
				y = indexSP[j];
				s.push(Sponsor[y].nomeSponsor.toLowerCase());
				}
				for (k= 0; k < s.length; k++) {
					if (s[k].includes(sF) || (s[k] == '')) {
						IncludeSp=true;
					} 
				}	
			}
			// data
			dI = Eventi[i].dataIn;
			dF = Eventi[i].dataFin;
			dIarr = dI.split('-');
			dataIn = new Date(dIarr[2],dIarr[1]-1,dIarr[0]);
			dataIn = dataIn.getTime();
			dFarr = dF.split('-');
			dataFin = new Date(dFarr[2],dFarr[1]-1,dFarr[0]);
			dataFin =dataFin.getTime();
			// verifica data
			IncludeData= false;
			if (((dataInF == 'a') && (dataFinF == 'a')) || ((dataInF >= dataIn) && (dataFinF <= dataFin)) || ((dataFin >= dataInF) && (dataFinF == 'a')) || ((dataInF == 'a') && (dataIn <= dataFinF) ) || ((dataInF <= dataIn) && (dataFinF >= dataIn)) || ((dataFinF >= dataFin) && (dataInF >= dataIn))){
				IncludeData = true;
			}
			// seleziono elementi che rispettano i filtri impostati
			if ((nE.includes(nEF)) && (l.includes(lF)) && (or.includes(orF)) && (IncludeOsp) && (IncludeSp) && (p<=pF) && (c.includes(cF)) && (IncludeData)) {
				EventiSel.push(Eventi[i].idEvento);
			}
        }
	
	var indexEventiSel=[];
	for(var i = 0; i < EventiSel.length; i++)
	{
		for(var j = 0; j < Eventi.length; j++)
		{
			if(Eventi[j].idEvento == EventiSel[i])
			{
				indexEventiSel[i] = j;
			}
		}
    }
	
    return (
      <ScrollView>
			{
				indexEventiSel.map((ind_vet, key) =>
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
										<Text> Luogo Evento: {Eventi[ind_vet].luogo}</Text>
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
	stretch: {
		width: 120,
		height: 120,
		resizeMode: 'contain',
  },
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
