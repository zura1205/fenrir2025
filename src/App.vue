<template>
  <v-app>
    <v-main>
      <router-view :key="$route.params.range" />
      <div class="text-center">
        <a href="http://webservice.recruit.co.jp/"><img src="http://webservice.recruit.co.jp/banner/hotpepper-m.gif"
            alt="ホットペッパーグルメ Webサービス" width="88" height="35" border="0" title="ホットペッパーグルメ Webサービス"></a>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
//
</script>
