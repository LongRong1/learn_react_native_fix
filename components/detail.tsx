import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Button, FlatList, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface typesList{
    id:number;
    name:string;
}

export default function DetailsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [list, useList] = useState<typesList[]>([
    {id:1, name:'Long Ne'},
    {id:2, name:'Hai Vu'},
    {id:3, name:'Duc Trong'},
    
  ]);

  return (
    <View style={{ flex: 0, alignItems: 'center', justifyContent: 'center' }}>
      
        <FlatList
            data={list}
            keyExtractor={(item) => item.id+""}
            renderItem={({ item }) => (
            <View>
                <Text style={styles.textList}>{item.name}</Text>
            </View>
            )}
        />

        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={{color:"white",borderColor:"yellow",borderBottomWidth:1}}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
    padding: 20,
  },
  textList: {
    color:"white",
    borderColor:"yellow",
    borderBottomWidth:1,
    fontSize:20,
    margin:20
  },
});