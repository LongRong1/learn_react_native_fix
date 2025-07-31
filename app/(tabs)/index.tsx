import { View, Text, StyleSheet, TouchableOpacity, StatusBar, FlatList, Alert } from 'react-native'
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

type Todo = Doc<"todos">;

const Index = () => {

  const { toggleDarkMode, colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const todos = useQuery(api.todos.getTodos);

    const toggleTodos = useMutation(api.todos.toggleTodo);

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

  const renderTodoItem = ({ item }: { item: Todo }) => (
    <View style={homeStyles.todoItemWrapper}>
      <LinearGradient
        colors={colors.gradients.surface}
        style={homeStyles.todoItem}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        >
        
      </LinearGradient>
      <TouchableOpacity
      style={homeStyles.checkbox}
      activeOpacity={0.7}
      onPress={() => handleToggleTodo(item._id)}
      ></TouchableOpacity>

      <LinearGradient
        colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted}
        style={[homeStyles.checkboxInner, {borderColor: item.isCompleted ? "transparent" : colors.border}]}
      >
      </LinearGradient>
      {item.isCompleted && <Ionicons name="checkmark" size={18} color="#fff" />}

    </View>
  );

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
        />

        <TouchableOpacity onPress={toggleDarkMode}>
          <Text>toggle the mode </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default Index