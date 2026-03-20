import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity,
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login({ navigation, userList }) {
    const [logEmail, setLogEmail] = useState('');
    const [logPassword, setLogPassword] = useState('');

    const handleLoginPress = () => {
        if (logEmail && logPassword) {
            const user = userList.find(u => u.email === logEmail);

            if (user) {
                console.log(user.email + " - " + user.password);

                if (logPassword === user.password) {
                    Alert.alert("Success", "Login successful!");
                    navigation.navigate('Profile', { userData: user });
                } else {
                    Alert.alert("Error", "Invalid email or password!");
                }
            } else {
                Alert.alert("Error", "User does not exist!");
            }
        } else {
            Alert.alert("Error", "Please fill in all fields!");
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
                        value={logEmail}
                        onChangeText={(text) => setLogEmail(text)}
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
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.forgotPass}>
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
                    <Text style={styles.buttonText}>Sign in</Text>
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

    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});