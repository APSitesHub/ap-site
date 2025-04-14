import { ResponsiveRadar } from '@nivo/radar';
import axios from 'axios';
import { EditFormHeader } from '../TeacherPage.styled';
import {
  ChartAreaMyAPLimiter,
  FeedbackText,
  MyAPGradientBg,
  MyAPStudentChartAreaTrial,
} from './StudentChart.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
const regex = /\d{2}\.\d{2}\.\d{4}, \d{2}:\d{2}:\d{2}:/g;
const linksRegex = /\b(?:https?|ftp):\/\/\S+\b/g;

export const MyAPStudentChartTrial = ({ currentStudentChart, location }) => {
  const data = [
    {
      area: 'Активність',
      [currentStudentChart.name]: currentStudentChart.activity,
    },
    {
      area: 'Граматика',
      [currentStudentChart.name]: currentStudentChart.grammar,
    },
    {
      area: 'Говоріння',
      [currentStudentChart.name]: currentStudentChart.speaking,
    },
    { area: 'Лексика', [currentStudentChart.name]: currentStudentChart.lexis },
    {
      area: 'Слухання',
      [currentStudentChart.name]: currentStudentChart.listening,
    },
  ];

  const reviews = location.includes('polski')
    ? 'Одинак Оксана залишає відгук за заняття: Студент показує щораз кращі результати, гарніша вимова, довші речення, чіткіші відповіді. Значно покращився словниковий запас. Активний на занятті, легко сприймає новий матеріал, швидко висловлює свою думку. Потрібно ще трохи попрацювати над українізмами і більше практики польською – перегляд фільмів, подкастів.'
    : location.includes('de')
    ? 'Коваль Олена залишає відгук за заняття: Дякую за вашу активність на уроці та цікаві думки. У Вас досить добре розвинене говоріння. Однак раджу розширювати словниковий запас. Також, якщо забули слово, спробуйте його пояснити іншими словами або спробуйте перефразувати думку. Раджу читати тексти німецькою та вчитися розуміти контекст. Серед загальних рекомендацій: раджу повторити речення з als та wenn (коли ми вживаємо wenn: багаторазові події в минулому та als: одноразова подія у минулому). Та Infinitv mit zu. Ось вправи на повторення: https://wordwall.net/uk/resource/9992382/infinitiv-mit-zu, https://wordwall.net/uk/resource/53760254/deutsch/als-oder-wenn.'
    : location.includes('kids')
    ? 'Томків Анастасія залишає відгук за заняття: добре відповідала на запитання та впевнено давала пояснення. Варто звернути увагу на порядок слів та розташування прислівників частоти (always, often, sometimes). Наприклад, I don’t listen to music often правильніше сказати як I don’t often listen to music https://grammarway.com/ua/word-order . Також важливо пам’ятати про правильне вживання часових форм, наприклад, I am watching замість I watching. https://www.youtube.com/watch?v=AKzG_ZS-Ydg  Ви продемонстрували не лише гарний рівень англійської, а й прагнення до покращення своїх навичок. Продовжуйте працювати над мовою, практикуйте розмову, звертайте увагу на граматичні конструкції та не бійтеся помилятися – адже саме на помилках ми навчаємось.'
    : "Міщенко Федір залишає відгук за заняття: Активно бере участь у заняттях та добре взаємодіє з іншими студентами під час обговорень і дискусій, що значно сприяє розвитку комунікативних навичок групи. Залученість до спілкування є чудовим прикладом для інших, і було б корисно вивчати та використовувати discourse markers (наприклад, 'however', 'as a result', 'on the other hand') для більшої структурованості та зв'язності її висловлювань. https://test-english.com/grammar-points/b2/discourse-markers/ Під час відповіді варто уникати переліку багатьох пунктів; краще обрати один чи два аспекти та розкрити їх детально, що зробить розповідь фокусованою і цікавою для слухача.";

  const MyResponsiveRadar = ({ data }) => (
    <ResponsiveRadar
      data={data}
      curve="linearClosed"
      keys={[currentStudentChart.name]}
      indexBy="area"
      maxValue={3}
      valueFormat=">-.0f"
      margin={
        document.body.getClientRects()[0].width < 640
          ? { top: 0, right: 10, bottom: 0, left: 10 }
          : { top: 20, right: 60, bottom: 20, left: 60 }
      }
      borderColor={{ from: 'color' }}
      gridLevels={3}
      gridLabelOffset={document.body.getClientRects()[0].width < 640 ? -26 : 16}
      dotSize={document.body.getClientRects()[0].width < 640 ? 3 : 5}
      dotColor={{ theme: 'background' }}
      dotBorderWidth={document.body.getClientRects()[0].width < 640 ? 3 : 3}
      colors={{ scheme: 'dark2' }}
      fillOpacity={0.15}
      blendMode="multiply"
      motionConfig="wobbly"
      theme={
        document.body.getClientRects()[0].width < 640
          ? {
              text: {
                fontSize: 8,
              },
            }
          : {
              text: {
                fontSize: 11,
              },
            }
      }
    />
  );

  return (
    <>
      <MyAPStudentChartAreaTrial>
        <EditFormHeader id="focus">Студент</EditFormHeader>
        <FeedbackText
          dangerouslySetInnerHTML={{
            __html: reviews
              .replace(
                linksRegex,
                match =>
                  `<a href="${match}" target="_blank">${
                    match.length > 50 ? match.slice(0, 50) + '...' : match
                  }</a>`
              )
              .replace(regex, '')
              .trim()
              .split(' ')
              .slice(1)
              .join(' '),
          }}
        ></FeedbackText>
        <ChartAreaMyAPLimiter id="chartlimiter">
          <MyAPGradientBg id="chartbg" />
          <MyResponsiveRadar data={data}></MyResponsiveRadar>
        </ChartAreaMyAPLimiter>
      </MyAPStudentChartAreaTrial>
    </>
  );
};
