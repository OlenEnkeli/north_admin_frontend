<script lang="ts">
    import {Alert} from "flowbite-svelte";
    import {InfoCircleSolid} from "flowbite-svelte-icons";

    import {alertStore, type Alert as AlertType} from "../store/alert";

    export let index: number;
    export let currentAlert: AlertType;

    $: computedColor = {
        'info': 'cyan',
        'success': 'green',
        'warning': 'yellow',
        'error': 'red',
    }[currentAlert.type]
</script>

<Alert
    dismissable
    color={computedColor}}
    on:click={() => {alertStore.remove(index)}}
    class="bg-{computedColor}-50 text-{computedColor}-800 mb-2"
>
    <InfoCircleSolid
        slot="icon"
        color="{computedColor}"
        class="w-4 h-4"
    />
    <span class="font-bold capitalize pr-4">{currentAlert.type}</span>

    <span class="font-semibold">
        {currentAlert.message}
    </span>
</Alert>
