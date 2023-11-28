<script lang="ts">
    export let paginationList: Array<string | number>;
    export let currentPage: number;

    export let paginate: (page: number) => Promise<void>;
    export let paginateFirst: () => Promise<void>;
    export let paginateLast: () => Promise<void>;
    export let paginateNext: () => Promise<void>;
    export let paginatePrevious: () => Promise<void>;


</script>

<nav class="mb-2 rounded" aria-label="Page navigation example">
    <ul class="flex items-center -space-x-px text-base">
        <li class="flex-1 cursor-pointer" on:click={paginateFirst}>
            <p class="flex items-center justify-center px-4 h-10 leading-tight text-gray-100 border bg-gray-800 hover:bg-gray-600 ">
                <span class="sr-only">First</span>
                <svg class="w-5 h-5 rotate-180" viewBox="0 0 474 474" xmlns="http://www.w3.org/2000/svg" >
                    <g class="layer">
                        <path d="m278.58,219.41c-35.89,-35.89 -71.77,-71.77 -107.66,-107.65c-25.57,-25.56 -65.09,14.26 -39.46,39.88c29.24,29.24 58.48,58.48 87.72,87.71c-29.31,29.31 -58.62,58.62 -87.93,87.93c-25.56,25.56 14.26,65.08 39.88,39.45c35.89,-35.88 71.77,-71.77 107.66,-107.65c10.84,-10.84 10.55,-28.91 -0.21,-39.67z" fill="#FFFFFF" id="svg_2" transform="matrix(1 0 0 1 0 0)"/>
                        <path d="m394.02,215.47c-35.89,-35.89 -71.77,-71.77 -107.66,-107.65c-25.57,-25.56 -65.09,14.26 -39.46,39.88c29.24,29.24 58.48,58.48 87.72,87.71c-29.31,29.31 -58.62,58.62 -87.93,87.93c-25.56,25.56 14.26,65.08 39.88,39.45c35.89,-35.88 71.77,-71.77 107.66,-107.65c10.84,-10.84 10.55,-28.91 -0.21,-39.67z" fill="#FFFFFF" id="svg_3"/>
                    </g>
                </svg>
            </p>
        </li>
        <li class="flex-1 cursor-pointer" on:click={paginatePrevious}>
            <p class="flex items-center justify-center px-4 h-10 leading-tight text-gray-100 border bg-gray-800 hover:bg-gray-600 ">
                <span class="sr-only">Previous</span>
                <svg class="w-5 h-5 rotate-180" viewBox="0 0 474 474" xmlns="http://www.w3.org/2000/svg" >
                    <g class="layer">
                        <path d="m278.58,219.41c-35.89,-35.89 -71.77,-71.77 -107.66,-107.65c-25.57,-25.56 -65.09,14.26 -39.46,39.88c29.24,29.24 58.48,58.48 87.72,87.71c-29.31,29.31 -58.62,58.62 -87.93,87.93c-25.56,25.56 14.26,65.08 39.88,39.45c35.89,-35.88 71.77,-71.77 107.66,-107.65c10.84,-10.84 10.55,-28.91 -0.21,-39.67z" fill="#FFFFFF" id="svg_2" transform="matrix(1 0 0 1 0 0)"/>
                    </g>
                </svg>
            </p>
        </li>
        {#each paginationList as index}
            {#if index === '...'}
                <li class="flex-1">
                    <p class="flex items-center justify-center px-4 h-10 leading-tight text-gray-100 border bg-gray-800 hover:bg-gray-600'}  ">
                        {index}
                    </p>
                </li>
            {:else}
                <li class="flex-1 cursor-pointer" on:click={() => {paginate(index)}}>
                    <p class="flex items-center justify-center px-4 h-10 leading-tight text-gray-100 border {index === currentPage ? 'bg-cyan-800 hover:bg-cyan-600' : 'bg-gray-800 hover:bg-gray-600'}  ">
                        {index}
                    </p>
                </li>
            {/if}
        {/each}
        <li class="flex-1 cursor-pointer" on:click={paginateNext}>
            <p class="flex items-center justify-center px-4 h-10 leading-tight text-gray-100 border bg-gray-800 hover:bg-gray-600 ">
                <span class="sr-only">Next</span>
                <svg class="w-5 h-5" viewBox="0 0 474 474" xmlns="http://www.w3.org/2000/svg" >
                    <g class="layer">
                        <path d="m278.58,219.41c-35.89,-35.89 -71.77,-71.77 -107.66,-107.65c-25.57,-25.56 -65.09,14.26 -39.46,39.88c29.24,29.24 58.48,58.48 87.72,87.71c-29.31,29.31 -58.62,58.62 -87.93,87.93c-25.56,25.56 14.26,65.08 39.88,39.45c35.89,-35.88 71.77,-71.77 107.66,-107.65c10.84,-10.84 10.55,-28.91 -0.21,-39.67z" fill="#FFFFFF" id="svg_2" transform="matrix(1 0 0 1 0 0)"/>
                    </g>
                </svg>
            </p>
        </li>
        <li class="flex-1 cursor-pointer" on:click={paginateLast}>
            <p class="flex items-center justify-center px-4 h-10 leading-tight text-gray-100 border bg-gray-800 hover:bg-gray-600 ">
                <span class="sr-only">First</span>
                <svg class="w-5 h-5" viewBox="0 0 474 474" xmlns="http://www.w3.org/2000/svg" >
                    <g class="layer">
                        <path d="m278.58,219.41c-35.89,-35.89 -71.77,-71.77 -107.66,-107.65c-25.57,-25.56 -65.09,14.26 -39.46,39.88c29.24,29.24 58.48,58.48 87.72,87.71c-29.31,29.31 -58.62,58.62 -87.93,87.93c-25.56,25.56 14.26,65.08 39.88,39.45c35.89,-35.88 71.77,-71.77 107.66,-107.65c10.84,-10.84 10.55,-28.91 -0.21,-39.67z" fill="#FFFFFF" id="svg_2" transform="matrix(1 0 0 1 0 0)"/>
                        <path d="m394.02,215.47c-35.89,-35.89 -71.77,-71.77 -107.66,-107.65c-25.57,-25.56 -65.09,14.26 -39.46,39.88c29.24,29.24 58.48,58.48 87.72,87.71c-29.31,29.31 -58.62,58.62 -87.93,87.93c-25.56,25.56 14.26,65.08 39.88,39.45c35.89,-35.88 71.77,-71.77 107.66,-107.65c10.84,-10.84 10.55,-28.91 -0.21,-39.67z" fill="#FFFFFF" id="svg_3"/>
                    </g>
                </svg>
            </p>
        </li>
    </ul>
</nav>