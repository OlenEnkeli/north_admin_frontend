<script lang="ts">
    import type {AdminModel} from "../api/adminInfo";
    import {onMount} from "svelte";
    import {endpointList} from "../store/endpoint";
    import type {type ListItems} from "../api/endpoint";

    export let modelName: string;
    export let modelInfo: AdminModel;

    const itemOnPageOptions: number[] = [10, 25, 50, 100];

    let selectedElements: boolean[] = [];
    let allSelected: boolean = false;
    let itemOnPage: number = 25;
    let pagesAmount: number;
    let currentPage: number = 1;
    let includeSoftDeleted: boolean = true;
    let items: ListItems | null = null;


    let sortBy: string;

    const getItems = async (): Promise<void> => {
        await new Promise(r => setTimeout(r, 1));
        items = await endpointList(
            modelName,
            includeSoftDeleted,
            currentPage,
            itemOnPage,
            sortBy,
        );
    };

    const paginate = async (page: number): Promise<void> => {
        if (!items)
            return;

        selectedElements = Array(items.items.length).fill(false);

        currentPage = page;
        await getItems();
    };

    const paginatePrevious = async (): Promise<void> => {
        let previousPage: number = currentPage > 1 ? currentPage - 1 : currentPage;
        await paginate(previousPage);
    };

    const paginateNext = async (): Promise<void> => {
        let nextPage: number = currentPage + 1;
        await paginate(nextPage);
    };

    const changeSortBy = async (column: string): Promise<void> => {
        sortBy = column;
        await getItems();
    };

    const selectAll = (): void => {
        if (!items)
            return;

        allSelected = !allSelected;
        selectedElements = Array(items.items.length).fill(allSelected);
    };

    onMount(async () => {
        await getItems();
        if (!items)
            return;

        pagesAmount = Math.ceil(items.totalAmount / items.paginationSize);
    });

</script>

<div class="panel__main h-full w-full">
    <div class="panel__main__header text-sm font-semibold uppercase text-gray-100 flex">
        <div class="flex-auto mr-5 text-gray-900 rounded">
            <div class="mx-5 flex justify-items-stretch items-center">
                <span class="flex-auto">Show</span>
                <div class="flex-auto mx-5 py-2 font-semibold">
                    <select bind:value={itemOnPage}>
                        {#each itemOnPageOptions as itemOnPageOption}
                            <option value={itemOnPageOption}>{itemOnPageOption}</option>
                        {/each}
                    </select>
                </div>
                <span class="flex-auto ">items of</span>
                <span class="flex-auto font-bold">100</span>
            </div>
        </div>
        <div class="flex-auto mr-5 text-gray-900 rounded">
            <div class="flex justify-items-stretch items-center py-2  ">
                <input id="default-checkbox" type="checkbox" bind:checked={includeSoftDeleted} on:click={getItems} class="flex-auto w-5 h-5">
                <label for="default-checkbox" class="flex-auto">Display blocked</label>
            </div>
        </div>
        <button class="flex-auto mr-5 panel__main__header__create bg-cyan-800 hover:bg-cyan-900 py-2 px-4 rounded inline-flex items-center">
            <svg class="fill-current w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M38.5,28H28v11c0,1.104-0.896,2-2,2 s-2-0.896-2-2V28H13.5c-1.104,0-2-0.896-2-2s0.896-2,2-2H24V14c0-1.104,0.896-2,2-2s2,0.896,2,2v10h10.5c1.104,0,2,0.896,2,2 S39.604,28,38.5,28z"/>
            </svg>
            <span class="uppercase">Create</span>
        </button>
        <button class="flex-auto mr-5 panel__main__header__create bg-green-800 hover:bg-green-900 py-2 px-4 rounded inline-flex items-center">
            <svg class="fill-current w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                <path d="m32 3a29 29 0 1 0 29 29 29.032 29.032 0 0 0 -29-29zm-1.225 24.953a2 2 0 1 1 -2.828 2.828l-7.314-7.314v6.633a2 2 0 0 1 -4 0v-11.461a2 2 0 0 1 2-2h11.467a2 2 0 0 1 0 4h-6.639zm16.592 17.408a2 2 0 0 1 -2 2h-11.467a2 2 0 0 1 0-4h6.643l-7.314-7.314a2 2 0 1 1 2.828-2.828l7.314 7.314v-6.633a2 2 0 0 1 4 0z"/>            </svg>
            <span class="uppercase">Filters</span>
        </button>
        <button on:click={getItems} class="flex-auto mr-5 panel__main__header__create bg-blue-800 hover:bg-blue-900 py-2 px-4 rounded inline-flex items-center">
            <svg class="fill-current w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 239.299 239.299">
                <path d="M119.649,239.299c58.792,0,106.623-47.831,106.623-106.623c0-56.215-43.73-102.402-98.958-106.345V0L60.293,45.351 l67.021,45.352V65.093c33.913,3.822,60.362,32.665,60.362,67.583c0,37.51-30.517,68.026-68.026,68.026s-68.026-30.517-68.026-68.026 c0-14.646,4.579-28.594,13.241-40.335L33.806,69.426c-13.594,18.426-20.78,40.297-20.78,63.25 C13.026,191.468,60.857,239.299,119.649,239.299z"/>
            </svg>
            <span class="uppercase">Reload</span>
        </button>
        <button class="flex-auto mr-5 panel__main__header__create bg-purple-700 hover:bg-purple-800 py-2 px-4 rounded inline-flex items-center">
            <svg class="fill-current w-5 h-5 mr-2" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m408 112h-224a72 72 0 0 0 -72 72v224a72 72 0 0 0 72 72h224a72 72 0 0 0 72-72v-224a72 72 0 0 0 -72-72zm-32.45 200h-63.55v63.55c0 8.61-6.62 16-15.23 16.43a16 16 0 0 1 -16.77-15.98v-64h-63.55c-8.61 0-16-6.62-16.43-15.23a16 16 0 0 1 15.98-16.77h64v-63.55c0-8.61 6.62-16 15.23-16.43a16 16 0 0 1 16.77 15.98v64h64a16 16 0 0 1 16 16.77c-.42 8.61-7.84 15.23-16.45 15.23z"/><path d="m395.88 80a72.12 72.12 0 0 0 -67.88-48h-224a72 72 0 0 0 -72 72v224a72.12 72.12 0 0 0 48 67.88v-235.88a80 80 0 0 1 80-80z"/></svg>
            <span class="uppercase">Duplicate</span>
        </button>
        <button class="flex-auto mr-5 panel__main__header__create bg-gray-800 hover:bg-gray-900 py-2 px-4 rounded inline-flex items-center">
            <svg class="fill-current w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 426.667 426.667"><g><g><path d="M213.333,0C95.467,0,0,95.467,0,213.333s95.467,213.333,213.333,213.333S426.667,331.2,426.667,213.333S331.2,0,213.333,0 z M42.667,213.333c0-94.293,76.373-170.667,170.667-170.667c39.467,0,75.627,13.547,104.533,35.947L78.613,317.867 C56.213,288.96,42.667,252.8,42.667,213.333z M213.333,384c-39.467,0-75.627-13.547-104.533-35.947L348.053,108.8 C370.453,137.707,384,173.867,384,213.333C384,307.627,307.627,384,213.333,384z"/></g></g></svg>
            <span class="uppercase">Block</span>
        </button>
        <button class="flex-auto panel__main__header__create bg-red-700 hover:bg-red-800 py-2 px-4 rounded inline-flex items-center">
            <svg class="fill-current w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 459 459">
                <path d="M229.5,0C102.751,0,0,102.751,0,229.5S102.751,459,229.5,459S459,356.249,459,229.5S356.249,0,229.5,0z M307.105,271.629 c9.797,9.797,9.797,25.68,0,35.477c-4.898,4.898-11.318,7.347-17.738,7.347c-6.42,0-12.84-2.449-17.738-7.347L229.5,264.977 l-42.128,42.129c-4.898,4.898-11.318,7.347-17.738,7.347c-6.42,0-12.84-2.449-17.738-7.347c-9.797-9.796-9.797-25.68,0-35.477 l42.129-42.129l-42.129-42.129c-9.797-9.797-9.797-25.68,0-35.477s25.68-9.797,35.477,0l42.128,42.129l42.128-42.129 c9.797-9.797,25.68-9.797,35.477,0c9.797,9.796,9.797,25.68,0,35.477l-42.13,42.129L307.105,271.629z"/>
            </svg>
            <span class="uppercase">Remove</span>
        </button>
    </div>
    <div class="panel__main__table mt-3 relative overflow-x-auto rounded">
        <table class="w-full text-sm text-left rtl:text-right text-gray-100 dark:text-gray-100">
            <thead class="text-xs text-gray-700 uppercase bg-gray-800 dark:bg-gray-700 dark:text-gray-100">
            <tr>
                <th scope="col" class="p-4">
                    <div class="flex items-center">
                        <input id="checkbox-table-search-1" on:click={selectAll} type="checkbox" class="w-4 h-4 border-gray-300 rounded dark:border-gray-600">
                        <label for="checkbox-table-search-1" class="sr-only">select</label>
                    </div>
                </th>
                {#each modelInfo.listColumns as column, index}
                    <th scope="col" class="px-6 py-3">
                        {#if column.sortable}
                            <div class="flex items-center cursor-pointer" on:click={() => {changeSortBy(column.title)}}>
                                {column.title}
                                <svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                </svg>
                            </div>
                        {:else}
                            <div>
                                {column.title}
                            </div>
                        {/if}
                    </th>
                {/each}
                <th scope="col" class="px-6 py-3">
                    actions
                </th>
            </tr>
            </thead>
            <tbody>
            {#if items}
                {#each items.items as item, itemIndex}
                    <tr class="{itemIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100' } {itemIndex !== items.items.length - 1 ? 'border-b' : '' } text-gray-900 dark:border-gray-500">
                        <td class="w-4 p-4">
                            <div class="flex items-center">
                                <input bind:checked={selectedElements[itemIndex]} id="checkbox-select-{itemIndex}" type="checkbox" class="w-4 h-4 text-cyan-800 dark:text-cyan-800 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600">
                                <label for="checkbox-table-search-1" class="sr-only">select</label>
                            </div>
                        </td>
                    {#each Object.entries(item) as field, fieldIndex}
                         <td class="px-6 py-4">
                             {#if modelInfo.columns[field[0]].columnType === 'boolean'}
                                 {#if field[1]}
                                     <span class="bg-green-700 p-1 rounded text-gray-100">TRUE</span>
                                 {:else}
                                     <span class="bg-red-700 p-1 rounded text-gray-100">FALSE</span>
                                 {/if}
                             {:else}
                                 {field[1]}
                             {/if}
                         </td>
                    {/each}
                    <td class="px-6 py-4 font-bold flex uppercase justify-between">
                        <a href="#" class="text-cyan-800 hover:underline">Edit</a>
                        <a href="#" class="text-gray-800 hover:underline">Blc</a>
                        <a href="#" class="text-red-800 hover:underline">Rmv</a>
                    </td>
                {/each}
            {/if}
            </tbody>
        </table>
    </div>
    <nav class="mb-2 rounded" aria-label="Page navigation example">
        <ul class="flex items-center -space-x-px text-base">
            <li class="flex-1" on:click={paginatePrevious}>
                <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-100 border bg-gray-800 hover:bg-gray-600 ">
                    <span class="sr-only">Previous</span>
                    <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                    </svg>
                </a>
            </li>
            {#each Array.from({length: pagesAmount}, (_, i) => i + 1) as index}
                <li class="flex-1" on:click={() => {paginate(index)}}>
                    <p class="flex items-center justify-center px-4 h-10 leading-tight text-gray-100 border {index === currentPage ? 'bg-cyan-800 hover:bg-cyan-600' : 'bg-gray-800 hover:bg-gray-600'}  ">
                        {index}
                    </p>
                </li>
            {/each}
            <li class="flex-1" on:click={paginateNext}>
                <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-100 border bg-gray-800 hover:bg-gray-600 ">
                    <span class="sr-only">Next</span>
                    <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                    </svg>
                </a>
            </li>
        </ul>
    </nav>
</div>
