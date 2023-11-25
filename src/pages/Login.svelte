<script lang="ts">
    import {login} from "../store/auth";
    import {useNavigate} from "svelte-navigator";

    let inputLogin;
    let inputPassword;

    const navigate = useNavigate();

    const loginAction = async (): Promise<void> => {
        if (!inputLogin || !inputPassword) {
            console.log('aaa')
            return
        }

        await login(inputLogin, inputPassword);
        navigate("/", { replace: true });
    };
</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8"
>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <!--      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">-->
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign-in to Admin Panel</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" action="#" method="POST">
            <div>
                <label
                        for="login"
                        class="block text-sm font-medium leading-6 text-gray-900"
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
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-700 sm:text-sm sm:leading-6">
                </div>
            </div>

            <div>
                <div class="flex items-center justify-between">
                    <label
                            for="password"
                            class="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Password
                    </label>
                </div>
                <div class="mt-2">
                    <input
                            id="password"
                            name="password"
                            type="password"
                            bind:value={inputPassword}
                            required
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-700 sm:text-sm sm:leading-6"
                    >
                </div>
            </div>

            <div>
                <button
                        type="submit"
                        class="flex w-full justify-center rounded-md bg-cyan-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        on:click={loginAction}
                >
                    Sign in
                </button>
            </div>
        </form>

        <p class="mt-10 text-center text-sm text-gray-500">
            Powered by <a href="https://github.com/OlenEnkeli/north_admin" class="font-semibold leading-6 text-cyan-700 hover:text-cyan-600">NorthAdmin</a>
        </p>
    </div>
</div>