import React from 'react';
import { useJson } from '../util/useJson';
import { CountdownTimer } from './CountdownTimer';
import { OfficialLinks } from './OfficialLinks';
import { Sharing } from './Sharing';
import { UpdatedAt } from './UpdatedAt';

export interface Address {
  region: string;
  texts: string[];
  tgs: string[];
  phones: string[];
  html?: string;
}

export interface AddressesJson {
  addresses: Address[];
  updatedAt: string;
}

export function Addresses() {
  const data = useJson<AddressesJson>('/data/addresses.json');

  if (!data) {
    return null;
  }

  return (
    <div>
      <h1>{'Борис Надеждин 2024'}</h1>
      <h2>{'Адреса штабов и контакты волонтёров по сбору подписей (неофициальная копия)'}</h2>

      <div style={{ marginBottom: '1rem' }}>
        <details>
          <summary>{'Что это такое и почему? (нажмите чтобы развернуть)'}</summary>
          <p>
            {`Этот сайт разработан и поддерживается народными умельцами, и никак не связан с Борисом Надеждиным или его командой!`}
          </p>

          <p>
            {`В дополнение к нашей страничке со статистикой, мы решили также "скопировать" адреса штабов чтобы сделать эту информацию более доступной. Адреса автоматически считываеются со `}
            <a target="_blank" rel="noreferrer" href="https://nadezhdin2024.ru/addresses">
              {'страницы "Адреса штабов" c официального сайта Бориса Надеждина'}
            </a>
            {
              ' примерно каждые 15 минут, и отображается в более компактной и удобной форме. Даже когда официальный сайт недоступен, последняя информация скачанная нашими автоматическими методами доступна здесь.'
            }
          </p>

          <p>
            {
              'Не волнуйтесь, несмотря на то что процесс автоматизирован, 1 запрос раз в 15 минут точно не повредит официальному сайту. Это эквивалент обычного посещения странички в браузере, и даже ещё более лёгкий, потому что мы загружаем только HTML, без JS, CSS, изображений и прочего.'
            }
          </p>

          <p>
            {
              'Наш сайт статический, не имеет программируемого сервера, расположен на GitHub, и поэтому гораздо более устойчив к цензуре и ко всяким пакостям.'
            }
          </p>

          <p>
            {
              'Мы не контролируем информацию и не можем её проверить, а просто копируем её в автоматическом режиме с официального сайта. Проверяйте, звоните, спрашивайте в Telegram, и будьте осторожны!'
            }
          </p>

          {'Исходный код для нашего сайта открытый и доступен '}
          <a target="_blank" rel="noreferrer" href="https://github.com/bnad24/bnad24.github.io">
            {'на GitHub'}
          </a>
          {
            '. Пожалуйста рассмотрите возможность внести свой вклад в общее дело. Вы можете сообщить об ошибках на сайте или предложить нововведения открыв новый запрос в разделе "Issues" или предложить правки в исходный код сайта в разделе "Pull requests".'
          }
        </details>

        <OfficialLinks />
      </div>

      <CountdownTimer />

      <div style={{ marginBottom: '1rem' }}>
        <div>{'Поделиться: '}</div>
        <Sharing />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <UpdatedAt data={data} />
      </div>

      <p className="alert">
        {'Альтернативой этому списку также является официальный Telegram-бот для поиска штабов: '}
        <br />
        <a target="_blank" rel="noreferrer" href="https://t.me/nadezhdin2024_bot">
          <b>{'t.me/nadezhdin2024_bot'}</b>
        </a>
      </p>

      <div style={{ marginBottom: '1rem' }}>
        {data.addresses.map((address) => {
          return <RegionAddress key={address.region} address={address} />;
        }, [])}
      </div>
    </div>
  );
}

export function RegionAddress({ address }: { address: Address }) {
  return (
    <details className="card">
      <summary style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{address.region}</summary>
      <div style={{ marginBottom: '1rem', marginTop: '1rem' }} dangerouslySetInnerHTML={{ __html: address.html }} />
    </details>
  );
}

// export function RegionAddress({ address }: { address: Address }) {
//   return (
//     <details className="card">
//       <summary style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{address.region}</summary>
//
//       <div style={{ marginBottom: '1rem', marginTop: '1rem' }}>
//         <p>
//           {address.texts.map((text) => {
//             const chunks = text.split('\n');
//             return chunks.map((chunk) => (
//               <p style={{ margin: 0 }} key={chunk}>
//                 {chunk}
//               </p>
//             ));
//           })}
//         </p>
//         <div>
//           {address.tgs.map((tg) => {
//             return (
//               <a key={tg} target="_blank" rel="noreferrer" href={tg}>
//                 {tg}
//               </a>
//             );
//           })}
//         </div>
//         <div>
//           {address.phones.map((phone) => {
//             return (
//               <a key={phone} target="_blank" rel="noreferrer" href={`tel:${phone}`}>
//                 {phone}
//               </a>
//             );
//           })}
//         </div>
//       </div>
//     </details>
//   );
// }
