import React, { useState } from 'react'; 
import { 
    StyleSheet, 
    Text,
    TouchableOpacity,
    Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { clearAllData } from '../../database';

export default function Settings({ navigation, onClearData }) {
    const logout = () => {
        navigation.navigate('Login');
    }

    const onClearPress = () => {
        const isSuccess = clearAllData();

        if (isSuccess) {
            Alert.alert("Succes", "Clear data successfully!");
            logout(); 
        } else {
            Alert.alert("Error", "Clear data fail.");
        }
    }    

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={logout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onClearPress}>
                <Text style={styles.buttonText}>Clear Data</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5', 
        justifyContent: 'center',
        alignItems: 'center'
    },

    button: {
        backgroundColor: '#f6803b',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginVertical: 10,
    },

    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
})