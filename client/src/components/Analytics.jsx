import  { useState, useEffect } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Flex, Text, Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons'
import Web3 from 'web3';
import contractABI from './contractABI.json'
import {useAccount} from "wagmi";
import admin from "../config.js"
import {useNavigate} from 'react-router'
const AnalyticsComponent = () => {
  const { address } = useAccount();
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [overallSatisfactionData, setOverallSatisfactionData] = useState([]);

  const [blockData, setBlockData] = useState([])

  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(contractABI, '0xC75e6c1A7995B24a69ab1ddA7e92a50cB6374561');

  useEffect(() => {
    fetchData();
    getDataFromBlockchain();
  }, []);

  useEffect(()=>{
    if(address !== admin){
      navigate('/')
    }
  },[])

  const getDataFromBlockchain = () => {
    setLoading(true)
    contract.methods.getAllFeedbacks().call().then(
      data => {
        let d = []
        data.forEach(a => {
          d.push(a)
        })
        setBlockData(d)
        setLoading(false)
      }

    )

  }


  const fetchData = () => {
    // Fetch data from http://localhost:3000
    setLoading(true)
    fetch('http://localhost:3000')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setData(data);
        setLoading(false)
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

  const [selectedSubject, setSelectedSubject] = useState('');

  // Function to filter data based on selected subject
  const filteredData = selectedSubject
    ? data.filter(item => item.subject === selectedSubject)
    : data;

  return (
    !loading ?
      <Flex direction="column" align="center" justify="center">
        <Flex className="table-container" direction={'column'} border={'1px solid black'} mt={10} mb={20} minW={'40%'}>
          <Text textAlign={'center'} fontSize={'2xl'}>Feedback Table</Text>
          {/* Dropdown menu */}

          <Flex justify={'space-between'}>
            <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} >
              <option value="">Select Subject</option>
              <option value="DBMS">DBMS</option>
              <option value="OOPS">OOPS</option>
              <option value="OS">OS</option>
            </select>
            <Button onClick={() => fetchData()}>
              <RepeatIcon />
            </Button>

          </Flex>
          <Table id="data-table" variant="simple">
            <Thead>
              <Tr>
                <Th>Subject</Th>
                <Th>Content Quality</Th>
                <Th>Instructor Knowledge</Th>
                <Th>Course Materials</Th>
                <Th>Learning Environment</Th>
                <Th>Overall Satisfaction</Th>
                <Th>Recommendation</Th>
                <Th>suggestions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredData.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.subject}</Td>
                  <Td>{item.metadata.contentQuality}</Td>
                  <Td>{item.metadata.instructorKnowledge}</Td>
                  <Td>{item.metadata.courseMaterials}</Td>
                  <Td>{item.metadata.learningEnvironment}</Td>
                  <Td>{item.metadata.overallSatisfaction}</Td>
                  <Td>{item.metadata.recommend}</Td>
                  <Td>{item.metadata.suggestions}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
        <Flex className="chart-container" direction={'column'} border={'1px solid black'} mt={10} minW={'50%'}>
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
        <Flex justify={'space-between'} w={'1000px'} border={'1px solid black'} mt={10} mb={20} >
          <Flex className="chart-container" direction={'column'} mt={10} minW={'40%'}>
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
          <Flex className="chart-container" direction={'column'} mt={10} mb={20} minW={'50%'}>
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
        <Flex mb={40}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>User Address</Th>
                <Th>Faculty</Th>
                <Th>Subject</Th>
              </Tr>
            </Thead>
            <Tbody>
              {blockData &&
                blockData.map((item) => (
                  <Tr key={item.id || Math.random()}>
                    <Td>{item.userAddress}</Td>
                    <Td>{item.faculty}</Td>
                    <Td>{item.subject}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </Flex>
      </Flex> : <Flex fontSize={'2xl'} justify={'center'} alignItems={'center'} justifyItems={'center'} mt={'300px'} ><Text textAlign={'center'}>loading...........</Text></Flex>
  );
};

export default AnalyticsComponent;
