import React, { Component } from "react";
import { AppRegistry, AsyncStorage } from "react-native";

var dati_utente = require("./src/database_json/data_user.json");

import App from "./src/App";

AsyncStorage.setItem('ListaTT', JSON.stringify(dati_utente.ListaTT));

//AsyncStorage.setItem('ListaTT', JSON.stringify(dati_utente.ListaTT));
//AsyncStorage.setItem('Ev_Pref', JSON.stringify(dati_utente.Ev_Pref));
//AsyncStorage.removeItem('ListaTT');
//AsyncStorage.removeItem('Ev_Pref');

AppRegistry.registerComponent("HeyWhere", () => App);
