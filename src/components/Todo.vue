<template>
  <div :class="{ deleting: todo.deleting, 'new-todo': todo.new }">
    <font-awesome-icon
      class="delete-icon"
      :class="{ hidden: todo.new }"
      v-on:click="$emit('delete')"
      icon="times"
    />
    <span class="toggle-area" v-on:click="$emit('toggle', !todo.complete)">
      <font-awesome-icon
        class="toggle-icon"
        :class="{ hidden: todo.new }"
        :icon="['far', todo.complete ? 'check-square' : 'square']"
      />
      <span class="title" v-bind:class="{ complete: todo.complete }"
        >{{ todo.text }}<slot></slot
      ></span>
    </span>
  </div>
</template>

<script>
export default {
  name: "todo",
  props: ["todo"]
};
</script>

<style scoped>
.complete {
  text-decoration: line-through;
}
.toggle-icon,
.delete-icon {
  margin-right: 0.2rem;
  cursor: pointer;
}
.title {
  font-size: 18px;
  cursor: pointer;
}
.toggle-area {
  cursor: pointer;
}
.deleting {
  color: red;
}
.new-todo {
  color: grey;
}
.hidden {
  visibility: hidden;
}
</style>
