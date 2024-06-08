import { useState } from 'react';
import {
  FAQHeading,
  FAQHighlight,
  FAQList,
  FAQListAnswer,
  FAQListItem,
  FAQListQuestion,
  SupportBackground,
  SupportBox,
  SupportClipBoardAdd,
  SupportClipBoardCopy,
  SupportFAQBox,
  SupportFullScreenExitIcon,
  SupportFullScreenIcon,
  SupportKahoot,
  YTPSettings,
  YTPSound,
  YTPSoundMuted,
} from './Support.styled';

export const Support = ({
  isSupportOpen,
  isOpenedLast,
  sectionWidth,
  handleSupport,
  openKahoot,
  isKahootOpen,
}) => {
  const desktopWidth = sectionWidth / 3;
  const mobileWidth = (sectionWidth / 3) * 2;
  const [questionIds, setQuestionsIds] = useState([]);
  const [isAnswerShown, setIsAnswerShown] = useState(false);

  const showAnswer = e => {
    const dataId = e.currentTarget.getAttribute('data_id');
    questionIds.includes(dataId)
      ? setQuestionsIds(ids => (ids = [...ids].filter(id => id !== dataId)))
      : setQuestionsIds(ids => (ids = [...ids, dataId]));

    setIsAnswerShown(true);
    handleSupport(dataId);
  };

  const showAnswerAndOpenKahoot = e => {
    showAnswer(e);
    if (!isKahootOpen) {
      openKahoot();
    }
  };

  const supportBoxStylesHandler = () => {
    return {
      zIndex: isOpenedLast === 'support' ? '4' : '1',
      width: sectionWidth > 1280 ? `${desktopWidth}px` : `${mobileWidth}px`,
    };
  };

  return (
    <>
      <SupportBox
        className={isSupportOpen ? 'shown' : 'hidden'}
        style={{ ...supportBoxStylesHandler() }}
      >
        <SupportBackground>
          <SupportFAQBox>
            <FAQHeading>Поширені запитання та прості відповіді</FAQHeading>
            <FAQList>
              <FAQListItem>
                <FAQListQuestion data_id="quality" onClick={showAnswer}>
                  Як включити максимальну якість відео?
                </FAQListQuestion>
                {isAnswerShown && questionIds.includes('quality') && (
                  <FAQListAnswer>
                    У низу справа вікна (область підсвічено жовтим кольором для
                    зручності), ліворуч від кнопок повноекранного режиму та
                    перегляду на YouTube розташована кнопка <YTPSettings />,
                    натисніть на неї, в меню що відкриється, знайдіть пункт
                    "Якість", натисніть на нього та оберіть найвищу якість відео
                    (1080p)
                  </FAQListAnswer>
                )}
              </FAQListItem>
              <FAQListItem>
                <FAQListQuestion data_id="live" onClick={showAnswer}>
                  Моя трансляція дуже сильно відстає, що робити?
                </FAQListQuestion>
                {isAnswerShown && questionIds.includes('live') && (
                  <FAQListAnswer>
                    Знизу зліва вікна (область підсвічено жовтим кольором для
                    зручності), праворуч від кнопок паузи та налаштувань
                    гучності розташована кнопка "• У прямому ефірі". Натисніть
                    її, щоб наздогнати трансляцію!
                  </FAQListAnswer>
                )}
              </FAQListItem>
              <FAQListItem>
                <FAQListQuestion data_id="sound" onClick={showAnswer}>
                  Як включити звук?
                </FAQListQuestion>
                {isAnswerShown && questionIds.includes('sound') && (
                  <FAQListAnswer>
                    У низу зліва вікна (область підсвічено жовтим кольором для
                    зручності), праворуч від кнопки паузи розташована кнопка
                    <YTPSoundMuted />, яка за замовчуванням завжди перекреслена,
                    що означає, що звук вимкнений. Клікніть на неї один раз,
                    звук ввімкнеться, а сама кнопка набуде такого вигляду:
                    <YTPSound />
                  </FAQListAnswer>
                )}
              </FAQListItem>
              <FAQListItem>
                <FAQListQuestion data_id="chat_open" onClick={showAnswer}>
                  Як відкрити чат?
                </FAQListQuestion>
                {isAnswerShown && questionIds.includes('chat_open') && (
                  <FAQListAnswer>
                    У лівому верхньому кутку екрану одразу над кнопкою, якою ви
                    відкрили це віконце питань та відповідей, розташована кнопка
                    🗨 (підсвічена зелено-жовтим кольором для зручності),
                    клікніть по ній один раз і чат з'явиться на екрані.
                  </FAQListAnswer>
                )}
              </FAQListItem>
              {/* <FAQListItem>
                <FAQListQuestion data_id="chat_login" onClick={showAnswer}>
                  Чому я не можу писати в чаті?
                </FAQListQuestion>
                {isAnswerShown && questionIds.includes('chat_login') && (
                  <FAQListAnswer>
                    YouTube вимагає, щоб ті, хто хоче писати в чат, не тільки
                    авторизувалися на їх платформі, а ще й створили там канал.
                    Зробити це вам допоможе{' '}
                    <a
                      href="https://support.google.com/youtube/answer/1646861?hl=uk"
                      target="_blank"
                      rel="noreferrer"
                    >
                      офіційна інструкція
                    </a>
                    .
                  </FAQListAnswer>
                )}
              </FAQListItem> */}
              <FAQListItem>
                <FAQListQuestion data_id="kahoot_open" onClick={showAnswer}>
                  Як відкрити Кахут?
                </FAQListQuestion>
                {isAnswerShown && questionIds.includes('kahoot_open') && (
                  <FAQListAnswer>
                    У лівому верхньому кутку екрану одразу над кнопкою, якою ви
                    відкрили це віконце питань та відповідей, розташована кнопка{' '}
                    <SupportKahoot /> (підсвічена зелено-жовтим кольором для
                    зручності), клікніть по ній один раз і Kahoot з'явиться на
                    екрані.
                  </FAQListAnswer>
                )}
              </FAQListItem>
              <FAQListItem>
                <FAQListQuestion
                  data_id="kahoot_login"
                  onClick={showAnswerAndOpenKahoot}
                >
                  Як зайти на Кахут?
                </FAQListQuestion>
                {isAnswerShown && questionIds.includes('kahoot_login') && (
                  <FAQListAnswer>
                    Введіть своє ім'я у поле "Нікнейм/Nickname" у вікні Кахуту
                    повністю (від цього залежить нарахування вам балів за
                    заняття), а краще - скористайтеся кнопкою
                    <SupportClipBoardAdd />, щоб вам не доводилось вводити його
                    кожного разу в кожний Кахут (див. наступне питання).
                    Максимальна кількість символів у полі Кахуту - 15, тому,
                    можливо, якась частина імені обріжеться.
                  </FAQListAnswer>
                )}
              </FAQListItem>
              <FAQListItem>
                <FAQListQuestion
                  data_id="kahoot_name"
                  onClick={showAnswerAndOpenKahoot}
                >
                  Як не вводити своє ім'я кожний раз для кожного Кахуту?
                </FAQListQuestion>
                {isAnswerShown && questionIds.includes('kahoot_name') && (
                  <FAQListAnswer>
                    Для того, щоб вам не доводилося писати ваше ім'я заново
                    кожного разу, ми розташували у правому верхньому куті вікна
                    Кахуту кнопку <SupportClipBoardAdd />, яка зберігатиме ваше
                    ім'я на одному пристрої навіть між уроками! По кліку на неї
                    з'явиться невеличке вікно, яке попросить вас ввести ваше
                    повне ім'я (від цього залежить нарахування вам балів за
                    заняття). Коли введете, клікніть кнопку "Зберегти" і ваше
                    ім'я збережеться у буфер обміну, а кнопка буде виглядати
                    так: <SupportClipBoardCopy />. Тепер по кліку на неї ваше
                    ім'я буде швидко скопійовано і ви зможете вставити його у
                    поле "Nickname" у вікні Кахуту будь-якою звичною для вас
                    комбінацією.{' '}
                  </FAQListAnswer>
                )}
              </FAQListItem>
              <FAQListItem>
                <FAQListQuestion
                  data_id="kahoot_edit_name"
                  onClick={showAnswerAndOpenKahoot}
                >
                  Як виправити помилку в збереженому імені?
                </FAQListQuestion>
                {isAnswerShown && questionIds.includes('kahoot_edit_name') && (
                  <FAQListAnswer>
                    Якщо ви припустилися помилки, вводячи своє ім'я, ви можете в
                    будь-який момент натиснути кнопку <SupportClipBoardCopy />.
                    Тепер при кожному копіюванні вам буде доступна кнопка
                    "Виправити", яка дозволить вам ввести ім'я ще раз.
                  </FAQListAnswer>
                )}
              </FAQListItem>
              <FAQListItem>
                <FAQListQuestion
                  data_id="kahoot_fullscreen"
                  onClick={showAnswerAndOpenKahoot}
                >
                  Як відкрити Кахут на весь екран?
                </FAQListQuestion>
                {isAnswerShown && questionIds.includes('kahoot_fullscreen') && (
                  <FAQListAnswer>
                    Зробити це можна кнопкою <SupportFullScreenIcon /> у правому
                    верхньому куті вікна Кахуту. Вийти з цього режиму можна буде
                    по кліку на цю ж кнопку, яка тепер буде мати вигляд{' '}
                    <SupportFullScreenExitIcon />.
                  </FAQListAnswer>
                )}
              </FAQListItem>
              <FAQListItem>
                <FAQListQuestion
                  data_id="kahoot_picker"
                  onClick={showAnswerAndOpenKahoot}
                >
                  Як мені переключити Кахут?
                </FAQListQuestion>
                {isAnswerShown && questionIds.includes('kahoot_picker') && (
                  <FAQListAnswer>
                    Зробити це можна кнопкою <FAQHighlight>#</FAQHighlight> у
                    правому верхньому куті вікна Кахуту. Із-за меж екрану
                    з'являться пронумеровані кнопки, кожна з яких - окремий
                    Кахут. Кнопка з номером відкритого наразі Кахуту підсвічена
                    жовтим кольором. Ви можете в будь-який момент переключити
                    відкритий Кахут, натиснувши кнопку з його номером. Закрити
                    меню з кнопками Кахутів можна, повторним натисканням кнопки
                    <FAQHighlight>#</FAQHighlight>.<br />
                    <FAQHighlight>
                      Важливо! Не перемикайте Кахути під час гри, щоб не
                      втратити результати!
                    </FAQHighlight>
                  </FAQListAnswer>
                )}
              </FAQListItem>
            </FAQList>
          </SupportFAQBox>
        </SupportBackground>
      </SupportBox>
    </>
  );
};
