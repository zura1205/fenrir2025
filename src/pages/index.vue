<template>
  <v-container class="fill-height">
      <v-responsive class="align-center text-center fill-height">
          <h1 class="text-h2 font-weight-bold">Gourmet Walk</h1>
          <p>ここから歩いて食べに行こう</p>
          <v-btn-toggle v-model="distance" mandatory color="primary" divided variant="outlined" class="my-4">
              <v-btn value="1" text>
                  300 m
              </v-btn>

              <v-btn value="2" text>
                  500 m
              </v-btn>

              <v-btn value="3" text>
                  1,000 m
              </v-btn>

              <v-btn value="4" text>
                  2,000 m
              </v-btn>

              <v-btn value="5" text>
                  3,000 m
              </v-btn>
          </v-btn-toggle>

          <div class="my-2 d-flex justify-center ga-5">
              <div>
                  <v-icon icon="mdi-walk" size="50" />
                  <div>徒歩{{ Math.round(distanceArr[distance - 1] / 80.1) }}分</div>
              </div>
              <div>
                  <v-icon icon="mdi-bike" size="50" />
                  <div>自転車{{ Math.round(distanceArr[distance - 1] / 250) }}分</div>
              </div>
              <div>
                  <v-icon icon="mdi-car" size="50" />
                  <div>自動車{{ Math.round(distanceArr[distance - 1] / 566.7) }}分</div>
              </div>
          </div>

          <v-row class="my-2">
              <v-col>
                  <v-btn @click="search" :loading="isLoading" size="x-large" prepend-icon="mdi-magnify"
                      >検索する</v-btn>
              </v-col>
          </v-row>

          <v-row>
              <v-col>
                  
              </v-col>
          </v-row>
      </v-responsive>

  </v-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
      return {
          distance: "3",
          latitude: null,
          longitude: null,
          distanceArr: [300,500,1000,2000,3000],
          isLoading: false,
      }
  },
  methods: {
      search: function () {
          this.isLoading = true;
          navigator.geolocation.getCurrentPosition((position) => {
              this.latitude = position.coords.latitude;
              this.longitude = position.coords.longitude;
              this.$router.push({ name: 'Search', query: {lat: this.latitude, lng: this.longitude}, params:{range: this.distance}})
          }, (error) => {
              alert("位置情報が取得できませんでした : " + error);
          });
      },
  }
}
</script>
