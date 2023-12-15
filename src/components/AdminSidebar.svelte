<script lang="ts">
    import {onMount} from "svelte";
    import {ArrowRightFromBracketSolid} from "flowbite-svelte-icons";

    import {type AdminInfo} from "../api/adminInfo";
    import ModelAdmin from "./Admin.svelte";

    export let logoutAction: () => Promise<void>;
    export let adminInfo: AdminInfo | null;
    export let currentModel: string | null;
    export let currentModelInfo: ModelAdmin | null;

    let sideBarHidden: boolean = true;
    let adminInfoArray: [string, any][] = [];

    const chooseModelAction = (modelName: string) => {
        currentModel = modelName;
        if (adminInfo)
            currentModelInfo = adminInfo[modelName];
    };

    onMount(async () => {
        adminInfoArray = Object.entries(adminInfo);
    });
</script>


<!--<button type="button" on:click={() => {sideBarHidden = !sideBarHidden;}} class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-neutral-800 rounded-lg sm:hidden focus:outline-none focus:ring-2 focus:ring-neutral-200">-->
<!--    <span class="sr-only">Open sidebar</span>-->
<!--    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">-->
<!--        <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>-->
<!--    </svg>-->
<!--</button>-->

<aside class="panel__sidebar fixed top-0 left-0 z-40 text-neutral-900 w-52 h-screen transition-transform">
    <div class="h-full px-3 py-4 overflow-y-auto bg-neutral-100">
        <ul class="space-y-2 font-medium">
            {#each adminInfoArray as adminModel, index}
                <li on:click={() => {chooseModelAction(adminModel[index])}}>
                    <p class="flex items-center cursor-pointer p-2 bg-neutral-200 hover:bg-neutral-300  rounded-lg  group">
                    <span class="text-neutral-800 transition duration-75 " >
                        {adminModel[1].emoji}
                    </span>
                        <span class="ms-3">{adminModel[1].title}</span>
                    </p>
                </li>
            {/each}
        </ul>
        <ul class="pt-4 mt-4 space-y-2 font-medium ">
            <li on:click={logoutAction}>
                <div class="flex items-center cursor-pointer p-2 bg-neutral-200 hover:bg-neutral-300  rounded-lg group">
                    <ArrowRightFromBracketSolid class="w-4 h-4  ext-neutral-600 group-hover:text-red-600"/>
                    <span class="ms-3">Logout</span>
                </div>
            </li>
        </ul>
    </div>
</aside>