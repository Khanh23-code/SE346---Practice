import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';

export default function Profile({ navigation, route, onUpdate, userData }) {
    const [info, setInfo] = useState(userData || {});
    const [address, setAddress] = useState(userData?.address || '');
    const [avatarUrl, setAvatarUrl] = useState(userData?.avatarUrl || '');
    const [description, setDescription] = useState(userData?.description || '');
    
    const updateData = () => {
        onUpdate({
            userName: info.userName || '',
            email: info.email || '',
            password: info.password || '',
            address: address,
            avatarUrl: avatarUrl,
            description: description
        });
    }

    useEffect(() => {
        if (userData && userData.userName) {
            setInfo(userData);
            setAddress(userData.address || '');
            setAvatarUrl(userData.avatarUrl || '');
            setDescription(userData.description || '');
        }
    }, [userData]);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <View style={styles.menu}>
                    <View style={styles.horizontalBox}>
                        <Text style={styles.header}>{info.userName}!</Text>
                        { avatarUrl ? (
                            <Image source={{ uri: avatarUrl }} style={styles.avatar} />
                        ) : (
                            <Image source={{ uri: 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-circle-icon.png' }} style={styles.avatar} />
                        )}
                    </View>

                    <View style={styles.block}>
                        <Text style={styles.label}>Username</Text>
                        <TextInput 
                            style={[styles.textInput, styles.none_editable]} 
                            placeholder='username'
                            value={info.userName}
                            editable={false}/>
                    </View>

                    <View style={styles.block}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput 
                            style={[styles.textInput, styles.none_editable]} 
                            placeholder='name@gmail.com' 
                            keyboardType='email-address'
                            value={info.email}
                            editable={false}
                        />
                    </View>

                    <View style={styles.block}>
                        <Text style={styles.label}>Address</Text>
                        <TextInput 
                            style={styles.textInput} 
                            placeholder='123 Main St'
                            value={address}
                            onChangeText={(text) => setAddress(text)}/>
                    </View>

                    <View style={styles.block}>
                        <Text style={styles.label}>Avatar URL</Text>
                        <TextInput style={styles.textInput} placeholder='http://xxxx.xxx.xxxx'
                        value={avatarUrl}
                        onChangeText={(text) => setAvatarUrl(text)}/>
                    </View>

                    <View style={styles.block}>
                        <Text style={styles.label}>Description</Text>
                        <TextInput 
                            style={styles.textInput} 
                            placeholder='about yourself'
                            multiline={true}
                            value={description}
                            onChangeText={(text) => setDescription(text)}
                        />
                    </View>
                
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={updateData}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f2f5', 
    },

    horizontalBox: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
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
        fontSize: 40,
        fontWeight: '800', 
        color: '#1a1a1a',
        marginBottom: 10,
        textAlign: 'center',
    },

    avatar: {
        width: 75,
        height: 75,
        borderRadius: 10,
        resizeMode: 'cover',
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
    },

    none_editable: {
        backgroundColor: '#e0e0e0'
    },  
});