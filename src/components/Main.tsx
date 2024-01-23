'use client';

import { N_PER_REGION_MAX, N_PER_REGION_DESIRED, TOTAL_DESIRED, TOTAL_REQUIRED } from '../constants';
import type { SignJson } from '../types';
import { useJson } from '../util/useJson';
import { Sharing } from './Sharing';
import { SignTable } from './SignTable';
import { UpdatedAt } from './UpdatedAt';

const maxWidth = '150px';

export function Main() {
  const data = useJson<SignJson>('/data/sign.json');

  if (!data) {
    return null;
  }

  return (
    <div>
      <h1>{'Борис Надеждин 2024'}</h1>
      <h2>{'Счетчики сбора подписей и статистика по регионам'}</h2>

      <div style={{ marginBottom: '1rem' }}>
        <details>
          <summary>{'Что это такое и как мы считаем? (нажмите чтобы развернуть)'}</summary>
          <p>
            {
              'Этот сайт разработан и поддерживается народными умельцами, и никак не связан с Борисом Надеждиным или его командой! Рассчёты основаны на нашем текущем понимании процедуры и могут содержать ошибки.'
            }
          </p>
          <p>
            {'Статистика по регионам автоматически считывается со '}

            <a target="_blank" rel="noreferrer" href="https://nadezhdin2024.ru/addresses">
              {'страницы "Адреса штабов" c официального сайта Бориса Надеждина'}
            </a>

            {
              ' примерно каждые 15 минут, и отображается в более компактной и удобной форме. Показатели "всего" показывают сумму (результат сложения) подписей по всем перечисленным регионам, с учётом максимального количества на регион, и может отличаться от финальной цифры на главной странице официального сайта. Все показатели и рассчёты основаны на нашем текущем понимании процедуры, которое может не совпадать с таковым команды кандидата. Будьте осторожны в интерпретации этих показателей!'
            }
          </p>

          <p>
            {`Согласно Статьe 36 Федерального закона 19-ФЗ "О выборах Президента Российской Федерации" (см. `}

            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.consultant.ru/document/cons_doc_LAW_40445/709aad55b0103f1e128dde11785bbd41d4328966/"
            >
              <b>{'consultant.ru'}</b>
            </a>

            {`), кандидате от непарламентской партии нужно набрать 100 000 подписей, максимум по ${N_PER_REGION_MAX} в каждом регионе России.`}
          </p>

          <p>
            {'По сведениям из '}

            <a target="_blank" rel="noreferrer" href="https://t.me/BorisNadezhdin/664">
              {'официального Telegram канала'}
            </a>

            {` , штаб кандидата хочет собрать ${TOTAL_DESIRED} подписей, c запасом, так чтобы, за вычетом испорченных подписей, набралось нужное количество - ${TOTAL_REQUIRED}. Таким образом, мы принимаем как гипотезу, что необходимо собрать по ${N_PER_REGION_DESIRED} в каждом регионе, вместо ${N_PER_REGION_MAX}.`}
          </p>

          <p>
            {`В суммарной таблице мы выделили крупным текстом общее количество подписей без учета излишков - т.е. принимая в рассчет только максимум ${N_PER_REGION_MAX} подписей на каждый регион ("цель минимум") или ${N_PER_REGION_DESIRED} ("цель желаемая"). Например, при учёте "цели желаемой", если в регионе собрано 10000 подписей, то мы включаем в сумму только ${N_PER_REGION_DESIRED} из них. Если в регионе собрано 1600, то в сумму идут все 1600. Если в регионе собрано между ${N_PER_REGION_DESIRED} и ${N_PER_REGION_MAX} подписей, то в таком случае в "цель минимум" идут только ${N_PER_REGION_MAX}, а в "цель желаемая" пойдут все подписи.`}
          </p>
          <p>
            {
              'В таблице также приводится и общее количество подписей, с излишками, а также процент сбора и количество регионов которые приняли участие.'
            }
          </p>
          <p>
            {
              'Таблица сбора подписей по регионам показывает количество подписей и процент сбора в каждом регионе. Например, если регион собрал 3000 подписей, то это 150% или в 1.5 больше чем необходимо, но 80% от желаемого. Если регион собрал 1250 подписей, то это 50% от необходимого, и 33% от желаемого.'
            }
          </p>
          <p>
            {`Зеленым цветом выделены регионы которые собрали более ${N_PER_REGION_DESIRED} подписей и справились с желаемой целью. Желтым - регионы где собрано менее ${N_PER_REGION_DESIRED} подписей, но более чем ${N_PER_REGION_MAX} подписей, т.е. которые достигли цели минимум, но не достигли желаемой. Красным - регионы где собрано менее ${N_PER_REGION_MAX} подписей и ни одна из целей не достигнута.`}
          </p>
          <p>
            {
              'Знаком "?" отмечены случаи когда регион присутствует в списке на официальном сайте, но для которого пока нет данных.'
            }
          </p>

          {'Исходный код для этого сайта доступен '}
          <a target="_blank" rel="noreferrer" href="https://github.com/bnad24/bnad24.github.io">
            {'здесь'}
          </a>
          {'. Пожалуйста рассмотрите возможность внести свой вклад.'}
        </details>

        <details>
          <summary>{'Ссылки на официальныe ресурсы Бориса Надеждина (нажмите чтобы развернуть)'}</summary>

          <div style={{ marginBottom: '1rem', marginTop: '1rem' }}>
            <table style={{ border: '#aaa solid 1px' }}>
              <tbody>
                <tr>
                  <td style={{ maxWidth }}>{'Главная страница'}</td>
                  <td>
                    <a target="_blank" rel="noreferrer" href="https://nadezhdin2024.ru/">
                      <b>{'nadezhdin2024.ru'}</b>
                    </a>
                  </td>
                </tr>

                <tr>
                  <td style={{ maxWidth }}>
                    {'Адреса штабов где можно поставить подпись, а также официальная статистика'}
                  </td>
                  <td>
                    <a target="_blank" rel="noreferrer" href="https://nadezhdin2024.ru/addresses">
                      <b>{'nadezhdin2024.ru/addresses'}</b>
                    </a>
                  </td>
                </tr>

                <tr>
                  <td style={{ maxWidth }}>{'Список регионов (города зарубежья внизу страницы)'}</td>
                  <td>
                    <a target="_blank" rel="noreferrer" href="https://nadezhdin2024.ru/regions">
                      <b>{'nadezhdin2024.ru/regions'}</b>
                    </a>
                  </td>
                </tr>

                <tr>
                  <td style={{ maxWidth }}>{'Поддержать'}</td>
                  <td>
                    <a target="_blank" rel="noreferrer" href="https://nadezhdin2024.ru/#donate">
                      <b>{'nadezhdin2024.ru/#donate'}</b>
                    </a>
                  </td>
                </tr>

                <tr>
                  <td style={{ maxWidth }}>{'Telegram'}</td>
                  <td>
                    <a target="_blank" rel="noreferrer" href="https://t.me/BorisNadezhdin">
                      <b>{'t.me/BorisNadezhdin'}</b>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </details>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <div>{'Поделиться: '}</div>
        <Sharing />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <UpdatedAt data={data} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <SignTable data={data} />
      </div>
    </div>
  );
}
