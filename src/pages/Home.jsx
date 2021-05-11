import React from 'react';
import { Counter } from '~/features/counter/Counter';

export default function Home() {
  return (
    <div>
      <h1 className="text-center">Counter App</h1>
      <Counter />
    </div>
  );
}
