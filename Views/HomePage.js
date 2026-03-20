import React, { useState } from 'react'; 
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList
} from 'react-native';

import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function HomePage({ navigation, route, userList }) {
    const userData = route.params.userData || {};

    const [posts, setPosts] = useState([
    { 
        id: 1, 
        userName: userData.userName,
        date: new Date().toLocaleDateString(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    { 
        id: 2, 
        userName: userData.userName,
        date: new Date().toLocaleDateString(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula sem eu turpis egestas mollis. Vestibulum justo libero, rhoncus laoreet rutrum sed, vehicula eu arcu. Maecenas a commodo sapien. Etiam rhoncus ornare tortor. Maecenas a nisl at lorem feugiat tincidunt nec a tellus. Integer dignissim neque sed ex accumsan, eget congue orci scelerisque. Quisque nec ullamcorper urna. Nullam eget nisl in lectus facilisis gravida id at diam. Fusce molestie est vel sollicitudin interdum. Vestibulum ipsum odio, placerat at erat consectetur, pulvinar tincidunt lacus."
    },
    { 
        id: 3, 
        userName: userData.userName,
        date: new Date().toLocaleDateString(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam suscipit risus sapien, vitae laoreet metus auctor ut. Quisque nisi ex, aliquet non massa sit amet, bibendum pellentesque augue. Proin facilisis iaculis sapien. Fusce quis tincidunt magna. Curabitur quis facilisis magna. Ut vitae viverra orci, vitae rhoncus massa. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam eget leo turpis. Nam lectus ex, malesuada sit amet sem at, tempus ullamcorper orci. Nunc sit amet erat in ante luctus imperdiet. Praesent vehicula lectus ut mi vulputate commodo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque eu justo viverra, cursus velit quis, vestibulum turpis."
    },
    { 
        id: 4, 
        userName: userData.userName,
        date: new Date().toLocaleDateString(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat dignissim felis. Suspendisse laoreet nulla sed neque varius, non rutrum elit tempus. Integer commodo massa et vestibulum tempus. Pellentesque quis congue nibh. Phasellus non suscipit nulla, in lobortis enim. Curabitur nec volutpat nunc. Nunc lacinia tincidunt ligula non dapibus. Etiam vitae nisl purus. Mauris cursus, ante feugiat sollicitudin aliquet, turpis velit efficitur orci, sit amet cursus sapien mauris ultrices urna. Etiam blandit rutrum justo sit amet aliquet. Suspendisse lobortis velit auctor, aliquet massa non, bibendum nisi. Duis et semper nisl. Sed suscipit condimentum ornare. Cras interdum, massa a consectetur eleifend, sem neque pharetra lorem, at fermentum tortor mauris quis magna. Nam id nisl libero. Mauris pellentesque, massa posuere semper rhoncus, orci nibh gravida dolor, id facilisis justo augue vel dui."
    },
    { 
        id: 5, 
        userName: userData.userName,
        date: new Date().toLocaleDateString(),
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare augue malesuada, iaculis nisl ut, tempor ipsum. Donec molestie, mi vitae ultricies bibendum, velit ipsum finibus erat, eget fringilla urna quam nec nisi. Sed suscipit tempus accumsan. Sed quis porta est. Morbi luctus nisi eget ante faucibus dapibus. Donec tincidunt nisi sapien, non euismod libero congue non. In dapibus mi nec vulputate auctor. Proin id metus et quam malesuada tristique sit amet nec justo. Donec felis dolor, suscipit et leo imperdiet, cursus vestibulum nunc. Quisque finibus nibh sed semper fermentum. Aenean non tellus ut velit commodo efficitur vitae sit amet odio. Duis hendrerit non odio et malesuada."
    },
    ]);

    const renderPost = ({ item }) => (
        <View style={styles.postContainer}>
            <View style={styles.postHeader}>
                <Text style={styles.userName}>{item.userName}</Text>
                <Text style={styles.postDate}>March 20, 2026</Text> 
            </View>

            <View style={styles.postContent}>
                <Text style={styles.description} numberOfLines={3}>
                    {item.description || "No description provided yet."}
                </Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
        <FlatList
            data={posts}
            renderItem={renderPost}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
        />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f2f5', 
    },

    postContainer: {
        width: '300',

        backgroundColor: '#ffffff',
        marginHorizontal: 15,
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
});