import {
  BackgroundFilterBottom,
  BackgroundFilterTop,
} from 'pages/Quiz/Quiz.styled';
import { useEffect, useState } from 'react';
import de from '../../../img/quiz/de.png';
import gb from '../../../img/quiz/gb.png';
import pl from '../../../img/quiz/pl.png';
import {
  Calc,
  CalcBox,
  CalcDescription,
  CalcEquals,
  CalcHeading,
  CalcHours,
  CalcInput,
  CalcInputBox,
  CalcItem,
  CalcLabel,
  CalcLang,
  CalcLangPicker,
  CalcLangPointer,
  CalcPipeBottom,
  CalcSum,
  CalcText,
  CalcTotal,
  CalcTotalSum,
  CalcTotalText,
  Emoji,
} from './HRCalc.styled';

const HRCalc = () => {
  const [individualHours, setIndividualHours] = useState(0);
  const [webinarsHours, setWebinarsHours] = useState(0);
  const [additionalHours, setAdditionalHours] = useState(0);
  const [individualSum, setIndividualSum] = useState(0);
  const [webinarsSum, setWebinarsSum] = useState(0);
  const [additionalSum, setAdditionalSum] = useState(0);
  const [isIndividualSumActive, setIsIndividualSumActive] = useState(false);
  const [isWebinarsSumActive, setIsWebinarsSumActive] = useState(false);
  const [isAdditionalSumActive, setIsAdditionalSumActive] = useState(false);
  const [totalHours, setTotalHours] = useState(0);
  const [totalSum, setTotalSum] = useState(0);
  const [isTotalActive, setIsTotalActive] = useState(false);
  const [position, setPosition] = useState('0%');
  const [lang, setLang] = useState(0);

  const calculatePointerPosition = i => {
    setPosition(position => (position = `${i * 100}%`));
    setLang(lang => (lang = i));
  };

  const individualPriceByLang = lang => (lang === 0 ? 250 : 300);
  const webinarsPriceByLang = lang => (lang === 0 ? 380 : 400);

  useEffect(() => {
    setIndividualSum(
      sum => (sum = individualHours * individualPriceByLang(lang))
    );
    setWebinarsSum(sum => (sum = webinarsHours * webinarsPriceByLang(lang)));
    setTotalSum(
      sum =>
        (sum =
          individualHours * individualPriceByLang(lang) +
          webinarsHours * webinarsPriceByLang(lang) +
          additionalHours * 150)
    );
  }, [additionalHours, individualHours, webinarsHours, lang]);

  return (
    <CalcBox>
      <CalcHeading>Калькулятор заробітної плати</CalcHeading>
      <CalcDescription>
        Введіть у поля нижче кількість годин для автоматичного підрахунку суми
      </CalcDescription>
      <CalcLangPicker>
        <CalcLangPointer style={{ transform: `translateX(${position})` }} />
        <CalcLang
          onClick={() => {
            calculatePointerPosition(0);
          }}
          className={lang === 0 && 'active'}
        >
          <Emoji src={gb} alt="Great Britain flag emoji" width="28" />{' '}
          <Emoji src={pl} alt="Poland flag emoji" width="28" />
        </CalcLang>
        <CalcLang
          onClick={() => {
            calculatePointerPosition(1);
          }}
          className={lang === 1 && 'active'}
        >
          <Emoji src={de} alt="Germany flag emoji" width="28" />
        </CalcLang>
      </CalcLangPicker>
      <Calc>
        <CalcItem>
          <CalcText>Індивідуальні заняття</CalcText>
          <CalcLabel>
            <CalcInputBox>
              <CalcInput
                type="number"
                placeholder="1"
                min="0"
                max="100"
                onChange={e => {
                  if (+e.target.value) {
                    setIndividualHours(hours => (hours = +e.target.value));
                    setIndividualSum(
                      sum =>
                        (sum = +e.target.value * individualPriceByLang(lang))
                    );
                    setIsIndividualSumActive(true);
                    setTotalHours(
                      hours =>
                        (hours =
                          +e.target.value + webinarsHours + additionalHours)
                    );
                    setTotalSum(
                      sum =>
                        (sum =
                          +e.target.value * individualPriceByLang(lang) +
                          webinarsSum +
                          additionalSum)
                    );
                    setIsTotalActive(true);
                  } else {
                    setIndividualHours(hours => (hours = 0));
                    setIndividualSum(sum => (sum = 0));
                    setIsIndividualSumActive(false);
                    setTotalHours(hours => (hours = hours - individualHours));
                    setTotalSum(
                      sum =>
                        (sum =
                          sum - individualHours * individualPriceByLang(lang))
                    );
                    totalHours - individualHours === 0 &&
                      setIsTotalActive(false);
                  }
                }}
              />
              <CalcHours className={isIndividualSumActive && 'active'}>
                год
              </CalcHours>
            </CalcInputBox>
            <CalcEquals className={isIndividualSumActive && 'active'}>
              =
            </CalcEquals>{' '}
            <CalcSum className={isIndividualSumActive && 'active'}>
              {individualSum ? individualSum : `${individualPriceByLang(lang)}`}{' '}
              грн
            </CalcSum>
          </CalcLabel>
        </CalcItem>
        <CalcItem>
          <CalcText>Вебінари</CalcText>
          <CalcLabel>
            <CalcInputBox>
              <CalcInput
                type="number"
                placeholder="1"
                min="0"
                max="100"
                onChange={e => {
                  if (+e.target.value) {
                    setWebinarsHours(hours => (hours = +e.target.value));
                    setWebinarsSum(
                      sum => (sum = +e.target.value * webinarsPriceByLang(lang))
                    );
                    setIsWebinarsSumActive(true);
                    setTotalHours(
                      hours =>
                        (hours =
                          individualHours + +e.target.value + additionalHours)
                    );
                    setTotalSum(
                      sum =>
                        (sum =
                          individualSum +
                          +e.target.value * webinarsPriceByLang(lang) +
                          additionalSum)
                    );
                    setIsTotalActive(true);
                  } else {
                    setWebinarsHours(hours => (hours = 0));
                    setWebinarsSum(sum => (sum = 0));
                    setIsWebinarsSumActive(false);
                    setTotalHours(hours => (hours = hours - webinarsHours));
                    setTotalSum(
                      sum =>
                        (sum = sum - webinarsHours * webinarsPriceByLang(lang))
                    );
                    totalHours - webinarsHours === 0 && setIsTotalActive(false);
                  }
                }}
              />
              <CalcHours className={isWebinarsSumActive && 'active'}>
                год
              </CalcHours>
            </CalcInputBox>
            <CalcEquals className={isWebinarsSumActive && 'active'}>
              =
            </CalcEquals>
            <CalcSum className={isWebinarsSumActive && 'active'}>
              {webinarsSum ? webinarsSum : `${webinarsPriceByLang(lang)}`} грн
            </CalcSum>
          </CalcLabel>
        </CalcItem>
        <CalcItem>
          <CalcText>Додаткова робота</CalcText>
          <CalcLabel>
            <CalcInputBox>
              <CalcInput
                type="number"
                placeholder="1"
                min="0"
                max="100"
                onChange={e => {
                  if (+e.target.value) {
                    setAdditionalHours(hours => (hours = +e.target.value));
                    setAdditionalSum(sum => (sum = +e.target.value * 150));
                    setIsAdditionalSumActive(true);
                    setTotalHours(
                      hours =>
                        (hours =
                          individualHours + webinarsHours + +e.target.value)
                    );
                    setTotalSum(
                      sum =>
                        (sum =
                          individualSum + webinarsSum + +e.target.value * 150)
                    );
                    setIsTotalActive(true);
                  } else {
                    setAdditionalHours(hours => (hours = 0));
                    setAdditionalSum(sum => (sum = 0));
                    setIsAdditionalSumActive(false);
                    setTotalHours(hours => (hours = hours - additionalHours));
                    setTotalSum(sum => (sum = sum - additionalHours * 150));
                    totalHours - additionalHours === 0 &&
                      setIsTotalActive(false);
                  }
                }}
              />
              <CalcHours className={isAdditionalSumActive && 'active'}>
                год
              </CalcHours>
            </CalcInputBox>
            <CalcEquals className={isAdditionalSumActive && 'active'}>
              =
            </CalcEquals>
            <CalcSum className={isAdditionalSumActive && 'active'}>
              {additionalSum ? additionalSum : '150'} грн
            </CalcSum>
          </CalcLabel>
        </CalcItem>
      </Calc>
      <CalcPipeBottom />
      <CalcTotal>
        <CalcTotalText>Загальна сума</CalcTotalText>
        <CalcLabel>
          <CalcInputBox>
            <CalcTotalSum className={isTotalActive && 'active'}>
              {!totalHours ? '00' : totalHours}
            </CalcTotalSum>
            <CalcHours className={isTotalActive && 'active'}>год</CalcHours>
          </CalcInputBox>
          <CalcEquals className={isTotalActive && 'active'}>=</CalcEquals>
          <CalcInputBox>
            <CalcTotalSum className={isTotalActive && 'active'}>
              {!totalSum ? '0000' : totalSum}
            </CalcTotalSum>
            <CalcSum className={isTotalActive && 'active'}>грн</CalcSum>
          </CalcInputBox>
        </CalcLabel>
      </CalcTotal>
      <BackgroundFilterTop /> <BackgroundFilterBottom />
    </CalcBox>
  );
};

export default HRCalc;
