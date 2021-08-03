import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native';
import { StyleSheet,StatusBar,FlatList,TextInput,Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function Posts() {
    useEffect(() => {
        fetchPosts();
    }, [])
    const db = firestore().collection('posts');
    function fetchPosts() {
        db.get().then((ps) => {
            ps.docs.forEach(p => {
                posts.push(p.data())
            })
            console.dir(posts);
        }).then(() => {
            onChangePosts(posts);
        })
    }
    function addPost(title, content){
        db.add({
            title: title,
            content: content
        }).then(() => {
            fetchPosts()
        })
    }

    const [title, onChangeTitle] = React.useState("Title");
    const [content, onChangeContent] = React.useState("Content");
    const [posts, onChangePosts] = React.useState([]);
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginTop: StatusBar.currentHeight || 0,
        },
        item: {
            backgroundColor: '#f9c2ff',
            padding: 20,
            marginVertical: 8,
            marginHorizontal: 16,
        },
        title: {
            fontSize: 32,
        },
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
        }
    });

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
    data={posts}
    renderItem={({ item }) => (
        <View style={styles.item}>
            <Text>Post Title: {item.title}</Text>
            <Text>Post Content: {item.content}</Text>
        </View>
    )}
/>
<TextInput
    style={styles.input}
    onChangeText={onChangeTitle}
    value={title}
/>
<TextInput
    style={styles.input}
    onChangeText={onChangeContent}
    value={content}
/>
<Button
    title="Press me"
    onPress={() => {
        addPost(title, content);
    }}
/>
        </SafeAreaView>
    );
}

