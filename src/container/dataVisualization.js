import React, { useEffect, useState } from 'react';
import ReactJson from 'react-json-view';
import { RadarChart } from '../components';
import { SocketService } from '../services';

const DataVisualization = () => {
  const [rawData, setRawData] = useState(null);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const generateRandomNumber = () => {
    return ((Math.random() * 255) | 0) + 1;
  };

  useEffect(() => {
    const socket = new SocketService('ws://localhost:8080');
    socket.connectWebSocket('', (event) => {
      setRawData(event.data);

      let groups = Object.values(JSON.parse(event.data));
      if (groups) {
        let labels = Object.keys(groups[0]);

        let datasets = groups.map((item, index) => {
          return {
            label: `Group ${index + 1}`,
            data: Object.values(item),
            backgroundColor: `rgba(${generateRandomNumber()}, 99, ${generateRandomNumber()}, 0.2)`,
            borderColor: 'rgba(99, 99, 132, 1)',
            borderWidth: 1,
          };
        });
        if (labels && datasets) setChartData({ labels, datasets });
      }
    });
// unmount component
    return () => {
      socket.closeWebSocket();
    };
  }, []);

  return (
    <div className='flex justify-center'>
      <div className='md:w-2/5 max-h-96 mx-20'>
        <h1 className='text-lg font-bold text-center my-5'>Raw Data</h1>
        <div className='mt-5  '>
          {rawData && <ReactJson src={JSON.parse(rawData)} />}
        </div>
      </div>
      <div className='md:w-1/5'>
        <h1 className='text-lg font-bold text-center my-5'>Radar Chart</h1>
        <div>
          <div className='mt-5'>
            <div className='max-h-96'>
              {chartData && <RadarChart data={chartData} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataVisualization;
