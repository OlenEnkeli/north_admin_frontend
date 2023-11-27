<script lang="ts">
  import {Router, Route} from "svelte-navigator";
  import Login from "./pages/Login.svelte";
  import PrivateRoute from "./PrivateRoute.svelte";
  import {logout} from "./store/auth";
  import {errors} from "./store/errors";
  import Errors from "./components/Errors.svelte";
  import Panel from "./pages/Panel.svelte";

  const logoutAction = async (): Promise<void> => {
    return await logout();
  }

  let APIErrors: string[]
  errors.subscribe((errors: string[]) => {APIErrors = errors});
</script>

<main id="root">
  <Errors errors={APIErrors} />
  <Router>
    <Route path="login">
      <Login />
    </Route>
    <PrivateRoute path="/" let:location let:registerFocus>
      <Panel logoutAction={logoutAction} />
    </PrivateRoute>
  </Router>
</main>

<style lang="postcss">

</style>
