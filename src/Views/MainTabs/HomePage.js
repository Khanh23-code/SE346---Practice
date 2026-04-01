import React, { useState, useCallback, useEffect } from 'react'; 
import { 
    StyleSheet, 
    Text, 
    View, 
    FlatList,
    TextInput,
    TouchableOpacity,
    Alert,
    Image
} from 'react-native';
import { addPost, getAllPosts, DEFAULT_AVATAR } from '../../database';

import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';


const PostItem = ({ item }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showReadMore, setShowReadMore] = useState(false);
    const [isLove, setIsLove] = useState(false);

    const handleTextLayout = useCallback((e) => {
        if (e.nativeEvent.lines.length >= 3 && !showReadMore) {
            setShowReadMore(true);
        }
    }, [showReadMore]);

    return (
        <View style={styles.postContainer}>
            <View style={styles.postHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={{ uri: item.avatarUrl }}
                        style={styles.postAvatar}
                    />
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{item.userName}</Text>
                        <Text style={styles.postDate}>{new Date(item.date).toLocaleDateString()}</Text> 
                    </View>
                </View>
                <Feather name="more-horizontal" size={24} color="gray" />
            </View>

            <View style={styles.postContent}>
                <Text 
                    style={styles.description} 
                    numberOfLines={isExpanded ? undefined : 3}
                    onTextLayout={handleTextLayout}>
                    {item.description}
                </Text>
                
                {showReadMore && (
                    <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                        <Text style={styles.seeMore}>
                            {isExpanded ? "Show less" : "Read more"}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.postActions}>
                <TouchableOpacity 
                    style={styles.actionButton} 
                    onPress={() => setIsLove(!isLove)} 
                >
                    {isLove ? (
                        <Entypo name="heart" size={24} color="#ff69b4" />
                    ) : (
                        <Entypo name="heart-outlined" size={24} color="gray" />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default function HomePage({ navigation, route, userPostList, userData, onAddPost }) {
    const [inputText, setInputText] = useState('');
    const [posts, setPosts] = useState([]);
    
    const loadPosts = () => {
        const fetchedPosts = getAllPosts();
        setPosts(fetchedPosts);
    };

    useEffect(() => {
        loadPosts();
    }, []);

    const handlePost = () => {
        if (inputText.trim().length === 0) {
            Alert.alert("Alert", "The description cannot be empty!");
            return;
        }

        const newDate = new Date().getTime();

        if (userData && userData.email) {
            addPost(userData.email, newDate, inputText);
            
            setInputText('');
            loadPosts();
        } 
        else {
            Alert.alert("Error", "User session expired. Please login again.");
        }
    };

    return (
        <View style={styles.container}>
            
            <View style={styles.inputSection}>
                <TextInput
                    style={styles.input}
                    placeholder="What are you today?"
                    value={inputText}
                    onChangeText={setInputText}
                    multiline
                />
                <TouchableOpacity style={styles.postButton} onPress={handlePost}>
                    <Text style={styles.postButtonText}>Post</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={posts}
                renderItem={({ item }) => <PostItem item={item} />}
                keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5', 
    },

    inputSection: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        alignItems: 'center',
        marginBottom: 10, 
    },

    input: {
        flex: 1,
        backgroundColor: '#f9fafb',
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
        maxHeight: 100,
    },

    postButton: {
        backgroundColor: '#f6803b',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },

    postButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },

    postContainer: {
        width: '92%', 
        alignSelf: 'center', 
        backgroundColor: '#ffffff',
        marginBottom: 15,
        padding: 15,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        borderBottomWidth: 0.5,
        borderBottomColor: '#f0f0f0',
        paddingBottom: 8,
    },

    postAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12, 
        backgroundColor: '#e0e0e0',
    },

    userInfo: {
        flexDirection: 'column',
        justifyContent: 'center',
    },

    userName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#f6803b',
    },

    postDate: {
        fontSize: 12,
        color: '#9ca3af',
    },

    postContent: {
        marginTop: 5,
    },
    
    description: {
        fontSize: 15,
        color: '#4b5563',
        lineHeight: 22,
    },

    seeMore: {
        color: '#c5c5c5',
        fontWeight: '600',
        marginTop: 5,
    },

    postActions: {
        flexDirection: 'row',
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 0.5,
        borderTopColor: '#f0f0f0', 
    },

    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 15, 
    },
});