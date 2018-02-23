import React, { Component } from "react";
import { StackNavigator, DrawerNavigator,TabNavigator } from "react-navigation";
import DrawerMenu from './DrawerMenu';
import TopTenContainer from './TopTenContainer';
import RicercaContainer from './RicercaContainer';
import EventoHomeContainer from './EventoHomeContainer.js';
import LuogoContainer from './LuogoContainer.js';
import OspiteContainer from './OspiteContainer.js';
import OrganizzatoreContainer from './OrganizzatoreContainer.js';
import SponsorContainer from './SponsorContainer.js';
import FiltriContainer from './FiltriContainer.js';
import ProgrammaContainer from './ProgrammaContainer.js';
import AttivitaContainer from './AttivitaContainer.js';
import EvPreferitiContainer from './EvPreferitiContainer.js';


const Tab = TabNavigator({
  Home: { screen: EventoHomeContainer},
  Luogo: { screen: LuogoContainer},
  Organizzatore: { screen: OrganizzatoreContainer},
  Programma: { screen: ProgrammaContainer},
  Ospiti: { screen: OspiteContainer},
  Sponsor: { screen: SponsorContainer},
	},
	{
		tabBarPosition: 'bottom',
		tabBarOptions: {
			activeTintColor: 'black',
			inactiveTintColor: 'white',
			style: { backgroundColor: 'orange'},
			labelStyle: { fontSize: 12},
			scrollEnabled: true,
			tabStyle: {width: 90},
	},
	style: {
    backgroundColor: 'orange',
	}
	}
);


const MainScreenNavigator = StackNavigator(
	{
	  TopTen: { screen: TopTenContainer },
	  Ricerca: { screen: RicercaContainer },
	  TabEv: {screen: Tab},
	  EvPreferiti: { screen: EvPreferitiContainer },
	  Filtri: {screen: FiltriContainer},
	  Attivita: {screen: AttivitaContainer}
    },
	{
    navigationOptions: {headerTintColor: 'white'},
  }
);

const Drawer = DrawerNavigator(
  {
    Main: { screen: MainScreenNavigator }
  },
  {
    contentComponent: DrawerMenu,
	drawerPosition: 'right',
    drawerWidth: 200,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggle: 'DrawerToggle',
  }
);


export default Drawer;
