<template>
  <Loading :ready="ready">
    <TodayYesterday :plays="playsSorted" />
    <Week :plays="playsSorted" />
    <Info :sync="sync"></Info>
  </Loading>
</template>

<script>
import { orderBy } from "lodash";
import Info from "./components/Info";
import LastFMService from "./services/LastFMService";
import Loading from "./components/Loading";
import TodayYesterday from "./components/TodayYesterday.vue";
import Week from "./components/Week.vue";
import dayjs from "dayjs";

export default {
  name: "App",
  components: {
    Info,
    Loading,
    TodayYesterday,
    Week
  },
  data() {
    return {
      plays: [],
      sync: null,
      ready: false
    };
  },
  computed: {
    playsSorted() {
      return orderBy(this.plays, "date", "asc");
    }
  },
  mounted() {
    setInterval(this.getLastFmData, 60 * 1000);
    this.getLastFmData();
  },
  methods: {
    getLastFmData() {
      this.ready = false;
      LastFMService.getStats().then(plays => {
        this.plays = plays;
        this.sync = dayjs().unix();
        this.ready = true;
      });
    }
  }
};
</script>
