<template>
<div>
<div class="col-md-9 ml-sm-auto col-lg-10 px-4">Main Section
    {{msg}}
  </div>
</div>

</template>

<script>
export default {
  name: "Main",

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