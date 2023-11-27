<script lang="ts">
    import {removeError} from "../store/errors";

    export let currentError: string;
    export let index: number;

    let closeErrorAction = (): void => {
        removeError(index);
    };
</script>

<div id="alert-danger" class="flex items-center p-4 mb-2 text-red rounded-lg bg-red-50 dark:bg-gray dark:text-red-300" role="alert">
    <span class="sr-only">Info</span>
    <div class="ms-3 text-sm font-medium">
        {currentError}
    </div>
    <button
            type="button"
            class="ms-auto -mx-1.5 -my-1.5 text-red-300 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray dark:text-red-300 dark:hover:bg-red-800"
            data-dismiss-target="#alert-danger"
            aria-label="Close"
            on:click={closeErrorAction}
    >
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
    </button>
</div>
