<script setup lang="ts">
import { ref, onMounted } from "vue";

// reactive state
const count = ref(0);

// functions that mutate state and trigger updates
function increment(): void {
    count.value++;
}

// lifecycle hooks
onMounted(() => {
    /* eslint-disable-next-line no-console -- expected to log */
    console.log(`The initial count is ${count.value}.`);
});
</script>

<template>
    <button class="my-awesome-class" @click="increment">Count is: {{ count }}</button>
</template>

<style lang="scss" scoped>
.my-awesome-class {
    border: #000000;
    color: #ffffff;
}
</style>
