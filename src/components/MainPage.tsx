import { CountdownTimer } from './CountdownTimer';
import { DisclaimerMain } from './DisclaimerMain';
import { OfficialLinks } from './OfficialLinks';
import { Sharing } from './Sharing';

export function MainPage() {
  return (
    <div>
      <DisclaimerMain />

      <h1>{'Борис Надеждин 2024'}</h1>
      <h2>{'Календарь выборов президента России в 2024 году'}</h2>

      <p>
        {
          'Здесь показаны основные даты связанные с выборами президента России в 2024 году: Когда cбор подписей и решение ЦИК, когда проходит голосование на выборах, когда будет проходить предвыборная агитация, инаугурация и т.д., а также обратный отсчёт времени до этих событий.'
        }
      </p>

      <OfficialLinks />

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
