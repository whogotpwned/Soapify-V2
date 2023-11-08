<template>
  <div>My component</div>

  {{ userdetails }}

</template>

<script>
import { watch } from "vue"
import gql from 'graphql-tag';
import { useSubscription } from "@vue/apollo-composable"

export default {

  apollo: {
    // Simple query that will update the 'hello' vue property
    userdetails: gql`query { userdetails { id } }`,
    $client: 'apolloClient',
  },
}
</script>