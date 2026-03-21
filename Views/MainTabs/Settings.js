import React, { useState } from 'react'; 
import { 
    StyleSheet, 
    Text,
    TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Settings({ navigation }) {
    const logout = () => {
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText} onPress={logout}>Logout</Text>
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
    },

    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
})