<template>
  <div class="col-md-9 ml-sm-auto col-lg-10 px-4">
    {{ msg }}
    <GoogleAnalytics />
  </div>
</template>

<script>
/* eslint-disable */
import GoogleAnalytics from '../GoogleAnalytics/GoogleAnalytics'
export default {
  name: "Main",
  components: {GoogleAnalytics},
data(){
  return{
    msg:'Hello',
    todos:[
      {
        id:1,
        title:"Todo One",
        completed:false
      },
      {
        id:2,
        title: "Todo two",
        completed: true
      },
      {
        id:3,
        title:"Todo three",
        completed:false
      }
    ]
  }
}
}
</script>

<style>
</style>