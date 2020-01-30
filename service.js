const { JWT } = require('google-auth-library');
const keys = require('./stats4sd.json');

async function main() {
  const client = new JWT(keys.client_email, null, keys.private_key, [
    'https://www.googleapis.com/auth/analytics.readonly'
  ]);

  const viewId = '201510174';
  //  const url = `https://content.googleapis.com/analytics/v3/data/ga?start-date=120daysAgo&end-date=yesterday&ids=ga%${viewId}&metrics=ga%3Asessions%2Cga%3Ausers&dimensions=ga%3Adate&output=dataTable&_src=embed-api%3Av1`;
  //const url = `https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A${viewId}&start-date=120daysAgo&end-date=2020-01-29&metrics=ga%3Apageviews&dimensions=ga%3ApagePath&sort=-ga%3Apageviews`;
  const url = `https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A${viewId}&start-date=120daysAgo&end-date=yesterday&metrics=ga%3Apageviews&dimensions=ga%3ApagePath&sort=-ga%3Apageviews`;

  const res = await client.request({ url });
  console.log(res.config.headers.Authorization.slice(7));
}

main().catch(console.error);
