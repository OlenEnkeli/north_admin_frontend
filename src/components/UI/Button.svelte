<script lang="ts">
    import { createEventDispatcher, type EventDispatcher } from 'svelte';
    const dispatch: EventDispatcher<any> = createEventDispatcher();

    export let title: string;
    export let type: string = 'button';
    export let classes: string = '';
    export let color: string = 'cyan';

    export let textColor: string = 'gray-100';

    const clicked = (): void => {
        dispatch('click');
    };

</script>

<button
    type={type}
    class="flex justify-center items-center rounded px-8 py-2 bg-{color}-700 text-{textColor} hover:bg-{color}-800 {classes}"
    on:click={clicked}
>
    <slot />
    {#if title}
        <span class="px-2">{title}</span>
    {/if}
</button>
