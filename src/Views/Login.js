import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUserByEmail } from '../database';
import { api } from '../api';

export default function Login({ navigation }) {
    const [logEmail, setLogEmail] = useState('');
    const [logPassword, setLogPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const handleLoginPress = async () => {
        if (!logEmail || !logPassword) {
            Alert.alert("Error", "Please fill in all fields!");
            return;
        }

        setIsLoading(true);
        try {
            const loginResponse = await api.login(logEmail, logPassword);

            const userData = {
                email: logEmail,
                name: loginResponse.name
            }

            navigation.navigate('MainTabs', { userData: userData });
        } catch (error) {
            Alert.alert("Error", "Invalid email or password!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.menu}>  
                <Text style={styles.header}>LOGIN</Text>

                <View style={styles.block}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder='test@gmail.com' 
                        keyboardType='email-address'
                        autoCapitalize="none"
                        value={logEmail}
                        onChangeText={(text) => setLogEmail(text)}
                        editable={!isLoading}
                    />
                </View>
                
                <View style={styles.block}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder='****' 
                        secureTextEntry={true}
                        value={logPassword}
                        onChangeText={(text) => setLogPassword(text)}
                        editable={!isLoading}
                    />
                    <View style={styles.linkSection}>
                        <TouchableOpacity 
                            style={styles.registerButton} 
                            onPress={() => navigation.navigate('Register')}
                            disabled={isLoading}
                        >
                            <Text style={styles.linkText}>
                                Register
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.forgotButton} 
                            onPress={() => navigation.navigate('Register')}
                            disabled={isLoading}
                        >
                            <Text style={styles.linkText}>
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={handleLoginPress} 
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#ffffff" />
                    ) : (
                        <Text style={styles.buttonText}>Sign in</Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

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

        shadowColor: '#f6803b',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },

    linkSection: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },

    linkText: {
        color: '#f6803b',
        fontWeight: '600',
    },

    registerButton: {
        paddingVertical: 5,
        marginTop: 5,
    },

    forgotButton: {
        paddingVertical: 5, 
        marginTop: 5,
    },
});