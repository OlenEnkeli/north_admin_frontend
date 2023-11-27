<script lang="ts">
    import {onMount} from "svelte";
    import {type AdminInfo, adminInfoAPI} from "../api/adminInfo";
    import ModelAdmin from "../components/ModelAdmin.svelte";

    export let logoutAction: () => Promise<void>;

    let adminInfo: AdminInfo | null;
    let adminInfoArray: [string, any][] = [];
    let currentModel: string | null;
    let currentModelInfo: ModelAdmin | null;

    const chooseModelAction = (modelName: string) => {
        currentModel = modelName;
        if (adminInfo) {
            currentModelInfo = adminInfo[modelName];
        }
    };

    onMount(async () => {
        adminInfo = await adminInfoAPI.info();
        if (!adminInfo) {
            console.error("Critical error: can`t get Admin API structure");
        }

        adminInfoArray = Object.entries(adminInfo);
    });


</script>
<aside class="panel__sidebar fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <ul class="space-y-2 font-medium">
            {#each adminInfoArray as adminModel}
            <li on:click={() => {chooseModelAction(adminModel[0])}}>
                <p class="flex items-center cursor-pointer p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-800 dark:hover:bg-gray-700 group">
                    <span class="w-5 h-5 text-gray-800 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" >
                        {adminModel[1].emoji}
                    </span>
                    <span class="ms-3">{adminModel[1].title}</span>
                </p>
            </li>
            {/each}
        </ul>
        <ul class="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
            <li on:click={logoutAction}>
                <div class="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 dark:text-white group">
                    <svg class="flex-shrink-0 w-5 h-5 text-gray-800 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-red" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 17 20">
                        <path d="M7.958 19.393a7.7 7.7 0 0 1-6.715-3.439c-2.868-4.832 0-9.376.944-10.654l.091-.122a3.286 3.286 0 0 0 .765-3.288A1 1 0 0 1 4.6.8c.133.1.313.212.525.347A10.451 10.451 0 0 1 10.6 9.3c.5-1.06.772-2.213.8-3.385a1 1 0 0 1 1.592-.758c1.636 1.205 4.638 6.081 2.019 10.441a8.177 8.177 0 0 1-7.053 3.795Z"/>
                    </svg>
                    <span class="ms-3">Logout</span>
                </div>
            </li>
        </ul>
    </div>
</aside>

<div class="panel__main grid flex p-4 h-screen sm:ml-64">
    {#if currentModel}
        <ModelAdmin modelName={currentModel} modelInfo={currentModelInfo} />
    {:else }
        <h2 class="justify-self-center text-4xl text-gray-800 self-center">Choose model from sidebar</h2>
    {/if}
</div>