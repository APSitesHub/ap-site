import TelegramHRRedirect from 'pages/HR/TelegramHRRedirect/TelegramHRRedirect';
import ViberHRRedirect from 'pages/HR/ViberHRRedirect/ViberHRRedirect';
import { LeadFormPage } from 'pages/LeadFormPage/LeadFormPage';
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
import TeacherPageSpeaking from 'pages/TeacherPage/TeacherPageSpeaking';

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
  import(/* webpackChunkName: "Record Link Tree page" */ '../pages/RecordLinkTree/RecordLinkTree')
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
const TeacherPageVertical = lazy(() =>
  import(
    /* webpackChunkName: "Teacher Page" */ '../pages/TeacherPage/TeacherPageVertical'
  )
);
const MyAP = lazy(() =>
  import(/* webpackChunkName: "My AP Page" */ '../pages/MyAP/MyAP')
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

const QuizOneRequestGoogle = lazy(() =>
  import(
    /* webpackChunkName: "Sales quiz page for one request via Google ads" */ '../pages/Quiz/QuizOneRequestGoogle'
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
            <Route path="test" element={<StreamTest />} />
            <Route path="test-chat" element={<WindowedChat />} />
            <Route path="record-chat" element={<WindowedChat />} />
            {/* <Route path="test1" element={<StreamTest />} /> */}
            <Route path="stream-admin-panel" element={<AdminPanel />} />
            <Route path="speaking-admin-panel" element={<SpeakingAdminPanel />} />
            <Route path="kahoot-admin-panel" element={<KahootAdminPanel />} />
            <Route
              path="host-kahoot-admin-panel"
              element={<HostKahootAdminPanel />}
            />
            <Route path="user-admin-panel" element={<UserAdminPanel />} />
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
            <Route
              path="b1beginnersc"
              element={<StreamSpeakingClubKids />}
            />
            <Route path="b1beginner-chat" element={<WindowedChat />} />
            <Route path="b2beginner" element={<KidsB2Beginner />} />
            <Route
              path="b2beginnersc"
              element={<StreamSpeakingClubKids />}
            />
            <Route path="b2beginner-chat" element={<WindowedChat />} />
            <Route path="dea1" element={<KidsDeA1 />} />
            <Route path="dea1-chat" element={<WindowedChat />} />
            <Route path="pla1" element={<KidsPlA1 />} />
            <Route path="pla1-chat" element={<WindowedChat />} />
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
          </Route>
          <Route path="a0sc" element={<TeacherPageSpeaking />} />
          <Route path="teacher" element={<Teacher />} noindex={true}>
            <Route path="a0" element={<TeacherPage />} />
            <Route path="a0_2" element={<TeacherPage />} />
            <Route path="a1" element={<TeacherPage />} />
            <Route path="a2" element={<TeacherPage />} />
            <Route path="b1" element={<TeacherPage />} />
            <Route path="b2" element={<TeacherPage />} />
            <Route path="c1" element={<TeacherPage />} />
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
            <Route path="dea1kids" element={<TeacherPage />} />
            <Route path="dekidsfree" element={<TeacherPage />} />
            <Route path="polski-a0" element={<TeacherPage />} />
            <Route path="polski-a0_2" element={<TeacherPage />} />
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
            path="quiz-google"
            element={<QuizOneRequestGoogle utms={utms} />}
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
          <Route
            path="form"
            element={<LeadFormPage utms={utms} />}
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
        </Routes>
      </Suspense>
    </>
  );
};
