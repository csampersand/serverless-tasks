<template>
  <div id="app">
    <transition name="fade">
      <div v-if="loading" class="loading"></div>
    </transition>
    <div>
      <input type="text" v-model="input" v-on:keyup.enter="addTodo(input)" />
      <todo
        v-for="(todo, i) in todos"
        v-bind:key="i"
        v-bind:todo="todo"
        v-on:toggle="toggleTodo(todo)"
        v-on:delete="deleteTodo(todo)"
      >
      </todo>
      <todo v-if="input" :todo="{ new: true }">{{ input }}</todo>
      <button v-on:click="clearTodos()">Clear</button>
    </div>
  </div>
</template>

<script>
import todo from "./components/Todo.vue";

export default {
  name: "app",
  components: {
    todo
  },
  data() {
    return {
      todos: [
        { text: "Task 1", complete: false },
        { text: "Task 2", complete: false },
        { text: "Task 3", complete: false }
      ],
      input: "",
      loading: false,
      saving: false
    };
  },
  methods: {
    addTodo: async function(text) {
      if (!text || this.saving) return;
      this.saving = true;
      const res = await fetch(`/api/create?text=${text}`);
      const newData = await res.json();
      this.todos.push({
        ...newData.data,
        id: newData.ref["@ref"].id
      });
      this.input = "";
      this.saving = false;
    },
    toggleTodo: async function(todo) {
      todo.complete = !todo.complete;
      const res = await fetch(
        `/api/update?id=${todo.id}&complete=${todo.complete.toString()}`
      );
      const newData = await res.json();
      todo.complete = newData.data.complete;
    },
    getTodos: async function() {
      const res = await fetch("/api");
      const newData = await res.json();
      this.todos = newData.map(document => {
        return {
          ...document.data,
          id: document.ref["@ref"].id
        };
      });
    },
    deleteTodo: async function(todo) {
      todo.deleting = true;
      await fetch(`/api/delete?id=${todo.id}`);
      this.getTodos();
    },
    clearTodos: async function() {
      await fetch("/api/clear");
      this.getTodos();
    }
  },
  created: async function() {
    this.loading = true;
    await this.getTodos();
    this.loading = false;
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 4em 4em;
}
.loading {
  position: fixed;
  padding: 0;
  margin: 0;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 1000;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
