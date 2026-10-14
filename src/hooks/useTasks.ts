import { Task } from "@/types";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TASKS_KEY = "@task_key";

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);

    const [isInitialLoad, setIsInicialLoad] = useState(true);

    //1. Carregar dados ao iniciar
    useEffect(() => {
        const loadTasks = async () => {
            try{
                const savedTasks = await AsyncStorage.getItem(TASKS_KEY);
                if(savedTasks){
                    setTasks(JSON.parse(savedTasks));
                }
            } catch (error) {
                console.error("Erro ao carregar tarefas:", error);
            } finally {
                setIsInicialLoad(false);
            }
        }
        loadTasks();
    }, []);


    //2. Salvar dados quando houver mudança (ignorando a primeira carga vazia)
    useEffect(() => {
        if (isInitialLoad) return;

        const saveTasks = async () => {
            try{
                await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
            } catch (error) {
                console.error("Erro ao salvar tarefas:", error);
            }
        };

        saveTasks();
    }, [tasks, isInitialLoad]);

    //Função adicionar tarefa
    const addTasks = (text: string) => {
        if (text.trim() === "") return;
        const newTask: Task = {
            id: Date.now().toString(),
            text
        };
        //Atualiza pegando o estado anterior e adicionando a nova tarefa
        setTasks((prevTasks) => [...prevTasks, newTask]);
    }

    //Função remover tarefa
    const removeTask = (id: string) => {
        setTasks((prevTasks) => prevTasks.filter(item => item.id !== id));
    };

    //Função Editar tarefa
    const editTask = (id: string, newText: string) =>{
        if (newText.trim() === "") return;
        setTasks((prevTasks) => 
            prevTasks.map((task) =>
                task.id === id ? {...task, text:newText} : task
            )
        );
    };

    return {
        tasks,
        addTasks,
        removeTask,
        editTask
    }
}