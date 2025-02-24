import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AppService, DateSchema, WeightRecordSchema, AddWeightRequestSchema } from '../generated/proto/service_pb';
import { createClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from '@connectrpc/connect-web';
import { create } from "@bufbuild/protobuf";

const transport = createGrpcWebTransport({
  baseUrl: 'http://localhost:50051',  // Viteのデフォルトポート
});

const client = createClient(
  AppService,
  transport,
);

const WeightInputScreen: React.FC = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [weight, setWeight] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      // prevent reload
      event.preventDefault();

      // validate weight
      const weightNum = parseFloat(weight);
      if (isNaN(weightNum)) {
        alert('weight is required');
        return;
      }

      // convert date to date object
      const dateObj = new Date(date);
      const datePb = create(DateSchema, {
        year: dateObj.getFullYear(),
        month: dateObj.getMonth() + 1,
        day: dateObj.getDate(),
      });

      // create weight record
      const weightRecordPb = create(WeightRecordSchema, {
        id: "",
        date: datePb,
        weight: weightNum,
      });

      // create request
      const request = create(AddWeightRequestSchema, {
        weightRecord: weightRecordPb,
      });

      // send request
      console.log('Sending request:', request);
      const response = await client.addWeight(request);
      console.log('Response:', response);

      // 成功時の処理
      setWeight('');
    } catch (error) {
      console.error(error);
      alert('Failed to save weight');
    }
  }

  return (
    <div className="p-4">
      <Typography align="center" variant="h5" component="h2" gutterBottom>
        weight
      </Typography>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextField
          label="date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          slotProps={{ input: { type: 'date' } }}
        />
        <TextField
          label="kg"
          type="number"
          value={weight}
          onChange={(event) => setWeight(event.target.value)}
          slotProps={{
            htmlInput: {
              inputMode: 'decimal',
              pattern: '[0-9]*',
              step: '0.1'
            }
          }}
        />
        <Button variant="contained" color="primary" type="submit">
          save
        </Button>
      </form>
    </div>
  )
};

export default WeightInputScreen;
