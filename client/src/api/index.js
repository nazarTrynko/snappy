import axios from 'axios';
import qs from 'qs';

export default (function () {

  const fetch = (method, url, body, headers) =>
    axios[method](`http://localhost:3000/${url}`, qs.stringify(body));

  // return all shippings that were registered
  const getShippings = () => {
    return fetch('get', 'shippings').then(({data}) => data);
  }

  //save new shipping information
  const saveShipping = data => fetch('post', 'shippings', data);

  return {
    getShippings: getShippings,
    saveShipping: saveShipping
  };

})();
