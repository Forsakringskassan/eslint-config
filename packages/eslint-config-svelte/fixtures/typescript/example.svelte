<script lang="ts">
    import { createCounter } from "./counter.svelte";

    const name: string = "world";
    function greet(name: string) {
        alert(`Hello, ${name}!`);
    }
    const counter = createCounter();
</script>

<button onclick={() => greet("foo")}>
    {name}
</button>

<button onclick={counter.increment}>
    clicks: {counter.count}
</button>
