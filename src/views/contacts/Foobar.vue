<template>
  <div>My component</div>

  {{ userdetails }}

</template>

<script>
import gql from 'graphql-tag';
export default {
  apollo: {
    // Simple query that will update the 'hello' vue property
    userdetails: gql`query { userdetails { id } }`,
    $client: 'apolloClient',
  },
}
</script>