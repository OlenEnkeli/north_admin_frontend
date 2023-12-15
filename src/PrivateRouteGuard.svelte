<script lang="ts">
    import {onMount} from "svelte";
    import { useNavigate, useLocation, useFocus } from "svelte-navigator";

    import {authStore, user} from "./store/auth.ts";


    let isChecking: Boolean = true;

    const registerFocus = useFocus();
    const navigate = useNavigate();
    const location = useLocation();

    const navigateToLogin = () => {
        navigate("/login", {
            state: { from: $location.pathname },
            replace: true,
        });
    };

    onMount(async () => {
        try {
            await authStore.check();
        } catch {
            navigateToLogin();
        } finally {
            isChecking = false;
        }
    });

    $: if (!$user && !isChecking) {
        navigateToLogin();
    }

</script>

{#if $user && !isChecking}
    <slot {registerFocus} />
{/if}

