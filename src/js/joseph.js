// import example from '../assets/123.png'
// import example2 from '../assets/person-fill1.svg'
// import '../scss/andy.scss';
// import '../scss/joseph.scss';
// import '../scss/main.scss';
// import {c} from './joseph2';

// import { format, formatDistance, formatRelative, subDays } from 'date-fns'
// import * as _  from 'lodash';

import benchmarker from '@x-plan/npm-package-sample';

// const benchmarker = require('@x-plan/npm-package-sample');


window.onload = () => {
  // console.log('你好123456');
  // console.log(process.env.NODE_ENV)
  // console.log(process.env.APP_ENV)

  // getComponent().then((component) => {
  //   console.log(component)
  // });

  // function aa() {
  //   console.log('-----------')
  // }

  // aa();
  // c();
  // d();
  // const now = format(new Date(), 'yyyy-MM-dd')
  // console.log(now);


  // 定義一個想要檢驗花費時間的函式
  function jsonStringify() {
    JSON.stringify({
      foo: 'bar',
    });
  }

  // 執行 benchMarker 這個方法，並把想檢驗的函式放進去
  const costTime = benchmarker(jsonStringify);
  console.log('costTime', costTime);

  // async function getComponent() {
  //   const element = document.createElement("div");

  //   const { default: demoName } = await import(/* webpackChunkName: 'j3' */"./joseph3.js");


  //   return 'finish';
  // }

}
