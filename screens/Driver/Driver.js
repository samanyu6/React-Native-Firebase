import React, { useEffect } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';

function Driver(navigation){

    const [users, getUsers] = useState([]);
    const [driver, getDriver] = useState(null);

    useEffect(()=>{

        (async ()=>{
            var driv = await AsyncStorage.getItem('@storage_auth_key');
            getDriver(driv);

            await firestore().collection('requests')
                    .where('driver', '==', driver.toString())
                    .then((query)=> {
                        getUsers(query["_docs"]);
                        console.log(query["_docs"]);
                    });

        })()
    },[])

    function Item({ title }) {
        return (
          <View style={styles.item}>
            <TouchableOpacity>
                <Text style={styles.title}>{"User "+title["uid"]}</Text>
            </TouchableOpacity>
          </View>
        );
      }

    if(users==[]){
        return(
            <View>
                <Text>Loading....</Text>
            </View>
        )
    }
    else{
        return (
            <FlatList
                data={users}
                renderItem={({ item }) => <Item title={item["_data"]} />}
                keyExtractor={item => item.id}
            />
        )
    }
    
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

export default Driver;
