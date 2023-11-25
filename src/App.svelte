<script lang="ts">
  import {Router, Route} from "svelte-navigator";
  import Login from "./pages/Login.svelte";
  import PrivateRoute from "./PrivateRoute.svelte";
  import {logout, user} from "./store/auth";

  const logoutAction = async (): Promise<void> => {
    return await logout();
  }
</script>

<main>
  <Router>
    <Route path="login">
      <Login />
    </Route>
    <PrivateRoute path="/" let:location let:registerFocus>
      <p>{$user}</p>
      <p>Panel</p>
      <a href="/logout">aaa</a>
    </PrivateRoute>
    <PrivateRoute path="/logout" let:location let:registerFocus>
      <p on:click={logoutAction}>logout</p>
    </PrivateRoute>
  </Router>

</main>

<style lang="postcss">

</style>
