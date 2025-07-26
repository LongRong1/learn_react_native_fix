import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import { Button, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,borderColor:"white"}}>
      <Text>Details Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Details')}>
        Go to Details... again
      </TouchableOpacity>
    </View>
  );
}