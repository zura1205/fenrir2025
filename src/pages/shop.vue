<template>
    <v-container>
        <a href="/" class="title-link">
            <h1 class="text-h2 font-weight-bold">Gourmet Walk</h1>
            <p>ここから歩いて食べに行こう</p>
        </a>
        <v-btn variant="tonal" prepend-icon="mdi-arrow-left" @click="$router.go(-1)" class="mt-4 mb-2">検索結果に戻る</v-btn>
    </v-container>

    <v-slide-y-reverse-transition group hide-on-leave>
        <template v-if="!isLoading" transition="fade-transition">
            <v-img :lazy-src="photo.s" :src="photo.s" height="300" width="100%" cover>
                <v-img :lazy-src="photo.l" :src="photo.l" height="100%" contain style="backdrop-filter: blur(6px);" />
                <div class="position-absolute shop-title">
                    <v-container>
                        <p class="text-body-2 mb-n1">{{ shop.name_kana }}</p>
                        <h2>{{ shop.name }}</h2>
                        <div class="d-flex align-center">
                            <v-chip>{{ genre.name }}</v-chip>
                            <p class="text-body ml-4">{{ shop.catch }}</p>
                        </div>
                    </v-container>
                </div>
            </v-img>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <h3>店舗情報</h3>
                        <v-card>
                            <v-v-card-text>
                                <v-list>
                                    <v-list-item prepend-icon="mdi-clock-outline">
                                        {{ shop.open }}
                                    </v-list-item>
                                    <v-list-item prepend-icon="mdi-sleep">
                                        定休日：{{ shop.close }}
                                    </v-list-item>
                                    <v-list-item prepend-icon="mdi-map-outline">
                                        {{ shop.address }}
                                    </v-list-item>
                                    <v-list-item prepend-icon="mdi-sofa-single-outline">
                                        総席数 {{ shop.capacity }} 席
                                    </v-list-item>
                                    <v-list-item prepend-icon="mdi-credit-card-outline">
                                        クレジットカード： {{ shop.card }}
                                    </v-list-item>
                                </v-list>
                            </v-v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <h3>当店のサービス</h3>
                        <v-card>
                            <v-v-card-text>
                                <v-list>
                                    <v-list-item prepend-icon="mdi-glass-mug-variant">
                                        飲み放題：{{ shop.free_drink }}
                                    </v-list-item>
                                    <v-list-item prepend-icon="mdi-food-drumstick">
                                        食べ放題：{{ shop.free_food }}
                                    </v-list-item>
                                    <v-list-item prepend-icon="mdi-silverware">
                                        コース料理：{{ shop.course }}
                                    </v-list-item>
                                    <v-list-item prepend-icon="mdi-door-sliding">
                                        個室：{{ shop.private_room }}
                                    </v-list-item>
                                    <v-list-item prepend-icon="mdi-smoking-off">
                                        禁煙席：{{ shop.non_smoking }}
                                    </v-list-item>
                                    <v-list-item prepend-icon="mdi-wifi">
                                        WiFi：{{ shop.wifi }}
                                    </v-list-item>
                                </v-list>
                            </v-v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <h3>アクセス</h3>
                        <v-card>
                            <v-v-card-text>
                                <iframe
                                    :src="'https://maps.google.co.jp/maps?q=' + shop.lat + ',' + shop.lng + '&amp;output=embed'"
                                    width="100%" height="300px" id="mapfield" class="google-map"></iframe>
                                <v-list class="mt-n6">
                                    <v-list-item prepend-icon="mdi-walk">
                                        {{ shop.access }}
                                    </v-list-item>
                                </v-list>
                            </v-v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
            <div class="text-center py-6 sticky-bottom mb-10">
                <v-btn size="x-large" :href="shopUrl" class="mx-auto" target="_blank" rel="noopener">ご予約はこちら</v-btn>
            </div>

        </template>
    </v-slide-y-reverse-transition>
    <v-fade-transition>
        <template v-if="isLoading">
            <v-row class="mb-16" justify="center">
                <v-col cols="1" class="text-center">
                    <v-progress-circular indeterminate model-value="20" size="50" width="6"></v-progress-circular>
                </v-col>
                <v-col class="text-subtitle-1 text-center" cols="12">
                    お店の情報を読み込み中...
                </v-col>
                
            </v-row>
        </template>
    </v-fade-transition>
</template>
  
<script>
import router from '@/router';
import axios from 'axios';

export default {
    name: 'Shop',
    data() {
        return {
            distance: "3",
            latitude: null,
            longitude: null,
            results: {},
            shop: {},
            photo: {},
            genre: {},
            shopUrl: "",
            itemPerPage: 10,
            page: 1,
            isLoading: false
        }
    },
    methods: {
        groumetApi: function (params) {
            this.isLoading = true;
            // const endPoint = "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/";
            const endPoint = "https://script.google.com/macros/s/AKfycbyopwYlpQ2WeZ19TAk7DdoYUoBfu7HemDjZiXimkEsxaRgO90QQc8T1OYHP2QgaVud9qw/exec";
            params.key = import.meta.env.VITE_RECRUIT_API;
            params.format = "json";
            axios.get(endPoint, {
                params: params,
                headers: { 'content-type': 'application/x-www-form-urlencoded' }
            }).then((res) => {
                this.results = res.data.results;
                this.shop = this.results.shop[0];
                this.photo = this.shop.photo.pc;
                this.genre = this.shop.genre;
                this.shopUrl = this.shop.urls.pc;
                this.isLoading = false;
            }).catch((e) => {
                console.log(e);
            })
        }
    },
    mounted: function () {
        const params = {
            id: this.$route.params.id
        }
        this.groumetApi(params);
    },
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

.sticky-bottom {
    bottom: 0;
    position: sticky;
    z-index: 100;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
}

.shop-title {
    bottom: 0;
    color: white;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 60%, transparent);
    background: -webkit-linear-gradient(to top, rgba(0, 0, 0, 0.6) 60%, transparent);
    width: 100%;
}

.google-map {
    border: 0;
    padding: 10px
}

.title-link {
    color: black;
    text-decoration: none;
}
</style>