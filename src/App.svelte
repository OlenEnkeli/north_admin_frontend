<script lang="ts">
  import {Router, Route} from "svelte-navigator";
  import Login from "./pages/Login.svelte";
  import PrivateRoute from "./PrivateRoute.svelte";
  import {logout, user} from "./store/auth";
  import {errors} from "./store/errors";
  import Errors from "./components/Errors.svelte";

  const logoutAction = async (): Promise<void> => {
    return await logout();
  }

  let APIErrors: string[]
  errors.subscribe((errors: string[]) => {APIErrors = errors});
</script>

<main>
  <Errors errors={APIErrors} />
  <Router>
    <Route path="login">
      <Login />
    </Route>
    <PrivateRoute path="/" let:location let:registerFocus>
      <p>{$user}</p>
      <p>Panel</p>
      <p on:click={logoutAction}>Logout</p>
    </PrivateRoute>
  </Router>
</main>

<style lang="postcss">

</style>
