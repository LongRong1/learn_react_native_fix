import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native'
import useTheme, { ColorScheme } from '@/hooks/useTheme'
import { createHomeStyles } from '@/assets/styles/home.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import {LinearGradient} from 'expo-linear-gradient';
import Header from '@/components/Header';
import TodoInput from '@/components/TodoInput';

const Index = () => {

  const { toggleDarkMode, colors } = useTheme();
  const homeStyles = createHomeStyles(colors);

  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <StatusBar barStyle={colors.statusBarStyle}></StatusBar>
      <SafeAreaView style={homeStyles.safeArea}>
        <Header/>

        <TodoInput/>
        <TouchableOpacity onPress={toggleDarkMode}>
          <Text>toggle the mode </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default Index