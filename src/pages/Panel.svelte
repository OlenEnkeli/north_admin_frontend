<script lang="ts">
    import {onMount} from "svelte";

    import {type AdminInfo, adminInfoAPI} from "../api/adminInfo";
    import ModelAdmin from "../components/Admin.svelte";
    import {alertStore} from "../store/alert";
    import AdminSidebar from "../components/AdminSidebar.svelte";

    export let logoutAction: () => Promise<void>;

    let adminInfo: AdminInfo | null;
    let currentModel: string | null;
    let currentModelInfo: ModelAdmin | null;

    onMount(async () => {
        adminInfo = await adminInfoAPI.info();
        if (!adminInfo)
            alertStore.add({
                type: 'error',
                message: 'Critical error: can`t get Admin API structure',
            });
    });
</script>


{#if adminInfo}
    <AdminSidebar
        bind:adminInfo={adminInfo}
        bind:currentModel={currentModel}
        bind:currentModelInfo={currentModelInfo}
        logoutAction={logoutAction}
    />

    <div class="panel__main grid flex p-4 h-screen sm:ml-52">
        {#if currentModel}
            <ModelAdmin
                modelName={currentModel}
                modelInfo={currentModelInfo}
            />
        {:else }
            <h2 class="justify-self-center text-4xl text-gray-800 self-center">
                Choose model from sidebar
            </h2>
        {/if}
    </div>
{/if}