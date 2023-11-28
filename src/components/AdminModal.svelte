<script lang="ts">
    export let modalWindowOpened: boolean;
    export let modalWindowAction: string;
</script>

<div class="panel__modal fixed top-0 left-0 z-50 w-full h-full  p-4 overflow-x-hidden overflow-y-auto">
    <div class="panel__modal__inner m-15 rounded">
        <div class="relative rounded-lg text-gray-900  bg-gray-100">
            <div class="flex items-center justify-between p-4 border-b rounded-t border-gray-600">
                <h3 class="text-xl font-medium">
                    Detail view item <span class="font-bold">10</span> on <span class="font-bold">User</span> model
                </h3>
                <button type="button" on:click={() => {modalWindowOpened = false}} class="bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
        </div>
    </div>
</div>