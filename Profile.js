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

export default class Profile extends Component {
    render() {
        const { navigation } = this.props;

        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <View style={styles.menu}>
                        <Text style={styles.header}>PROFILE</Text>

                        <View style={styles.block}>
                            <Text style={styles.label}>Username</Text>
                            <TextInput style={styles.textInput} placeholder='username'/>
                        </View>

                        <View style={styles.block}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput style={styles.textInput} placeholder='name@gmail.com' keyboardType='email-address'/>
                        </View>

                        <View style={styles.block}>
                            <Text style={styles.label}>Phone</Text>
                            <TextInput style={styles.textInput} placeholder='+1234567890' keyboardType='phone-pad'/>
                        </View>

                        <View style={styles.block}>
                            <Text style={styles.label}>Date of Birth</Text>
                            <TextInput style={styles.textInput} placeholder='01/01/2026'/>
                        </View>

                        <View style={styles.block}>
                            <Text style={styles.label}>Address</Text>
                            <TextInput style={styles.textInput} placeholder='123 Main St'/>
                        </View>

                        <View style={styles.block}>
                            <Text style={styles.label}>Description</Text>
                            <TextInput 
                                style={styles.textInput} 
                                placeholder='about yourself'
                                multiline={true}
                                numberOfLines={2}
                                />
                        </View>
                    
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.buttonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
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
        textAlignVertical: 'top',
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