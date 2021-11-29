import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const firstTask = tasks.length === 0

    const newTask = {
      id: Number(firstTask || tasks.length + 1),
      title: newTaskTitle,
      done: false
    };
    setTasks(oldTasks => [...oldTasks, newTask ])
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => {
      if (task.id !== id) return task

      return {
        ...task,
        done: Boolean(!task.done)
      }
    })

    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    setTasks(oldTasks => oldTasks.filter(task => task.id !== id))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})