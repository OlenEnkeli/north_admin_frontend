<script lang="ts">
    import Error from "./Error.svelte";

    export let errors: string[];
</script>

<div class="errors">
    {#each errors as currentError, index}
        <Error currentError={currentError} index={index}/>
    {/each}
</div>

<style>
.errors {
    position: absolute;
    top: 1em;
    left: 1em;
    right: 1em;
}
</style>