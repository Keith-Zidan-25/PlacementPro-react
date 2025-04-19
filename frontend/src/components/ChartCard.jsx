import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default function ChartCard({ stateProp, divClassStyle }) {
    // Ensure options and series exist and are non-empty
    const isReady = stateProp?.options && Array.isArray(stateProp.series) && stateProp.series.length > 0;

    return (
        <div className={`${divClassStyle}`}>
            <div id="chart">
                {isReady ? (
                    <ReactApexChart
                        options={stateProp.options}
                        series={stateProp.series}
                        type={stateProp.type}
                        height={250}
                    />
                ) : (
                    <p>Loading chart...</p>
                )}
            </div>
        </div>
    );
}
