<script lang="ts">
    import {onMount} from "svelte";

    import {type AdminModel, type Column} from "../api/adminInfo";

    export let modalOpened: boolean;
    export let action: string | null;
    export let item: object | null;
    export let modelName: string;
    export let modelInfo: AdminModel;

    export let columns: Column[] = [];


    let currentItem: object | null;

    const closeModal = (): void => {
        action = null;
        item = null;
        currentItem = null;
        modalOpened = false;
    }


    onMount(async () => {
        currentItem = Object.assign({}, item);

        switch (action) {
            case 'create':
                columns = modelInfo.createColumns;
                break;
            case 'get':
                columns = modelInfo.getColumns;
                break;
            case 'edit':
                columns = modelInfo.updateColumns;
                break;
            default:
                columns = modelInfo.getColumns;
        }
    });

</script>

<div class="panel__modal__background bg-black fixed top-0 left-0 z-50 w-full h-full opacity-80" />

<div on:click={closeModal} class="panel__modal fixed top-0 left-0 z-50 w-full h-full  text-gray-900 p-4 overflow-x-hidden overflow-y-auto">
    <div on:click={(event) => {event.stopPropagation()}} class="panel__modal__inner mx-20 my-14 rounded">
        <div class="relative rounded-lg  bg-gray-100">
            <div class="flex items-center justify-between p-4 border-b rounded-t border-gray-600">
                <h3 class="text-xl font-medium">
                    <span>
                        {#if action === 'get'}
                        Detail view item
                        {/if}
                        {#if action === 'edit'}
                        Edit item
                        {/if}
                        {#if action === 'create'}
                        Create item
                        {/if}
                    </span>
                    {#if action !== 'create'}
                        <span class="font-bold">
                            {item.id}
                        </span>
                    {/if}
                    <span>
                        of <span class="font-bold capitalize">{modelName}</span>
                    </span>
                </h3>
                <button class="inline-flex h-10 m-2 ml-6 px-8 py-2 panel__main__header__create bg-cyan-800 text-gray-100 hover:bg-cyan-900  rounded inline-flex items-center">
                    <svg class="fill-current w-5 h-5 mr-2" viewBox="0 0 32 32">
                        <g><path d="M9,7V2H19V7a1,1,0,0,1-1,1H10A1,1,0,0,1,9,7ZM8,30H24V26.56H8Zm0-5.44H24v-2H8ZM29,8.7,24.37,3.09A3,3,0,0,0,22.06,2H21V7a3,3,0,0,1-3,3H10A3,3,0,0,1,7,7V2H5A3,3,0,0,0,2,5V27a3,3,0,0,0,3,3H6V20a3,3,0,0,1,3-3H23a3,3,0,0,1,3,3V30h1a3,3,0,0,0,3-3V10.92A3,3,0,0,0,29,8.7ZM23,19H9a1,1,0,0,0-1,1v.56H24V20A1,1,0,0,0,23,19Z"/></g>
                    </svg>
                    <span class="uppercase">Save</span>
                </button>
                <button on:click={() => {currentItem = Object.assign({}, item)}} class="inline-flex h-10 m-2 ml-2 px-8 py-2 panel__main__header__create bg-blue-800 text-gray-100 hover:bg-blue-900  rounded inline-flex items-center">
                    <svg class="fill-current w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 239.299 239.299">
                        <path d="M119.649,239.299c58.792,0,106.623-47.831,106.623-106.623c0-56.215-43.73-102.402-98.958-106.345V0L60.293,45.351 l67.021,45.352V65.093c33.913,3.822,60.362,32.665,60.362,67.583c0,37.51-30.517,68.026-68.026,68.026s-68.026-30.517-68.026-68.026 c0-14.646,4.579-28.594,13.241-40.335L33.806,69.426c-13.594,18.426-20.78,40.297-20.78,63.25 C13.026,191.468,60.857,239.299,119.649,239.299z"/>
                    </svg>
                    <span class="uppercase">Reset</span>
                </button>
                <button type="button" on:click={closeModal} class="bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-red-600 hover:text-white">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <form class="p-4 flex flex-wrap items-center rounded-t mx-auto">
                {#each columns as column}
                    <div class="m-2 flex-auto hover:bg-gray-150 rounded p-2">
                        <label for="{column.title}" class="text-sm ml-1 block mb-1 uppercase font-medium text-gray-800">{column.title}</label>
                        {#if ['integer', 'float', 'string'].includes(column.columnType)}
                        <input
                            type="text"
                            id="{column.title}"
                            class="w-full px-4 py-2 bg-gray-150 border border-gray-200 text-gray-900 text-sm rounded-lg focus:bg-gray-180 block"
                            placeholder="{column.columnType}"
                            value={currentItem[column.title] ? currentItem[column.title] : null}
                            on:input={(event) => {currentItem[column.title] = event.target.value}}
                        >
                        {/if}
                        {#if column.columnType === 'boolean'}
                            <label class="inline-flex items-center cursor-pointer relative">
                                <input type="checkbox"  bind:checked={currentItem[column.title]} class="sr-only peer">
                                <div class="w-11 h-6 bg-gray-200  rounded-full peer bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-600"></div>
                                {#if currentItem[column.title]}
                                    <span class="bg-green-700 ml-2 currentItem[column.title] p-1 text-xs rounded text-gray-100">TRUE&nbsp;</span>
                                {:else}
                                    <span class="bg-red-700 ml-2 currentItem[column.title] p-1 text-xs rounded text-gray-100">FALSE</span>
                                {/if}
                            </label>
                        {/if}
                        {#if column.columnType === 'datetime'}
                            <!-- Calendar -->
<!--                            <div class="space-y-0.5">-->
<!--                                &lt;!&ndash; Months &ndash;&gt;-->
<!--                                <div class="grid grid-cols-5 items-center gap-x-3 mx-1.5 pb-3">-->
<!--                                    &lt;!&ndash; Prev Button &ndash;&gt;-->
<!--                                    <div class="col-span-1">-->
<!--                                        <button type="button" class="w-8 h-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">-->
<!--                                            <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    &lt;!&ndash; End Prev Button &ndash;&gt;-->

<!--                                    &lt;!&ndash; Month / Year &ndash;&gt;-->
<!--                                    <div class="col-span-3 flex justify-center items-center gap-x-1">-->
<!--                                        <div class="relative">-->
<!--                                            <select data-hs-select='' class="hidden">-->
<!--                                                <option value="0">January</option>-->
<!--                                                <option value="1">February</option>-->
<!--                                                <option value="2">March</option>-->
<!--                                                <option value="3">April</option>-->
<!--                                                <option value="4">May</option>-->
<!--                                                <option value="5">June</option>-->
<!--                                                <option value="6" selected>July</option>-->
<!--                                                <option value="7">August</option>-->
<!--                                                <option value="8">September</option>-->
<!--                                                <option value="9">October</option>-->
<!--                                                <option value="10">November</option>-->
<!--                                                <option value="11">December</option>-->
<!--                                            </select>-->
<!--                                        </div>-->

<!--                                        <span class="text-gray-800 dark:text-gray-200">/</span>-->

<!--                                        <div class="relative">-->
<!--                                            <select  class="hidden">-->
<!--                                                <option selected>2023</option>-->
<!--                                                <option>2024</option>-->
<!--                                                <option>2025</option>-->
<!--                                                <option>2026</option>-->
<!--                                                <option>2027</option>-->
<!--                                            </select>-->
<!--                                        </div>-->
<!--                                    </div>-->
<!--                                    &lt;!&ndash; End Month / Year &ndash;&gt;-->

<!--                                    &lt;!&ndash; Next Button &ndash;&gt;-->
<!--                                    <div class="col-span-1 flex justify-end">-->
<!--                                        <button type="button" class="w-8 h-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">-->
<!--                                            <svg class="flex-shrink-0 w-4 h-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    &lt;!&ndash; End Next Button &ndash;&gt;-->
<!--                                </div>-->
<!--                                &lt;!&ndash; Months &ndash;&gt;-->

<!--                                &lt;!&ndash; Weeks &ndash;&gt;-->
<!--                                <div class="flex pb-1.5">-->
<!--    <span class="m-px w-10 block text-center text-sm text-gray-500">-->
<!--      Mo-->
<!--    </span>-->
<!--                                    <span class="m-px w-10 block text-center text-sm text-gray-500">-->
<!--      Tu-->
<!--    </span>-->
<!--                                    <span class="m-px w-10 block text-center text-sm text-gray-500">-->
<!--      We-->
<!--    </span>-->
<!--                                    <span class="m-px w-10 block text-center text-sm text-gray-500">-->
<!--      Th-->
<!--    </span>-->
<!--                                    <span class="m-px w-10 block text-center text-sm text-gray-500">-->
<!--      Fr-->
<!--    </span>-->
<!--                                    <span class="m-px w-10 block text-center text-sm text-gray-500">-->
<!--      Sa-->
<!--    </span>-->
<!--                                    <span class="m-px w-10 block text-center text-sm text-gray-500">-->
<!--      Su-->
<!--    </span>-->
<!--                                </div>-->
<!--                                &lt;!&ndash; Weeks &ndash;&gt;-->

<!--                                &lt;!&ndash; Days &ndash;&gt;-->
<!--                                <div class="flex">-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600" disabled>-->
<!--                                            26-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600" disabled>-->
<!--                                            27-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600" disabled>-->
<!--                                            28-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600" disabled>-->
<!--                                            29-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600" disabled>-->
<!--                                            30-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">-->
<!--                                            1-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">-->
<!--                                            2-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                                &lt;!&ndash; Days &ndash;&gt;-->

<!--                                &lt;!&ndash; Days &ndash;&gt;-->
<!--                                <div class="flex">-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">-->
<!--                                            3-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">-->
<!--                                            4-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">-->
<!--                                            5-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">-->
<!--                                            6-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">-->
<!--                                            7-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">-->
<!--                                            8-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">-->
<!--                                            9-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                                &lt;!&ndash; Days &ndash;&gt;-->

<!--                                &lt;!&ndash; Days &ndash;&gt;-->
<!--                                <div class="flex">-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">-->
<!--                                            10-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">-->
<!--                                            11-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">-->
<!--                                            12-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">-->
<!--                                            13-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">-->
<!--                                            14-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">-->
<!--                                            15-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">-->
<!--                                            16-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                                &lt;!&ndash; Days &ndash;&gt;-->

<!--                                &lt;!&ndash; Days &ndash;&gt;-->
<!--                                <div class="flex">-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">-->
<!--                                            17-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">-->
<!--                                            18-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">-->
<!--                                            19-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center bg-blue-600 border border-transparent text-sm font-medium text-white hover:border-blue-600 rounded-full dark:bg-blue-500 disabled:text-gray-300 disabled:pointer-events-none dark:hover:border-gray-700">-->
<!--                                            20-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">-->
<!--                                            21-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">-->
<!--                                            22-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">-->
<!--                                            23-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                                &lt;!&ndash; Days &ndash;&gt;-->

<!--                                &lt;!&ndash; Days &ndash;&gt;-->
<!--                                <div class="flex">-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">-->
<!--                                            24-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">-->
<!--                                            25-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">-->
<!--                                            26-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">-->
<!--                                            27-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">-->
<!--                                            28-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">-->
<!--                                            29-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">-->
<!--                                            30-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                                &lt;!&ndash; Days &ndash;&gt;-->

<!--                                &lt;!&ndash; Days &ndash;&gt;-->
<!--                                <div class="flex">-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">-->
<!--                                            31-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600" disabled>-->
<!--                                            1-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600" disabled>-->
<!--                                            2-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600" disabled>-->
<!--                                            3-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600" disabled>-->
<!--                                            4-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600" disabled>-->
<!--                                            5-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                    <div>-->
<!--                                        <button type="button" class="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-blue-600 hover:text-blue-600 rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600" disabled>-->
<!--                                            6-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                                &lt;!&ndash; Days &ndash;&gt;-->
<!--                            </div>-->
                            <!-- End Calendar -->

                        {/if}
                    </div>
                {/each}
            </form>
        </div>
    </div>
</div>