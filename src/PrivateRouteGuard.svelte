<script lang="ts">
    import { useNavigate, useLocation, useFocus } from "svelte-navigator";
    import {checkAuth, user} from "./store/auth.ts";
    import {onMount} from "svelte";

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
            await checkAuth();
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

