import React, {useState} from 'react';
import MaterialTable from 'material-table';
import filter from 'lodash/filter';
import TextField from '@material-ui/core/TextField';
import initialData from '../../utils/initialWatchList';
import fetchData from '../../api/fetchData';
import cx from 'classnames';
import './WatchList.css';

function WatchListTable() {
    const [watchList, setWatchList] = useState(initialData);
    const [searchWatchList, setSearchWatchList] = useState([]);
    const onDeleteElement = (data) => {
        const updatedList = filter(watchList, (item) => {
            return item.id !== data.id
        });
        setWatchList(updatedList);
    };

    const handleSearch = (e) => {
        let data;
        if (e.target) {
            data = fetchData(e.target.value);
        }
        console.log(data);
        setSearchWatchList(data);
    }
    return (
        <div>
            <MaterialTable
                title="WatchList Dashboard"
                columns={[
                    {title: 'Name', field: 'stockName'},
                    {title: 'Open', field: 'open', type: 'numeric'},
                    {title: 'Close', field: 'close', type: 'numeric'},
                    {title: 'High', field: 'high', type: 'numeric'},
                    {title: 'Low', field: 'low', type: 'numeric'},
                    {title: 'Volume', field: 'volume', type: 'numeric'},
                ]}
                data={watchList}
                actions={[
                    {
                        icon: 'delete',
                        tooltip: 'Delete User',
                        onClick: (event, rowData) => onDeleteElement(rowData)
                    }
                ]}
            />
            <div className="watchList-footer">
                <TextField id="addSymbol" label="Add Symbol" variant="outlined" onChange={(e) => {
                    handleSearch(e)
                }}/>
            </div>
            <div className={cx((searchWatchList && searchWatchList.length > 0) ? "watchList-autoComplete" : "")}>
                {searchWatchList && searchWatchList.map(item => {
                    return (
                        <div
                            className="watchList-searchValue"
                            onClick={() => {
                                const addItem = filter(watchList, (listItem) => item.id === listItem.id);
                                console.log(addItem);
                                if(addItem.length > 0) {
                                    alert('Stock exist in list');
                                }
                                else {
                                    setWatchList([...watchList, item])
                                }
                                setSearchWatchList([]);
                            }}>
                            {item.stockName}
                        </div>)
                })}
            </div>
        </div>
    );
}

export default WatchListTable;
