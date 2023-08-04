import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { RootState } from "../../redux/store";
import { useSelector } from 'react-redux';

const MainUserScreen = () => {
    const userInfo = useSelector((state: RootState) => state.user.userInfo);
    const handleChangeAvatar = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        });
        if (!result.canceled) {
            console.log(result.assets[0].uri);
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.avatarUser}>
                <View>
                    <Image source={{ uri: userInfo?.avatar }} style={styles.avatar} />
                </View>
                <TouchableOpacity onPress={handleChangeAvatar} style={styles.addButton}>
                    <Image source={{ uri: 'https://res.cloudinary.com/da5yv096f/image/upload/v1690993061/output-onlinegiftools_yvvhja.gif' }} style={styles.addIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.invoiceContainer}>
                <Text style={styles.invoiceText}>Bills count: </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarUser: {
        width: 60,
        height: 60,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    addButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'transparent',
        borderRadius: 15,
        padding: 5,
    },
    addIcon: {
        width: 25,
        height: 25,
    },
    invoiceContainer: {
        marginTop: 20,
    },
    invoiceText: {
        fontSize: 18,
    }
});

export default MainUserScreen;
