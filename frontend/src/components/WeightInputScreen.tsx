import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const WeightInputScreen: React.FC = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [weight, setWeight] = useState<number | undefined>(undefined);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (weight !== undefined) {
      console.log(`save weight ${weight} at ${date}`);
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
