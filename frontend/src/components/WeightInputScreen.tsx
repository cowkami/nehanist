import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createClient } from "@connectrpc/connect";
import { AppService } from '../generated/proto/service_pb';
import { createConnectTransport } from '@connectrpc/connect-web';

const transport = createConnectTransport({
  baseUrl: 'http://localhost:50051',
});

const client = createClient(
  AppService,
  transport,
);

const WeightInputScreen: React.FC = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [weight, setWeight] = useState<number | undefined>(undefined);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // prevent reload
    event.preventDefault();

    // convert date to date object
    const dateObj = new Date(date);
    // convert date object to date protobuf
    const datePb = {
      year: dateObj.getFullYear(),
      month: dateObj.getMonth(),
      day: dateObj.getDate(),
    };

    // create request
    const request = {
      weightRecord: {
        date: datePb,
        weight: weight,
      },
    };

    // send request
    const response = await client.addWeight(request);

    // get weight record from response
    const weightRecord = response.weightRecord;

    if (weightRecord !== undefined) {
      console.log(`save weight ${weightRecord?.weight} at ${weightRecord?.date}`);
    } else {
      alert('weight is required');
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
          onChange={(event) => {
            const value = parseFloat(event.target.value);
            setWeight(isNaN(value) ? undefined : value);
          }}
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
