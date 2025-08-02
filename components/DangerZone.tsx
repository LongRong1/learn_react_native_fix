import { View, Text, Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import { createSettingsStyles } from '@/assets/styles/settings.styles';
import useTheme from '@/hooks/useTheme';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const DangerZone = () => {
    const { colors } = useTheme();
    const settingStyles = createSettingsStyles(colors);
    const clearAllTodos = useMutation(api.todos.clearAllTodo);

    const handleResetTodos = async () => {
        Alert.alert(
            "Reset Todos",
            "Are you sure you want to reset all todos? This action cannot be undone.",
            [
                {
                    text: "Cancel",style: "cancel"
                },
                {
                    text: "OK", style:"destructive",onPress: async () => {
                        try {
                            const result = await clearAllTodos();
                            Alert.alert("Success", `All todos have been cleared ${result.deletedCount} todo ${result.deletedCount === 1 ? '' : 's'} deleted.`);
                        } catch (error) {
                            console.error("Error clearing todos:", error);
                            Alert.alert("Error", "Failed to clear todos. Please try again.");
                        }
                    }
                }
            ]
        );
    };
  return (
    <LinearGradient colors={colors.gradients.surface} style={settingStyles.section}>
        <Text style={settingStyles.sectionTitleDanger}>Danger Zone</Text>
        <TouchableOpacity style={[settingStyles.actionButton,{borderBottomWidth:0}]} onPress={handleResetTodos} activeOpacity={0.7}>
            <View style={settingStyles.actionLeft}>
                <LinearGradient colors={colors.gradients.danger} style={settingStyles.actionIcon}>
                    <Ionicons name="trash" size={18} color="#ffffff" />
                </LinearGradient>
                <Text style={settingStyles.actionTextDanger}>Reset App</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </TouchableOpacity>
    </LinearGradient>
  )
}

export default DangerZone