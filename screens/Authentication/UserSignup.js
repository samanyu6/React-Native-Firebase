import React, {useState, useEffect, useCallback} from 'react';
import { View, SafeAreaView, Text, Button, StyleSheet, Keyboard, Alert} from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';

function UserSignup({navigation}){

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [loading, setLoad] = useState(false);
    const ref = firestore().collection('users')

    async function Validate(email,password){
        setLoad(true);
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var em = re.test(String(email).toLowerCase());
        var ps = (password.length>=4)?true:false;
        if(!em && !ps){
            
            setLoad(false)
        }
        else if(!em){
            Alert.alert(
                "Invalid Email",
                "Enter a valid email",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: true }
              );
             setLoad(false)
        }
        else if(!ps){
            Alert.alert(
                "Invalid Password",
                "Enter a password greater than 4 characters",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: true }
              );
            setLoad(false)
        }
        else if(em && ps)
        {
                try{
                     var res = await auth().createUserWithEmailAndPassword(user,pass); 
                     setLoad(false);
                     await ref.add({
                         uid: res["user"]["uid"],
                         user: true
                     })
                     try{
                            await AsyncStorage.setItem('@storage_auth_key', res["user"]["uid"]);
                            await AsyncStorage.setItem('@type', "true");
                            // navigation.navigate('Home')
                            navigation.reset({
                                index: 0,
                                routes: [{
                                    name: "User"
                                }]
                            })

                     }
                     catch(e){
                        console.log(e);
                     }
                     
                }
                catch(e){
                    Alert.alert(
                        "Error Registering",
                        e.toString(),
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          },
                          { text: "OK", onPress: () => console.log("OK Pressed") }
                        ],
                        { cancelable: true }
                      );
                    setLoad(false)
                }
            }
        }

    return(
        <View style={styles.mainView}>
            <SafeAreaView>
                <Text style={styles.header}>
                    User Signup
                </Text>
                <View style={styles.body}>
                    <TextInput
                        placeholder="Enter Email ID"
                        keyboardType="email-address"
                        autoCapitalize = "none"
                        onChangeText = {(text)=>setUser(text)}
                        value = {user}
                        autoCompleteType = 'email'
                        style = {styles.textStyleEmail}
                        placeholderTextColor= "grey"
                    />
                    <TextInput
                        placeholder="Enter Password"
                        secureTextEntry = {true}
                        onChangeText = {(text)=>setPass(text)}
                        value = {pass}
                        autoCompleteType = 'password'
                        style = {styles.textStylePass}
                        placeholderTextColor="grey"
                    />
                    <Button
                        title= "Signup"
                        style = {{
                            width: '80%',
                        }}
                        onPress={()=> {
                            Keyboard.dismiss();
                            Validate(user,pass);
                        }}
                    />
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainView:{
        height: '100%',
        backgroundColor: 'white',
    },

    header:{
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'left',
        padding: '5%',
    },

    body:{
        padding: '10%',
        height: '80%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    textStyleEmail:{
        borderWidth: 0.2,
        borderColor: 'black',
        margin: 5,
        padding: 15,
        fontSize: 18,
        borderRadius: 5,
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold',
        elevation: 1,
        margin: '5%',
        color: 'black',
    },

    textStylePass:{
        borderWidth: 0.2,
        borderColor: 'black',
        margin: 5,
        padding: 15,
        fontSize: 18,
        borderRadius: 5,
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold',
        elevation: 1,
        margin: '5%',
        marginBottom: '10%' ,
        color: 'black'
    },

    verticalOffset: 50
})

export default UserSignup;
