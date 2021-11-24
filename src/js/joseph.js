// import example from '../assets/123.png'
import '../scss/andy.scss';
import '../scss/joseph.scss';
import '../scss/main.scss';
import {c} from './joseph2';
import d from './joseph3';

window.onload = () => {
  console.log('你好123');
  console.log(process.env.NODE_ENV)
  console.log(process.env.APP_ENV)

  function aa() {
    console.log('-----------')
  }

  aa();
  c();
  d();

}
