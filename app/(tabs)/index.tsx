import { View, Text, StyleSheet, TouchableOpacity, StatusBar, FlatList, Alert, TextInput } from 'react-native'
import useTheme, { ColorScheme } from '@/hooks/useTheme'
import { createHomeStyles } from '@/assets/styles/home.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import {LinearGradient} from 'expo-linear-gradient';
import Header from '@/components/Header';
import TodoInput from '@/components/TodoInput';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import LoadingSpinner from '@/components/LoadingSpiner';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { Ionicons } from '@expo/vector-icons';
import EmptyState from '@/components/EmptySate';
import { useState } from 'react';

type Todo = Doc<"todos">;

export default function Index() {

  const {  colors } = useTheme();

  const [editId, setEditId] = useState<Id<"todos"> | null>(null);
  const [editText, setEditText] = useState<string>('');
  const homeStyles = createHomeStyles(colors);
  const todos = useQuery(api.todos.getTodos);

    const toggleTodos = useMutation(api.todos.toggleTodo);
  const deleteTodos = useMutation(api.todos.deleteTodo);
  const updateTodos = useMutation(api.todos.updateTodo);

  const isLoading = todos === undefined;
  if (isLoading) return <LoadingSpinner />;

  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodos({id});
    } catch (error) {
      console.log("Error toggling todo:", error);
      Alert.alert("Error toggling todo:");
    }
  };

  const handleDeleteTodo = async (id: Id<"todos">) => {
    Alert.alert(
      "Delete Todo",
      "Are you sure you want to delete this todo?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => deleteTodos({ id }),
        },
      ]
    );
  };

  const handleEditTodo = (todo :Todo) => {
    setEditId(todo._id);
    setEditText(todo.text);
  }
  const handleSaveTodo = async () => {
   if(editId) {
      try {
        await updateTodos({ id: editId, text: editText });
        setEditId(null);
        setEditText('');
      } catch (error) {
        console.log("Error updating todo:", error);
        Alert.alert("Error updating todo:");
      }
  }
}
  const handleCancelTodo = async () => {
    try {
      setEditId(null);
      setEditText('');
    } catch (error) {
      console.log("Error cancelling todo edit:", error);
      Alert.alert("Error cancelling todo edit:");
  }
  }

  const renderTodoItem = ({ item }: { item: Todo }) => {
    const isEditing = editId === item._id;
    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={homeStyles.todoItem}
          start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        >
        
      
      <TouchableOpacity
      style={homeStyles.checkbox}
      activeOpacity={0.7}
      onPress={() => handleToggleTodo(item._id)}
      >

      <LinearGradient
        colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted}
        style={[homeStyles.checkboxInner, {borderColor: item.isCompleted ? "transparent" : colors.border}]}
      >
      
      {item.isCompleted && <Ionicons name="checkmark" size={18} color="#fff" />}
      </LinearGradient>
      </TouchableOpacity>

      {isEditing ? (
        <View style={homeStyles.todoTextContainer}>
          <TextInput
            style={homeStyles.editInput}
            value={editText}
            onChangeText={setEditText}
            placeholder="Edit your todo"
            autoFocus
            multiline
            placeholderTextColor={colors.textMuted}
          />

          <View style={homeStyles.editButton}> 
            <TouchableOpacity onPress={handleSaveTodo} activeOpacity={0.8}>
              <LinearGradient colors={colors.gradients.success} style={homeStyles.editButton}>
                <Ionicons name='checkmark' size={14} color="#fff" />
                <Text style={homeStyles.editButtonText}>Save</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCancelTodo} activeOpacity={0.8}>
              <LinearGradient colors={colors.gradients.muted} style={homeStyles.editButton}>
                <Ionicons name='close' size={14} color="#fff" />
                <Text style={homeStyles.editButtonText}>Cancel</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View> 
      ): (
        <View style={homeStyles.todoTextContainer}>
        <Text style={[homeStyles.todoText, item.isCompleted && { textDecorationLine: "line-through" ,color: colors.textMuted,opacity: 0.6 }]}>
          {item.text}
        </Text>

        <View style={homeStyles.todoActions}>
          <TouchableOpacity onPress={() => {handleEditTodo(item)}} activeOpacity={0.8}>
            <LinearGradient colors={colors.gradients.warning} style={homeStyles.actionButton}>
            <Ionicons name='pencil' size={14} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleDeleteTodo(item._id)} activeOpacity={0.8}>
            <LinearGradient colors={colors.gradients.danger} style={homeStyles.actionButton}>
            <Ionicons name='trash' size={14} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      )}
      </LinearGradient>
    </View>
  );
  };
  return (

    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <StatusBar barStyle={colors.statusBarStyle}></StatusBar>
      <SafeAreaView style={homeStyles.safeArea}>
        <Header/>
        <TodoInput/>

        <FlatList
          data={todos}
          keyExtractor={(item) => item._id}
          renderItem={renderTodoItem}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
          ListEmptyComponent={<EmptyState />}
        />

      </SafeAreaView>
    </LinearGradient>
  );
};
