<script lang="ts">
    import {useNavigate, type NavigateFn} from "svelte-navigator";
    import {UserCircleSolid} from "flowbite-svelte-icons";

    import {authStore} from "../store/auth";
    import Button from "../components/UI/Button.svelte";

    let inputLogin;
    let inputPassword;

    const navigate: NavigateFn = useNavigate();

    const loginAction = async (): Promise<undefined> => {
        if (!inputLogin || !inputPassword)
            return;

        const user = await authStore.login(inputLogin, inputPassword);
        if (user)
            navigate("/", { replace: true });
    };
</script>

<div class="login flex text-gray-900 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="login__header sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
            Sign-in to Admin Panel
        </h2>
    </div>

    <div class="login__form mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" method="POST" action="javascript:void(0);">
            <div>
                <label
                    for="login"
                    class="block text-sm font-medium leading-6"
                >
                    Login
                </label>
                <div class="mt-2">
                    <input
                        id="login"
                        name="login"
                        type="text"
                        bind:value={inputLogin}
                        required
                        class="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-700 sm:text-sm sm:leading-6"
                    >
                </div>
            </div>

            <div>
                <label
                    for="password"
                    class="block text-sm font-medium leading-6"
                >
                    Password
                </label>
                <div class="">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        bind:value={inputPassword}
                        required
                        class="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-700 sm:text-sm sm:leading-6"
                    >
                </div>
            </div>

            <div>
                <Button
                    title="Sign in"
                    type="submit"
                    classes="w-full"
                    color="cyan"
                    on:click={loginAction}
                >
                    <UserCircleSolid size="md" />
                </Button>
            </div>
        </form>

        <p class="mt-10 text-center text-sm text-gray-500">
            Powered by
            <a
                href="https://github.com/OlenEnkeli/north_admin"
                class="font-semibold leading-6 text-cyan-700 hover:text-cyan-600"
            >
                NorthAdmin
            </a>
        </p>
    </div>
</div>