import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';
import { sleep } from 'k6';

export const errorRate = new Rate('errors');
// spike test profile
export let options = {
  stages: [
    { duration: '5s', target: 100 }, // below normal load
    { duration: '1m', target: 100 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<50'], // 99% of requests must complete below 50ms
    errors: ['rate<0.01'], // <1% errors
  },
};
// stress test profile
// export let options = {
//   stages: [
//     { duration: '10s', target: 1 },
//     { duration: '30s', target: 1 },
//     { duration: '10s', target: 10 },
//     { duration: '30s', target: 10 },
//     { duration: '10s', target: 100 },
//     { duration: '30s', target: 100 },
//     { duration: '30s', target: 1000 },
//     { duration: '1m', target: 1000 },
//     { duration: '1m', target: 1500 },
//     { duration: '2m', target: 1500 },
//     { duration: '1m', target: 0 },
//   ],
//   thresholds: {
//     http_req_duration: ['p(99)<50'], // 99% of requests must complete below 50ms
//     errors: ['rate<0.01'], // <1% errors
//   },
// };

export default function () {
  const res = http.get(`http://localhost:8030/listings/${Math.floor(Math.random() * 10000000)}/similar-homes`);
  const result = check(res, {
    'status is 200': (r) => r.status == 200,
  });
  errorRate.add(!result);

  sleep(1);
}
