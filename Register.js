import React, { useState } from 'react'; 
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity,
  Alert 
} from 'react-native';

export default function Register({ navigation, onRegister }) {
    const [userName, setUserName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleCreatePress = () => {
        if (regEmail && regPassword && confirmPassword) {
            if (regPassword !== confirmPassword) {
                Alert.alert("Error", "Passwords do not match!");
                return;
            }

            if (!onRegister({ 
                userName: userName,
                email: regEmail,
                password: regPassword
            })) return;

            Alert.alert("Success", "Account created successfully!");
            navigation.navigate('Login');
        } else {
            Alert.alert("Error", "Please fill in all fields!");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.menu}>  
                <Text style={styles.header}>REGISTER</Text>
        
                <View style={styles.block}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder='test'
                        value={userName}
                        onChangeText={(text) => setUserName(text)}
                    />
                </View>
                
                <View style={styles.block}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder='test@gmail.com' 
                        keyboardType='email-address'
                        value={regEmail}
                        onChangeText={(text) => setRegEmail(text)}
                    />
                </View>
        
                <View style={styles.block}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder='* * * *' 
                        secureTextEntry={true}
                        value={regPassword}
                        onChangeText={(text) => setRegPassword(text)}
                    />
                </View>
        
                <View style={styles.block}>
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder='* * * *' 
                        secureTextEntry={true}
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                    />
                </View>
                
                <TouchableOpacity style={styles.button} onPress={handleCreatePress}>
                    <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>
            </View>
        </View>
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