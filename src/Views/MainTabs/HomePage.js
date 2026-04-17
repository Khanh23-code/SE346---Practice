import React, { useState, useCallback, useEffect } from 'react'; 
import { 
    StyleSheet, 
    Text, 
    View, 
    FlatList,
    TextInput,
    TouchableOpacity,
    Alert,
    Image,
    ActivityIndicator
} from 'react-native';
import { addPost, getAllPosts, updatePostLove, addComment, getCommentsByPostId } from '../../database';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../../api';

import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const DUMMY_AVATAR = "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-circle-icon.png";

const PostItem = ({ item, currentUser }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showReadMore, setShowReadMore] = useState(false);
    
    // const [isLove, setIsLove] = useState(item.isLove === 1);
    const [isLove, setIsLove] = useState(false);

    const [comments, setComments] = useState([]); 
    const [isShowComments, setIsShowComments] = useState(false);
    const [commentText, setCommentText] = useState(''); 

    useEffect(() => {
        loadComments();
    }, []);

    const loadComments = () => {
        const fetchedComments = getCommentsByPostId(item.id);
        setComments(fetchedComments);
    };

    const handleTextLayout = useCallback((e) => {
        if (e.nativeEvent.lines.length >= 3 && !showReadMore) {
            setShowReadMore(true);
        }
    }, [showReadMore]);

    const handleLovePress = () => {
        setIsLove(!isLove);
        // updatePostLove(item.id, newValue);
    };

    const handleSendComment = () => {
        if (commentText.trim().length === 0) return;

        const newComment = {
            id: Date.now().toString(),
            userName: currentUser?.userName || "Tôi",
            description: commentText,
            date: new Date().toISOString()
        };

        setComments(prevComments => [newComment, ...prevComments]);
        setCommentText('');
        
        // const commenterName = currentUser?.userName || "Unknown"; 
        // const newDate = new Date().getTime();
        
        // const success = addComment(item.id, commenterName, newDate, commentText);
        
        // if (success) {
        //     setCommentText(''); 
        //     loadComments(); 
        // }
    };

    const formattedDate = item.created_at ? new Date(item.created_at).toLocaleDateString() : "Recent";

    return (
        <View style={styles.postContainer}>
            <View style={styles.postHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {/* <Image
                        source={{ uri: item.avatarUrl }}
                        style={styles.postAvatar}
                    /> */}
                    <Image
                        source={{ uri: DUMMY_AVATAR }}
                        style={styles.postAvatar}
                    />
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{item.creator_name || "Unknown"}</Text>
                        <Text style={styles.postDate}>{formattedDate}</Text> 
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
                    onPress={handleLovePress} 
                >
                    {isLove ? (
                        <Entypo name="heart" size={24} color="#ff69b4" />
                    ) : (
                        <Entypo name="heart-outlined" size={24} color="gray" />
                    )}
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={styles.actionButton} 
                    onPress={() => setIsShowComments(!isShowComments)}
                >
                    {isShowComments ? (
                        <FontAwesome name="comment" size={24} color="#7977e2" />
                    ) : (
                        <FontAwesome name="comment-o" size={24} color="gray" />
                    )}
                </TouchableOpacity>
            </View>

            {isShowComments && (
                <View>
                    {comments.length > 0 && (
                        <View style={styles.commentsSection}>
                            {comments.map((cmt) => (
                                <View key={cmt.id} style={styles.commentItem}>
                                    <View style={styles.commentHeader}>
                                        <Text style={styles.commentUserName}>{cmt.userName}</Text>
                                        <Text style={styles.commentDate}>
                                            {new Date(cmt.date).toLocaleString()}
                                        </Text>
                                    </View>
                                    <Text style={styles.commentText}>{cmt.description}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    <View style={styles.commentInputContainer}>
                        <TextInput
                            style={styles.commentInput}
                            placeholder="Write a comment..."
                            value={commentText}
                            onChangeText={setCommentText}
                            autoFocus={true} 
                        />
                        <TouchableOpacity style={styles.sendButton} onPress={handleSendComment}>
                            <Text style={styles.sendButtonText}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

export default function HomePage({ userData }) {
    const [inputText, setInputText] = useState('');
    const [posts, setPosts] = useState([]);

    const [isPosting, setIsPosting] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    
    const loadPosts = async () => {
        setIsFetching(true);
        try {
            const fetchedPosts = await api.getAllPosts();

            if (Array.isArray(fetchedPosts)) {
                setPosts(fetchedPosts);
            }
        } catch (error) {
            Alert.alert("Error", "Failed to fetch posts.");
        } finally {
            setIsFetching(false);
        } 
    };

    useFocusEffect(
        useCallback(() => {
            loadPosts();
        }, [])
    );

    const handlePost = async () => {
        if (inputText.trim().length === 0) {
            Alert.alert("Error", "Post content cannot be empty!");
            return;
        }

        if (!userData || !userData.email) {
            Alert.alert("Error", "User data is missing. Please log in again.");
            return;
        }

        setIsPosting(true);
        try {
            let generatedTitle = inputText.trim();
            if (generatedTitle.length > 20) {
                generatedTitle = generatedTitle.substring(0, 20) + "...";
            }

            await api.createPost(generatedTitle, inputText, userData.email)

            setInputText("");
            loadPosts();
        } catch (error) {
            Alert.alert("Error", "Failed to create post.");
        } finally {
            setIsPosting(false);
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
                    editable={!isPosting}
                />
                <TouchableOpacity 
                    style={[styles.postButton, isPosting && { opacity: 0.7 }]} 
                    onPress={handlePost}
                    disabled={isPosting}
                >
                    {isPosting ? (
                        <ActivityIndicator color="#ffffff" size="small" />
                    ) : (
                        <Text style={styles.postButtonText}>Post</Text>
                    )}
                </TouchableOpacity>
            </View>

            <FlatList
                data={posts}
                refreshing={isFetching}
                onRefresh={loadPosts}
                renderItem={({ item }) => <PostItem item={item} currentUser={userData} />}
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

    commentsSection: {
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 0.5,
        borderTopColor: '#f0f0f0',
    },

    commentItem: {
        backgroundColor: '#f9fafb',
        padding: 10,
        borderRadius: 10,
        marginBottom: 8,
    },

    commentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4, 
    },

    commentUserName: {
        fontWeight: 'bold',
        fontSize: 13,
        color: '#111827',
    },

    commentDate: {
        fontSize: 11,
        color: '#9ca3af',
    },

    commentText: {
        fontSize: 14,
        color: '#4b5563',
    },

    commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },

    commentInput: {
        flex: 1,
        backgroundColor: '#f3f4f6',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginRight: 10,
        fontSize: 14,
    },

    sendButton: {
        backgroundColor: '#7977e2',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
    },

    sendButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});