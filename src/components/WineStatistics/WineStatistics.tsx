import React from 'react';
import { calculateClassWiseStatistics, calculateGammaStatistics } from '../../utils';
import { WineStatisticsProps } from './modal';
import { tableHeadMock } from '../../mock/wine-data.mock';
import './wineStatistics.css'

const WineStatistics: React.FC<WineStatisticsProps> = ({ dataset }) => {
  const flavanoidsStatistics = calculateClassWiseStatistics(dataset, 'Flavanoids');
  const gammaStatistics = calculateGammaStatistics(dataset);

  const classes = Object.keys(flavanoidsStatistics);

  const statsTable = [
    {
      tableHeading: 'Flavanoids Statistics',
      data: flavanoidsStatistics,
    },
    {
      tableHeading: 'Gamma Statistics',
      data: gammaStatistics,
    }
  ];

  return (
    <div>
      {statsTable.map((table) => (
        <>
          <h2>{table.tableHeading}</h2>
          <table cellSpacing={0} className='table-wrapper'>
            <thead>
              <tr>
                {tableHeadMock.map((item: String, index: number) => (
                  <th key={index}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mean</td>
                {classes.map((className) => (
                  <td key={className}>{Number(table?.data[className].mean).toFixed(3)}</td>
                ))}
              </tr>
              <tr>
                <td>Median</td>
                {classes.map((className) => (
                  <td key={className}>{Number(table?.data[className].median).toFixed(3)}</td>
                ))}
              </tr>
              <tr>
                <td>Mode</td>
                {classes.map((className) => (
                  <td key={className}>{Number(table?.data[className].mode).toFixed(3)}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </>
      ))}
    </div>
  );
};

export default WineStatistics;
