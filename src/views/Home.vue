<script setup>
import {ref, onMounted, computed, watch} from 'vue'


import { RouterLink } from 'vue-router';

const todos = ref([])
const name = ref('')

const input_content = ref('')
const input_category = ref(null)

const todos_asc = computed(() => todos.value.sort((a, b) => {
  return b.createdAt - a.createdAt

}))

const addTodo = () => {
  if (input_content.value.trim() === '' || input_category.value === null) {
    return
  }
 
  todos.value.push({
    content: input_content.value,
    category: input_category.value,
    done: false,
    createdAt: new Date().getTime()

  })
  input_content.value = ''
  input_category.value = null
}

const removeTodo = todo => {
  todos.value = todos.value.filter(t => t !== todo)
}
watch(todos, newVal => {
  localStorage.setItem('todos', JSON.stringify(newVal))
}, {deep: true})

watch(name, (newVal) => {
  localStorage.setItem('name', newVal)
})

onMounted(() => {
  name.value = localStorage.getItem('name') || ''
  todos.value = JSON.parse(localStorage.getItem('todos')) || []

})
</script>

<template>

   <RouterLink active-class="active" to="/about">about</RouterLink>
   <RouterView /> 

  <main class="app">
    <section class="greeting">
      <h2 class="titleh">
        What's up,  
        <br> <input class="myname" type="text" placeholder="Name here" 
        v-model= "name" />
      </h2>
    </section>

    <section class="create-todo">
      <h3 class="titleh">CREATE A TODO</h3>

      <form @submit.prevent= "addTodo">
        <h4 class="title">What's on your todo list?</h4>
        <input class="input"
            type="text" 
            placeholder="e.g.make a video"
            v-model="input_content" />

        <h4 class="title">Pick a category</h4>

        <div class="options">
        
          <label>
            <input type="radio" 
            name="category"
            id="category1"
            value="business"
            v-model="input_category" />
          <span claas= "bubble business"></span>
          <div class="title">Business</div>
          </label>

           <label>
            <input type="radio" 
            name="category"
            id="category1"
            value="business"
            v-model="input_category" />
          <span claas= "bubble personal"></span>
          <div class="title">Personal</div>
          </label>

        </div>
    <br>
        <input class="addtodo" type="submit" value="Add todo" />
      </form>
    </section>

    <section class="todo-list">
      <h3 class="titleh">TODO LIST</h3>
      <div class="list">
        <div v-for="todo in todos_asc" :key="todo.id" :class="`todo-item ${todo.done && 
        'done'}`">

      <label>
        <input type="checkbox" v-model="todo.done" />
        <span :class="`bubble ${todo.category}`"></span>
      </label>

      <div class="todo-content">
        <input class="input" type="text" v-model="todo.content" />
      </div>

      <div class="actions">
        <button class="delete" @click="removeTodo(todo)">Delete</button>
      </div>

        </div>
      </div>
    </section>

  </main>
  
</template>

<style scoped>
.app{
  display: flex;
  gap: 100px;
  background-color: rgb(199, 199, 199);
}

.options{
  display: flex;
  gap: 20px;
}

.addtodo{
  background-color: rgb(97, 97, 242);
  color: #fff;
  border: 1px solid rgb(97, 97, 242);
  cursor: pointer;
  width: 100px;
  height: 50px;
}
.addtodo:hover{
  background-color: blue;
}

.input{
  border: 1px solid rgb(97, 97, 242);
}

.delete{
  background-color: rgb(97, 97, 242);
  color: #fff;
  border: 1px solid rgb(97, 97, 242);
  cursor: pointer;
  margin-top: 10px;
}

.delete:hover{
  background-color: blue;
}

.myname{
  margin-top: 30px;
  padding: 15px;
  border: 1px solid rgb(97, 97, 242);
}

.titleh{
  color:rgb(96, 39, 149);
  
}


.title{
  color: rgb(55, 10, 100);
}
</style>

