import data from '../utils/watchListData';
import filter from 'lodash/filter';

function fetchData(queryString) {
    if(queryString !== '')
    return filter(data, (item) => item.stockName && item.stockName.includes(queryString.toUpperCase()));
}

export default fetchData;
