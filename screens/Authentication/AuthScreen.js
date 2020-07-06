import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const AuthScreen = ({ navigation }) => (
    <View style={styles.mainView}>
        <TouchableOpacity onPress={()=>{navigation.navigate("UserLogin")}}>
            <Text style={styles.textBtn}> User Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonView} onPress={()=>{navigation.navigate("UserSignup")}}>
            <Text style={styles.textBtn}> User Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate("DriverLogin")}}>
            <Text style={styles.textBtn}> Driver Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonView} onPress={()=>{navigation.navigate("DriverSignup")}}>
            <Text style={styles.textBtn}> Driver Signup</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    mainView:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonView:{
        paddingBottom: '20%',
    },

    textBtn:{
        fontSize:42,
    }
})

export default AuthScreen;
