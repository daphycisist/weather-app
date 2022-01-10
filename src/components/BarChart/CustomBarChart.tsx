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
  return (
    <Box
      h={['20rem', '25rem']}
      w="100%"
      pt={['2rem', '3rem', '3rem']}
      pb={['0rem', '9rem', '6rem', '0rem']}
      style={{ transform: 'translateX(-1rem)' }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          {' '}
          <CartesianGrid strokeDasharray="3 3" />
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
          <Bar dataKey="temp" fill="#8884d8" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CustomBarChart;
