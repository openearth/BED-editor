<template>
<v-navigation-drawer class="pl-16" permanent absolute width="40vw">
  <v-container class="account d-flex flex-column pa-3" fill-height>
    <h2 class="h3">
      Account
    </h2>
    <div class="account-details flex-grow-1 py-3">
      <h3 class="h4">
        Account Details
      </h3>
      <dl v-if="user.email" class="account-details__list">
        <dt>Name</dt>
        <dd>{{ name }}</dd>
        <dt>Email address</dt>
        <dd>{{ email }}</dd>
        <dt>Phone number</dt>
        <dd>{{ phone }}</dd>
      </dl>
      <div v-else class="account-details__placeholder">
        <p>Please login to view your account details</p>
      </div>
    </div>

    <div class="flex-shrink-0">
      <v-btn v-if="!user.email" :href="loginUrl">
        Login
      </v-btn>
      <v-btn v-else :href="logoutUrl">
        Logout
      </v-btn>
    </div>
  </v-container>
</v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['user']),
    loginUrl () {
      // Go to login endpoint in BE. Use the route 'callback' to handle the
      // authorization on redirect and set session cookies
      return `${process.env.VUE_APP_EDITOR_SERVER}/login?redirect_uri=${window.location.origin}/callback`
    },
    logoutUrl () {
      // Remove session cookies and use logout endpoint from BE
      return `${process.env.VUE_APP_EDITOR_SERVER}/logout`
    },
    name () {
      return this.user.name || '--'
    },
    email () {
      return this.user.email || '--'
    },
    phone () {
      return this.user.phone || '--'
    }
  },
  methods: {
    login () {
    },
    logout () {
    }
  }
}
</script>

<style>
.account {
  align-items: flex-start;
}

.account-details__placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
}

.account-details dt {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.account-details dd {
  margin-bottom: var(--spacing-small);
  margin-left: 0;
}
</style>
