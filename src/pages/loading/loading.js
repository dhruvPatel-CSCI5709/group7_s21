/*
 * Author: Devraj Singh
 */

import React from 'react';
import loading from "./loading.gif";

const Loading = () => {
    return (
        <div>
            Fetching the data. Please wait....
            <img src={loading} alt="Fetching the data.." style={loadingImgStyle}/>
        </div>
    )
}
const loadingImgStyle = {
    display: 'block',
    margin: 'auto',
    width: '150px'
}
export default Loading;