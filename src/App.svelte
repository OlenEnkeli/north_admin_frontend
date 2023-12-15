<script lang="ts">
  import {Router, Route} from "svelte-navigator";

  import Login from "./pages/Login.svelte";
  import PrivateRoute from "./PrivateRoute.svelte";
  import {authStore} from "./store/auth";
  import {alerts, type Alert} from "./store/alert";
  import Alerts from "./components/Alerts.svelte";
  import Panel from "./pages/Panel.svelte";

  const logoutAction = async (): Promise<void> => {
    return await authStore.logout();
  }

  let alertsList: Alert[];

  alerts.subscribe((alerts: Alert[]) => {alertsList = alerts});
</script>

<main id="root">
  <Alerts alerts={alertsList} />

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
