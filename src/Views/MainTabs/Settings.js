import React, { useState } from 'react'; 
import { 
    StyleSheet, 
    Text,
    TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Settings({ navigation, onClearData }) {
    const logout = () => {
        navigation.navigate('Login');
    }

    const onClearPress = () => {
        onClearData();
        logout();
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