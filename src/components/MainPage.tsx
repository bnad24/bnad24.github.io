'use client';

import React from 'react';
import { CountdownTimer } from './CountdownTimer';
import { Sharing } from './Sharing';

export function MainPage() {
  return (
    <div>
      <h1>{'Борис Надеждин 2024'}</h1>
      <h2>{'Основные даты'}</h2>

      <div style={{ marginBottom: '1rem' }}>
        <CountdownTimer />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <div>{'Поделиться: '}</div>
        <Sharing />
      </div>
    </div>
  );
}
