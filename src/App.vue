<template>
  <div id="app">
    <input type="text" v-model="input" v-on:keyup.enter="addTodo(input)" />
    <ul>
      <li
        v-for="(todo, i) in todos"
        v-bind:key="i"
        v-bind:class="{ complete: todo.complete }"
        v-on:click="todo.complete = !todo.complete"
      >
        {{ todo.complete ? "✔︎" : "❏" }} {{ todo.text }}
      </li>
      <li v-if="input" class="new-todo">❏ {{ input }}</li>
    </ul>
    <button v-on:click="todos = []">Clear</button>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      todos: [
        { text: "Task 1", complete: false },
        { text: "Task 2", complete: false },
        { text: "Task 3", complete: false }
      ],
      input: ""
    };
  },
  methods: {
    addTodo: function(text) {
      if (!text) return;
      this.todos.push({ text, complete: false });
      this.input = "";
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 60px 120px;
  font-size: 24px;
}
ul {
  list-style-type: none;
  cursor: pointer;
}
.complete {
  text-decoration: line-through;
}
.new-todo {
  color: gray;
}
</style>
