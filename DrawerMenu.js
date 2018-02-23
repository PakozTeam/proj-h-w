import React, { Component } from "react";
import {StyleSheet,Text,TouchableOpacity,View} from "react-native";
import { NavigationActions } from "react-navigation";

class DrawerMenu extends Component {
  _navigate(route) {
    return this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: `${route}` })]
      })
    );
  }
  
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() =>
            this._navigate("TopTen", { isStatusBarHidden: false })}
        >
          <Text style={styles.menuItemText}>Top Ten</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => this._navigate("Filtri", { isStatusBarHidden: false })}
        >
          <Text style={styles.menuItemText}>Ricerca</Text>
        </TouchableOpacity>
		<TouchableOpacity
          style={styles.menuItem}
          onPress={() => this._navigate("EvPreferiti", { isStatusBarHidden: false })}
        >
          <Text style={styles.menuItemText}>Preferiti</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100
  },
  menuItem: {
    padding: 10,
    justifyContent: "center",
    backgroundColor: "orange",
    marginBottom: 2
  },
  menuItemText: {
    fontSize: 20,
	color: 'white',
  }
});

DrawerMenu.defaultProps = {};

DrawerMenu.propTypes = {};

export default DrawerMenu;
