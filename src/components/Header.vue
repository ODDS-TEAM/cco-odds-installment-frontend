<template>
  <div>
    <v-app-bar color="white" position="center">
      <v-row>
        <v-col cols="2">
          <router-link to="/">
            <v-img src="../assets/odds_logo.png" height="40" max-width="120"></v-img>
          </router-link>
        </v-col>
        <v-col col="2">
          <v-toolbar-title class="font-color">ODDS Installment</v-toolbar-title>
        </v-col>
        <v-col cols="2"></v-col>
      </v-row>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.font-color {
  color: black;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
