<script>
    const name = 'world';
    function greet(name) {
        alert(`Hello, ${name}!`);
    }
</script>

<button onclick={() => greet("foo")}>
    {name}
</button>
