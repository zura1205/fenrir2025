<template>
    <v-container>
        <a href="/" class="title-link">
            <h1 class="text-h2 font-weight-bold">Gourmet Walk</h1>
            <p>ここから歩いて食べに行こう</p>
        </a>
    </v-container>
    <v-row class="sticky-top ma-0">
        <v-col class="text-center">
            <v-btn-group v-model="distance" color="primary" divided variant="outlined" class="my-4 bg-white" elevated="4">
                <v-btn
                    :to="{ name: 'Search', query: { lat: this.$route.query.lat, lng: this.$route.query.lng }, params: { range: 1 } }">
                    300 m
                </v-btn>

                <v-btn
                    :to="{ name: 'Search', query: { lat: this.$route.query.lat, lng: this.$route.query.lng }, params: { range: 2 } }">
                    500 m
                </v-btn>

                <v-btn
                    :to="{ name: 'Search', query: { lat: this.$route.query.lat, lng: this.$route.query.lng }, params: { range: 3 } }">
                    1,000 m
                </v-btn>

                <v-btn
                    :to="{ name: 'Search', query: { lat: this.$route.query.lat, lng: this.$route.query.lng }, params: { range: 4 } }">
                    2,000 m
                </v-btn>

                <v-btn
                    :to="{ name: 'Search', query: { lat: this.$route.query.lat, lng: this.$route.query.lng }, params: { range: 5 } }">
                    3,000 m
                </v-btn>
            </v-btn-group>
        </v-col>
    </v-row>
    <v-slide-y-reverse-transition group hide-on-leave>
        <v-container v-if="!isLoading" transition="fade-transition">
            <template v-if="shop.length > 0">
                <v-row>
                    <v-col v-for="info in shop" :key="info" cols="12">
                        <v-card
                            :to="{ name: 'Shop', query: { lat: this.$route.query.lat, lng: this.$route.query.lng }, params: { id: info.id } }">
                            <v-row>
                                <v-col cols="12" sm="3">
                                    <v-img :lazy-src="info.photo.pc.l" :src="info.photo.pc.m" height="200" cover>
                                        <v-img :lazy-src="info.photo.pc.l" :src="info.photo.pc.l" height="200" contain
                                            style="backdrop-filter: blur(6px);" />
                                    </v-img>
                                </v-col>
                                <v-col cols="12" sm="9">
                                    <v-card-title>
                                        <p class="text-body-2 mb-n2">{{ info.name_kana }}</p>
                                        <h4>{{ info.name }}</h4>
                                        <!-- <p class="text-subtitle-1 mt-n1">{{ info.genre.name }}</p> -->
                                        <div class="d-flex ga-2 flex-wrap">
                                            <v-chip>{{ info.genre.name }}</v-chip>
                                            <v-chip color="green" v-if="info.capacity && info.capacity > 50"
                                                append-icon="mdi-sofa-single-outline">座席多め</v-chip>
                                            <v-chip color="orange" v-if="info.free_drink && info.free_drink.includes('あり')"
                                                append-icon="mdi-glass-mug-variant">飲み放題</v-chip>
                                            <v-chip color="purple" v-if="info.free_food && info.free_food.includes('あり')"
                                                append-icon="mdi-food-drumstick">食べ放題</v-chip>
                                            <v-chip color="purple" v-if="info.course && info.course.includes('あり')"
                                                append-icon="mdi-silverware">コース料理</v-chip>
                                        </div>
                                    </v-card-title>
                                    <v-card-text>
                                        <div class="d-flex justify-start align-center my-1" v-if="info.catch">
                                            <v-icon icon="mdi-thumb-up-outline" class="mr-2" />
                                            <div>{{ info.catch }}</div>
                                        </div>
                                        <div class="d-flex justify-start align-center my-1">
                                            <v-icon icon="mdi-map-marker-outline" class="mr-2" />
                                            <div>{{ info.access }}</div>
                                        </div>
                                    </v-card-text>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
                <v-pagination class="my-6" v-model="page" :length="Math.ceil(results.results_available / itemPerPage)"
                    :total-visible="5"></v-pagination>
            </template>
            <div class="text-center mb-10" v-else>
                検索結果が見つかりませんでした。
            </div>
        </v-container>
    </v-slide-y-reverse-transition>
    <v-fade-transition>
        <template v-if="isLoading">
            <v-row class="mb-16" justify="center">
                <v-col class="text-subtitle-1 text-center" cols="12">
                    近くのお店を探しています...
                </v-col>
                <v-col cols="6">
                    <v-progress-linear indeterminate rounded height="6"></v-progress-linear>
                </v-col>
            </v-row>
        </template>
    </v-fade-transition>
</template>
  
<script>
import router from '@/router';
import axios from 'axios';

export default {
    name: 'Search',
    data() {
        return {
            distance: "3",
            latitude: null,
            longitude: null,
            results: {},
            shop: [],
            itemPerPage: 10,
            page: 1,
            isLoading: false
        }
    },
    methods: {
        search: function () {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                const params = { lat: this.latitude, lng: this.longitude, range: this.distance }
                this.groumetApi(params);
            }, (error) => {
                alert("位置情報が取得できませんでした : " + error);
            });
        },
        groumetApi: function (params) {
            this.isLoading = true;
            // const endPoint = "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/";
            const endPoint = "https://script.google.com/macros/s/AKfycbyopwYlpQ2WeZ19TAk7DdoYUoBfu7HemDjZiXimkEsxaRgO90QQc8T1OYHP2QgaVud9qw/exec"
            params.key = import.meta.env.VITE_RECRUIT_API;
            params.format = "json";
            axios.get(endPoint, {
                params: params,
                headers: { 'content-type': 'application/x-www-form-urlencoded' }
            }).then((res) => {
                this.results = res.data.results;
                this.shop = this.results.shop;
                this.isLoading = false;
            }).catch((e) => {
                console.log(e);
            })
        }
    },
    mounted: function () {
        const page = this.$route.query.page;
        if (page != null && !isNaN(page)) {
            this.page = Number(page);
        }
        const params = {
            lat: this.$route.query.lat,
            lng: this.$route.query.lng,
            range: this.$route.params.range,
            start: (this.page - 1) * this.itemPerPage + 1,
            count: this.itemPerPage
        }
        this.groumetApi(params);
    },
    watch: {
        page: function (newVal) {
            this.$router.push({ name: 'Search', query: { lat: this.$route.query.lat, lng: this.$route.query.lng, page: newVal }, params: { range: this.$route.params.range } })
            const params = {
                lat: this.$route.query.lat,
                lng: this.$route.query.lng,
                range: this.$route.params.range,
                start: (newVal - 1) * this.itemPerPage + 1,
                count: this.itemPerPage
            }
            this.groumetApi(params);
        }
    }
}
</script>
<style>
.sticky-top {
    top: 0;
    position: sticky;
    z-index: 100;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
}

.title-link {
    color: black;
    text-decoration: none;
}
</style>