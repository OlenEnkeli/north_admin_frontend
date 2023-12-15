<script lang="ts">
    import {type AdminModel} from "../api/adminInfo";
    import {type ListItems} from "../api/endpoint";

    export let items: ListItems | null;

    export let modelInfo: AdminModel;
    export let allSelected: boolean;
    export let sortBy: string | undefined;
    export let sortAsc: boolean;
    export let selectedElements: boolean[];

    export let selectAll: () => void;
    export let changeSortBy: (column: string) => Promise<void>;
</script>


<div class="panel__main__table mt-3 relative overflow-x-auto rounded">
    <table class="w-full text-sm text-left rtl:text-right text-gray-100 text-gray-100">
        <thead class="text-xs uppercase bg-gray-800 dark:bg-gray-700 text-gray-100">
        <tr>
            <th scope="col" class="p-4">
                <div class="flex items-center">
                    <input id="checkbox-table-search-1" bind:checked={allSelected} on:click={selectAll} type="checkbox" class="w-4 h-4 border-gray-300 rounded dark:border-gray-600">
                    <label for="checkbox-table-search-1" class="sr-only">select</label>
                </div>
            </th>
            {#each modelInfo.listColumns as column, index}
                <th scope="col" class="px-6 py-3">
                    {#if column.sortable}
                        <div class="{sortBy === column.title ? sortAsc ? 'text-cyan-400' : 'text-green-400' : ''} flex items-center cursor-pointer" on:click={() => {changeSortBy(column.title)}}>
                            <span>{column.title}</span>
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
                    <td class="py-4 font-bold flex uppercase justify-between">
                        <p class="text-cyan-800 p-1 rounded cursor-pointer hover:text-gray-100 hover:bg-cyan-600">Edit</p>
                        {#if item[modelInfo.softDeleteColumn]}
                            <p class="text-gray-800 p-1 rounded cursor-pointer hover:text-gray-100 hover:bg-gray-600">Block</p>
                        {:else}
                            <p class="text-green-800 p-1 rounded cursor-pointer hover:text-gray-100 hover:bg-green-600">Unblock</p>

                        {/if}
                        <p class="text-red-800 p-1 rounded cursor-pointer hover:text-gray-100 hover:bg-red-600">Remove</p>
                    </td>
            {/each}
        {/if}
        </tbody>
    </table>
</div>