import React, { Component } from 'react';
import { 
  AppRegistry,
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity,
  ScrollView
} from 'react-native';

export default class Register extends Component {
    render() {
        const { navigation } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.menu}>  
                    <Text style={styles.header}>REGISTER</Text>
            
                    <View style={styles.block}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput style={styles.textInput} placeholder='test'/>
                    </View>
                    
                    <View style={styles.block}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput style={styles.textInput} placeholder='test@gmail.com' keyboardType='email-address'
                        // value={this.state.regEmail}
                        // onChangeText={(regEmail) => this.setState({ regEmail })}
                        />
                    </View>
            
                    <View style={styles.block}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput style={styles.textInput} placeholder='* * * *' secureTextEntry={true}
                        // value={this.state.regPassword}
                        // onChangeText={(regPassword) => this.setState({ regPassword })}
                        />
                    </View>
            
                    <View style={styles.block}>
                        <Text style={styles.label}>Confirm Password</Text>
                        <TextInput style={styles.textInput} placeholder='* * * *' secureTextEntry={true}
                        // value={this.state.confirmPassword}
                        // onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                        />
                    </View>
                    
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.buttonText}>Create</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f2f5', 
    },

    menu: {
        width: '85%', 
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 25,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },

    header: {
        fontSize: 32,
        fontWeight: '800', 
        color: '#1a1a1a',
        marginBottom: 40,
        textAlign: 'center',
    },

    block: {
        marginBottom: 20,
    },

    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4b5563',
        marginBottom: 8,
    },

    textInput: {
        backgroundColor: '#f9fafb',
        borderWidth: 1,
        borderColor: '#d1d5db', 
        borderRadius: 12, 
        padding: 12,
        fontSize: 16,
        color: '#111827',
    },

    button: {
        width: '100%',
        backgroundColor: '#f6803b', 
        borderRadius: 12,
        padding: 15,
        marginTop: 10,
        alignItems: 'center',

        shadowColor: "#f6803b",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },

    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});