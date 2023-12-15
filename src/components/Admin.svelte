<script lang="ts">
    import {type AdminModel} from "../api/adminInfo";
    import {type ListItems} from "../api/endpoint";

    import {onMount} from "svelte";
    import {endpointStore} from "../store/endpoint";
    import {range} from "../helpers";
    import AdminHeader from "./AdminHeader.svelte";
    import AdminTable from "./AdminTable.svelte";
    import AdminPagination from "./AdminPagination.svelte";
    import AdminModal from "./AdminModal.svelte";
    import {alertStore} from "../store/alert";

    export let modelName: string;
    export let modelInfo: AdminModel;

    let screenWidth: number | null = null;
    let items: ListItems | null = null;

    const itemsOnPageOptions: number[] = [10, 25, 50, 100];

    let itemsOnPage: number = 25;
    let includeSoftDeleted: boolean = true;

    let pagesAmount: number;
    let currentPage: number = 1;
    let paginationMaxAmount: number = 20;
    let paginationList: Array<string | number> = [];

    let selectedElements: boolean[] = [];
    let allSelected: boolean = false;

    let sortBy: string | undefined;
    let sortAsc: boolean = true;

    let modalWindowOpened: boolean = false;
    let modalWindowAction: string | null = 'get';
    let modalWindowsItem: object | null = null;

    const getItems = async (): Promise<void> => {
        await new Promise(r => setTimeout(r, 1));
        items = await endpointStore.list(
            modelName,
            includeSoftDeleted,
            currentPage,
            itemsOnPage,
            sortAsc,
            sortBy,
        );

        countPagination();
    };

    const countPagination = (): void => {
        if (!items)
            return;

        paginationMaxAmount = screenWidth < 1500 ? 10 : 20;

        const pagesToEnd = items.pagesAmount - currentPage;

        if (items.pagesAmount <= paginationMaxAmount) {
            paginationList = range(1, items.pagesAmount + 1);
            return;
        }

        if (currentPage < 10)
            paginationList = [
                ...range(1, paginationMaxAmount / 2),
                ...pagesToEnd < paginationMaxAmount / 2 ? range(currentPage, pagesToEnd) : [
                    ...range((paginationMaxAmount / 2) + 2, Math.min(paginationMaxAmount + 1, items.pagesAmount)),
                    '...',
                ],
            ];
        else
            paginationList = [
                ...[
                    '...',
                    ...range(currentPage - (paginationMaxAmount / 2) + 1, currentPage),
                ],
                ...pagesToEnd < 10 ? range(currentPage + 1, items.pagesAmount) : [
                    ...range(currentPage + 1, currentPage + (paginationMaxAmount / 2)),
                    '...',
                ],
            ];
    }

    const resetSelected = (): void => {
        if (!items)
            return;

        selectedElements = Array(items.items.length).fill(false);
        allSelected = false;
    };

    const resetAll = async (): Promise<void> => {
        resetSelected();

        currentPage = 1;
        itemsOnPage = 25;
        sortAsc = true;
        sortBy = undefined;

        await getItems();
    };

    const paginate = async (page: number): Promise<void> => {
        if (!items)
            return;

        resetSelected();

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


    const paginateFirst = async (): Promise<void> => {
        await paginate(1);
    };

    const paginateLast = async (): Promise<void> => {
        if (!items)
            return;

        await paginate(items.pagesAmount);
    };

    const changeSortBy = async (column: string): Promise<void> => {
        sortAsc = sortBy === column ? !sortAsc : true

        sortBy = column;
        await getItems();
    };

    const selectAll = (): void => {
        if (!items)
            return;

        allSelected = !allSelected;
        selectedElements = Array(items.items.length).fill(allSelected);
    };

    const getItemByIndex = (index: number): object | null => {
        if (!items)
            return null;

        return items.items[index];
    };

    const openModal = (action: string, index?: number): undefined => {
        switch (action) {
            case 'create':
                modalWindowOpened = true;
                modalWindowAction = action;
                break;

            case 'get':
            case 'edit':
                if (index == undefined)
                    return;

                let item = getItemByIndex(index);
                if (!item)
                    return;

                modalWindowsItem = item;

                modalWindowOpened = true;
                modalWindowAction = action;
                break;

            default:
                alertStore.add({
                    type: 'error',
                    message: `Unknown action ${action}`,
                });
                break;
        }
    };

    onMount(async () => {
        await getItems();
        if (!items)
            return;

        sortBy = modelInfo.pkeyColumn;
        pagesAmount = Math.ceil(items.totalAmount / items.paginationSize);
    });

</script>

<svelte:window bind:outerWidth={screenWidth} />

<div class="panel__main h-full w-full">
    {#if modalWindowOpened}
        <AdminModal
            bind:modalWindowOpened={modalWindowOpened}
            bind:modelWindowAction={modalWindowAction}
        />
    {/if}

    <AdminHeader
        bind:items={items}
        bind:includeSoftDeleted={includeSoftDeleted}
        bind:itemsOnPage={itemsOnPage}
        openModal={openModal}
        itemsOnPageOptions={itemsOnPageOptions}
        resetAll={resetAll}
        getItems={getItems}
    />

    <AdminTable
        bind:items={items}
        bind:allSelected={allSelected}
        bind:sortBy={sortBy}
        bind:sortAsc={sortAsc}
        bind:selectedElements={selectedElements}
        openModal={openModal}
        modelInfo={modelInfo}
        selectAll={selectAll}
        changeSortBy={changeSortBy}
    />

    <AdminPagination
        bind:paginationList={paginationList}
        bind:currentPage={currentPage}
        paginate={paginate}
        paginateFirst={paginateFirst}
        paginateLast={paginateLast}
        paginateNext={paginateNext}
        paginatePrevious={paginatePrevious}
    />
</div>
