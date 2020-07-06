import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

function UserScreen(){

   const [drivers, getDrivers] = useState([]);
   const [user, getUser] = useState(null);
   useEffect(()=>{
    (async()=>{
        await firestore().collection('users')
                    .where('user','==',false)
                    .get()
                    .then(query=>{ getDrivers(query["_docs"]); console.log(query["_docs"])});

        var data = await AsyncStorage.getItem('@storage_auth_key');
        getUser(data);
    })()
   },[]);

   async function bookDriver(driver){
        try{
            await firestore().collection('requests').add({
                driver:driver,
                user:user
            }).then((x)=>{
                Alert.alert(
                    "Success!",
                    x.toString(),
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
            });
        }
        catch(e){
            Alert.alert(
                "Error Processing request",
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
        }
   }

   function Item({ title }) {
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={()=> bookDriver(title["uid"])}>
            <Text style={styles.title}>{"Driver "+title["uid"]}</Text>
        </TouchableOpacity>
      </View>
    );
  }

    if(drivers==[]){
        return(
            <View>
                <Text>Loading....</Text>
            </View>
        )
    }
    else{
        return(
        <View>
            <FlatList
                data={drivers}
                renderItem={({ item }) => <Item title={item["_data"]} />}
                keyExtractor={item => item.id}
            />
        </View>
    )}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      borderWidth: 0.2,
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });
  

export default UserScreen;
