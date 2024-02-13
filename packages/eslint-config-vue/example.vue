<template>
    <div v-if="myComputed">
        <!-- @slot Slot description -->
        <slot name="my-slot"></slot>
    </div>
    <div>
        <span>{{ myComplexProp }}</span>
    </div>
</template>

<script lang="ts">
import type { PropType } from "vue";
import { defineComponent } from "vue";

interface MyInterface {
    data: string;
    test: boolean;
}

export default defineComponent({
    name: "MyComponent",
    props: {
        /**
         * Prop description
         */
        myProp: {
            type: Boolean,
            default: true,
        },
        /**
         * Prop description
         */
        myComplexProp: {
            type: Object,
            required: false,
            default: () => ({}),
        } as PropType<MyInterface>,
    },
    emits: ["change"],
    data() {
        return {
            value: null as number | null,
        };
    },
    computed: {
        myComputed(): boolean {
            return this.value && this.value > 10;
        },
    },
    methods: {
        onClick() {
            /**
             * Description of this event.
             *
             * @event change
             * @param value
             * @type {number}
             */
            this.$emit("change", this.value);
        },
    },
});
</script>
