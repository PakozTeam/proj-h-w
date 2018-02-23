import React, { Component } from 'react';
import {Text,View, StyleSheet,TextInput,TouchableOpacity} from 'react-native';
import ModalSelector from 'react-native-modal-selector'

export default class Categoria extends Component {

    constructor(props) {
        super(props);

        this.state = {
            textInputValue: ''
        }
    }

    render() {
        let index = 0;
        const data = [
            { key: index++, label: 'Concerto' },
            { key: index++, label: 'Sagra' },
            { key: index++, label: 'Conferenza' },
            { key: index++, label: 'Teatro' },
            { key: index++, label: 'Discoteca'},
			{ key: index++, label: 'Festival'},
			{ key: index++, label: 'Mostra'},
			{ key: index++, label: 'Workshop'},
			{ key: index++, label: 'Fiera'},
			{ key: index++, label: 'Innaugurazione'},
			{ key: index++, label: 'Sport'},
			{ key: index++, label: 'Lavoro' }
        ];

        return (
            <View style = {styles.container}>
                <ModalSelector
                    style={{width:240}}
					selectTextStyle = {{color:'orange'}}
					sectionTextStyle = {{color:'orange'}}
				    data={data}
                    initValue="Categoria"
                    supportedOrientations={['portrait']}
					cancelText = "Annulla"
                    onChange={(option)=>{this.setState({textInputValue:option.label})}}>
                    <TextInput style = {styles.input}
                        editable={false}
                        placeholder= "Categoria"
						placeholderTextColor = "orange"
                        value={this.state.textInputValue}/>
                </ModalSelector>
				<TouchableOpacity
				    style = {{margin:5}}
					onPress={() => this.props.action2(this.state.textInputValue)}
				>
					<Text style={{margin:9,textAlign: 'right'}} >CONFERMA CATEGORIA</Text>
				</TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
	container: {
        flexDirection: 'row',
		backgroundColor: '#FFFFFF',
		justifyContent: 'center',
	},
	input: {
		margin: 12,
		height: 40,
		borderColor: 'orange',
		borderWidth: 1,
		color:'black',
	}
})