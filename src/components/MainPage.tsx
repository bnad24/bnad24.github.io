'use client';

import React from 'react';
import { CountdownTimer } from './CountdownTimer';
import { Sharing } from './Sharing';

export function MainPage() {
  return (
    <div>
      <h1>{'Борис Надеждин 2024'}</h1>
      <h2>{'Основные даты'}</h2>

      <p>
        {
          'Здесь показаны основные даты связанные с выборами президента России в 2024 году: Когда cбор подписей и решение ЦИК, когда проходит голосование на выборах, когда будет проходить предвыборная агитация, инаугурация и т.д., а также обратный отсчёт времени до этих событий.'
        }
      </p>

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
