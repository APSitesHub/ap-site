import axios from 'axios';
import { nanoid } from 'nanoid';
import { useLayoutEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useInView } from 'react-intersection-observer';
import { useLocation } from 'react-router-dom';
import {
  SupportClipBoardAdd,
  SupportClipBoardCopy,
  SupportKahootPickerIcon,
  SupportNameReverse,
} from '../Support/Support.styled';
import {
  ClipBoardAdd,
  ClipBoardBtn,
  ClipBoardCopy,
  ClipBoardFormDismissBtn,
  ClipBoardFormText,
  ClipBoardInput,
  ClipBoardInputForm,
  ClipBoardNotification,
  ClipBoardSubmitBtn,
  DismissIcon,
  KahootBackground,
  KahootBox,
  KahootDisclaimerBackground,
  KahootDisclaimerBox,
  KahootDisclaimerHeader,
  KahootDisclaimerItem,
  KahootDisclaimerList,
  KahootDisclaimerText,
  KahootExitFullScreenIcon,
  KahootFullScreenBtn,
  KahootFullScreenIcon,
  KahootNameValidation,
  KahootNumbersBtn,
  KahootNumbersHider,
  KahootPicker,
  KahootPickerBtn,
  NameReverse,
  NameReverseBtn,
} from './Kahoots.styled';

const translations = {
  ua: {
    kahootDisclaimerHeader: 'Привіт! Це вікно Кахутів.',
    kahootDisclaimerText:
      'Ми постійно працюємо над розширенням функціоналу нашого сайту, щоб ваші заняття залишалися для вас приємним досвідом, тому внесли декілька важливих змін:',
    kahootDisclaimerItem1: [
      'Вводити код Кахуту тепер не потрібно, адже ми вже ввели його за вас. Просто тисніть кнопку',
      'у правому верхньому кутку цього вікна і обирайте номер Кахуту. Почніть з першого. 😉',
    ],
    kahootDisclaimerItem2: [
      "Ім'я вводити кожного разу тепер теж не обов'язково. Тисніть кнопку",
      "та вводьте в невеличке віконце ваше ім'я (не забувайте про наші рекомендації). Ви можете вводити своє ім'я повністю (наприклад: Володимир Зеленський), Кахут обріже зайві літери автоматично (вийде: Володимир Зелен). Коли введете, клікніть кнопку \"Зберегти\" і ваше ім'я збережеться у буфер обміну, а кнопка буде виглядати так:",
    ],
    kahootDisclaimerItem3: [
      "Тепер при кліку на цю кнопку ви зможете швидко копіювати своє ім'я і просто вставляти його у поле Кахуту. Якщо ви припустилися помилки, вводячи своє ім'я, ви можете в будь-який момент натиснути кнопку",
      ', а у віконці, що відкриється, кнопку "Виправити", після чого введіть ім\'я заново.',
    ],
    kahootDisclaimerItem4: [
      'У разі, якщо вас за якоїсь причини викинуло з Кахуту і не пускає назад з тим же іменем, тисніть кнопку',
      ', вона збереже ваше ім\'я та прізвище у зворотньому порядку, що дасть вам змогу швидко зайти до Кахуту під "новим" ім\'ям.',
    ],

    clipboardName:
      "Введіть ваше ім'я в це поле, щоб вам не доводилося вводити його декілька разів під час уроку.",
    clipboardNameValidation:
      "Будь ласка, вводьте повне ім'я без скорочень, щоб ми могли правильно зарахувати ваші бали!",
    saveButton: 'Зберегти',

    clipboardNameError: "Ім'я та прізвище обов'язкові!",
    clipboardNameErrorNotEnoughWords: "Прізвище та ім'я, будь ласка, 2 слова!",
    clipboardNameSuccess:
      ", ваше ім'я додано в буфер обміну, можете вставити його у відповідне поле!",
    clipboardNameErrorText: 'Випадково помилились? Натисніть на цю кнопку: ',
    clipboardNameSuccessReverseButton: 'Виправити помилку',

    clipboardNameSuccessReverse:
      ", ваші ім'я та прізвище додані до буферу обміну в зворотньому порядку, можете вставити їх у відповідне поле і спробувати підключитись до Кахуту знов!",
    clipboardNameSuccessReverseText: 'Треба виправити помилку? Натисніть на цю кнопку:',
  },

  pl: {
    kahootDisclaimerHeader: 'Cześć! To okno Kahootów.',
    kahootDisclaimerText:
      'Stale pracujemy nad rozszerzeniem funkcjonalności naszej strony, aby Twoje zajęcia były przyjemnym doświadczeniem, dlatego wprowadziliśmy kilka ważnych zmian:',
    kahootDisclaimerItem1: [
      'Nie musisz już wprowadzać kodu Kahoota, ponieważ zrobiliśmy to za Ciebie. Po prostu kliknij przycisk',
      'w prawym górnym rogu tego okna i wybierz numer Kahoota. Zacznij od pierwszego. 😉',
    ],
    kahootDisclaimerItem2: [
      'Nie musisz już za każdym razem wprowadzać swojego imienia. Kliknij przycisk',
      'i wprowadź swoje imię w małym okienku (pamiętaj o naszych zaleceniach). Możesz wpisać swoje pełne imię (np. Jan Kowalski), a Kahoot automatycznie obetnie zbędne litery (np. Jan Kowal). Po wprowadzeniu kliknij przycisk "Zapisz", a Twoje imię zostanie zapisane w schowku, a przycisk będzie wyglądał tak:',
    ],
    kahootDisclaimerItem3: [
      'Teraz, klikając ten przycisk, możesz szybko skopiować swoje imię i wkleić je w odpowiednie pole Kahoota. Jeśli popełniłeś błąd podczas wprowadzania swojego imienia, w każdej chwili możesz kliknąć przycisk',
      ', a w otwartym okienku przycisk "Popraw", po czym wprowadź imię ponownie.',
    ],
    kahootDisclaimerItem4: [
      'Jeśli z jakiegoś powodu zostałeś wyrzucony z Kahoota i nie możesz wrócić z tym samym imieniem, kliknij przycisk',
      ', który zapisze Twoje imię i nazwisko w odwrotnej kolejności, co pozwoli Ci szybko dołączyć do Kahoota pod "nowym" imieniem.',
    ],

    clipboardName:
      'Wprowadź swoje imię w to pole, aby nie musieć go wprowadzać kilka razy podczas lekcji.',
    clipboardNameValidation:
      'Proszę, wprowadź pełne imię bez skrótów, abyśmy mogli poprawnie naliczyć Twoje punkty!',
    saveButton: 'Zapisz',

    clipboardNameError: 'Imię i nazwisko są wymagane!',
    clipboardNameErrorNotEnoughWords: 'Imię i nazwisko, proszę, 2 słowa!',
    clipboardNameSuccess:
      'Twoje imię zostało dodane do schowka, możesz je wkleić w odpowiednie pole!',
    clipboardNameErrorText: 'Popełniłeś błąd? Kliknij ten przycisk:',
    clipboardNameSuccessReverseButton: 'Popraw błąd',

    clipboardNameSuccessReverse:
      'Twoje imię i nazwisko zostały dodane do schowka w odwrotnej kolejności, możesz je wkleić w odpowiednie pole i spróbować ponownie dołączyć do Kahoota!',
    clipboardNameSuccessReverseText: 'Musisz poprawić błąd? Kliknij ten przycisk:',
  },
};

export const KahootsVideoChat = ({
  sectionWidth,
  sectionHeight,
  isKahootOpen,
  isChatOpen,
  isOpenedLast,
  lang,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isAnimated, setIsAnimated] = useState(true);
  const [username, setUsername] = useState(localStorage.getItem('userName') || '');
  const [kahoots, setKahoots] = useState({});
  const [activeKahoot, setActiveKahoot] = useState(0);

  let location = useLocation();
  const t = translations[lang] || translations.ua;

  // eslint-disable-next-line
  const page = location.pathname.match(/\/room\/[^/]+\/(.+)\/[^/]+$/)[1];

  const { ref, inView } = useInView({
    triggerOnce: true,
    delay: 1000,
  });

  const kahootWidth = isFullScreen ? sectionWidth : (sectionWidth / 10) * 4;

  const getLinksForLocation = () => {
    const entries = [];
    Object.values(kahoots[page].links).map(entry => {
      entries.push(entry);
      return entries;
    });
    return entries;
  };

  const kahootLinksRefresher = async e => {
    if (e.target === e.currentTarget) {
      setKahoots((await axios.get('/kahoots')).data);
    }
  };

  const setKahootNumber = async e => {
    const kahootNumber = parseInt(e.currentTarget.innerText);
    setKahoots((await axios.get('/kahoots')).data);
    setActiveKahoot(kahootNumber);
  };

  useLayoutEffect(() => {
    const getLinksRequest = async () => {
      try {
        setKahoots((await axios.get('/kahoots')).data);
      } catch (error) {
        console.log(error);
      }
    };

    getLinksRequest();
  }, []);

  const toggleFullScreen = () => {
    setIsFullScreen(isFullScreen => (isFullScreen = !isFullScreen));
  };

  const toggleKahootPicker = () => {
    setIsAnimated(false);
    setIsPickerOpen(isOpen => (isOpen = !isOpen));
    setActiveKahoot(1);
  };

  const disableEnter = e => (e.key === 'Enter' ? e.preventDefault() : null);

  const createNameInput = btn => {
    btn.disabled = true;
    document.addEventListener('keydown', disableEnter);
    toast(
      t => (
        <ClipBoardInputForm
          onSubmit={async e => {
            e.preventDefault();
            const userName = localStorage.getItem('userName');
            if (!userName) {
              createValidationEmptyInput();
              return;
            } else if (userName.trim().trimStart().split(' ').length < 2) {
              createValidationNotEnoughWords();
              return;
            } else {
              toast.dismiss(t.id);
              document.removeEventListener('keydown', disableEnter);
              setUsername(username => (username = localStorage.getItem('userName')));
              btn.disabled = false;
              if (localStorage.getItem('userName')) {
                copyToClipboard(btn);
              }
              localStorage.setItem('userID', nanoid(8));
            }
          }}
        >
          <ClipBoardFormDismissBtn
            onClick={e => {
              e.preventDefault();
              toast.dismiss(t.id);
              btn.disabled = false;
              document.removeEventListener('keydown', disableEnter);
            }}
          >
            <DismissIcon />
          </ClipBoardFormDismissBtn>
          <ClipBoardFormText>{t.clipboardName}</ClipBoardFormText>
          <ClipBoardFormText>{t.clipboardNameValidation}</ClipBoardFormText>
          <ClipBoardInput
            name="username"
            placeholder="Ім'я"
            defaultValue={localStorage.getItem('userName')}
            onChange={e => {
              if (e.target.value) {
                localStorage.setItem('userName', e.target.value);
              }
            }}
          />
          <ClipBoardSubmitBtn>{t.saveButton}</ClipBoardSubmitBtn>
        </ClipBoardInputForm>
      ),
      { duration: Infinity }
    );
  };

  const createValidationEmptyInput = () => {
    toast.error(
      t => (
        <>
          <ClipBoardFormDismissBtn onClick={() => toast.dismiss(t.id)}>
            <DismissIcon />
          </ClipBoardFormDismissBtn>
          <KahootNameValidation>Ім'я та прізвище обов'язкові!</KahootNameValidation>
        </>
      ),
      { duration: 1500 }
    );
  };

  const createValidationNotEnoughWords = () => {
    toast.error(
      t => (
        <>
          <ClipBoardFormDismissBtn onClick={() => toast.dismiss(t.id)}>
            <DismissIcon />
          </ClipBoardFormDismissBtn>
          <KahootNameValidation>
            {t.clipboardNameErrorNotEnoughWords}
          </KahootNameValidation>
        </>
      ),
      { duration: 1500 }
    );
  };

  const copyToClipboard = btn => {
    navigator.clipboard.writeText(localStorage.getItem('userName'));
    toast.success(
      t => (
        <ClipBoardNotification>
          <ClipBoardFormText>
            <ClipBoardFormDismissBtn onClick={() => toast.dismiss(t.id)}>
              <DismissIcon />
            </ClipBoardFormDismissBtn>
            {`${localStorage.getItem('userName')}`}
            {t.clipboardNameSuccess}
          </ClipBoardFormText>

          <ClipBoardFormText>{t.clipboardNameErrorText} </ClipBoardFormText>
          <ClipBoardSubmitBtn
            onClick={() => {
              toast.dismiss(t.id);
              createNameInput(btn);
            }}
          >
            {t.clipboardNameSuccessReverseButton}
          </ClipBoardSubmitBtn>
        </ClipBoardNotification>
      ),
      { duration: 3000 }
    );
  };

  const reverseAndCopyToClipboard = btn => {
    toast.dismiss();
    navigator.clipboard.writeText(localStorage.getItem('userName'));
    toast.success(
      t => (
        <ClipBoardNotification>
          <ClipBoardFormText>
            <ClipBoardFormDismissBtn onClick={() => toast.dismiss(t.id)}>
              <DismissIcon />
            </ClipBoardFormDismissBtn>
            {`${localStorage.getItem('userName')}`}
            {t.clipboardNameSuccessReverse}
          </ClipBoardFormText>

          <ClipBoardFormText>{t.clipboardNameSuccessReverseText} </ClipBoardFormText>

          <ClipBoardSubmitBtn
            onClick={() => {
              toast.dismiss(t.id);
              createNameInput(btn);
            }}
          >
            {t.clipboardNameSuccessReverseButton}
          </ClipBoardSubmitBtn>
        </ClipBoardNotification>
      ),
      { duration: 3000 }
    );
  };

  const handleUsernameBtn = e => {
    const btn = e.currentTarget;
    username ? copyToClipboard(btn) : createNameInput(btn);
  };

  const handleUsernameReverseBtn = e => {
    const reverseUsername = username.trim().trimStart().split(' ').reverse().join(' ');
    localStorage.setItem('userName', reverseUsername);
    setUsername(username => (username = reverseUsername));
    reverseAndCopyToClipboard(e.currentTarget);
  };

  return (
    <>
      {Object.keys(kahoots).length && (
        <KahootBox
          ref={ref}
          className={isKahootOpen ? 'shown' : 'hidden'}
          style={{
            zIndex: isOpenedLast === 'kahoot' ? '3' : '1',
            height: sectionHeight,
          }}
          onTransitionEnd={kahootLinksRefresher}
        >
          <KahootNumbersHider
            onClick={toggleKahootPicker}
            className={inView && isAnimated ? 'animated' : ''}
            tabIndex={-1}
          >
            <KahootPickerBtn />
          </KahootNumbersHider>
          <KahootPicker className={isPickerOpen ? 'shown' : 'hidden'}>
            {Object.values(kahoots[page].links).map((link, i) => (
              <KahootNumbersBtn
                key={i}
                onClick={setKahootNumber}
                className={activeKahoot === i + 1 ? 'active' : ''}
                tabIndex={-1}
              >
                {i + 1}
              </KahootNumbersBtn>
            ))}
          </KahootPicker>
          {username && (
            <NameReverseBtn tabIndex={-1} onClick={e => handleUsernameReverseBtn(e)}>
              <NameReverse />
            </NameReverseBtn>
          )}
          {activeKahoot ? (
            getLinksForLocation().map(
              (link, i) =>
                activeKahoot === i + 1 && (
                  <KahootBackground key={i}>
                    <iframe
                      id="kahoot-window"
                      title="kahoot-pin"
                      src={link}
                      width={kahootWidth}
                      height={sectionHeight}
                    ></iframe>
                    <KahootFullScreenBtn onClick={toggleFullScreen}>
                      {isFullScreen ? (
                        <KahootExitFullScreenIcon />
                      ) : (
                        <KahootFullScreenIcon />
                      )}
                    </KahootFullScreenBtn>
                    <ClipBoardBtn onClick={handleUsernameBtn}>
                      {username ? <ClipBoardCopy /> : <ClipBoardAdd />}
                    </ClipBoardBtn>
                  </KahootBackground>
                )
            )
          ) : (
            <KahootDisclaimerBackground
              style={
                !isChatOpen
                  ? { width: `${kahootWidth}px` }
                  : isFullScreen
                  ? { width: `${kahootWidth - 300}px` }
                  : { width: `${kahootWidth}px` }
              }
            >
              <KahootDisclaimerBox>
                <KahootDisclaimerHeader>
                  {t.kahootDisclaimerHeader}
                </KahootDisclaimerHeader>
                <KahootDisclaimerText>{t.kahootDisclaimerText}</KahootDisclaimerText>
                <KahootDisclaimerList>
                  <KahootDisclaimerItem>
                    <KahootDisclaimerText>
                      {t.kahootDisclaimerItem1[0]} <SupportKahootPickerIcon />{' '}
                      {t.kahootDisclaimerItem1[1]}
                    </KahootDisclaimerText>
                  </KahootDisclaimerItem>
                  <KahootDisclaimerItem>
                    <KahootDisclaimerText>
                      {t.kahootDisclaimerItem2[0]} <SupportClipBoardAdd />{' '}
                      {t.kahootDisclaimerItem2[1]}
                      <SupportClipBoardCopy />.
                    </KahootDisclaimerText>
                  </KahootDisclaimerItem>{' '}
                  <KahootDisclaimerItem>
                    <KahootDisclaimerText>
                      {t.kahootDisclaimerItem3[0]} <SupportClipBoardCopy />{' '}
                      {t.kahootDisclaimerItem3[1]}
                    </KahootDisclaimerText>
                  </KahootDisclaimerItem>
                  <KahootDisclaimerItem>
                    <KahootDisclaimerText>
                      {t.kahootDisclaimerItem4[0]} <SupportNameReverse />{' '}
                      {t.kahootDisclaimerItem4[1]}
                    </KahootDisclaimerText>
                  </KahootDisclaimerItem>
                </KahootDisclaimerList>
              </KahootDisclaimerBox>
              <KahootFullScreenBtn onClick={toggleFullScreen} tabIndex={-1}>
                {isFullScreen ? <KahootExitFullScreenIcon /> : <KahootFullScreenIcon />}
              </KahootFullScreenBtn>
              <ClipBoardBtn tabIndex={-1} onClick={e => handleUsernameBtn(e)}>
                {username ? <ClipBoardCopy /> : <ClipBoardAdd />}
              </ClipBoardBtn>
            </KahootDisclaimerBackground>
          )}
        </KahootBox>
      )}
    </>
  );
};
