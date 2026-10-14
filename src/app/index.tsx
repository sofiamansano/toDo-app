import { TaskItem } from "@/components/TaskItem";
import { useTasks } from "@/hooks/useTasks";
import { useState } from "react";
import {View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, Keyboard} from "react-native"

export default function HomeScreen(){

    const [taskText, setTaskText] = useState<string>("");

    //Consumindo a lógica centralizada do hook
    const { tasks, addTasks, removeTask, editTask } = useTasks();

    const handleAdd = () => {
        addTasks(taskText);
        setTaskText(""); //Limpa o input visualmente
        Keyboard.dismiss(); //Esconde o teclado
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Minhas Tarefas</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite uma nova tarefa..."
                    value={taskText}
                    onChangeText={setTaskText}
                />
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleAdd}
                >
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <TaskItem
                        task={item}
                        onRemove={removeTask}
                        onEdit={editTask}
                    />
                )}
            
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingTop: 60,
        paddingHorizontal: 20
    },
    title:{
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20
    },
    inputContainer:{
        flexDirection: "row",
        marginBottom: 20,
    },
    input:{
        flex: 1,
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },
    addButton:{
        width: 50,
        height: 50,
        backgroundColor: "#007bff",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10
    },
    addButtonText:{
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
    }
})