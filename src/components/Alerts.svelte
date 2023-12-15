<script lang="ts">
    import Alert from "./Alert.svelte";

    export let alerts: Alert[];
</script>

<div class="errors">
    {#each alerts as currentAlert, index}
        <Alert
            alertType="success"
            currentAlert={currentAlert}
            index={index}
        />
    {/each}
</div>

<style>
.errors {
    position: absolute;
    top: 1em;
    left: 1em;
    right: 1em;
    z-index: 1000;
}
</style>