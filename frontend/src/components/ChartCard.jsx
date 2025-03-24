import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

export default function ChartCard({ stateProp, divClassStyle }) {
    return (
        <div className={`${divClassStyle}`}>
            <div id="chart">
                <ReactApexChart
                    options={stateProp.options}
                    series={stateProp.series}
                    type="heatmap"
                    height={250}
                />
            </div>
        </div>
    );
}
