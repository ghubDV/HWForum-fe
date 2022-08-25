<template>
  <Card 
    class="card--small-padding"
  >
    <template #content>
      <TextEditor />
    </template>
  </Card>
  
</template>

<script>
  import Card from '@/common/components/Card.vue'
  import TextEditor from '@/common/components/TextEditor.vue';

  export default {
    components: {
      Card,
      TextEditor
    }  
  }
</script>
