<script lang="ts">
    import {type ListItems} from "../api/endpoint";

    export let items: ListItems | null;

    export let itemsOnPage: number;
    export let itemsOnPageOptions: number[];
    export let includeSoftDeleted: boolean;
    export let modalWindowOpened: boolean;
    export let modalWindowAction: string;

    export let resetAll: () => Promise<void>;

    export let getItems: () => Promise<void>;


    const openCreateModal = (): void => {
        modalWindowOpened = true;
        modalWindowAction = 'get';
    };

</script>

<div class="panel__main__header text-xs font-semibold uppercase text-gray-100 flex">
    <div class="flex-auto mr-5 text-gray-900 rounded">
        <div class="mx-5 flex justify-start py-2 items-center">
            <span class="flex-auto">Show</span>
            <div class="flex-auto">
                <select bind:value={itemsOnPage} on:change={getItems} class="font-bold">
                    {#each itemsOnPageOptions as itemOnPageOption}
                        <option value={itemOnPageOption}>{itemOnPageOption}</option>
                    {/each}
                </select>
            </div>
            <span class="flex-auto ">of</span>
            <span class="flex-auto font-bold">{items ? items.totalAmount : 0}</span>
        </div>
    </div>
    <div class="flex-auto mr-5 text-gray-900 rounded">
        <div class="flex justify-items-stretch items-center py-2  ">
            <input bind:checked={includeSoftDeleted} on:click={getItems}  id="default-checkbox" type="checkbox" class="flex-auto w-5 h-5">
            <label for="default-checkbox" class="flex-auto">With blocked</label>
        </div>
    </div>
    <button on:click={openCreateModal} class="flex-auto mr-5 panel__main__header__create bg-cyan-800 hover:bg-cyan-900 py-2 px-4 rounded inline-flex items-center">
        <svg class="fill-current w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M38.5,28H28v11c0,1.104-0.896,2-2,2 s-2-0.896-2-2V28H13.5c-1.104,0-2-0.896-2-2s0.896-2,2-2H24V14c0-1.104,0.896-2,2-2s2,0.896,2,2v10h10.5c1.104,0,2,0.896,2,2 S39.604,28,38.5,28z"/>
        </svg>
        <span class="uppercase">Create</span>
    </button>
    <button class="flex-auto mr-5 panel__main__header__create bg-green-800 hover:bg-green-900 py-2 px-4 rounded inline-flex items-center">
        <svg class="fill-current w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
            <path d="m32 3a29 29 0 1 0 29 29 29.032 29.032 0 0 0 -29-29zm-1.225 24.953a2 2 0 1 1 -2.828 2.828l-7.314-7.314v6.633a2 2 0 0 1 -4 0v-11.461a2 2 0 0 1 2-2h11.467a2 2 0 0 1 0 4h-6.639zm16.592 17.408a2 2 0 0 1 -2 2h-11.467a2 2 0 0 1 0-4h6.643l-7.314-7.314a2 2 0 1 1 2.828-2.828l7.314 7.314v-6.633a2 2 0 0 1 4 0z"/>
        </svg>
        <span class="uppercase">Filters</span>
    </button>
    <button on:click={resetAll} class="flex-auto mr-5 panel__main__header__create bg-blue-800 hover:bg-blue-900 py-2 px-4 rounded inline-flex items-center">
        <svg class="fill-current w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 239.299 239.299">
            <path d="M119.649,239.299c58.792,0,106.623-47.831,106.623-106.623c0-56.215-43.73-102.402-98.958-106.345V0L60.293,45.351 l67.021,45.352V65.093c33.913,3.822,60.362,32.665,60.362,67.583c0,37.51-30.517,68.026-68.026,68.026s-68.026-30.517-68.026-68.026 c0-14.646,4.579-28.594,13.241-40.335L33.806,69.426c-13.594,18.426-20.78,40.297-20.78,63.25 C13.026,191.468,60.857,239.299,119.649,239.299z"/>
        </svg>
        <span class="uppercase">Reset</span>
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