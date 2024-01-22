import axios from "axios";
import dayjs from "dayjs";

export default {
  async getStats() {
    return this.getPlays().then(plays => {
      return this.groupPlaysPerDay(plays);
    });
  },
  async getPlays() {
    let plays = [];
    let page = 1;

    return new Promise(resolve => {
      const cb = () => {
        axios.get(this.buildLastFmUrl(page)).then(res => {
          plays.push(...res.data.recenttracks.track);

          const lastPlay = res.data.recenttracks.track.slice(-1)[0];
          const lastPlayDate = dayjs.unix(lastPlay.date.uts);

          const differenceInDays = dayjs()
            .startOf("day")
            .diff(lastPlayDate.startOf("day"), "days");
          if (differenceInDays > 7) {
            resolve();
            return;
          }

          page++;
          cb();
        });
      };
      cb();
    }).then(() => {
      return plays;
    });
  },
  groupPlaysPerDay(plays) {
    let stats = [];

    for (let i = 0; i < 7; i++) {
      const day = dayjs().subtract(i, "day");
      const dayFormatted = day.format("YYYY-MM-DD");
      const playCount = plays.filter(
        play =>
          play.date && // Currently playing tracks don't have a date
          dayjs.unix(play.date.uts).format("YYYY-MM-DD") === dayFormatted
      ).length;

      stats.push({
        date: dayFormatted,
        count: playCount
      });
    }

    return stats;
  },
  buildLastFmUrl(page) {
    return (
      `https://ws.audioscrobbler.com/2.0/` +
      `?method=user.getrecenttracks` +
      `&api_key=${process.env.VUE_APP_LAST_FM_API_KEY}` +
      `&format=json` +
      `&limit=200` +
      `&page=${page}` +
      `&user=${process.env.VUE_APP_LAST_FM_USER}`
    );
  }
};
