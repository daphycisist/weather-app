import { Box } from '@chakra-ui/react';
import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const CustomBarChart = ({ data }: any) => {
  console.log({ data });
  return (
    <Box h={["20rem"]} w="100%" style={{transform: 'translateX(-1rem)'}}>
      <ResponsiveContainer width={'99%'} height={'100%'} >
      <BarChart data={data}>
        {' '}
        <XAxis dataKey="time" stroke="#4693f7" />
        <YAxis />
        <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
        <Legend
          width={100}
          wrapperStyle={{
            top: 40,
            right: 20,
            backgroundColor: '#f5f5f5',
            border: '1px solid #d5d5d5',
            borderRadius: 3,
            lineHeight: '40px',
          }}
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar dataKey="temp" fill="#8884d8" barSize={30} />
      </BarChart>
    </ResponsiveContainer>
    </Box>
  );
};

export default CustomBarChart;
