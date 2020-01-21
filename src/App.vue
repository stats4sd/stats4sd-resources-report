<template>
  <div id="app">
    <Layout />
  </div>
</template>

<script>
/* eslint-disable */
import Layout from "./components/Layout/Layout";
import axios from 'axios'

export default {
  name: "app",
  components: {
    Layout
  },
  created(){
    axios.get("https://jsonplaceholder.typicode.com/todos/1")
    .then(response => console.log("Data: ",response.data))
    .catch(err => console.log("Error:", err))

    
  }
};
</script>

<style>
</style>
