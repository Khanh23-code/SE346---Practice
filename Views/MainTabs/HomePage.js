import React, { useState } from 'react'; 
import { 
    StyleSheet, 
    Text, 
    View, 
    FlatList,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';

const PostItem = ({ item }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <View style={styles.postContainer}>
            <View style={styles.postHeader}>
                <Text style={styles.userName}>{item.userName}</Text>
                <Text style={styles.postDate}>{item.date}</Text> 
            </View>

            <View style={styles.postContent}>
                <Text style={styles.description} numberOfLines={isExpanded ? undefined : 3}>
                    {item.description || "No description provided yet."}
                </Text>
                
                {/* Nút Xem thêm */}
                {item.description && item.description.length > 100 && (
                    <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                        <Text style={styles.seeMore}>
                            {isExpanded ? "Show less" : "Read more..."}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default function HomePage({ navigation, route, userList, userData }) {
    const [inputText, setInputText] = useState('');

    const [posts, setPosts] = useState([
        { 
            id: 0, 
            userName: userData?.userName || "Admin",
            date: new Date().toLocaleDateString(),
            description: "Chào mừng bạn đến với ứng dụng! Đây là bài viết mẫu đầu tiên."
        },
    ]);

    const handlePost = () => {
        if (inputText.trim().length === 0) {
            Alert("Thông báo", "Vui lòng nhập nội dung!");
            return;
        }

        const newPost = {
            id: Math.random().toString(36).substring(7),
            userName: userData?.userName || "User",
            date: new Date().toLocaleDateString(),
            description: inputText
        };

        setPosts([newPost, ...posts]);
        
        setInputText('');
    };

    return (
        <View style={styles.container}>
            
            <View style={styles.inputSection}>
                <TextInput
                    style={styles.input}
                    placeholder="Bạn đang nghĩ gì?"
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
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }} // Căn chỉnh lại padding
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
        color: '#f6803b',
        fontWeight: '600',
        marginTop: 5,
    }
});