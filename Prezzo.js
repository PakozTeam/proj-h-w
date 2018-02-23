import React , { Component } from 'react';
import {StyleSheet, Text, View, Slider} from 'react-native';

export default class Prezzo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 200,
    };
  }

  change(value) {
    this.setState(() => {
      return {
        value: parseFloat(value),
      };
    });
  }
	
  render() {
    const {value} = this.state;
    return (
      <View style={styles.container}>
		<Text style={styles.text1}>Prezzo Massimo</Text>
        <Text style={styles.text}>{String(value)} €</Text>
        <Slider
		  minimumTrackTintColor= 'orange'
		  thumbTintColor= 'orange'
          step={5}
          maximumValue={200}
		  onSlidingComplete={this.change.bind(this)}
          onValueChange={this.props.action}
          value={value}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
  },
  text1: {
    fontSize: 15,
    textAlign: 'center',
	color: 'orange'
  },
});