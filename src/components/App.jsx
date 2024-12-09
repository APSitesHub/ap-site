import TelegramHRRedirect from 'pages/HR/TelegramHRRedirect/TelegramHRRedirect';
import ViberHRRedirect from 'pages/HR/ViberHRRedirect/ViberHRRedirect';
import TelegramRedirect from 'pages/Service/TelegramRedirect/TelegramRedirect';
import ViberRedirect from 'pages/Service/ViberRedirect/ViberRedirect';
import { CollectionsAdminPanel } from 'pages/Streams/CollectionsAdminPanel/CollectionsAdminPanel';
import { StreamDeutschA0 } from 'pages/Streams/Deutsch A0/StreamDeutschA0';
import { StreamDeutschA2 } from 'pages/Streams/Deutsch A2/StreamDeutschA2';
import { StreamDeutschA2Free } from 'pages/Streams/Deutsch A2/StreamDeutschA2Free';
import { StreamDeutschB1 } from 'pages/Streams/Deutsch B1/StreamDeutschB1';
import { StreamDeutsch } from 'pages/Streams/Deutsch/StreamDeutsch';
import { StreamDeutschFree } from 'pages/Streams/Deutsch/StreamDeutschFree';
import { HostKahootAdminPanel } from 'pages/Streams/HostKahootAdminPanel/HostKahootAdminPanel';
import { KahootAdminPanel } from 'pages/Streams/KahootAdminPanel/KahootAdminPanel';
import { LessonsAdminPanel } from 'pages/Streams/LessonsAdminPanel/LessonsAdminPanel';
import { TeacherLessonsAdminPanel } from 'pages/Streams/LessonsAdminPanel/TeacherLessonsAdminPanel/TeacherLessonsAdminPanel';
import { StreamPolskiA0 } from 'pages/Streams/Polski A0/StreamPolskiA0';
import { StreamPolskiA2 } from 'pages/Streams/Polski A2/StreamPolskiA2';
import { StreamPolskiB1 } from 'pages/Streams/Polski B1/StreamPolskiB1';
import { StreamPolski } from 'pages/Streams/Polski/StreamPolski';
import { StreamPolskiFree } from 'pages/Streams/Polski/StreamPolskiFree';
import { StreamTest } from 'pages/Streams/Test/StreamTest';
import { KidsA0 } from 'pages/StreamsKids/KidsA0/KidsA0';
import { KidsA1 } from 'pages/StreamsKids/KidsA1/KidsA1';
import { KidsA1Free } from 'pages/StreamsKids/KidsA1/KidsA1Free';
import { KidsA2 } from 'pages/StreamsKids/KidsA2/KidsA2';
import { KidsB1 } from 'pages/StreamsKids/KidsB1/KidsB1';
import { KidsB1Beginner } from 'pages/StreamsKids/KidsB1Beginner/KidsB1Beginner';
import { KidsB2 } from 'pages/StreamsKids/KidsB2/KidsB2';
import { KidsB2Beginner } from 'pages/StreamsKids/KidsB2Beginner/KidsB2Beginner';
import { KidsC1 } from 'pages/StreamsKids/KidsС1/KidsС1';
import TeacherTrialPage from 'pages/TeacherPage/TeacherTrialPage';
import { ThankYouPage } from 'pages/ThankYouPage/ThankYouPage';
import { Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import { WindowedChat } from 'utils/Chat/ChatWindowed/WindowedChat';
import ScrollToTop from 'utils/ScrollToTop/ScrollToTop';
import { Loader } from './SharedLayout/Loaders/Loader';
import { SharedLayout } from './SharedLayout/SharedLayout';
import { StreamDeutschB2 } from 'pages/Streams/Deutsch B2/StreamDeutschB2';
import { StreamPolskiB2 } from 'pages/Streams/Polski B2/StreamPolskiB2';

const NewDesign = lazy(() =>
  import(
    /* webpackChunkName: "New Design Homepage" */ '../pages/Home/NewDesign'
  )
);
const School = lazy(() =>
  import(/* webpackChunkName: "School page" */ '../pages/School/School')
);
const University = lazy(() =>
  import(
    /* webpackChunkName: "University page" */ '../pages/University/University'
  )
);
const Streams = lazy(() =>
  import(/* webpackChunkName: "Streams page" */ '../pages/Streams/Streams')
);
const Speakings = lazy(() =>
  import(
    /* webpackChunkName: "Speakings teacher page" */ '../pages/Streams/Speakings'
  )
);
const StreamA0 = lazy(() =>
  import(
    /* webpackChunkName: "Streams A0 page" */ '../pages/Streams/A0/StreamA0'
  )
);
const StreamA02 = lazy(() =>
  import(
    /* webpackChunkName: "Streams A0_2 page" */ '../pages/Streams/A0/StreamA02'
  )
);
const StreamA1 = lazy(() =>
  import(
    /* webpackChunkName: "Streams A1 page" */ '../pages/Streams/A1/StreamA1'
  )
);
const StreamA1Free = lazy(() =>
  import(
    /* webpackChunkName: "Free streams A1 page" */ '../pages/Streams/A1/StreamA1Free'
  )
);
const StreamA2 = lazy(() =>
  import(
    /* webpackChunkName: "Streams A2 page" */ '../pages/Streams/A2/StreamA2'
  )
);
const StreamA2Free = lazy(() =>
  import(
    /* webpackChunkName: "Free streams A2 page" */ '../pages/Streams/A2/StreamA2Free'
  )
);
const StreamB1 = lazy(() =>
  import(
    /* webpackChunkName: "Streams B1 page" */ '../pages/Streams/B1/StreamB1'
  )
);
const StreamB2 = lazy(() =>
  import(
    /* webpackChunkName: "Streams B2 page" */ '../pages/Streams/B2/StreamB2'
  )
);
const StreamC1 = lazy(() =>
  import(
    /* webpackChunkName: "Streams C1 page" */ '../pages/Streams/C1/StreamC1'
  )
);
const StreamDeutschA02 = lazy(() =>
  import(
    /* webpackChunkName: "Streams Deutsch A0_2 page" */ '../pages/Streams/Deutsch A0/StreamDeutschA02'
  )
);
const StreamPolskiA02 = lazy(() =>
  import(
    /* webpackChunkName: "Streams Polski A0_2 page" */ '../pages/Streams/Polski A0/StreamPolskiA02'
  )
);
const RecordLinkTree = lazy(() =>
  import(
    /* webpackChunkName: "Record Link Tree page" */ '../pages/RecordLinkTree/RecordLinkTree'
  )
);
const Service = lazy(() =>
  import(/* webpackChunkName: "Service page" */ '../pages/Service/Service')
);
const HR = lazy(() =>
  import(/* webpackChunkName: "HR page" */ '../pages/HR/HR')
);
const StreamsKids = lazy(() =>
  import(
    /* webpackChunkName: "Streams Kids page" */ '../pages/StreamsKids/StreamsKids'
  )
);
const KidsDeA0 = lazy(() =>
  import(
    /* webpackChunkName: "Deutsch Streams A0 Kids page" */ '../pages/StreamsKids/KidsDeA0/KidsDeA0'
  )
);
const KidsDeA1 = lazy(() =>
  import(
    /* webpackChunkName: "Deutsch Streams A1 Kids page" */ '../pages/StreamsKids/KidsDeA1/KidsDeA1'
  )
);
const KidsPlA1 = lazy(() =>
  import(
    /* webpackChunkName: "Polski Streams A1 Kids page" */ '../pages/StreamsKids/KidsPlA1/KidsPlA1'
  )
);
const KidsDeA1Free = lazy(() =>
  import(
    /* webpackChunkName: "Deutsch Free Streams A1 Kids page" */ '../pages/StreamsKids/KidsDeA1/KidsDeA1Free'
  )
);
const KidsPlA1Free = lazy(() =>
  import(
    /* webpackChunkName: "Polski Free Streams A1 Kids page" */ '../pages/StreamsKids/KidsPlA1/KidsPlA1Free'
  )
);
const KidsPRE = lazy(() =>
  import(
    /* webpackChunkName: "English Kids PRE page" */ '../pages/StreamsKids/KidsPRE/KidsPRE'
  )
);
const KidsBEG = lazy(() =>
  import(
    /* webpackChunkName: "English Kids BEG page" */ '../pages/StreamsKids/KidsBEG/KidsBEG'
  )
);
const KidsMID = lazy(() =>
  import(
    /* webpackChunkName: "English Kids MID page" */ '../pages/StreamsKids/KidsMID/KidsMID'
  )
);
const KidsHIGH = lazy(() =>
  import(
    /* webpackChunkName: "English Kids HIGH page" */ '../pages/StreamsKids/KidsHIGH/KidsHIGH'
  )
);
const Preschool = lazy(() =>
  import(
    /* webpackChunkName: "Preschool Education page" */ '../pages/StreamsKids/Preschool/Preschool'
  )
);
const NMTUkr = lazy(() =>
  import(
    /* webpackChunkName: "NMTUkr Education page" */ '../pages/Streams/NMTUkr/NMTUkr'
  )
);
const NMTEn = lazy(() =>
  import(
    /* webpackChunkName: "NMTEn Education page" */ '../pages/Streams/NMTEn/NMTEn'
  )
);
const NMTMath = lazy(() =>
  import(
    /* webpackChunkName: "NMTMath Education page" */ '../pages/Streams/NMTMath/NMTMath'
  )
);
const NMTHistory = lazy(() =>
  import(
    /* webpackChunkName: "NMTHistory Education page" */ '../pages/Streams/NMTHistory/NMTHistory'
  )
);
const Teacher = lazy(() =>
  import(/* webpackChunkName: "Teacher layout" */ '../pages/Teacher/Teacher')
);
const StreamSpeakingClub = lazy(() =>
  import(
    /* webpackChunkName: "Speaking Club redirect page" */ '../pages/Speakings/StreamSpeakingClub'
  )
);
const StreamSpeakingClubKids = lazy(() =>
  import(
    /* webpackChunkName: "Speaking Club Kids redirect page" */ '../pages/Speakings/StreamSpeakingClubKids'
  )
);
const AdminPanel = lazy(() =>
  import(
    /* webpackChunkName: "Links Admin Panel page" */ '../pages/Streams/AdminPanel/AdminPanel'
  )
);
const UserAdminPanel = lazy(() =>
  import(
    /* webpackChunkName: "User Admin Panel page" */ '../pages/Streams/UserAdminPanel/UserAdminPanel'
  )
);
const TeacherAdminPanel = lazy(() =>
  import(
    /* webpackChunkName: "Teacher Admin Panel page" */ '../pages/Streams/TeacherAdminPanel/TeacherAdminPanel'
  )
);
const TeacherControlPage = lazy(() =>
  import(
    /* webpackChunkName: "Teacher Control page" */ '../pages/Streams/TeacherAdminPanel/TeacherControlPage'
  )
);
const TeacherControlPageEn = lazy(() =>
  import(
    /* webpackChunkName: "Teacher Control English page" */ '../pages/Streams/TeacherAdminPanel/TeacherControlPageEn'
  )
);
const TeacherControlPageDe = lazy(() =>
  import(
    /* webpackChunkName: "Teacher Control Deutsch page" */ '../pages/Streams/TeacherAdminPanel/TeacherControlPageDe'
  )
);
const TeacherControlPagePl = lazy(() =>
  import(
    /* webpackChunkName: "Teacher Control Polski page" */ '../pages/Streams/TeacherAdminPanel/TeacherControlPagePl'
  )
);
const UserJsonPanel = lazy(() =>
  import(
    /* webpackChunkName: "User Json Panel page" */ '../pages/Streams/UserAdminPanel/UserJsonPanel'
  )
);
const RatingsAdminPanel = lazy(() =>
  import(
    /* webpackChunkName: "Ratings Admin Panel page" */ '../pages/Streams/RatingsAdminPanel/RatingsAdminPanel'
  )
);
const TimeTableAdminPanel = lazy(() =>
  import(
    /* webpackChunkName: "TimeTable Admin Panel page" */ '../pages/Streams/TimeTableAdminPanel/TimeTableAdminPanel'
  )
);
const SpeakingAdminPanel = lazy(() =>
  import(
    /* webpackChunkName: "Speaking Admin Panel page" */ '../pages/Streams/AdminPanel/SpeakingAdminPanel'
  )
);
const SpeakingsRatings = lazy(() =>
  import(
    /* webpackChunkName: "Speaking Rating Admin page" */ '../pages/Streams/SpeakingsRatings'
  )
);
const English = lazy(() =>
  import(
    /* webpackChunkName: "English courses page" */ '../pages/English/English'
  )
);
const Polski = lazy(() =>
  import(/* webpackChunkName: "Polski courses page" */ '../pages/Polski/Polski')
);
const Deutsch = lazy(() =>
  import(
    /* webpackChunkName: "Deutsch courses page" */ '../pages/Deutsch/Deutsch'
  )
);
const TeacherPage = lazy(() =>
  import(
    /* webpackChunkName: "Teacher Page" */ '../pages/TeacherPage/TeacherPage'
  )
);
const TeacherPageFarm = lazy(() =>
  import(
    /* webpackChunkName: "Teacher Page Farm" */ '../pages/TeacherPage/TeacherPageFarm'
  )
);
const TeacherPageVertical = lazy(() =>
  import(
    /* webpackChunkName: "Teacher Page" */ '../pages/TeacherPage/TeacherPageVertical'
  )
);
const TeacherPageSpeaking = lazy(() =>
  import(
    /* webpackChunkName: "Speaking Teacher Page" */ '../pages/TeacherPage/TeacherPageSpeaking'
  )
);
const TeacherPageSpeaking13 = lazy(() =>
  import(
    /* webpackChunkName: "Speaking Course 13 Teacher Page" */ '../pages/TeacherPage/TeacherPageSpeaking13'
  )
);
const FormsLinkTree = lazy(() =>
  import(
    /* webpackChunkName: "Forms Linktree Page" */ '../pages/FormsLinkTree/FormsLinkTree'
  )
);
const LeadFormPage = lazy(() =>
  import(
    /* webpackChunkName: "Lead Form Page" */ '../pages/LeadFormPage/LeadFormPage'
  )
);
const UniversalLeadFormPage = lazy(() =>
  import(
    /* webpackChunkName: "Universal Lead Form Page" */ '../pages/LeadFormPage/UniversalLeadFormPage'
  )
);
const AmbassadorFormPage = lazy(() =>
  import(
    /* webpackChunkName: "Ambassador Form Page" */ '../pages/AmbassadorFormPage/AmbassadorFormPage'
  )
);
const TeacherFormPage = lazy(() =>
  import(
    /* webpackChunkName: "Teacher Form Page" */ '../pages/TeacherFormPage/TeacherFormPage'
  )
);
const MyAP = lazy(() =>
  import(/* webpackChunkName: "My AP Page" */ '../pages/MyAP/MyAP')
);
const ConferenceTest = lazy(() =>
  import(
    /* webpackChunkName: "AP Conference Test Page" */ '../pages/MyAP/ConferenceTest'
  )
);
const HRCalc = lazy(() =>
  import(
    /* webpackChunkName: "HR Salary Calculator Page" */ '../pages/HR/HRCalc/HRCalc'
  )
);

const ViberMarathonRedirect = lazy(() =>
  import(
    /* webpackChunkName: "Marathon redirect page to Viber chatbot" */ '../pages/Service/ViberRedirect/ViberMarathonRedirect'
  )
);

const TelegramMarathonRedirect = lazy(() =>
  import(
    /* webpackChunkName: "Marathon redirect page to Telegram chatbot" */ '../pages/Service/TelegramRedirect/TelegramMarathonRedirect'
  )
);

const WhatsAppRedirect = lazy(() =>
  import(
    /* webpackChunkName: "Marathon redirect page to WhatsApp chat" */ '../pages/Service/WhatsAppRedirect/WhatsAppRedirect'
  )
);

const Gifts = lazy(() =>
  import(/* webpackChunkName: "Post-quiz gifts page" */ '../pages/Gifts/Gifts')
);
const GiftsEnA0 = lazy(() =>
  import(
    /* webpackChunkName: "Post-quiz gifts EN A0 page" */ '../pages/Gifts/GiftsEnA0'
  )
);
const GiftsEnA1 = lazy(() =>
  import(
    /* webpackChunkName: "Post-quiz gifts EN A1 page" */ '../pages/Gifts/GiftsEnA1'
  )
);
const GiftsEnA2 = lazy(() =>
  import(
    /* webpackChunkName: "Post-quiz gifts EN A2 page" */ '../pages/Gifts/GiftsEnA2'
  )
);
const GiftsEnB1 = lazy(() =>
  import(
    /* webpackChunkName: "Post-quiz gifts EN B1 page" */ '../pages/Gifts/GiftsEnB1'
  )
);
const GiftsEnKidsA0 = lazy(() =>
  import(
    /* webpackChunkName: "Post-quiz gifts EN Kids A0 page" */ '../pages/Gifts/GiftsEnKidsA0'
  )
);
const GiftsEnKidsA1 = lazy(() =>
  import(
    /* webpackChunkName: "Post-quiz gifts EN Kids A1 page" */ '../pages/Gifts/GiftsEnKidsA1'
  )
);
const GiftsEnKidsA2 = lazy(() =>
  import(
    /* webpackChunkName: "Post-quiz gifts EN Kids A2 page" */ '../pages/Gifts/GiftsEnKidsA2'
  )
);
const GiftsDeA0 = lazy(() =>
  import(
    /* webpackChunkName: "Post-quiz gifts DE A0 page" */ '../pages/Gifts/GiftsDeA0'
  )
);
const GiftsDeA1 = lazy(() =>
  import(
    /* webpackChunkName: "Post-quiz gifts DE A1 page" */ '../pages/Gifts/GiftsDeA1'
  )
);
const GiftsDeA2 = lazy(() =>
  import(
    /* webpackChunkName: "Post-quiz gifts DE A2 page" */ '../pages/Gifts/GiftsDeA2'
  )
);
const GiftsPlA0 = lazy(() =>
  import(
    /* webpackChunkName: "Post-quiz gifts PL A0 page" */ '../pages/Gifts/GiftsPlA0'
  )
);
const GiftsPlA1 = lazy(() =>
  import(
    /* webpackChunkName: "Post-quiz gifts PL A1 page" */ '../pages/Gifts/GiftsPlA1'
  )
);
const GiftsPlA2 = lazy(() =>
  import(
    /* webpackChunkName: "Post-quiz gifts PL A2 page" */ '../pages/Gifts/GiftsPlA2'
  )
);
const GiftsDirect = lazy(() =>
  import(
    /* webpackChunkName: "Post-quiz gifts from Instagram direct" */ '../pages/Gifts/GiftsDirect'
  )
);

const GiftsAuth = lazy(() =>
  import(
    /* webpackChunkName: "Post-quiz gifts page with sms-code auth" */ '../pages/Gifts/GiftsAuth'
  )
);

const Quiz = lazy(() =>
  import(/* webpackChunkName: "Marathon quiz page" */ '../pages/Quiz/Quiz')
);

const QuizAuth = lazy(() =>
  import(
    /* webpackChunkName: "Marathon quiz page for new Auth" */ '../pages/Quiz/QuizAuth'
  )
);

const QuizOneRequest = lazy(() =>
  import(
    /* webpackChunkName: "Sales quiz page for one request" */ '../pages/Quiz/QuizOneRequest'
  )
);

// const QuizOneRequestGoogle = lazy(() =>
//   import(
//     /* webpackChunkName: "Sales quiz page for one request via Google ads" */ '../pages/Quiz/QuizOneRequestGoogle'
//   )
// );

const QuizOneRequestGoogleNoEngage = lazy(() =>
  import(
    /* webpackChunkName: "Sales quiz page for one request via Google ads without engagement page" */ '../pages/Quiz/QuizOneRequestGoogleNoEngage'
  )
);

const QuizOneRequestDiscountNoEngage = lazy(() =>
  import(
    /* webpackChunkName: "Sales quiz page for one request via discount mail without engagement page" */ '../pages/Quiz/QuizOneRequestDiscountNoEngage'
  )
);

const QuizEn = lazy(() =>
  import(
    /* webpackChunkName: "Sales english quiz page" */ '../pages/Quiz/QuizEn'
  )
);

const QuizDe = lazy(() =>
  import(
    /* webpackChunkName: "Sales deutsch quiz page" */ '../pages/Quiz/QuizDe'
  )
);

const QuizPl = lazy(() =>
  import(
    /* webpackChunkName: "Sales polish quiz page" */ '../pages/Quiz/QuizPl'
  )
);

const QuizEnAuth = lazy(() =>
  import(
    /* webpackChunkName: "Sales english quiz page for new Auth" */ '../pages/Quiz/QuizEnAuth'
  )
);

const NotFound = lazy(() =>
  import(/* webpackChunkName: "Not Found" */ '../pages/NotFound/NotFound')
);

export const App = () => {
  // eslint-disable-next-line
  const [searchParams, _] = useSearchParams();

  const utm_tags = [
    'utm_content',
    'utm_medium',
    'utm_campaign',
    'utm_source',
    'utm_term',
    'utm_referrer',
    'referrer',
    'gclientid',
    'gclid',
    'fbclid',
  ];

  const localStorageTagSetter = tags =>
    tags.map(tag => localStorage.setItem(tag, searchParams.get(tag) || ''));

  localStorageTagSetter(utm_tags);

  const localStorageTagGetter = tag => localStorage.getItem(tag);

  const utms = {};
  utm_tags.forEach(tag => (utms[tag] = localStorageTagGetter(tag)));

  return (
    <>
      <ScrollToTop />
      <Toaster
        containerStyle={{
          top: '10%',
        }}
      />
      <Suspense fallback={Loader}>
        <Routes>
          <Route path="/" element={<SharedLayout utms={utms} />}>
            <Route index element={<NewDesign utms={utms} />} />
            {/* <Route path="new" element={<NewDesign utms={utms} />} /> */}
            {/* <Route path="clone" element={<Clone utms={utms} />} /> */}
            {/* <Route path="reviews" element={<AllReviews />} /> */}
            <Route path="english" element={<English utms={utms} />} />
            <Route path="deutsch" element={<Deutsch utms={utms} />} />
            <Route path="polski" element={<Polski utms={utms} />} />
            <Route path="school" element={<School utms={utms} />} />
            <Route path="university" element={<University utms={utms} />} />
            {/* <Route path="english" element={<English utms={utms} />} />
          
          <Route path="education" element={<Education utms={utms} />} />
          <Route path="examination" element={<Examination utms={utms} />} />
          <Route path="translation" element={<Translation utms={utms} />} />
          <Route path="career" element={<Career utms={utms} />} /> */}
            <Route path="*" element={<NotFound />} noindex={true} />
          </Route>
          <Route path="my-ap" element={<MyAP />} noindex={true} />
          <Route path="c-test" element={<ConferenceTest />} noindex={true} />
          <Route path="my-marathon" element={<MyAP />} noindex={true} />
          <Route path="streams" element={<Streams />} noindex={true}>
            <Route path="a0" element={<StreamA0 />} />
            <Route path="a0sc" element={<StreamSpeakingClub />} />
            <Route path="a0-chat" element={<WindowedChat />} />
            <Route path="a0_2" element={<StreamA02 />} />
            <Route path="a0_2sc" element={<StreamSpeakingClub />} />
            <Route path="a0_2-chat" element={<WindowedChat />} />
            <Route path="a1" element={<StreamA1 />} />
            <Route path="a1sc" element={<StreamSpeakingClub />} />
            <Route path="a1-chat" element={<WindowedChat />} />
            <Route path="a2" element={<StreamA2 />} />
            <Route path="a2sc" element={<StreamSpeakingClub />} />
            <Route path="a2-chat" element={<WindowedChat />} />
            <Route path="b1" element={<StreamB1 />} />
            <Route path="b1sc" element={<StreamSpeakingClub />} />
            <Route path="b1-chat" element={<WindowedChat />} />
            <Route path="b2" element={<StreamB2 />} />
            <Route path="b2sc" element={<StreamSpeakingClub />} />
            <Route path="b2-chat" element={<WindowedChat />} />
            <Route path="c1" element={<StreamC1 />} />
            <Route path="c1sc" element={<StreamSpeakingClub />} />
            <Route path="c1-chat" element={<WindowedChat />} />
            <Route path="a1free" element={<StreamA1Free />} />
            <Route path="a1free-chat" element={<WindowedChat />} />
            <Route path="a2free" element={<StreamA2Free />} />
            <Route path="a2free-chat" element={<WindowedChat />} />
            <Route path="deutscha0" element={<StreamDeutschA0 />} />
            <Route path="dea0sc" element={<StreamSpeakingClub />} />
            <Route path="deutscha0-chat" element={<WindowedChat />} />
            <Route path="deutscha0_2" element={<StreamDeutschA02 />} />
            <Route path="dea0_2sc" element={<StreamSpeakingClub />} />
            <Route path="deutscha0_2-chat" element={<WindowedChat />} />
            <Route path="deutsch" element={<StreamDeutsch />} />
            <Route path="dea1sc" element={<StreamSpeakingClub />} />
            <Route path="deutsch-chat" element={<WindowedChat />} />
            <Route path="deutscha2" element={<StreamDeutschA2 />} />
            <Route path="dea2sc" element={<StreamSpeakingClub />} />
            <Route path="deutscha2-chat" element={<WindowedChat />} />
            <Route path="deutschb1" element={<StreamDeutschB1 />} />
            <Route path="deb1sc" element={<StreamSpeakingClub />} />
            <Route path="deutschb1-chat" element={<WindowedChat />} />
            <Route path="deutschb2" element={<StreamDeutschB2 />} />
            <Route path="deb2sc" element={<StreamSpeakingClub />} />
            <Route path="deutschb2-chat" element={<WindowedChat />} />
            <Route path="deutschfree" element={<StreamDeutschFree />} />
            <Route path="deutschfree-chat" element={<WindowedChat />} />
            <Route path="deutscha2free" element={<StreamDeutschA2Free />} />
            <Route path="deutscha2free-chat" element={<WindowedChat />} />
            <Route path="polskia0" element={<StreamPolskiA0 />} />
            <Route path="pla0sc" element={<StreamSpeakingClub />} />
            <Route path="polskia0-chat" element={<WindowedChat />} />
            <Route path="polskia0_2" element={<StreamPolskiA02 />} />
            <Route path="polskia0_2-chat" element={<WindowedChat />} />
            <Route path="polski" element={<StreamPolski />} />
            <Route path="pla1sc" element={<StreamSpeakingClub />} />
            <Route path="polski-chat" element={<WindowedChat />} />
            <Route path="polskia2" element={<StreamPolskiA2 />} />
            <Route path="pla2sc" element={<StreamSpeakingClub />} />
            <Route path="polskia2-chat" element={<WindowedChat />} />
            <Route path="polskib1" element={<StreamPolskiB1 />} />
            <Route path="plb1sc" element={<StreamSpeakingClub />} />
            <Route path="polskib1-chat" element={<WindowedChat />} />
            <Route path="polskib2" element={<StreamPolskiB2 />} />
            <Route path="plb2sc" element={<StreamSpeakingClub />} />
            <Route path="polskib2-chat" element={<WindowedChat />} />
            <Route path="polskifree" element={<StreamPolskiFree />} />
            <Route path="polskifree-chat" element={<WindowedChat />} />
            <Route path="nmt_ukr" element={<NMTUkr />} />
            <Route path="nmt_ukrsc" element={<StreamSpeakingClub />} />
            <Route path="nmt_ukr-chat" element={<WindowedChat />} />
            <Route path="nmt_en" element={<NMTEn />} />
            <Route path="nmt_ensc" element={<StreamSpeakingClub />} />
            <Route path="nmt_en-chat" element={<WindowedChat />} />
            <Route path="nmt_math" element={<NMTMath />} />
            <Route path="nmt_mathsc" element={<StreamSpeakingClub />} />
            <Route path="nmt_math-chat" element={<WindowedChat />} />
            <Route path="nmt_history" element={<NMTHistory />} />
            <Route path="nmt_historysc" element={<StreamSpeakingClub />} />
            <Route path="nmt_history-chat" element={<WindowedChat />} />
            <Route path="test" element={<StreamTest />} />
            <Route path="test-chat" element={<WindowedChat />} />
            <Route path="record-chat" element={<WindowedChat />} />
            {/* <Route path="test1" element={<StreamTest />} /> */}
            <Route path="stream-admin-panel" element={<AdminPanel />} />
            <Route
              path="speaking-admin-panel"
              element={<SpeakingAdminPanel />}
            />
            <Route path="kahoot-admin-panel" element={<KahootAdminPanel />} />
            <Route
              path="host-kahoot-admin-panel"
              element={<HostKahootAdminPanel />}
            />
            <Route path="user-admin-panel" element={<UserAdminPanel />} />
            <Route
              path="teacher-teamlead-panel"
              element={<TeacherAdminPanel />}
            />
            <Route path="tcp" element={<TeacherControlPage />} />
            <Route path="tcp-en" element={<TeacherControlPageEn />} />
            <Route path="tcp-de" element={<TeacherControlPageDe />} />
            <Route path="tcp-pl" element={<TeacherControlPagePl />} />
            <Route path="user-json-panel" element={<UserJsonPanel />} />
            <Route path="ratings-admin-panel" element={<RatingsAdminPanel />} />
            <Route path="lessons-admin-panel" element={<LessonsAdminPanel />} />
            <Route
              path="timetable-admin-panel"
              element={<TimeTableAdminPanel />}
            />
            <Route
              path="teacher-admin-panel"
              element={<TeacherLessonsAdminPanel />}
            />
            <Route
              path="collection-admin-panel"
              element={<CollectionsAdminPanel />}
            />
          </Route>
          <Route path="streams-kids" element={<StreamsKids />} noindex={true}>
            <Route path="preschool" element={<Preschool />} />
            <Route path="preschoolsc" element={<StreamSpeakingClubKids />} />
            <Route path="preschool-chat" element={<WindowedChat />} />
            <Route path="pre" element={<KidsPRE />} />
            <Route path="presc" element={<StreamSpeakingClubKids />} />
            <Route path="pre-chat" element={<WindowedChat />} />
            <Route path="beg" element={<KidsBEG />} />
            <Route path="begsc" element={<StreamSpeakingClubKids />} />
            <Route path="beg-chat" element={<WindowedChat />} />
            <Route path="mid" element={<KidsMID />} />
            <Route path="midsc" element={<StreamSpeakingClubKids />} />
            <Route path="mid-chat" element={<WindowedChat />} />
            <Route path="high" element={<KidsHIGH />} />
            <Route path="highsc" element={<StreamSpeakingClubKids />} />
            <Route path="high-chat" element={<WindowedChat />} />
            <Route path="a0" element={<KidsA0 />} />
            <Route path="a0sc" element={<StreamSpeakingClubKids />} />
            <Route path="a0-chat" element={<WindowedChat />} />
            <Route path="a1" element={<KidsA1 />} />
            <Route path="a1sc" element={<StreamSpeakingClubKids />} />
            <Route path="a1-chat" element={<WindowedChat />} />
            <Route path="a2" element={<KidsA2 />} />
            <Route path="a2sc" element={<StreamSpeakingClubKids />} />
            <Route path="a2-chat" element={<WindowedChat />} />
            <Route path="b1" element={<KidsB1 />} />
            <Route path="b1sc" element={<StreamSpeakingClubKids />} />
            <Route path="b1-chat" element={<WindowedChat />} />
            <Route path="b2" element={<KidsB2 />} />
            <Route path="b2sc" element={<StreamSpeakingClubKids />} />
            <Route path="b2-chat" element={<WindowedChat />} />
            <Route path="c1" element={<KidsC1 />} />
            <Route path="c1sc" element={<StreamSpeakingClubKids />} />
            <Route path="c1-chat" element={<WindowedChat />} />
            <Route path="b1beginner" element={<KidsB1Beginner />} />
            <Route path="b1beginnersc" element={<StreamSpeakingClubKids />} />
            <Route path="b1beginner-chat" element={<WindowedChat />} />
            <Route path="b2beginner" element={<KidsB2Beginner />} />
            <Route path="b2beginnersc" element={<StreamSpeakingClubKids />} />
            <Route path="b2beginner-chat" element={<WindowedChat />} />
            <Route path="dea0" element={<KidsDeA0 />} />
            <Route path="dea0-chat" element={<WindowedChat />} />
            <Route path="dea0sc" element={<StreamSpeakingClubKids />} />
            <Route path="dea1" element={<KidsDeA1 />} />
            <Route path="dea1-chat" element={<WindowedChat />} />
            <Route path="dea1sc" element={<StreamSpeakingClubKids />} />
            <Route path="pla1" element={<KidsPlA1 />} />
            <Route path="pla1-chat" element={<WindowedChat />} />
            <Route path="pla1sc" element={<StreamSpeakingClubKids />} />
            <Route path="a1free" element={<KidsA1Free />} />
            <Route path="a1free-chat" element={<WindowedChat />} />
            <Route path="dea1free" element={<KidsDeA1Free />} />
            <Route path="dea1free-chat" element={<WindowedChat />} />
            <Route path="pla1free" element={<KidsPlA1Free />} />
            <Route path="pla1free-chat" element={<WindowedChat />} />
          </Route>
          <Route path="record" element={<RecordLinkTree />} />
          <Route path="service" element={<Service />}>
            <Route path="viber" element={<ViberRedirect />} />
            <Route path="tg" element={<TelegramRedirect />} />
          </Route>
          <Route path="marathon" element={<Service />}>
            <Route path="viber" element={<ViberMarathonRedirect />} />
            <Route path="tg" element={<TelegramMarathonRedirect />} />
            <Route path="wa" element={<WhatsAppRedirect />} />
          </Route>
          <Route path="hr" element={<HR />}>
            <Route path="viber" element={<ViberHRRedirect />} />
            <Route path="tg" element={<TelegramHRRedirect />} />
            <Route path="calc" element={<HRCalc />} />
          </Route>
          <Route path="speakings" element={<Speakings />} noindex={true}>
            <Route path="a0sc" element={<TeacherPageSpeaking />} />
            <Route path="a0_2sc" element={<TeacherPageSpeaking />} />
            <Route path="a1sc" element={<TeacherPageSpeaking />} />
            <Route path="a2sc" element={<TeacherPageSpeaking />} />
            <Route path="b1sc" element={<TeacherPageSpeaking />} />
            <Route path="b2sc" element={<TeacherPageSpeaking />} />
            <Route path="13" element={<TeacherPageSpeaking13 />} />
            <Route path="c1sc" element={<TeacherPageSpeaking />} />
            <Route path="dea0sc" element={<TeacherPageSpeaking />} />
            <Route path="dea0_2sc" element={<TeacherPageSpeaking />} />
            <Route path="dea1sc" element={<TeacherPageSpeaking />} />
            <Route path="dea2sc" element={<TeacherPageSpeaking />} />
            <Route path="deb1sc" element={<TeacherPageSpeaking />} />
            <Route path="deb2sc" element={<TeacherPageSpeaking />} />
            <Route path="pla0sc" element={<TeacherPageSpeaking />} />
            <Route path="pla0_2sc" element={<TeacherPageSpeaking />} />
            <Route path="pla1sc" element={<TeacherPageSpeaking />} />
            <Route path="pla2sc" element={<TeacherPageSpeaking />} />
            <Route path="plb1sc" element={<TeacherPageSpeaking />} />
            <Route path="plb2sc" element={<TeacherPageSpeaking />} />
            <Route path="kids-a0sc" element={<TeacherPageSpeaking />} />
            <Route path="kids-a0_2sc" element={<TeacherPageSpeaking />} />
            <Route path="kids-a1sc" element={<TeacherPageSpeaking />} />
            <Route path="kids-a2sc" element={<TeacherPageSpeaking />} />
            <Route path="kids-b1sc" element={<TeacherPageSpeaking />} />
            <Route path="kids-b2sc" element={<TeacherPageSpeaking />} />
            <Route path="kids-c1sc" element={<TeacherPageSpeaking />} />
            <Route path="kids-c1schigh" element={<TeacherPageSpeaking />} />
            <Route path="kids-dea0sc" element={<TeacherPageSpeaking />} />
            <Route path="kids-dea0_2sc" element={<TeacherPageSpeaking />} />
            <Route path="kids-dea1sc" element={<TeacherPageSpeaking />} />
            <Route path="kids-dea2sc" element={<TeacherPageSpeaking />} />
            <Route path="kids-deb1sc" element={<TeacherPageSpeaking />} />
            <Route path="kids-deb2sc" element={<TeacherPageSpeaking />} />
            <Route path="kids-pla0sc" element={<TeacherPageSpeaking />} />
            <Route path="kids-pla0_2sc" element={<TeacherPageSpeaking />} />
            <Route path="kids-pla1sc" element={<TeacherPageSpeaking />} />
            <Route path="kids-pla2sc" element={<TeacherPageSpeaking />} />
            <Route path="kids-plb1sc" element={<TeacherPageSpeaking />} />
            <Route path="kids-plb2sc" element={<TeacherPageSpeaking />} />
            <Route path="ratings" element={<SpeakingsRatings />} />
          </Route>
          <Route path="teacher" element={<Teacher />} noindex={true}>
            <Route path="a0" element={<TeacherPage />} />
            <Route path="a0_2" element={<TeacherPage />} />
            <Route path="a1" element={<TeacherPage />} />
            <Route path="a2" element={<TeacherPage />} />
            <Route path="b1" element={<TeacherPage />} />
            <Route path="b2" element={<TeacherPage />} />
            <Route path="c1" element={<TeacherPage />} />
            <Route path="kidspre" element={<TeacherPage />} />
            <Route path="kidsbeg" element={<TeacherPage />} />
            <Route path="kidsmid" element={<TeacherPage />} />
            <Route path="kidshigh" element={<TeacherPage />} />
            <Route path="preschool" element={<TeacherPage />} />
            <Route path="nmt_ukr" element={<TeacherPage />} />
            <Route path="nmt_en" element={<TeacherPage />} />
            <Route path="nmt_math" element={<TeacherPage />} />
            <Route path="nmt_history" element={<TeacherPage />} />
            <Route path="a1free" element={<TeacherPage />} />
            <Route path="a2free" element={<TeacherPage />} />
            <Route path="a0kids" element={<TeacherPage />} />
            <Route path="a1kids" element={<TeacherPage />} />
            <Route path="a2kids" element={<TeacherPage />} />
            <Route path="b1kids" element={<TeacherPage />} />
            <Route path="b2kids" element={<TeacherPage />} />
            <Route path="c1kids" element={<TeacherPage />} />
            <Route path="a1kidsfree" element={<TeacherPage />} />
            <Route path="b1kidsbeginner" element={<TeacherPage />} />
            <Route path="b2kidsbeginner" element={<TeacherPage />} />
            <Route path="trendets" element={<TeacherPage />} />
            <Route path="deutsch-a0" element={<TeacherPage />} />
            <Route path="deutsch-a0_2" element={<TeacherPage />} />
            <Route path="deutsch-a1" element={<TeacherPage />} />
            <Route path="deutsch-a2" element={<TeacherPage />} />
            <Route path="deutsch-b1" element={<TeacherPage />} />
            <Route path="deutsch-b2" element={<TeacherPage />} />
            <Route path="deutsch-a1free" element={<TeacherPage />} />
            <Route path="deutsch-a2free" element={<TeacherPage />} />
            <Route path="dea0kids" element={<TeacherPage />} />
            <Route path="dea1kids" element={<TeacherPage />} />
            <Route path="dekidsfree" element={<TeacherPage />} />
            <Route path="polski-a0" element={<TeacherPage />} />
            <Route path="polski-a0_2" element={<TeacherPageFarm />} />
            <Route path="polski-a1" element={<TeacherPage />} />
            <Route path="polski-a1free" element={<TeacherPage />} />
            <Route path="polski-a2" element={<TeacherPage />} />
            <Route path="polski-b1" element={<TeacherPage />} />
            <Route path="polski-b2" element={<TeacherPage />} />
            <Route path="pla1kids" element={<TeacherPage />} />
            <Route path="plkidsfree" element={<TeacherPage />} />
            <Route path="record" element={<TeacherPageVertical />} />
            <Route path="test" element={<TeacherPage />} />
            <Route path="trials" element={<TeacherTrialPage />} />
            <Route path="trials-kids" element={<TeacherTrialPage />} />
            <Route path="trials-pl" element={<TeacherTrialPage />} />
            <Route path="trials-de" element={<TeacherTrialPage />} />
          </Route>
          <Route path="thankyou" element={<ThankYouPage />} noindex={true} />
          <Route path="quiz" element={<Quiz utms={utms} />} />
          <Route path="quiz-one" element={<QuizOneRequest utms={utms} />} />
          <Route
            path="quiz-g"
            element={<QuizOneRequestGoogleNoEngage utms={utms} />}
          />
          <Route
            path="quiz-d11p"
            element={<QuizOneRequestDiscountNoEngage utms={utms} />}
          />
          <Route
            path="quiz-d20p"
            element={<QuizOneRequestDiscountNoEngage utms={utms} />}
          />
          <Route
            path="quiz-d30p"
            element={<QuizOneRequestDiscountNoEngage utms={utms} />}
          />
          <Route path="quiz-code" element={<QuizAuth utms={utms} />} />
          <Route path="quiz-en" element={<QuizEn utms={utms} />} />
          <Route path="quiz-en-code" element={<QuizEnAuth utms={utms} />} />
          <Route path="quiz-de" element={<QuizDe utms={utms} />} />
          <Route path="quiz-pl" element={<QuizPl utms={utms} />} />
          <Route path="gifts" element={<Gifts />} noindex={true} />
          <Route path="gifts-en-a0" element={<GiftsEnA0 />} noindex={true} />
          <Route path="gifts-en-a1" element={<GiftsEnA1 />} noindex={true} />
          <Route path="gifts-en-a2" element={<GiftsEnA2 />} noindex={true} />
          <Route path="gifts-en-b1" element={<GiftsEnB1 />} noindex={true} />
          <Route
            path="gifts-enkids-a0"
            element={<GiftsEnKidsA0 />}
            noindex={true}
          />
          <Route
            path="gifts-enkids-a1"
            element={<GiftsEnKidsA1 />}
            noindex={true}
          />
          <Route
            path="gifts-enkids-a2"
            element={<GiftsEnKidsA2 />}
            noindex={true}
          />
          <Route path="gifts-de-a0" element={<GiftsDeA0 />} noindex={true} />
          <Route path="gifts-de-a1" element={<GiftsDeA1 />} noindex={true} />
          <Route path="gifts-de-a2" element={<GiftsDeA2 />} noindex={true} />
          <Route path="gifts-pl-a0" element={<GiftsPlA0 />} noindex={true} />
          <Route path="gifts-pl-a1" element={<GiftsPlA1 />} noindex={true} />
          <Route path="gifts-pl-a2" element={<GiftsPlA2 />} noindex={true} />
          <Route path="gifts-a" noindex={true}>
            <Route path=":userId" element={<GiftsAuth />} />
          </Route>
          <Route path="gifts-direct" noindex={true}>
            <Route path=":userId" element={<GiftsDirect />} />
          </Route>
          <Route path="forms-tree" element={<FormsLinkTree />} noindex={true} />
          <Route
            path="un-form"
            element={<UniversalLeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-uni"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="teacher-form"
            element={<TeacherFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="amb-form"
            element={<AmbassadorFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-a"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-b"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-c"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-d"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-e"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-f"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-g"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-h"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-i"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-j"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-k"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-l"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-m"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-n"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-o"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-ov"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-nuts"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-friend"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-apbot"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-engpls"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-qeng"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-london"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-speak"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-trrudtg"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-tg1"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-tg2"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-tg3"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-tg4"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-tg5"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-tg6"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-tg7"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-tg8"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-tg9"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-tg10"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-mova1"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-mova2"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-mova3"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-mova4"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-mova5"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-mova6"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-mova7"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-mova8"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-mix1"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-mix2"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-mix3"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-mix4"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-adm1"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-adm2"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-adm3"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route
            path="form-adm4"
            element={<LeadFormPage utms={utms} />}
            noindex={true}
          />
        </Routes>
      </Suspense>
    </>
  );
};
