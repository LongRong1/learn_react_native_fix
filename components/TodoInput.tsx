import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import useTheme from '@/hooks/useTheme';
import { createHomeStyles } from '@/assets/styles/home.styles';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

const TodoInput = () => {
    const{ colors } = useTheme();
    const homeStyles = createHomeStyles(colors);
    const [newTodo, setNewTodo] = useState('');
    const addTodo = useMutation(api.todos.addTodos);

    const handleAddTodo = async () => {
    };
    return (
    <View style={homeStyles.inputSection}>
        <View style={homeStyles.inputWrapper}>
            <TextInput
                style={homeStyles.input}
                value={newTodo}
                onChangeText={setNewTodo}
                placeholder="Add a new todo"
                placeholderTextColor={colors.textMuted}
                onSubmitEditing={handleAddTodo}
                multiline
            />
            <TouchableOpacity onPress={handleAddTodo}>
                <Text style={homeStyles.addButton}>Add</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default TodoInput