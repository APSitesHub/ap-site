import axios from 'axios';
import { Description } from 'components/Hero/Hero.styled';
import {
  Label,
  LeftFormBackgroundStar,
  RightFormBackgroundStar,
} from 'components/LeadForm/LeadForm.styled';
import { LoginFormText } from 'components/Stream/Stream.styled';
import { Formik } from 'formik';
import {
  ExternalLinkIcon,
  LessonTopBox,
  LessonValuePdfLink,
  LessonVideoBox,
  PdfBox,
  PdfWrapper,
} from 'pages/MyAP/LessonFinder/LessonFinder.styled';
import { Title } from 'pages/Quiz/Quiz.styled';
import {
  AdminFormBtn,
  AdminInput,
  AdminInputNote,
  LoginForm,
} from 'pages/Streams/AdminPanel/AdminPanel.styled';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import * as yup from 'yup';
import { ReactComponent as PdfIcon } from '../../img/svg/pdf-icon.svg';
import {
  GiftLinkIcon,
  GiftsBox,
  GiftsBoxItem,
  GiftsDescription,
  GiftsVideoBox,
  Logo,
  PdfPreview,
  PdfPreviewBackground,
  QuizletLink,
  QuizletLogo,
  YouTubeLogo,
} from './Gifts.styled';

export const Gifts = () => {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [user, setUser] = useState({});
  // const [isVideoOpen, setIsVideoOpen] = useState(true);
  // const [isGrammarOpen, setIsGrammarOpen] = useState(true);
  const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState(false);
  const [openedPdf, setOpenedPdf] = useState('');

  const gifts = {
    en: {
      a0: [
        {
          type: 'quizlet',
          name: 'Beginner',
          link: 'https://quizlet.com/class/16307699/',
        },
        {
          type: 'video',
          name: '1. Алфавіт',
          link: 'https://youtu.be/ixeNsBXRC78',
        },
        {
          type: 'video',
          name: '2. To be Present Simple',
          link: 'https://youtu.be/L7YJWHOoJVg',
        },
        {
          type: 'video',
          name: '3. To be заперечення і запитання',
          link: 'https://youtu.be/f0airrqxrRc',
        },
        {
          type: 'video',
          name: '4. Артиклі',
          link: 'https://youtu.be/zdJigxN5PRo',
        },
        {
          type: 'video',
          name: '5. Присвійний відмінок',
          link: 'https://youtu.be/DQEEE-9uJJk',
        },
        {
          type: 'video',
          name: '6. Теперішній час(+/-)',
          link: 'https://youtu.be/N_gK4NFAOXk',
        },
        {
          type: 'video',
          name: '7. Прислівники частоти',
          link: 'https://youtu.be/ZFO-TBFignk',
        },
        {
          type: 'video',
          name: '8. Теперішній тривалий час',
          link: 'https://youtu.be/3eVoyiRqZaQ',
        },
        {
          type: 'video',
          name: "9. Can/Can't",
          link: 'https://youtu.be/7bJLRB5Y3Nk',
        },
        {
          type: 'video',
          name: '10. There is/There are',
          link: 'https://youtu.be/Il4ezx9HKRQ',
        },
        {
          type: 'grammar',
          name: '1. To be Present Simple',
          link: 'https://drive.google.com/file/d/1_M8_vIV9GNNRo1FJ0A_9Wze1196Bkq5q/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '2. Теперішній час',
          link: 'https://drive.google.com/file/d/1Hy2oyFE32h1hR9wRoiHVjblXLEcZOTHm/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '3. Теперішній тривалий час',
          link: 'https://drive.google.com/file/d/1sHcFDAD9-cFUQLYm1N33VPfpMcD8EeYb/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '4. Прислівники частоти',
          link: 'https://drive.google.com/file/d/1zITlS7Um9icxwu413WDieK5utJgg5NuC/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '5. There is/There are',
          link: 'https://drive.google.com/file/d/1ej-utg1bsGfAUOgzKYboHy5Fh4VABag3/view?usp=drive_link',
        },
        {
          type: 'grammar',
          name: '6. Теперішній простий/Теперішній тривалий',
          link: 'https://drive.google.com/file/d/131SIgwIISFwwOPhnj8sHpPolJWoUbauE/view?usp=drive_link',
        },
        {
          type: 'grammar',
          name: '7. Займенники',
          link: 'https://drive.google.com/file/d/1OBv5D6Jr99Ut1FR8wOc8HbBv4i7bUJKO/view?usp=drive_link',
        },
        {
          type: 'grammar',
          name: '8. Наказовий спосіб',
          link: 'https://drive.google.com/file/d/17NmBK0sjKwDfmeA08qvoypH-XyXkeFM_/view?usp=drive_link',
        },
        {
          type: 'grammar',
          name: '9. Майбутній час',
          link: 'https://drive.google.com/file/d/1DR1sEQh_ys7ODCxfnGO6kffMb2lYm1gJ/view?usp=drive_link',
        },
        {
          type: 'grammar',
          name: '10. Однина та множина',
          link: 'https://drive.google.com/file/d/1gMWX38znONrL-UKig5C8i4OXbM87EnGb/view?usp=drive_link',
        },
      ],
      a1: [
        {
          type: 'quizlet',
          name: 'Elementary',
          link: 'https://quizlet.com/class/16312869/',
        },
        {
          type: 'video',
          name: '1. To be Present Simple',
          link: 'https://youtu.be/L7YJWHOoJVg',
        },
        {
          type: 'video',
          name: '2. To be заперечення і запитання',
          link: 'https://youtu.be/f0airrqxrRc',
        },
        {
          type: 'video',
          name: '3. Присвійні займенники',
          link: 'https://youtu.be/gZWwV-Z_LNQ',
        },
        {
          type: 'video',
          name: '4. Артиклі',
          link: 'https://youtu.be/zdJigxN5PRo',
        },
        {
          type: 'video',
          name: '5. Прикметники',
          link: 'https://youtu.be/DIHt5iJEPc8',
        },
        {
          type: 'video',
          name: '6. Наказовий спосіб',
          link: 'https://youtu.be/frvtjNB2Fes',
        },
        {
          type: 'video',
          name: '7. Теперішній час',
          link: 'https://youtu.be/N_gK4NFAOXk',
        },
        {
          type: 'video',
          name: '8. Теперішній час Запитання',
          link: 'https://youtu.be/d6lgr6etqXI',
        },
        {
          type: 'video',
          name: '9. Порядок слів в питаннях',
          link: 'https://youtu.be/6VJL2q1FTbc',
        },
        {
          type: 'video',
          name: '10. Присвійний відмінок',
          link: 'https://youtu.be/DQEEE-9uJJk',
        },
        {
          type: 'video',
          name: '11.Теперішній тривалий час',
          link: 'https://youtu.be/3eVoyiRqZaQ',
        },
        {
          type: 'video',
          name: '12. Минулий час',
          link: 'https://youtu.be/s-e_K4_3lNw?si=nGnLS4dMIqzO5f5m',
        },
        {
          type: 'grammar',
          name: '1. Артиклі	',
          link: 'https://drive.google.com/file/d/1EeFWBg7oOQFmkL5PEDgTdkSRY6uBVDM-/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '2. Присвійний відмінок	',
          link: 'https://drive.google.com/file/d/1jkfZ_qaGvSBirbH2cc4ECNsGZRZ67LOz/view?usp=drive_link',
        },
        {
          type: 'grammar',
          name: '3. Однина та множина	',
          link: 'https://drive.google.com/file/d/1gMWX38znONrL-UKig5C8i4OXbM87EnGb/view?usp=drive_link',
        },
        {
          type: 'grammar',
          name: '4. Прикметники	',
          link: 'https://drive.google.com/file/d/1jo3YUdCwQP-vFy6szeWXSqRgzCclvTgN/view?usp=drive_link',
        },
        {
          type: 'grammar',
          name: '5. Питальні слова	',
          link: 'https://drive.google.com/file/d/1y47B041-3YNm8dN6n3cpNxzu2BudDEUT/view?usp=drive_link',
        },
        {
          type: 'grammar',
          name: '6. Злічувальні та незлічувальні іменники	',
          link: 'https://drive.google.com/file/d/1Eb4qqFrdag20bzgkt-dxYbCpsJamo0_y/view?usp=drive_link',
        },
        {
          type: 'grammar',
          name: '7. Теперішній час	',
          link: 'https://drive.google.com/file/d/1Hy2oyFE32h1hR9wRoiHVjblXLEcZOTHm/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '8. Теперішній тривалий час	',
          link: 'https://drive.google.com/file/d/1sHcFDAD9-cFUQLYm1N33VPfpMcD8EeYb/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '9. Майбутній час	',
          link: 'https://drive.google.com/file/d/1DR1sEQh_ys7ODCxfnGO6kffMb2lYm1gJ/view?usp=drive_link',
        },
        {
          type: 'grammar',
          name: '10. Минулий час	',
          link: 'https://drive.google.com/file/d/1wrVnkUoQfxRStWDjIEY_JoBczz6_hh1C/view?usp=drive_link',
        },
        {
          type: 'grammar',
          name: '11. Наказовий спосіб	',
          link: 'https://drive.google.com/file/d/17NmBK0sjKwDfmeA08qvoypH-XyXkeFM_/view?usp=drive_link',
        },
        {
          type: 'grammar',
          name: '12. Неправильні дієслова	',
          link: 'https://drive.google.com/file/d/1go45sR5Sjb3GieBwJRrNS4eIc3sb_7ti/view?usp=drive_link',
        },
      ],
      a2: [
        {
          type: 'quizlet',
          name: 'Pre-intermediate',
          link: 'https://quizlet.com/class/16351612/',
        },
        {
          type: 'video',
          name: '1. Be going to',
          link: 'https://youtu.be/N7S3iXjaZaE?si=RWKOQDqUSN9QCJB6',
        },
        {
          type: 'video',
          name: '2. Артиклі',
          link: 'https://youtu.be/Ulwibiqz2Y8?si=wrv1tinzTSB3Jdz4',
        },
        {
          type: 'video',
          name: '3. To + інфінітив',
          link: 'https://youtu.be/PS8pyhdaxQU',
        },
        {
          type: 'video',
          name: '4. Теперішній доконаний час',
          link: 'https://youtu.be/CxNH2E4qVpc',
        },
        {
          type: 'video',
          name: '5. Теперішній доконаний час/Минулий час',
          link: 'https://youtu.be/iiW5O_2v_-I?si=qWlFS4l-woy98Zry',
        },
        {
          type: 'video',
          name: '6. Теперішній час',
          link: 'https://youtu.be/N_gK4NFAOXk',
        },
        {
          type: 'video',
          name: '7. Теперішній тривалий час',
          link: 'https://youtu.be/3eVoyiRqZaQ',
        },
        {
          type: 'video',
          name: '8. Минулий час',
          link: 'https://youtu.be/5NvEOt2jKCw?si=rOrG1bHEUsHFriSk',
        },
        {
          type: 'video',
          name: '9. Минулий тривалий час',
          link: 'https://youtu.be/wIFAJighdVA',
        },
        {
          type: 'video',
          name: '10. Ступені порівняння',
          link: 'https://youtu.be/G38m2StQykI',
        },
        {
          type: 'video',
          name: '11. Прийменники часу та місця',
          link: 'https://youtu.be/c99N6chCrtQ',
        },
        {
          type: 'grammar',
          name: '1. Be going to',
          link: 'https://drive.google.com/file/d/1t4shFAdNnVHV_o--BdtZFBjoYfibe_yv/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '2. Дієслова, після яких вживаємо to/ing',
          link: 'https://drive.google.com/file/d/1mbq92cm3hXIMC8S7vySa_9AyYw7O2u5S/view?usp=drive_link',
        },
        {
          type: 'grammar',
          name: '3. Теперішній доконаний час',
          link: 'https://drive.google.com/file/d/1yt3wSkiBT9JlU7mEjczjLtYvqTlCy8lL/view?usp=drive_link',
        },
        {
          type: 'grammar',
          name: '4. Теперішній час',
          link: 'https://drive.google.com/file/d/1Hy2oyFE32h1hR9wRoiHVjblXLEcZOTHm/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '5. Теперішній тривалий час',
          link: 'https://drive.google.com/file/d/1sHcFDAD9-cFUQLYm1N33VPfpMcD8EeYb/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '6. Минулий час',
          link: 'https://drive.google.com/file/d/1wrVnkUoQfxRStWDjIEY_JoBczz6_hh1C/view?usp=drive_link',
        },
        {
          type: 'grammar',
          name: '7. Минулий тривалий час',
          link: 'https://drive.google.com/file/d/1kIEqcuCPln19-Oto2VnqLHcLqqW8_mrm/view?usp=drive_link',
        },
        {
          type: 'grammar',
          name: '8. Ступені порівняння',
          link: 'https://drive.google.com/file/d/1UPQHFNKytsmsgRLW-hHM5CMDBmKlSzgQ/view?usp=drive_link',
        },
        {
          type: 'grammar',
          name: '9. Визначники кількості',
          link: 'https://drive.google.com/file/d/13u6bLt9Q0lDlKf1t5vp6RkBpAbL5gPCm/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '10. Прийменники місця',
          link: 'https://drive.google.com/file/d/1qeGi_zjTGnjeoolyQMVKX6VMQUqyfPhD/view?usp=drive_link',
        },
        {
          type: 'grammar',
          name: '11. Прийменники часу',
          link: 'https://drive.google.com/file/d/1QivG1AbA2ihZe6tcypkQ3Y8olH8pTFM1/view?usp=drive_link],',
        },
      ],
      b1: [
        {
          type: 'quizlet',
          name: 'Intermediate',
          link: 'https://quizlet.com/class/16430516/',
        },
        {
          type: 'video',
          name: '1. Минулий час',
          link: 'https://youtu.be/5NvEOt2jKCw?si=rOrG1bHEUsHFriSk',
        },
        {
          type: 'video',
          name: '2. Артиклі',
          link: 'https://youtu.be/Ulwibiqz2Y8?si=wrv1tinzTSB3Jdz4',
        },
        {
          type: 'video',
          name: '3. Минулий тривалий час',
          link: 'https://youtu.be/wIFAJighdVA',
        },
        {
          type: 'video',
          name: '4. Теперішній доконаний час',
          link: 'https://youtu.be/CxNH2E4qVpc',
        },
        {
          type: 'video',
          name: '5. Конструкція Used to',
          link: 'https://youtu.be/mIOVslOVoFg',
        },
        {
          type: 'video',
          name: '6. Майбутні часи',
          link: 'https://youtu.be/c6WNJFNrv1k?si=z0BHrBWvAsOjkhjF',
        },
        {
          type: 'video',
          name: '7. Формування запитань',
          link: 'https://youtu.be/BOemozDAhHs?si=Em2zeU_pAKj_hqBQ',
        },
        {
          type: 'video',
          name: '8. Минулі часи',
          link: 'https://youtu.be/CL3Ex7xoSIE?si=OX5f3kv8GmNQOqcD',
        },
        {
          type: 'video',
          name: '9. Have to, must',
          link: 'https://youtu.be/i54PdIjH4tg?si=s7dUD4TOYdPtJWNo',
        },
        {
          type: 'video',
          name: '10. Теперішній доконаний та Теперішній доконаний тривалий часи',
          link: 'https://youtu.be/9y6azOBNl-Q?si=28bNcPKO3e-342_r',
        },
        {
          type: 'grammar',
          name: '1. Конструкція Used to',
          link: 'https://drive.google.com/file/d/15X6IQNu7_PVqJacctzaLRD4gdknjmHPO/view?usp=drive_link',
        },
        {
          type: 'grammar',
          name: '2. Вирази so, neither —  too, either',
          link: 'https://drive.google.com/file/d/1TXijkf_YueypEtai8nCSolTONd9pG2Uu/view?usp=drive_link',
        },
        {
          type: 'grammar',
          name: '3. Артиклі',
          link: 'https://drive.google.com/file/d/1EeFWBg7oOQFmkL5PEDgTdkSRY6uBVDM-/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '4. Have to, must',
          link: 'https://drive.google.com/file/d/1yz-Mgp2r5toNVkgivdoAZi0aQ1Mg9C13/view?usp=drive_link',
        },
        {
          type: 'grammar',
          name: '5. Минулий час',
          link: 'https://drive.google.com/file/d/1wrVnkUoQfxRStWDjIEY_JoBczz6_hh1C/view?usp=drive_link',
        },
        {
          type: 'grammar',
          name: '6. Минулий тривалий час',
          link: 'https://drive.google.com/file/d/1kIEqcuCPln19-Oto2VnqLHcLqqW8_mrm/view?usp=drive_link',
        },
        {
          type: 'grammar',
          name: '7. Теперішній доконаний час',
          link: 'https://drive.google.com/file/d/1yt3wSkiBT9JlU7mEjczjLtYvqTlCy8lL/view?usp=drive_link',
        },
        {
          type: 'grammar',
          name: '8. Огляд всіх часів',
          link: 'https://drive.google.com/file/d/1WrEg5o3XHWmW3-ojP6bjeOrzpqP79IHW/view?usp=drive_link',
        },
        {
          type: 'grammar',
          name: '9. Might, might not',
          link: 'https://drive.google.com/file/d/1uJ9-dqbUpUFbyP79FxgE-WtZMBoJ4-cK/view?usp=drive_link',
        },
        {
          type: 'grammar',
          name: '10. Пасивний стан',
          link: 'https://drive.google.com/file/d/1ki9v-cm4MlYffdXcJb-AwrFdLZ7NOZ9Y/view?usp=drive_link',
        },
      ],
    },
    enkids: {
      a0: [
        {
          type: 'quizlet',
          name: 'Beginner',
          link: 'https://quizlet.com/class/16307699/',
        },
        {
          type: 'video',
          name: 'There is/There are',
          link: 'https://youtu.be/IW4zTmN_1ZA?si=VTV_Wn8Uv_EtC9h9',
        },
        {
          type: 'video',
          name: 'Теперішній простий час дієслова "бути"',
          link: 'https://youtu.be/_5xGII9rDj8?si=AklXh1fYy8xJDN7k',
        },
        {
          type: 'video',
          name: 'Теперішній простий час: ствердження та заперечення',
          link: 'https://youtu.be/LZFDBIACwCU?si=uKzSyrc4FmytIAc1',
        },
        {
          type: 'video',
          name: 'Теперішній простий час: запитання',
          link: 'https://youtu.be/j650OTQp7Jc?si=Y_7s_CP_H3xOFa3B',
        },
        {
          type: 'video',
          name: 'Присвійні прикметники',
          link: 'https://youtu.be/W606CdnuOis?si=2oOtOla15mzUtO-s',
        },
        {
          type: 'video',
          name: 'Прислівники частоти',
          link: 'https://youtu.be/GvKqsBRPh8M?si=HyjLz5VfWg16MH68',
        },
        {
          type: 'video',
          name: 'Дієслово "мати". Частина 1',
          link: 'https://youtu.be/8I7uzL8SFis?si=CfGw7FyA0ydtYUfF',
        },
        {
          type: 'video',
          name: 'Дієслово "мати". Частина 2',
          link: 'https://youtu.be/pxzmOcDiH08?si=kVS0h5FkdJj4jrNg',
        },
        {
          type: 'video',
          name: 'Сполучники',
          link: 'https://youtu.be/1bOPHKa-68g?si=l-7Y7aTMtDcQwwV7',
        },
        {
          type: 'grammar',
          name: 'Артиклі а та an',
          link: 'https://drive.google.com/open?id=1SkKVE6ZjIkgs3SpjywQPeCpqXCOTbHxV&usp=drive_copy',
        },
        {
          type: 'grammar',
          name: 'Однина та множина іменників',
          link: 'https://drive.google.com/open?id=1oSWAERUL8n8lhA3FdlzQC8PA7rXx_Net&usp=drive_copy',
        },
        {
          type: 'grammar',
          name: 'Присвійні прикметники',
          link: 'https://drive.google.com/open?id=1kpgEJax5gabzq_uWojg132jRdwLB3-Ms&usp=drive_copy',
        },
        {
          type: 'grammar',
          name: 'Прийменники місця',
          link: 'https://drive.google.com/open?id=1McVAuqkM5djjgWoVe4i97EiHunq4Bni0&usp=drive_copy',
        },
        {
          type: 'grammar',
          name: 'Конструкції there is та there are',
          link: 'https://drive.google.com/open?id=1I8E4zMeA-gpMXlTSX--YaZ2_KB04eN0F&usp=drive_copy',
        },
        {
          type: 'grammar',
          name: 'Дієслово "мати". Частина 1',
          link: 'https://drive.google.com/open?id=1VD3LJJNCdNmJ6ymvaBysChwj4Vm3lbVy&usp=drive_copy',
        },
        {
          type: 'grammar',
          name: 'Дієслово "мати". Частина 2',
          link: 'https://drive.google.com/open?id=1odIe0cXbmi-r2rfyAWh08LN_u68hbyM5&usp=drive_copy',
        },
        {
          type: 'grammar',
          name: 'Модальне дієслово "can"',
          link: 'https://drive.google.com/open?id=1MJYRk0uRgNrSEcyWNEN2BflbFk0okj73&usp=drive_copy',
        },
        {
          type: 'grammar',
          name: 'Теперішній простий час дієслова "бути"',
          link: 'https://drive.google.com/open?id=1BuqMw8FlKCuI8bLvk5kG3DPIHXwhU5W2&usp=drive_copy',
        },
        {
          type: 'grammar',
          name: 'Теперішній простий час: ствердження та заперечення',
          link: 'https://drive.google.com/open?id=1Y9cz3LDWXYsQVYBia2BYzjDm45j3BS01&usp=drive_copy',
        },
        {
          type: 'grammar',
          name: 'Теперішній простий час: запитання',
          link: 'https://drive.google.com/open?id=14hiu5n42Joru-mWPgpDzYl2flUZwpq5B&usp=drive_copy',
        },
      ],
      a1: [
        {
          type: 'quizlet',
          name: 'Elementary',
          link: 'https://quizlet.com/class/16312869/',
        },
        {
          type: 'video',
          name: 'Присвійні прикметники',
          link: 'https://youtu.be/Oa41seorFVA?si=kW9-vtG8yVnC-mGV',
        },
        {
          type: 'video',
          name: 'Теперішній простий час дієслова "бути"',
          link: 'https://youtu.be/_5xGII9rDj8?si=AklXh1fYy8xJDN7k',
        },
        {
          type: 'video',
          name: 'Теперішній простий час: ствердження та заперечення',
          link: 'https://youtu.be/LZFDBIACwCU?si=uKzSyrc4FmytIAc1',
        },
        {
          type: 'video',
          name: 'Теперішній простий час: запитання',
          link: 'https://youtu.be/j650OTQp7Jc?si=Y_7s_CP_H3xOFa3B',
        },
        {
          type: 'video',
          name: 'Прислівники частоти',
          link: 'https://youtu.be/GvKqsBRPh8M?si=HyjLz5VfWg16MH68',
        },
        {
          type: 'video',
          name: 'Теперішній тривалий час',
          link: 'https://youtu.be/HlXdSDxiLDs?si=CN_ijhjjZC_jPNBg',
        },
        {
          type: 'video',
          name: 'Сполучники',
          link: 'https://youtu.be/1bOPHKa-68g?si=l-7Y7aTMtDcQwwV7',
        },
        {
          type: 'video',
          name: 'Вища ступінь порівняння прикметників',
          link: 'https://youtu.be/4Doh-bC5zhg?si=LORC7FwZMsBIQj0V',
        },
        {
          type: 'video',
          name: 'Найвища ступінь порівняння прикметників',
          link: 'https://youtu.be/drV3nQcr5K4?si=eYxjojmSFg2UXkd4',
        },
        {
          type: 'video',
          name: 'Минулий простий час дієслова "бути"',
          link: 'https://youtu.be/_tLKeAOSYmQ?si=WiMdYSyJt3NVDDGQ',
        },
        {
          type: 'grammar',
          name: 'Присвійні прикметники',
          link: 'https://drive.google.com/open?id=1DvTD3p7VlxFinZkt9rg1ZMRmg-uvv1Gz&usp=drive_copy',
        },
        {
          type: 'grammar',
          name: 'Теперішній простий час дієслова "бути"',
          link: 'https://drive.google.com/open?id=1BuqMw8FlKCuI8bLvk5kG3DPIHXwhU5W2&usp=drive_copy',
        },
        {
          type: 'grammar',
          name: 'Теперішній простий час: ствердження та заперечення',
          link: 'https://drive.google.com/open?id=1Y9cz3LDWXYsQVYBia2BYzjDm45j3BS01&usp=drive_copy',
        },
        {
          type: 'grammar',
          name: 'Теперішній простий час: запитання',
          link: 'https://drive.google.com/open?id=14hiu5n42Joru-mWPgpDzYl2flUZwpq5B&usp=drive_copy',
        },
        {
          type: 'grammar',
          name: 'Прислівники частоти',
          link: 'https://drive.google.com/open?id=1zKudQGv73jGfHgEBEiM2iwj_1OPQfObj&usp=drive_copy',
        },
        {
          type: 'grammar',
          name: 'Теперішній тривалий час',
          link: 'https://drive.google.com/open?id=1X4pRn0yJxIpGNOogMbsZwXC1P5mzEsyf&usp=drive_copy',
        },
        {
          type: 'grammar',
          name: 'Сполучники',
          link: 'https://drive.google.com/open?id=1WIN8dxPwwVINWJD4Z8KVADxC62BKBBZS&usp=drive_copy',
        },
        {
          type: 'grammar',
          name: 'Вища ступінь порівняння прикметників',
          link: 'https://drive.google.com/open?id=1oGeMmugkUxFKsKDocHsFRX69vKQG6DMb&usp=drive_copy',
        },
        {
          type: 'grammar',
          name: 'Найвища ступінь порівняння прикметників',
          link: 'https://drive.google.com/open?id=1LpEyFqBQYHJwYPUcA3wANsR2h_6EoPQ0&usp=drive_copy',
        },
        {
          type: 'grammar',
          name: 'Минулий простий час дієслова "бути"',
          link: 'https://drive.google.com/open?id=1Z0nYNuE5T6dcAOIu6ybHcsU_Ygy8ZMaU&usp=drive_copy',
        },
      ],
      a2: [
        {
          type: 'quizlet',
          name: 'Elementary',
          link: 'https://quizlet.com/class/16351612/',
        },
        {
          type: 'video',
          name: 'Порівняння теперішнього простого та тривалого часів',
          link: 'https://youtu.be/11lcUBOR19g?si=4ydSfJri_F2RWFoe',
        },
        {
          type: 'video',
          name: 'Минулий простий час дієслова "бути"',
          link: 'https://youtu.be/VkwXcrIria8?list=PLtJh4LHDDrT-_AdNIL2Sz43dVGQ9dNP2J',
        },
        {
          type: 'video',
          name: 'Минулий простий час',
          link: 'https://youtu.be/5NvEOt2jKCw?si=rOrG1bHEUsHFriSk',
        },
        {
          type: 'video',
          name: 'Минулий простий час: неправильні дієслова',
          link: 'https://youtu.be/s41ukaTDoag?list=PLtJh4LHDDrT-_AdNIL2Sz43dVGQ9dNP2J',
        },
        {
          type: 'video',
          name: 'Неозначені займенники',
          link: 'https://youtu.be/oWkiaUus9AI?list=PLtJh4LHDDrT-_AdNIL2Sz43dVGQ9dNP2J',
        },
        {
          type: 'video',
          name: 'Визначники кількості',
          link: 'https://youtu.be/87D6YgWRtVc?list=PLtJh4LHDDrT-_AdNIL2Sz43dVGQ9dNP2J',
        },
        {
          type: 'video',
          name: 'Минулий тривалий час',
          link: 'https://youtu.be/yAOqwTOahgc?list=PLtJh4LHDDrT-_AdNIL2Sz43dVGQ9dNP2J',
        },
        {
          type: 'video',
          name: 'Майбутня конструкція "Be going to"',
          link: 'https://youtu.be/1v96Hkgupho?list=PLtJh4LHDDrT-_AdNIL2Sz43dVGQ9dNP2J',
        },
        {
          type: 'video',
          name: 'Модальне дієслово "should"',
          link: 'https://youtu.be/46383LT1aKI?list=PLtJh4LHDDrT-_AdNIL2Sz43dVGQ9dNP2J',
        },
        {
          type: 'video',
          name: 'Займенники',
          link: 'https://youtu.be/NSlDXmyiS-E?list=PLtJh4LHDDrT-_AdNIL2Sz43dVGQ9dNP2J',
        },
        {
          type: 'grammar',
          name: 'Порівняння теперішнього простого та тривалого часів',
          link: 'https://drive.google.com/open?id=1FARFjnTPsA9YFIg6oC5JTDY-uMatzk3p&usp=drive_copy',
        },
        {
          type: 'grammar',
          name: 'Минулий простий час дієслова "бути"',
          link: 'https://drive.google.com/open?id=1Z0nYNuE5T6dcAOIu6ybHcsU_Ygy8ZMaU&usp=drive_copy',
        },
        {
          type: 'grammar',
          name: 'Минулий простий час',
          link: 'https://drive.google.com/open?id=1wrVnkUoQfxRStWDjIEY_JoBczz6_hh1C&usp=drive_copy',
        },
        {
          type: 'grammar',
          name: 'Минулий простий час: неправильні дієслова',
          link: 'https://drive.google.com/open?id=1go45sR5Sjb3GieBwJRrNS4eIc3sb_7ti&usp=drive_copy',
        },
        {
          type: 'grammar',
          name: 'Неозначені займенники',
          link: 'https://drive.google.com/open?id=12nME98F0aEm0FGUCp1dPvPn8xYJnOKo4&usp=drive_copy',
        },
        {
          type: 'grammar',
          name: 'Визначники кількості',
          link: 'https://drive.google.com/open?id=13u6bLt9Q0lDlKf1t5vp6RkBpAbL5gPCm&usp=drive_copy',
        },
        {
          type: 'grammar',
          name: 'Минулий тривалий час',
          link: 'https://drive.google.com/open?id=1kIEqcuCPln19-Oto2VnqLHcLqqW8_mrm&usp=drive_copy',
        },
        {
          type: 'grammar',
          name: 'Майбутня конструкція "Be going to"',
          link: 'https://drive.google.com/open?id=1t4shFAdNnVHV_o--BdtZFBjoYfibe_yv&usp=drive_copy',
        },
        {
          type: 'grammar',
          name: 'Модальне дієслово "should"',
          link: 'https://drive.google.com/open?id=1RD3YBRiqOJ9UO03i6E4SiYK-1Tcb3CrX&usp=drive_copy',
        },
        {
          type: 'grammar',
          name: 'Займенники',
          link: 'https://drive.google.com/open?id=1OBv5D6Jr99Ut1FR8wOc8HbBv4i7bUJKO&usp=drive_copy',
        },
      ],
    },
    de: {
      a0: [
        {
          type: 'video',
          name: '1. Артиклі',
          link: 'https://youtu.be/c4gbqUqxOww',
        },
        {
          type: 'video',
          name: '2. Займенники',
          link: 'https://youtu.be/pE9HQaRQ_3A',
        },
        {
          type: 'video',
          name: '3. Відмінювання простих дієслів в теперішньому часі',
          link: 'https://youtu.be/5vfWH_g1cTs',
        },
        {
          type: 'video',
          name: '4. Відмінювання Haben, sein',
          link: 'https://youtu.be/5OMtWWegMLY',
        },
        {
          type: 'video',
          name: '5. Побудова питання',
          link: 'https://youtu.be/B4d0Hclcnqw',
        },
        {
          type: 'video',
          name: '6. Визначення артикля',
          link: 'https://youtu.be/nRsgWeFRAsA',
        },
        {
          type: 'video',
          name: '7. Побудова заперечення (nicht)',
          link: 'https://www.youtube.com/watch?v=ssQa8xxmAuU&ab_channel=APEducationCenter',
        },
        {
          type: 'video',
          name: '8. Відмінювання модального дієслова mögen',
          link: 'https://www.youtube.com/watch?v=vtcgCABWfe8&ab_channel=APEducationCenter',
        },
        {
          type: 'grammar',
          name: '1. Визначення артикля',
          link: 'https://drive.google.com/file/d/10LI9rZ9dWq-tNHTuyJbQEAPnlspb9UAA/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '2. Займенники',
          link: 'https://drive.google.com/file/d/1D-EVsgE4dwY_Ij13zAh4wT1y3FWvOYEN/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '3. Відмінювання простих дієслів в теперішньому часі',
          link: 'https://drive.google.com/file/d/17RHpLeO89dlpK1luDzQhzkqIbAcpgaqk/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '4. Відмінювання Haben, sein',
          link: 'https://drive.google.com/file/d/1eAqtU1eH2OdWsK6zYAsH8OSOkFHqjtp-/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '5. Побудова питання',
          link: 'https://drive.google.com/file/d/17E3oIqo41_zWLc7G53Tp1OxAsOZU7eaR/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '6. Відмінювання модального дієслова mögen',
          link: 'https://drive.google.com/file/d/1Pf11nHg4b_grIHDgIk6wqIVyRSnLT2Q4/view?usp=drive_link',
        },
        {
          type: 'grammar',
          name: '7. Побудова заперечення (nicht)',
          link: 'https://drive.google.com/file/d/1tuV4UEWpqkhAffCPk9SJ9eQyyc9MqTRa/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '8. Присвійні займенники',
          link: 'https://drive.google.com/file/d/1hSCZP03zhlYCVj5wMHgidJXoEP_WnRjh/view?usp=sharing',
        },
      ],
      a1: [
        {
          type: 'video',
          name: '1. Займенники',
          link: 'https://youtu.be/pE9HQaRQ_3A',
        },
        {
          type: 'video',
          name: '2. Артиклі',
          link: 'https://youtu.be/c4gbqUqxOww',
        },
        {
          type: 'video',
          name: '3. Визначення артикля',
          link: 'https://youtu.be/nRsgWeFRAsA',
        },
        {
          type: 'video',
          name: '4. Займенники',
          link: 'https://youtu.be/pE9HQaRQ_3A',
        },
        {
          type: 'video',
          name: '5. Питальні слова',
          link: 'https://www.youtube.com/watch?v=W-fZfXSAnQc&ab_channel=APEducationCenter',
        },
        {
          type: 'video',
          name: '6. Заперечення + Kein',
          link: 'https://youtu.be/YegJWwy-qCc',
        },
        {
          type: 'video',
          name: '7. Присвійний артикль / присвійний займенник',
          link: 'https://youtu.be/1fppks-GpwY?list=PLtJh4LHDDrT9p3KUaqr4TK7JCi_4j0CPa',
        },
        {
          type: 'video',
          name: '8. Відмінювання простих дієслів в теперішньому часі',
          link: 'https://youtu.be/5vfWH_g1cTs',
        },
        {
          type: 'video',
          name: '9. Відмінювання Haben, sein',
          link: 'https://youtu.be/5OMtWWegMLY',
        },
        {
          type: 'video',
          name: '10. Відмінювання модального дієслова mögen',
          link: 'https://www.youtube.com/watch?v=vtcgCABWfe8&ab_channel=APEducationCenter',
        },
        {
          type: 'video',
          name: '11. Особові займенники в Akkusativ',
          link: 'https://youtu.be/XOvsek3si_Q?si=XLhg9gkuQGdy9Wac',
        },
        {
          type: 'video',
          name: '12. Займенники "alle", "wenige", "viele"',
          link: 'https://www.youtube.com/watch?v=kDs5bMIIYf8&list=PLtJh4LHDDrT9SJJG3JkWlYv90m7JAqO6M&index=50&ab_channel=APEducationCenter',
        },
        {
          type: 'video',
          name: '13. Ступені порівняння прикметників',
          link: 'https://www.youtube.com/watch?v=kDs5bMIIYf8&list=PLtJh4LHDDrT9SJJG3JkWlYv90m7JAqO6M&index=50&ab_channel=APEducationCenter',
        },
        {
          type: 'video',
          name: '14. Präteritum haben/sein',
          link: 'https://youtu.be/IAaWBct0GwE?si=zjuoU_RBKrMvTfVb',
        },
        {
          type: 'video',
          name: '15. Артиклі в Akkusativ',
          link: 'https://youtu.be/-4zGxMaJsfI?si=r0Y8vHUQCkr9ZNAd',
        },
        {
          type: 'video',
          name: '16. Як представитись німецькою',
          link: 'https://youtu.be/mTUiAo2JmeA?si=CP6F2ktD9CB6eD6e',
        },
        {
          type: 'video',
          name: '17. Вимова букви S',
          link: 'https://youtu.be/1xEwcxPPOA8?si=lUeb5Ae4d9dukEXl',
        },
        {
          type: 'video',
          name: '18. Однина і множина',
          link: 'https://youtu.be/h953xJ1a840?si=t4gSQEFZ7GIRp8N5',
        },
        {
          type: 'grammar',
          name: '1. (Не)Відокремлювані префікси',
          link: 'https://drive.google.com/file/d/1fTVXjCRNVtfZvFe7RvEAJ_d7PM8SXnd4/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '2. Присвійні займенники',
          link: 'https://drive.google.com/file/d/1hSCZP03zhlYCVj5wMHgidJXoEP_WnRjh/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '3. Ja, Nein, Doch',
          link: 'https://drive.google.com/file/d/1yePZVPGc-oentAFdZECndMhX7Kqdvg_O/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '4. Безособові речення з "man"',
          link: 'https://drive.google.com/file/d/1Y8P71R4ZVJw7TFA3RU9-Qj8beT16p5M9/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '5. Прийменники часу',
          link: 'https://drive.google.com/file/d/1wkenJ4ryhmFXGI_WSCk8C5X85uSmACqF/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '6. Perfekt',
          link: 'https://drive.google.com/file/d/1cj3DI6OcPk_x7xWYaZRbCKFgE2syL5eU/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '7. Наказовий спосіб',
          link: 'https://drive.google.com/file/d/1idh_CXYRwOJRmYmci8g1s2DPnBz9jdIR/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '8. Правильний прийменник',
          link: 'https://drive.google.com/file/d/1UzY_Xqff72kQRi2oB2fgRA7a_r-T1qB8/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '9. Прийменники в Dat-Akk',
          link: 'https://drive.google.com/file/d/1h4ZOMvtHLAnbMxpKcJvhjT8W-VWejddS/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '10. Präteritum haben/sein',
          link: 'https://drive.google.com/file/d/1zxNnOxMCOBh47nAoHaCWbwCLk6POJAFo/view?usp=sharing',
        },
      ],
      a2: [
        {
          type: 'video',
          name: '1. Займенники',
          link: 'https://youtu.be/pE9HQaRQ_3A',
        },
        {
          type: 'video',
          name: '2. Артиклі',
          link: 'https://youtu.be/c4gbqUqxOww',
        },
        {
          type: 'video',
          name: '3. Визначення артикля',
          link: 'https://youtu.be/nRsgWeFRAsA',
        },
        {
          type: 'video',
          name: '4. Займенники',
          link: 'https://youtu.be/pE9HQaRQ_3A',
        },
        {
          type: 'video',
          name: '5. Питальні слова',
          link: 'https://www.youtube.com/watch?v=W-fZfXSAnQc&ab_channel=APEducationCenter',
        },
        {
          type: 'video',
          name: '6. Заперечення + Kein',
          link: 'https://youtu.be/YegJWwy-qCc',
        },
        {
          type: 'video',
          name: '7. Присвійний артикль / присвійний займенник',
          link: 'https://youtu.be/1fppks-GpwY?list=PLtJh4LHDDrT9p3KUaqr4TK7JCi_4j0CPa',
        },
        {
          type: 'video',
          name: '8. Відмінювання простих дієслів в теперішньому часі',
          link: 'https://youtu.be/5vfWH_g1cTs',
        },
        {
          type: 'video',
          name: '9. Порівняння (Такий як, не такий... як)',
          link: 'https://www.youtube.com/watch?v=XAjUNk83-7A&list=PLtJh4LHDDrT8JXPQ796BRrPatxIc62j3-&index=19&ab_channel=APEducationCenter',
        },
        {
          type: 'video',
          name: '10. Ступені порівняння прикметників',
          link: 'https://www.youtube.com/watch?v=r_skk86wXmg&list=PLtJh4LHDDrT8JXPQ796BRrPatxIc62j3-&index=21&ab_channel=APEducationCenter',
        },
        {
          type: 'grammar',
          name: '1. Годинник',
          link: 'https://drive.google.com/file/d/1YzLvNzbHYAOz19fzycQWEazbUycwPiyZ/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '2. Ступені порівняння',
          link: 'https://drive.google.com/file/d/1cTNLtXIc3hReUn2nprtCYsrLfl11QowR/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '3. Присвійні займеники в Gen',
          link: 'https://drive.google.com/file/d/19KtawUUC_y8dp1wW8rK_bUp6KPrnUVoW/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '4. Temporale Nebensätze',
          link: 'https://drive.google.com/file/d/1Cq4j7nIiO6io1Gc3z5r4PQihQS_-vbnL/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '5. Непрямі питання',
          link: 'https://drive.google.com/file/d/1gCtZxinfnwh6J7jpgtU5q57HnJriMcPx/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '6. Relativsätze im Nom und Akk',
          link: 'https://drive.google.com/file/d/1v5ZRuKAoBcNgdM_e3misJwkpIRR1Y1A3/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '7. Weil, wenn, dass',
          link: 'https://drive.google.com/file/d/1W4ZrGHcfHC7O7Hdkk5XBS0oWfTJHR0F0/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '8. Passiv',
          link: 'https://drive.google.com/file/d/1BSdtp8GP92hGpE48z56XobcTDdv_Astr/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '9. Vergleich',
          link: 'https://drive.google.com/file/d/1lDB_K0mJ2BgtsBM-xM_ps3WS0x4xPaiW/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: '10. Значення модальних дієслів',
          link: 'https://drive.google.com/file/d/1UM4gqpb8ldZO-xq_JPei5G64P1LL6yzM/view?usp=sharing',
        },
      ],
    },
    pl: {
      a0: [
        {
          type: 'video',
          name: 'Алфавіт / стиль офіційний і не офіційний',
          link: 'https://youtu.be/u7XlzRQsRmY?list=PLtJh4LHDDrT_NieAz3ab3kwFE0m3dvnGN',
        },
        {
          type: 'video',
          name: 'Відміна дієслова бути + займенники',
          link: 'https://youtu.be/xPjykvbo7o4?list=PLtJh4LHDDrT_NieAz3ab3kwFE0m3dvnGN',
        },
        {
          type: 'video',
          name: 'Числівники 1-10/роки/дієвідміна -м;-ш',
          link: 'https://youtu.be/BY_Nwr81M68?list=PLtJh4LHDDrT_NieAz3ab3kwFE0m3dvnGN',
        },
        {
          type: 'video',
          name: 'Називний відмінок іменників',
          link: 'https://youtu.be/eRUjdPXM2Nw?list=PLtJh4LHDDrT_NieAz3ab3kwFE0m3dvnGN',
        },
        {
          type: 'video',
          name: 'Називний відмінок прикметників',
          link: 'https://youtu.be/Z1R6rMSAcUg?list=PLtJh4LHDDrT_NieAz3ab3kwFE0m3dvnGN',
        },
        {
          type: 'video',
          name: 'Прикметник / роки / числівники 10-100',
          link: 'https://youtu.be/IoU0Y82a2lY?list=PLtJh4LHDDrT_NieAz3ab3kwFE0m3dvnGN',
        },
        {
          type: 'video',
          name: 'Орудний відмінок однина',
          link: 'https://youtu.be/XGp23LBUKWI?list=PLtJh4LHDDrT_NieAz3ab3kwFE0m3dvnGN',
        },
        {
          type: 'video',
          name: 'Відмінювання дієслів',
          link: 'https://youtu.be/BY_Nwr81M68?si=CKgQSgx1Ze8lkPgz',
        },
        {
          type: 'video',
          name: 'Форми звертань',
          link: 'https://youtu.be/YDb_MQpAJDM?si=C6k4EpyJdycmTWJw',
        },
        {
          type: 'video',
          name: 'Дієвідміна е -еш',
          link: 'https://youtu.be/Q2cYpM8vt-4',
        },
        {
          type: 'grammar',
          name: 'Алфавіт / стиль офіційний і не офіційний',
          link: 'https://drive.google.com/file/d/1L8wYMFPiAKkkeW-nO4lBuhn8Cef66i7K/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: 'Відміна дієслова бути + займенники',
          link: 'https://drive.google.com/file/d/1Ksy0FUPAGx7bfx-xlHXuCn-vPLN09Qd9/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: 'Числівники 1-10/роки/дієвідміна -м;-ш',
          link: 'https://drive.google.com/file/d/1xGBPvsKNiX9ryVyhs1lN60rI6C8iCdXG/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: 'Називний відмінок іменників',
          link: 'https://drive.google.com/file/d/1_7StYKWQd3lfmtWVT0q8MY2bG1ljZXqO/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: 'Називний відмінок прикметників',
          link: 'https://drive.google.com/file/d/1CHsNY03-0zELzHHuXC_v4ON4JJbqGmKz/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: 'Прикметник / роки / числівники 10-100',
          link: 'https://drive.google.com/file/d/11sy2uWn47auZkAuydlfRJ8nW346n5Zg-/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: 'Орудний відмінок однина',
          link: 'https://drive.google.com/file/d/1JaeIDWCGKtiQ-lM9BSxEx3q-aUq7n1cq/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: 'Орудний відмінок множина',
          link: 'https://drive.google.com/file/d/13PGRAvHTbajPDyfIIilz_FPhyRb9I4xd/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: 'Знахідний відмінок множини',
          link: 'https://drive.google.com/file/d/1FqaxvKWPhTshf1BXJpU_W1o-SGADQul4/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: 'Займенники / дієвідміна -м;-ш',
          link: 'https://drive.google.com/file/d/1i7cFurr8k0nzF4ZU32eGKhwIVFoPnCAN/view?usp=sharing',
        },
      ],
      a1: [
        {
          type: 'video',
          name: 'Алфавіт / стиль офіційний і не офіційний',
          link: 'https://youtu.be/u7XlzRQsRmY?list=PLtJh4LHDDrT_NieAz3ab3kwFE0m3dvnGN',
        },
        {
          type: 'video',
          name: 'Відміна дієслова бути + займенники',
          link: 'https://youtu.be/xPjykvbo7o4?list=PLtJh4LHDDrT_NieAz3ab3kwFE0m3dvnGN',
        },
        {
          type: 'video',
          name: 'Числівники 1-10/роки/дієвідміна -м;-ш',
          link: 'https://youtu.be/BY_Nwr81M68?list=PLtJh4LHDDrT_NieAz3ab3kwFE0m3dvnGN',
        },
        {
          type: 'video',
          name: 'Займенники / дієвідміна -м;-ш',
          link: 'https://youtu.be/bEoWCQoWwZk',
        },
        {
          type: 'video',
          name: 'Називний відмінок іменника + дієвідміна -м;-ш',
          link: 'https://youtu.be/Hk1Kj5hsQkc',
        },
        {
          type: 'video',
          name: 'Називний відмінок прикметників + дієвідміна -е; -іш, -иш',
          link: 'https://youtu.be/X50rjs7Ux0k',
        },
        {
          type: 'video',
          name: 'Дієвідміна е -еш',
          link: 'https://youtu.be/Q2cYpM8vt-4',
        },
        {
          type: 'video',
          name: 'Минулий час',
          link: 'https://youtu.be/8iMavT6E3Yw',
        },
        {
          type: 'video',
          name: 'Майбутні час не завершена дія',
          link: 'https://youtu.be/KtyKMgyXy_Y',
        },
        {
          type: 'video',
          name: 'Родовий відмінок Множини',
          link: 'https://youtu.be/lH9ooIVurH8',
        },
        {
          type: 'grammar',
          name: 'Займенники / дієвідміна -м;-ш',
          link: 'https://drive.google.com/file/d/1i7cFurr8k0nzF4ZU32eGKhwIVFoPnCAN/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: 'Називний відмінок іменника + дієвідміна -м;-ш',
          link: 'https://drive.google.com/file/d/127_efgTXTAZdMnw4Oq312Uvc0L7a-AFe/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: 'Називний відмінок прикметників + дієвідміна -е; -іш, -иш',
          link: 'https://drive.google.com/file/d/1wc38-DT_GTvpZN0h0kNP-wyPYDvj13R-/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: 'Дієвідміна е -еш',
          link: 'https://drive.google.com/file/d/1YHnMcVlfQUfaOKlt7pBWlNf5yt_k7f2C/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: 'Закріплення дієвідмін',
          link: 'https://drive.google.com/file/d/1-FE1WzvdewuAeReNFRb5kikFB04qxTIB/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: 'Орудний відмінок однини',
          link: 'https://drive.google.com/file/d/1CWbvVbiaJ89D0b7l0ZssYdCPb69ZpRto/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: 'Орудний відмінок множини',
          link: 'https://drive.google.com/file/d/1-N_cK7cKTwf9j4gTp5xrshFd0O_F8Uq2/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: 'Минулий час',
          link: 'https://drive.google.com/file/d/1_KEtbF2T-qFCmVw94XZIfjg8XCVOINvt/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: 'Минулиий час вийнятки',
          link: 'https://drive.google.com/file/d/1qvad4JU1g72UevGQY3LmQsUn1--owWxD/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: 'Знахідний відмінок множини',
          link: 'https://drive.google.com/file/d/1FqaxvKWPhTshf1BXJpU_W1o-SGADQul4/view?usp=sharing',
        },
      ],
      a2: [
        {
          type: 'video',
          name: 'Повторення часів',
          link: 'https://www.youtube.com/watch?v=rOByn4Fvrig&list=PLtJh4LHDDrT_iO1gJaIYFdvp5etevkMFZ',
        },
        {
          type: 'video',
          name: 'Повторення відміни іменників і прикметників',
          link: 'https://www.youtube.com/watch?v=2XOwRhF2ZBM&list=PLtJh4LHDDrT_iO1gJaIYFdvp5etevkMFZ&index=2',
        },
        {
          type: 'video',
          name: 'Минулий час',
          link: 'https://youtu.be/8iMavT6E3Yw',
        },
        {
          type: 'video',
          name: 'Майбутній час, незавершена дія',
          link: 'https://youtu.be/KtyKMgyXy_Y',
        },
        {
          type: 'video',
          name: 'Давальний відмінок множини + займенники в давальному відмінку',
          link: 'https://www.youtube.com/watch?v=bVikC8BFBaM&list=PLtJh4LHDDrT_iO1gJaIYFdvp5etevkMFZ&index=3',
        },
        {
          type: 'video',
          name: 'Повторення відмін',
          link: 'https://www.youtube.com/watch?v=nYBn0dR6h3Y&list=PLtJh4LHDDrT_iO1gJaIYFdvp5etevkMFZ&index=4',
        },
        {
          type: 'video',
          name: 'Утворення прислівник',
          link: 'https://www.youtube.com/watch?v=XfTUNgIIGEw&list=PLtJh4LHDDrT_iO1gJaIYFdvp5etevkMFZ&index=5',
        },
        {
          type: 'video',
          name: 'Ступені порівняня прислівників',
          link: 'https://www.youtube.com/watch?v=lTQrL1-stPM&list=PLtJh4LHDDrT_iO1gJaIYFdvp5etevkMFZ&index=6',
        },
        {
          type: 'video',
          name: 'Родовий відмінок Множини',
          link: 'https://youtu.be/lH9ooIVurH8',
        },
        {
          type: 'video',
          name: 'Називний відмінок прикметників + дієвідміна -е; -іш, -иш',
          link: 'https://youtu.be/X50rjs7Ux0k',
        },
        {
          type: 'grammar',
          name: 'Повторення часів',
          link: 'https://drive.google.com/drive/folders/1vmj58s8K5iFX3ib8iglLrJB686QLcOP3?usp=sharing',
        },
        {
          type: 'grammar',
          name: 'Повторення відміни іменників і прикметників',
          link: 'https://drive.google.com/file/d/1VTDFs8mFfcJh0zdMbQ91sDUUA1V4JEx_/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: 'Давальний відмінок однини',
          link: 'https://drive.google.com/file/d/1devCKprcKVI3rWmWgyp3eICwfXZco3ol/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: 'Давальний відмінок множини + займенники в давальному відмінку',
          link: 'https://drive.google.com/file/d/1HFOBB0RMI7jITsn9fd24ivRu3xLMZkg-/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: 'Ступені порівняння прислівників',
          link: 'https://drive.google.com/file/d/1P21vl3jR3FTE20s8Sp6MnviF7gXAenwn/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: 'Наказовий спосіб',
          link: 'https://drive.google.com/file/d/1yTm6wGoDfboaAXJKVBZepQLX7zib6HUM/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: 'Умовний спосіб',
          link: 'https://drive.google.com/file/d/1y-dN2BGo0AspPFXqpbtFYvyUXQJsHNf7/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: 'Ступені порівняння прикметників',
          link: 'https://drive.google.com/file/d/1arV7URAA6mjAhOz1hf_5y3JIKOXbotjV/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: 'Дієвідміна/кличний відмінок',
          link: 'https://drive.google.com/file/d/103kPxfejNJMe35Z2Zvo5uwj6WFXoHnNu/view?usp=sharing',
        },
        {
          type: 'grammar',
          name: 'Місцевий відмінок',
          link: 'https://drive.google.com/file/d/1yxnZmRF95tTIiJri7dNsV84G5eGEia1R/view?usp=sharing',
        },
      ],
    },
  };

  axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

  const setAuthToken = token => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  useEffect(() => {
    document.title = 'Подарункові матеріали | AP Education';

    const refreshToken = async () => {
      console.log('token refresher');
      try {
        const res = await axios.post('/users/refresh', {
          mail: localStorage.getItem('mail'),
        });
        setIsUserLogged(isLogged => (isLogged = true));
        console.log(res);
        setUser(user => (user = { ...res.data.user }));
      } catch (error) {
        console.log(error);
      }
    };

    refreshToken();
  }, []);

  const initialLoginValues = {
    mail: '',
    password: '',
  };

  const loginSchema = yup.object().shape({
    mail: yup
      .string()
      .required('Вкажіть пошту, за якою ви зареєстровані на нашій платформі!'),
    password: yup
      .string()
      .required(
        'Введіть пароль, який ви використовуєте для входу на нашу платформу!'
      ),
  });

  const handleLoginSubmit = async (values, { resetForm }) => {
    values.mail = values.mail.toLowerCase().trim().trimStart();
    values.password = values.password.trim().trimStart();
    try {
      const response = await axios.post('/users/login', values);
      setAuthToken(response.data.token);
      setIsUserLogged(isLogged => (isLogged = true));
      setUser(user => (user = { ...response.data.user }));
      localStorage.setItem('mail', values.mail);
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const togglePdfPreviewOnTouch = pdfId => {
    const pdfOpener = pdfId => {
      console.log('opener');
      setOpenedPdf(pdf => (pdf = pdfId));
      setIsPdfPreviewOpen(isOpen => !isOpen);
    };

    setOpenedPdf(pdfId);
    isPdfPreviewOpen && pdfId !== openedPdf
      ? setOpenedPdf(pdf => (pdf = pdfId))
      : !isPdfPreviewOpen && pdfId === openedPdf
      ? setIsPdfPreviewOpen(isOpen => !isOpen)
      : isPdfPreviewOpen && pdfId === openedPdf
      ? setIsPdfPreviewOpen(isOpen => !isOpen)
      : pdfOpener(pdfId);
  };

  const openPdfPreviewOnHover = e => {
    setOpenedPdf(pdf => (pdf = e.target.id));
    if (!isPdfPreviewOpen) {
      setIsPdfPreviewOpen(isOpen => !isOpen);
    }
  };

  const closePdfPreviewOnMouseOut = () => {
    console.log('mouse out?');
    setOpenedPdf(pdf => (pdf = ''));
    if (isPdfPreviewOpen) {
      setIsPdfPreviewOpen(isOpen => !isOpen);
    }
  };

  return (
    <>
      {!isUserLogged ? (
        <Formik
          initialValues={initialLoginValues}
          onSubmit={handleLoginSubmit}
          validationSchema={loginSchema}
        >
          <LoginForm>
            <LeftFormBackgroundStar />
            <RightFormBackgroundStar />
            <LoginFormText>
              Привіт!
              <br />
              Ця сторінка недоступна для неавторизованих користувачів. Але якщо
              ви маєте доступ до нашої платформи, то й до цієї сторінки теж.
              Введіть дані, які ви використовуєте для входу на платформу.
            </LoginFormText>
            <Label>
              <AdminInput type="text" name="mail" placeholder="Login" />
              <AdminInputNote component="p" name="mail" type="email" />
            </Label>
            <Label>
              <AdminInput
                type="password"
                name="password"
                placeholder="Password"
              />
              <AdminInputNote component="p" name="password" />
            </Label>
            <AdminFormBtn type="submit">Увійти</AdminFormBtn>
          </LoginForm>
        </Formik>
      ) : (
        <GiftsBox>
          <Logo />
          <Title>Подарункові матеріали</Title>
          <Description>
            Розпочніть своє навчання вже зараз з безкоштовними подарунковими
            матеріалами!
          </Description>
          {gifts[user.lang][user.knowledge].map((gift, i) => (
            <>
              <GiftsBoxItem key={i}>
                {gift.type === 'quizlet' && (
                  <LessonTopBox>
                    <QuizletLink
                      target="_blank"
                      rel="noopener noreferrer"
                      to={gift.link}
                    >
                      <QuizletLogo />
                      <GiftsDescription>
                        Набір вправ для самостійного вивчення слів для рівня{' '}
                        {gift.name}
                      </GiftsDescription>
                      <GiftLinkIcon />
                    </QuizletLink>
                  </LessonTopBox>
                )}
                {gift.type === 'video' && (
                  <GiftsVideoBox
                  // className={!isVideoOpen && 'minimized'}
                  >
                    <LessonTopBox>
                      <YouTubeLogo />
                      <GiftsDescription>{gift.name}</GiftsDescription>
                    </LessonTopBox>
                    <LessonVideoBox>
                      <ReactPlayer
                        loop={true}
                        muted={false}
                        controls={true}
                        style={{
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                        }}
                        width="100%"
                        height="100%"
                        url={gift.link}
                      />
                    </LessonVideoBox>
                  </GiftsVideoBox>
                )}

                {gift.type === 'grammar' && (
                  <PdfBox
                    onMouseLeave={closePdfPreviewOnMouseOut}
                    // className={!isGrammarOpen && 'minimized'}
                  >
                    <PdfWrapper
                      key={gift.link}
                      id={gift.link}
                      onMouseEnter={e => openPdfPreviewOnHover(e)}
                      onTouchEnd={() => togglePdfPreviewOnTouch(gift.link)}
                    >
                      <PdfIcon />
                      <LessonValuePdfLink
                        target="_blank"
                        rel="noopener noreferrer"
                        to={gift.link}
                      >
                        <GiftsDescription>{gift.name}</GiftsDescription>
                        <ExternalLinkIcon />
                      </LessonValuePdfLink>
                    </PdfWrapper>
                    <PdfPreviewBackground
                      className={
                        isPdfPreviewOpen &&
                        openedPdf === gift.link &&
                        'preview-open'
                      }
                    >
                      {isPdfPreviewOpen && openedPdf === gift.link && (
                        <PdfPreview
                          title={`Preview of ${gift.link}`}
                          src={gift.link
                            .replace('open?id=', 'file/d/')
                            .replace('view', 'preview')
                            .replace('&usp=drive_copy', '/preview')}
                          allow="autoplay"
                        ></PdfPreview>
                      )}
                    </PdfPreviewBackground>
                  </PdfBox>
                )}
              </GiftsBoxItem>
            </>
          ))}
        </GiftsBox>
      )}
    </>
  );
};
