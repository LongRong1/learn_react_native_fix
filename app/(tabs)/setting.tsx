import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import useTheme from '@/hooks/useTheme';
import { createSettingsStyles } from '@/assets/styles/settings.styles';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ProgressState from '@/components/ProgressState';

const SettingScreen = () => {

  const [isAutoSync, setIsAutoSync] = useState(true);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  const {colors, isDarkMode, toggleDarkMode} = useTheme();
  const settingStyles = createSettingsStyles(colors);

  return (
    <LinearGradient colors={colors.gradients.background} style={settingStyles.container}>
      <SafeAreaView style={settingStyles.safeArea}>
        <View style={settingStyles.header}>
          <View style={settingStyles.titleContainer}>
            <LinearGradient colors={colors.gradients.primary} style={settingStyles.iconContainer}>
              <Ionicons name="settings" size={28} color={colors.text} />
            </LinearGradient>
          </View>
        </View>

        <ScrollView style={settingStyles.scrollView} 
          contentContainerStyle={settingStyles.content}
          showsVerticalScrollIndicator={false}>

          <ProgressState/>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default SettingScreen