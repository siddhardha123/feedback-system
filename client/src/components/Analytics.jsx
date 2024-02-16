import React, { useState, useEffect } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Flex, Text } from '@chakra-ui/react';

const AnalyticsComponent = () => {
  const [data, setData] = useState([]);
  const [overallSatisfactionData, setOverallSatisfactionData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // Fetch data from http://localhost:3000
    fetch('http://localhost:3000')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setOverallSatisfactionData(calculateOverallSatisfaction(data));
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const calculateAverageParameters = () => {
    const parameters = ['contentQuality', 'instructorKnowledge', 'courseMaterials', 'learningEnvironment'];
    const averageValues = {};

    parameters.forEach(param => {
      let total = 0;
      data.forEach(item => {
        total += parseInt(item.metadata[param]);
      });
      const average = total / data.length || 0; // Avoid division by zero
      averageValues[param] = average;
    });

    return averageValues;
  };

  const calculateOverallSatisfaction = data => {
    return data.map(item => parseInt(item.metadata.overallSatisfaction));
  };

  const averageParameters = calculateAverageParameters();

  return (
    <Flex direction="column" align="center" justify="center">
      <Flex className="chart-container" direction={'column'}  border={'1px solid black'} mt={10} minW={'50%'}> 
        <Text textAlign={'center'} fontSize={'2xl'}>Average Parameter Values</Text>
        <Bar
         
          data={{
            labels: Object.keys(averageParameters),
            datasets: [
              {
                label: 'Average Value',
                data: Object.values(averageParameters),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
              },
            ],
          }}
        />
      </Flex>
      <Flex className="chart-container" direction={'column'}  border={'1px solid black'} mt={10}  minW={'40%'}>
        <Text textAlign={'center'} fontSize={'2xl'}>Recommendation</Text>
        <Doughnut
          data={{
            labels: ['Recommend', 'Do Not Recommend'],
            datasets: [
              {
                label: 'Recommendation',
                data: [
                  data.filter(item => item.metadata.recommend === 'yes').length,
                  data.filter(item => item.metadata.recommend === 'no').length,
                ],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
              },
            ],
          }}
        />
      </Flex>
      <Flex className="chart-container" direction={'column'}  border={'1px solid black'} mt={10} mb={20} minW={'40%'}>
        <Text textAlign={'center'} fontSize={'2xl'}>Overall Satisfaction Trend</Text>
        <Line
          data={{
            labels: [...new Set(data.map(item => item.subject))],
            datasets: [
              {
                label: 'Overall Satisfaction',
                data: overallSatisfactionData,
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
              },
            ],
          }}
        />
      </Flex>
    </Flex>
  );
};

export default AnalyticsComponent;
