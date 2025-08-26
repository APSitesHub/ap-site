import TelegramHRRedirect from 'pages/HR/TelegramHRRedirect/TelegramHRRedirect';
import ViberHRRedirect from 'pages/HR/ViberHRRedirect/ViberHRRedirect';
import TelegramRedirect from 'pages/Service/TelegramRedirect/TelegramRedirect';
import ViberRedirect from 'pages/Service/ViberRedirect/ViberRedirect';
import { StreamDeutschA2Free } from 'pages/Streams/Deutsch A2/StreamDeutschA2Free';
import { StreamDeutschFree } from 'pages/Streams/Deutsch/StreamDeutschFree';
import { StreamPolskiFree } from 'pages/Streams/Polski/StreamPolskiFree';
import { StreamTest } from 'pages/Streams/Test/StreamTest';
import { KidsA1Free } from 'pages/StreamsKids/KidsA1/KidsA1Free';
import TeacherTrialPage from 'pages/TeacherPage/TeacherTrialPage';
import { ThankYouPage } from 'pages/ThankYouPage/ThankYouPage';
import { Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import { WindowedChat } from 'utils/Chat/ChatWindowed/WindowedChat';
import ScrollToTop from 'utils/ScrollToTop/ScrollToTop';
import { Loader } from './SharedLayout/Loaders/Loader';
import { SharedLayout } from './SharedLayout/SharedLayout';
import TestChatBot from 'pages/Streams/TestChatBot/TestChatBot';
// eslint-disable-next-line
//import LogRocket from 'logrocket';

const NewDesign = lazy(() =>
  import(/* webpackChunkName: "New Design Homepage" */ '../pages/Home/NewDesign')
);
const School = lazy(() =>
  import(/* webpackChunkName: "School page" */ '../pages/School/School')
);
const University = lazy(() =>
  import(/* webpackChunkName: "University page" */ '../pages/University/University')
);
const Streams = lazy(() =>
  import(/* webpackChunkName: "Streams page" */ '../pages/Streams/Streams')
);
const Speakings = lazy(() =>
  import(/* webpackChunkName: "Speakings teacher page" */ '../pages/Streams/Speakings')
);
// eslint-disable-next-line
const StreamA0 = lazy(() =>
  import(/* webpackChunkName: "Streams A0 page" */ '../pages/Streams/A0/StreamA0')
);
const StreamA02 = lazy(() =>
  import(/* webpackChunkName: "Streams A0_2 page" */ '../pages/Streams/A0/StreamA02')
);
// eslint-disable-next-line
const StreamA1 = lazy(() =>
  import(/* webpackChunkName: "Streams A1 page" */ '../pages/Streams/A1/StreamA1')
);
const StreamA1Free = lazy(() =>
  import(
    /* webpackChunkName: "Free streams A1 page" */ '../pages/Streams/A1/StreamA1Free'
  )
);
// eslint-disable-next-line
const StreamA2 = lazy(() =>
  import(/* webpackChunkName: "Streams A2 page" */ '../pages/Streams/A2/StreamA2')
);
const StreamA2Free = lazy(() =>
  import(
    /* webpackChunkName: "Free streams A2 page" */ '../pages/Streams/A2/StreamA2Free'
  )
);
// eslint-disable-next-line
const StreamB1 = lazy(() =>
  import(/* webpackChunkName: "Streams B1 page" */ '../pages/Streams/B1/StreamB1')
);
// eslint-disable-next-line
const StreamB2 = lazy(() =>
  import(/* webpackChunkName: "Streams B2 page" */ '../pages/Streams/B2/StreamB2')
);
const StreamC1 = lazy(() =>
  import(/* webpackChunkName: "Streams C1 page" */ '../pages/Streams/C1/StreamC1')
);
// eslint-disable-next-line
const StreamDeutschA0 = lazy(() =>
  import(
    /* webpackChunkName: "Streams Deutsch A0 page" */ '../pages/Streams/Deutsch A0/StreamDeutschA0'
  )
);
const StreamDeutschA02 = lazy(() =>
  import(
    /* webpackChunkName: "Streams Deutsch A0_2 page" */ '../pages/Streams/Deutsch A0/StreamDeutschA02'
  )
);
// eslint-disable-next-line
const StreamDeutsch = lazy(() =>
  import(
    /* webpackChunkName: "Streams Deutsch page" */ '../pages/Streams/Deutsch/StreamDeutsch'
  )
);
// eslint-disable-next-line
const StreamDeutschA2 = lazy(() =>
  import(
    /* webpackChunkName: "Streams Deutsch A2 page" */ '../pages/Streams/Deutsch A2/StreamDeutschA2'
  )
);
// eslint-disable-next-line
const StreamDeutschB1 = lazy(() =>
  import(
    /* webpackChunkName: "Streams Deutsch B1 page" */ '../pages/Streams/Deutsch B1/StreamDeutschB1'
  )
);
// eslint-disable-next-line
const StreamDeutschB2 = lazy(() =>
  import(
    /* webpackChunkName: "Streams Deutsch B2 page" */ '../pages/Streams/Deutsch B2/StreamDeutschB2'
  )
);
const StreamPolskiA0 = lazy(() =>
  import(
    /* webpackChunkName: "Streams Polski A0 page" */ '../pages/Streams/Polski A0/StreamPolskiA0'
  )
);
const StreamPolskiA02 = lazy(() =>
  import(
    /* webpackChunkName: "Streams Polski A0 2 page" */ '../pages/Streams/Polski A0/StreamPolskiA02'
  )
);
const StreamPolski = lazy(() =>
  import(
    /* webpackChunkName: "Streams Polski A1 page" */ '../pages/Streams/Polski/StreamPolski'
  )
);
const StreamPolskiA2 = lazy(() =>
  import(
    /* webpackChunkName: "Streams Polski A2 page" */ '../pages/Streams/Polski A2/StreamPolskiA2'
  )
);
const StreamPolskiB1 = lazy(() =>
  import(
    /* webpackChunkName: "Streams Polski B1 page" */ '../pages/Streams/Polski B1/StreamPolskiB1'
  )
);
const StreamPolskiB2 = lazy(() =>
  import(
    /* webpackChunkName: "Streams Polski B2 page" */ '../pages/Streams/Polski B2/StreamPolskiB2'
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
const ServiceFeedback = lazy(() =>
  import(
    /* webpackChunkName: "Service Feedback page" */ '../pages/Service/ServiceFeedback'
  )
);
const HR = lazy(() => import(/* webpackChunkName: "HR page" */ '../pages/HR/HR'));
const StreamsKids = lazy(() =>
  import(/* webpackChunkName: "Streams Kids page" */ '../pages/StreamsKids/StreamsKids')
);
const KidsA0 = lazy(() =>
  import(
    /* webpackChunkName: "Kids Streams A0 page" */ '../pages/StreamsKids/KidsA0/KidsA0'
  )
);
// eslint-disable-next-line
const KidsA1 = lazy(() =>
  import(
    /* webpackChunkName: "Kids Streams A1 page" */ '../pages/StreamsKids/KidsA1/KidsA1'
  )
);
// eslint-disable-next-line
const KidsA2 = lazy(() =>
  import(
    /* webpackChunkName: "Kids Streams A2 page" */ '../pages/StreamsKids/KidsA2/KidsA2'
  )
);
// eslint-disable-next-line
const KidsB1 = lazy(() =>
  import(
    /* webpackChunkName: "Kids Streams B1 page" */ '../pages/StreamsKids/KidsB1/KidsB1'
  )
);
const KidsB1Beginner = lazy(() =>
  import(
    /* webpackChunkName: "Kids Streams B1 Beginner page" */ '../pages/StreamsKids/KidsB1Beginner/KidsB1Beginner'
  )
);
// eslint-disable-next-line
const KidsB2 = lazy(() =>
  import(
    /* webpackChunkName: "Kids Streams B2 page" */ '../pages/StreamsKids/KidsB2/KidsB2'
  )
);
const KidsB2Beginner = lazy(() =>
  import(
    /* webpackChunkName: "Kids Streams B2 Beginner page" */ '../pages/StreamsKids/KidsB2Beginner/KidsB2Beginner'
  )
);
const KidsC1 = lazy(() =>
  import(
    /* webpackChunkName: "Kids Streams C1 page" */ '../pages/StreamsKids/KidsC1/KidsC1'
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
// eslint-disable-next-line
const KidsDeA2 = lazy(() =>
  import(
    /* webpackChunkName: "Deutsch Streams A2 Kids page" */ '../pages/StreamsKids/KidsDeA2/KidsDeA2'
  )
);
const KidsDeB1 = lazy(() =>
  import(
    /* webpackChunkName: "Deutsch Streams B1 Kids page" */ '../pages/StreamsKids/KidsDeB1/KidsDeB1'
  )
);
const KidsPlA1 = lazy(() =>
  import(
    /* webpackChunkName: "Polski Streams A1 Kids page" */ '../pages/StreamsKids/KidsPlA1/KidsPlA1'
  )
);
const KidsPlA2 = lazy(() =>
  import(
    /* webpackChunkName: "Polski Streams A2 Kids page" */ '../pages/StreamsKids/KidsPlA2/KidsPlA2'
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
// eslint-disable-next-line
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
  import(/* webpackChunkName: "NMTUkr Education page" */ '../pages/Streams/NMTUkr/NMTUkr')
);
const NMTEn = lazy(() =>
  import(/* webpackChunkName: "NMTEn Education page" */ '../pages/Streams/NMTEn/NMTEn')
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
const APConf = lazy(() =>
  import(
    /* webpackChunkName: "AP Conference Education page" */ '../pages/Streams/APConf/APConf'
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
const UniAdminPanel = lazy(() =>
  import(
    /* webpackChunkName: "Pl University Links Admin Panel page" */ '../pages/Streams/AdminPanel/UniAdminPanel'
  )
);
const CollectionsAdminPanel = lazy(() =>
  import(
    /* webpackChunkName: "Collections Admin Panel page" */ '../pages/Streams/CollectionsAdminPanel/CollectionsAdminPanel'
  )
);
const UniCollectionsAdminPanel = lazy(() =>
  import(
    /* webpackChunkName: "Pl University Collections Admin Panel page" */ '../pages/Streams/CollectionsAdminPanel/UniCollectionsAdminPanel'
  )
);
const ToursAdminPanel = lazy(() =>
  import(
    /* webpackChunkName: "Tours Admin Panel page" */ '../pages/Streams/ToursAdminPanel/ToursAdminPanel'
  )
);
const AppointmentsAdminPanel = lazy(() =>
  import(
    /* webpackChunkName: "Appointments Admin Panel page" */ '../pages/Streams/AppointmentsAdminPanel/AppointmentsAdminPanel'
  )
);
const KahootAdminPanel = lazy(() =>
  import(
    /*webpackChunkName: "Kahoots Admin Panel page"*/ '../pages/Streams/KahootAdminPanel/KahootAdminPanel'
  )
);
const HostKahootAdminPanel = lazy(() =>
  import(
    /*webpackChunkName: "Host Kahoots Admin Panel page"*/ '../pages/Streams/HostKahootAdminPanel/HostKahootAdminPanel'
  )
);
const UniKahootAdminPanel = lazy(() =>
  import(
    /* webpackChunkName: "Pl University Kahoots Admin Panel page" */ '../pages/Streams/KahootAdminPanel/UniKahootAdminPanel'
  )
);
const UniHostKahootAdminPanel = lazy(() =>
  import(
    /* webpackChunkName: "Pl University Host Kahoots Admin Panel page" */ '../pages/Streams/HostKahootAdminPanel/UniHostKahootAdminPanel'
  )
);
const UserAdminPanel = lazy(() =>
  import(
    /* webpackChunkName: "User Admin Panel page" */ '../pages/Streams/UserAdminPanel/UserAdminPanel'
  )
);
const UniUserAdminPanel = lazy(() =>
  import(
    /* webpackChunkName: "Polish University Users Admin Panel page" */ '../pages/Streams/UserAdminPanel/UniUserAdminPanel'
  )
);
const C1SpeakingPanel = lazy(() =>
  import(
    /* webpackChunkName: "C1 Speaking Control Panel page" */ '../pages/Streams/UserAdminPanel/C1SpeakingPanel'
  )
);
const LessonsAdminPanel = lazy(() =>
  import(
    /* webpackChunkName: "Lessons Admin Panel page" */ '../pages/Streams/LessonsAdminPanel/LessonsAdminPanel'
  )
);
const TeacherLessonsAdminPanel = lazy(() =>
  import(
    /* webpackChunkName: "Teacher Lessons Admin Panel page" */ '../pages/Streams/LessonsAdminPanel/TeacherLessonsAdminPanel/TeacherLessonsAdminPanel'
  )
);
const LessonResultsPanel = lazy(() =>
  import(
    /* webpackChunkName: "Lesson Results Panel page" */ '../pages/Streams/LessonResultsPanel/LessonResultsPanel'
  )
);
const UniLessonResultsPanel = lazy(() =>
  import(
    /* webpackChunkName: "Uni Lesson Results Panel page" */ '../pages/Streams/LessonResultsPanel/UniLessonResultsPanel'
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
// const UserJsonPanel = lazy(() =>
//   import(
//     /* webpackChunkName: "User Json Panel page" */ '../pages/Streams/UserAdminPanel/UserJsonPanel'
//   )
// );
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
const UniTimeTableAdminPanel = lazy(() =>
  import(
    /* webpackChunkName: "Pl University TimeTable Admin Panel page" */ '../pages/Streams/TimeTableAdminPanel/UniTimeTableAdminPanel'
  )
);
const SpeakingAdminPanel = lazy(() =>
  import(
    /* webpackChunkName: "Speaking Admin Panel page" */ '../pages/Streams/AdminPanel/SpeakingAdminPanel'
  )
);
const WebinarsRatings = lazy(() =>
  import(
    /* webpackChunkName: "Webinar Rating Admin page" */ '../pages/Streams/WebinarsRatings'
  )
);
const SpeakingsRatings = lazy(() =>
  import(
    /* webpackChunkName: "Speaking Rating Admin page" */ '../pages/Streams/SpeakingsRatings'
  )
);
const English = lazy(() =>
  import(/* webpackChunkName: "English courses page" */ '../pages/English/English')
);
const Polski = lazy(() =>
  import(/* webpackChunkName: "Polski courses page" */ '../pages/Polski/Polski')
);
const Deutsch = lazy(() =>
  import(/* webpackChunkName: "Deutsch courses page" */ '../pages/Deutsch/Deutsch')
);
const TeacherPage = lazy(() =>
  import(/* webpackChunkName: "Teacher Page" */ '../pages/TeacherPage/TeacherPage')
);
const TeacherPageUni = lazy(() =>
  import(/* webpackChunkName: "Uni Teacher Page" */ '../pages/TeacherPage/TeacherPageUni')
);
const TeacherPageIndividual = lazy(() =>
  import(
    /* webpackChunkName: "Teacher Page for Individual Lessons" */ '../pages/TeacherPage/TeacherPageIndividual'
  )
);
const TeacherPageIndividualPartners = lazy(() =>
  import(
    /* webpackChunkName: "Teacher Page for Individual Lessons with embedded Partners presentation" */ '../pages/TeacherPage/TeacherPageIndividualPartners'
  )
);
const TeacherPagePedagogium = lazy(() =>
  import(
    /* webpackChunkName: "Teacher Page for Pedagogium" */ '../pages/TeacherPage/TeacherPagePedagogium'
  )
);
const TeacherPageTrialLesson = lazy(() =>
  import(
    /* webpackChunkName: "Teacher Trial Lesson Page" */ '../pages/TeacherPage/TeacherPageTrialLesson'
  )
);
const TeacherPageFarm = lazy(() =>
  import(
    /* webpackChunkName: "Teacher Page Farm" */ '../pages/TeacherPage/TeacherPageFarm'
  )
);
// const TeacherPageWarehouse = lazy(() =>
//   import(
//     /* webpackChunkName: "Teacher Page Warehouse" */ '../pages/TeacherPage/TeacherPageWarehouse'
//   )
// );
// const TeacherPageWarehouseHotel = lazy(() =>
//   import(
//     /* webpackChunkName: "Teacher Page Warehouse" */ '../pages/TeacherPage/TeacherPageWarehouseHotel'
//   )
// );
const TeacherPageWarehouseHotelTrialPL = lazy(() =>
  import(
    /* webpackChunkName: "Teacher Page Warehouse For Polski Trial Lesson" */ '../pages/TeacherPage/TeacherPageWarehouseHotelTrialPL'
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
  import(/* webpackChunkName: "Lead Form Page" */ '../pages/LeadFormPage/LeadFormPage')
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
const TeacherLogin = lazy(() =>
  import(/* webpackChunkName: "TeacherLogin" */ '../pages/TeacherLogin/TeacherLogin')
);
const TeacherAP = lazy(() =>
  import(/* webpackChunkName: "TeacherAP" */ '../pages/TeacherAP/TeacherAP')
);
const Reminder = lazy(() =>
  import(/* webpackChunkName: "Reminder" */ '../pages/Reminder/Reminder')
);
const Videochat = lazy(() =>
  import(/* webpackChunkName: "Videochat" */ '../pages/Videochat/Videochat')
);
const TestInApp = lazy(() =>
  import(/* webpackChunkName: "TestInApp" */ '../pages/Videochat/TestInApp')
);
const VideochatRoom = lazy(() =>
  import(/* webpackChunkName: "Videochat Room" */ '../pages/Videochat/VideochatRoom')
);
const TrialVideoRoom = lazy(() =>
  import(
    /* webpackChunkName: "Trial Videochat Room" */ '../pages/Videochat/Trial/TrialMain'
  )
);

const StreamVideoRoom = lazy(() =>
  import(
    /* webpackChunkName: "Stream Videochat Room" */ '../pages/Videochat/Stream/StreamMain'
  )
);

const IndividualVideoRoom = lazy(() =>
  import(
    /* webpackChunkName: "Individual Videochat Room" */ '../pages/Videochat/Individual/IndividualMain'
  )
);
const EndCall = lazy(() =>
  import(/* webpackChunkName: "End Call" */ '../pages/Videochat/EndCall')
);
const EndCallPl = lazy(() =>
  import(/* webpackChunkName: "End Call Pl" */ '../pages/Videochat/EndCallPl')
);
const MyAP = lazy(() =>
  import(/* webpackChunkName: "My AP Page" */ '../pages/MyAP/MyAP')
);
const MyAPPl = lazy(() =>
  import(/* webpackChunkName: "My AP Pl Page" */ '../pages/MyAP/MyAPPl')
);
const MyAPPlTemp = lazy(() =>
  import(/* webpackChunkName: "My AP Temp Page" */ '../pages/MyAP/MyAPPlTemp')
);
// const MyWSPA = lazy(() =>
//   import(/* webpackChunkName: "My WSPA Page" */ '../pages/MyAP/MyWSPA')
// );
// const MyVPU = lazy(() =>
//   import(/* webpackChunkName: "My VPU Page" */ '../pages/MyAP/MyVPU')
// );
// const MyISMPO = lazy(() =>
//   import(/* webpackChunkName: "My ISMPO Page" */ '../pages/MyAP/MyISMPO')
// );
const TrialLesson = lazy(() =>
  import(/* webpackChunkName: "Trial Lesson Page" */ '../pages/TrialLesson/TrialLesson')
);
// const ConferenceTest = lazy(() =>
//   import(/* webpackChunkName: "AP Conference Test Page" */ '../pages/MyAP/ConferenceTest')
// );
const HRCalc = lazy(() =>
  import(/* webpackChunkName: "HR Salary Calculator Page" */ '../pages/HR/HRCalc/HRCalc')
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

const NotFound = lazy(() =>
  import(/* webpackChunkName: "Not Found" */ '../pages/NotFound/NotFound')
);

// const StreamToZoomRedirecter = lazy(() =>
//   import(
//     /* webpackChunkName: "Stream to Zoom Redirecter" */ '../pages/Streams/StreamToZoomRedirecter/StreamToZoomRedirecter'
//   )
// );

// const StreamToZoomRedirecterKids = lazy(() =>
//   import(
//     /* webpackChunkName: "Stream Kids to Zoom Redirecter" */ '../pages/StreamsKids/StreamToZoomRedirecterKids/StreamToZoomRedirecterKids'
//   )
// );

export const App = () => {
  // eslint-disable-next-line
  const [searchParams, _] = useSearchParams();
  // LogRocket.init('0r7bkh/test-project-video');

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
      <Suspense fallback={Loader} noindex={true}>
        <Routes noindex={true}>
          <Route path="/" element={<SharedLayout utms={utms} noindex={true} />}>
            <Route index element={<NewDesign utms={utms} noindex={true} />} />
            <Route path="english" element={<English utms={utms} noindex={true} />} />
            <Route path="deutsch" element={<Deutsch utms={utms} noindex={true} />} />
            <Route path="polski" element={<Polski utms={utms} noindex={true} />} />
            <Route path="school" element={<School utms={utms} noindex={true} />} />
            <Route
              path="university"
              element={<University utms={utms} noindex={true} />}
            />
            <Route path="*" element={<NotFound />} noindex={true} />
          </Route>
          <Route
            path="trial-lesson/:language/:crmId"
            element={<TrialLesson />}
            noindex={true}
          />
          <Route path="reminder" element={<Reminder />} noindex={true} />
          <Route path="teacher-login" element={<TeacherLogin />} noindex={true} />
          <Route path="teacher-ap" element={<TeacherAP />} noindex={true} />
          <Route path="videochat" element={<Videochat />} noindex={true} />
          <Route path="room" element={<TestInApp />}>
            <Route path=":slug/:id" element={<VideochatRoom />} noindex={true} />
            <Route path="trial/:slug/:id" element={<TrialVideoRoom />} noindex={true} />
            <Route path="stream/:slug/:id" element={<StreamVideoRoom />} noindex={true} />
            <Route
              path="individual/:id"
              element={<IndividualVideoRoom />}
              noindex={true}
            />
          </Route>
          <Route path="end-call" element={<EndCall />} noindex={true} />
          <Route path="end-call-pl" element={<EndCallPl />} noindex={true} />
          <Route path="my-ap" element={<MyAP />} noindex={true} />
          {/* <Route path="my-ap-hl" element={<MyAP />} noindex={true} /> */}
          <Route path="my-ap-pl" element={<MyAPPl />} noindex={true} />
          <Route path="my-ap-ts" element={<MyAPPlTemp />} noindex={true} />
          {/* <Route path="my-wspa" element={<MyWSPA />} noindex={true} /> */}
          {/* <Route path="my-vpu" element={<MyVPU />} noindex={true} /> */}
          {/* <Route path="my-ismpo" element={<MyISMPO />} noindex={true} /> */}
          {/* <Route path="c-test" element={<ConferenceTest />} noindex={true} /> */}
          <Route path="my-marathon" element={<MyAP />} noindex={true} />
          <Route path="streams" element={<Streams />} noindex={true}>
            <Route path="a0" element={<StreamA0 />} noindex={true} />
            <Route path="a0sc" element={<StreamSpeakingClub />} noindex={true} />
            <Route path="a0-chat" element={<WindowedChat />} noindex={true} />
            <Route path="a0_2" element={<StreamA02 />} noindex={true} />
            <Route path="a0_2sc" element={<StreamSpeakingClub />} noindex={true} />
            <Route path="a0_2-chat" element={<WindowedChat />} noindex={true} />
            <Route path="a1" element={<StreamA1 />} noindex={true} />
            <Route path="a1sc" element={<StreamSpeakingClub />} noindex={true} />
            <Route path="a1-chat" element={<WindowedChat />} noindex={true} />
            <Route path="a2" element={<StreamA2 />} noindex={true} />
            <Route path="a2sc" element={<StreamSpeakingClub />} noindex={true} />
            <Route path="a2-chat" element={<WindowedChat />} noindex={true} />
            <Route path="b1" element={<StreamB1 />} noindex={true} />
            <Route path="b1sc" element={<StreamSpeakingClub />} noindex={true} />
            <Route path="b1-chat" element={<WindowedChat />} noindex={true} />
            <Route path="b2" element={<StreamB2 />} noindex={true} />
            <Route path="b2sc" element={<StreamSpeakingClub />} noindex={true} />
            <Route path="b2-chat" element={<WindowedChat />} noindex={true} />
            <Route path="c1" element={<StreamC1 />} noindex={true} />
            <Route path="c1sc" element={<StreamSpeakingClub />} noindex={true} />
            <Route path="c1-chat" element={<WindowedChat />} noindex={true} />
            <Route path="a1free" element={<StreamA1Free />} noindex={true} />
            <Route path="a1free-chat" element={<WindowedChat />} noindex={true} />
            <Route path="a2free" element={<StreamA2Free />} noindex={true} />
            <Route path="a2free-chat" element={<WindowedChat />} noindex={true} />
            <Route path="deutscha0" element={<StreamDeutschA0 />} noindex={true} />
            <Route path="dea0sc" element={<StreamSpeakingClub />} noindex={true} />
            <Route path="deutscha0-chat" element={<WindowedChat />} noindex={true} />
            <Route path="deutscha0_2" element={<StreamDeutschA02 />} noindex={true} />
            <Route path="dea0_2sc" element={<StreamSpeakingClub />} noindex={true} />
            <Route path="deutscha0_2-chat" element={<WindowedChat />} noindex={true} />
            <Route path="deutsch" element={<StreamDeutsch />} noindex={true} />
            <Route path="dea1sc" element={<StreamSpeakingClub />} noindex={true} />
            <Route path="deutsch-chat" element={<WindowedChat />} noindex={true} />
            <Route path="deutscha2" element={<StreamDeutschA2 />} noindex={true} />
            <Route path="dea2sc" element={<StreamSpeakingClub />} noindex={true} />
            <Route path="deutscha2-chat" element={<WindowedChat />} noindex={true} />
            <Route path="deutschb1" element={<StreamDeutschB1 />} noindex={true} />
            <Route path="deb1sc" element={<StreamSpeakingClub />} noindex={true} />
            <Route path="deb1_1sc" element={<StreamSpeakingClub />} noindex={true} />
            <Route path="deb1_2sc" element={<StreamSpeakingClub />} noindex={true} />
            <Route path="deutschb1-chat" element={<WindowedChat />} noindex={true} />
            <Route path="deutschb2" element={<StreamDeutschB2 />} noindex={true} />
            <Route path="deb2sc" element={<StreamSpeakingClub />} noindex={true} />
            <Route path="deb2_1sc" element={<StreamSpeakingClub />} noindex={true} />
            <Route path="deb2_2sc" element={<StreamSpeakingClub />} noindex={true} />
            <Route path="deb2_3sc" element={<StreamSpeakingClub />} noindex={true} />
            <Route path="deutschb2-chat" element={<WindowedChat />} noindex={true} />
            <Route path="dec1sc" element={<StreamSpeakingClub />} noindex={true} />
            <Route path="deutschfree" element={<StreamDeutschFree />} noindex={true} />
            <Route path="deutschfree-chat" element={<WindowedChat />} noindex={true} />
            <Route
              path="deutscha2free"
              element={<StreamDeutschA2Free />}
              noindex={true}
            />
            <Route path="deutscha2free-chat" element={<WindowedChat />} noindex={true} />
            <Route path="polskia0" element={<StreamPolskiA0 />} noindex={true} />
            <Route path="pla0sc" element={<StreamSpeakingClub />} noindex={true} />
            <Route path="polskia0-chat" element={<WindowedChat />} noindex={true} />
            <Route path="polskia0_2" element={<StreamPolskiA02 />} noindex={true} />
            <Route path="polskia0_2-chat" element={<WindowedChat />} noindex={true} />
            <Route path="polskia0_3-chat" element={<WindowedChat />} noindex={true} />
            <Route path="polski" element={<StreamPolski />} noindex={true} />
            <Route path="pla1sc" element={<StreamSpeakingClub />} noindex={true} />
            <Route path="polski-chat" element={<WindowedChat />} noindex={true} />
            <Route path="polskia2" element={<StreamPolskiA2 />} noindex={true} />
            <Route path="pla2sc" element={<StreamSpeakingClub />} noindex={true} />
            <Route path="polskia2-chat" element={<WindowedChat />} noindex={true} />
            <Route path="polskib1" element={<StreamPolskiB1 />} noindex={true} />
            <Route path="plb1sc" element={<StreamSpeakingClub />} noindex={true} />
            <Route path="polskib1-chat" element={<WindowedChat />} noindex={true} />
            <Route path="polskib2" element={<StreamPolskiB2 />} noindex={true} />
            <Route path="plb2sc" element={<StreamSpeakingClub />} noindex={true} />
            <Route path="polskib2-chat" element={<WindowedChat />} noindex={true} />
            <Route path="polskia0_3-chat" element={<WindowedChat />} noindex={true} />
            <Route path="plc1sc" element={<StreamSpeakingClub />} noindex={true} />
            <Route path="polskifree" element={<StreamPolskiFree />} noindex={true} />
            <Route path="polskifree-chat" element={<WindowedChat />} noindex={true} />
            <Route path="nmt_ukr" element={<NMTUkr />} noindex={true} />
            <Route path="nmt_ukrsc" element={<StreamSpeakingClub />} noindex={true} />
            <Route path="nmt_ukr-chat" element={<WindowedChat />} noindex={true} />
            <Route path="nmt_en" element={<NMTEn />} noindex={true} />
            <Route path="nmt_ensc" element={<StreamSpeakingClub />} noindex={true} />
            <Route path="nmt_en-chat" element={<WindowedChat />} noindex={true} />
            <Route path="nmt_math" element={<NMTMath />} noindex={true} />
            <Route path="nmt_mathsc" element={<StreamSpeakingClub />} noindex={true} />
            <Route path="nmt_math-chat" element={<WindowedChat />} noindex={true} />
            <Route path="nmt_history" element={<NMTHistory />} noindex={true} />
            <Route path="nmt_historysc" element={<StreamSpeakingClub />} noindex={true} />
            <Route path="nmt_history-chat" element={<WindowedChat />} noindex={true} />
            <Route path="test" element={<StreamTest />} noindex={true} />
            <Route path="test-chat" element={<WindowedChat />} noindex={true} />
            <Route path="record-chat" element={<WindowedChat />} noindex={true} />
            <Route path="apconf" element={<APConf />} noindex={true} />
            <Route path="apconf-chat" element={<WindowedChat />} noindex={true} />
            <Route path="kubrak-chat" element={<WindowedChat />} noindex={true} />
            <Route path="bulavka-chat" element={<WindowedChat />} noindex={true} />
            <Route path="ivachevska-chat" element={<WindowedChat />} noindex={true} />
            <Route path="deineka-chat" element={<WindowedChat />} noindex={true} />
            <Route path="nakonechna-chat" element={<WindowedChat />} noindex={true} />
            <Route path="heinz-chat" element={<WindowedChat />} noindex={true} />
            <Route path="doloka-chat" element={<WindowedChat />} noindex={true} />
            <Route path="lyasota-chat" element={<WindowedChat />} noindex={true} />
            <Route path="shvets-chat" element={<WindowedChat />} noindex={true} />
            <Route path="tsvihun-chat" element={<WindowedChat />} noindex={true} />
            <Route path="stream-admin-panel" element={<AdminPanel />} noindex={true} />
            <Route
              path="uni-stream-admin-panel"
              element={<UniAdminPanel />}
              noindex={true}
            />
            <Route
              path="speaking-admin-panel"
              element={<SpeakingAdminPanel />}
              noindex={true}
            />
            <Route
              path="kahoot-admin-panel"
              element={<KahootAdminPanel />}
              noindex={true}
            />
            <Route
              path="uni-kahoot-admin-panel"
              element={<UniKahootAdminPanel />}
              noindex={true}
            />
            <Route
              path="host-kahoot-admin-panel"
              element={<HostKahootAdminPanel />}
              noindex={true}
            />
            <Route
              path="uni-host-kahoot-admin-panel"
              element={<UniHostKahootAdminPanel />}
              noindex={true}
            />
            <Route path="user-admin-panel" element={<UserAdminPanel />} noindex={true} />
            <Route
              path="pl-user-admin-panel"
              element={<UniUserAdminPanel />}
              noindex={true}
            />
            <Route
              path="pedagogium-admin-panel"
              element={<UniUserAdminPanel uni={'PEDAGOGIUM'} lang={'pl'} />}
              noindex={true}
            />
            <Route
              path="c1-speaking-panel"
              element={<C1SpeakingPanel />}
              noindex={true}
            />
            <Route
              path="teacher-teamlead-panel"
              element={<TeacherAdminPanel />}
              noindex={true}
            />
            <Route
              path="lesson-results-panel"
              element={<LessonResultsPanel />}
              noindex={true}
            />
            <Route
              path="uni-lesson-results-panel"
              element={<UniLessonResultsPanel />}
              noindex={true}
            />
            <Route path="tcp" element={<TeacherControlPage />} noindex={true} />
            <Route path="tcp-en" element={<TeacherControlPageEn />} noindex={true} />
            <Route path="tcp-de" element={<TeacherControlPageDe />} noindex={true} />
            <Route path="tcp-pl" element={<TeacherControlPagePl />} noindex={true} />
            {/* <Route path="user-json-panel" element={<UserJsonPanel />} noindex={true} /> */}
            <Route
              path="ratings-admin-panel"
              element={<RatingsAdminPanel />}
              noindex={true}
            />
            <Route
              path="lessons-admin-panel"
              element={<LessonsAdminPanel />}
              noindex={true}
            />
            <Route
              path="timetable-admin-panel"
              element={<TimeTableAdminPanel />}
              noindex={true}
            />
            <Route
              path="uni-timetable-admin-panel"
              element={<UniTimeTableAdminPanel />}
              noindex={true}
            />
            <Route
              path="teacher-admin-panel"
              element={<TeacherLessonsAdminPanel />}
              noindex={true}
            />
            <Route
              path="collection-admin-panel"
              element={<CollectionsAdminPanel />}
              noindex={true}
            />
            <Route
              path="uni-collection-admin-panel"
              element={<UniCollectionsAdminPanel />}
              noindex={true}
            />
            <Route path="tour-admin-panel" element={<ToursAdminPanel />} noindex={true} />
            <Route
              path="appointments-admin-panel"
              element={<AppointmentsAdminPanel />}
              noindex={true}
            />
            <Route path="ratings" element={<WebinarsRatings />} noindex={true} />
          </Route>
          <Route path="streams-kids" element={<StreamsKids />} noindex={true}>
            <Route path="preschool" element={<Preschool />} noindex={true} />
            <Route
              path="preschoolsc"
              element={<StreamSpeakingClubKids />}
              noindex={true}
            />
            <Route path="preschool-chat" element={<WindowedChat />} noindex={true} />
            <Route path="pre" element={<KidsPRE />} noindex={true} />
            <Route path="presc" element={<StreamSpeakingClubKids />} noindex={true} />
            <Route path="pre-chat" element={<WindowedChat />} noindex={true} />
            <Route path="beg" element={<KidsBEG />} noindex={true} />
            <Route path="begsc" element={<StreamSpeakingClubKids />} noindex={true} />
            <Route path="beg-chat" element={<WindowedChat />} noindex={true} />
            <Route path="mid" element={<KidsMID />} noindex={true} />
            <Route path="midsc" element={<StreamSpeakingClubKids />} noindex={true} />
            <Route path="mid-chat" element={<WindowedChat />} noindex={true} />
            <Route path="high" element={<KidsHIGH />} noindex={true} />
            <Route path="highsc" element={<StreamSpeakingClubKids />} noindex={true} />
            <Route path="high-chat" element={<WindowedChat />} noindex={true} />
            <Route path="a0" element={<KidsA0 />} noindex={true} />
            <Route path="a0sc" element={<StreamSpeakingClubKids />} noindex={true} />
            <Route path="a0-chat" element={<WindowedChat />} noindex={true} />
            <Route path="a1" element={<KidsA1 />} noindex={true} />
            <Route path="a1sc" element={<StreamSpeakingClubKids />} noindex={true} />
            <Route path="a1-chat" element={<WindowedChat />} noindex={true} />
            <Route path="a2" element={<KidsA2 />} noindex={true} />
            <Route path="a2sc" element={<StreamSpeakingClubKids />} noindex={true} />
            <Route path="a2-chat" element={<WindowedChat />} noindex={true} />
            <Route path="b1" element={<KidsB1 />} noindex={true} />
            <Route path="b1sc" element={<StreamSpeakingClubKids />} noindex={true} />
            <Route path="b1-chat" element={<WindowedChat />} noindex={true} />
            <Route path="b2" element={<KidsB2 />} noindex={true} />
            <Route path="b2sc" element={<StreamSpeakingClubKids />} noindex={true} />
            <Route path="b2-chat" element={<WindowedChat />} noindex={true} />
            <Route path="c1" element={<KidsC1 />} noindex={true} />
            <Route path="c1sc" element={<StreamSpeakingClubKids />} noindex={true} />
            <Route path="c1-chat" element={<WindowedChat />} noindex={true} />
            <Route path="b1beginner" element={<KidsB1Beginner />} noindex={true} />
            <Route
              path="b1beginnersc"
              element={<StreamSpeakingClubKids />}
              noindex={true}
            />
            <Route path="b1beginner-chat" element={<WindowedChat />} noindex={true} />
            <Route path="b2beginner" element={<KidsB2Beginner />} noindex={true} />
            <Route
              path="b2beginnersc"
              element={<StreamSpeakingClubKids />}
              noindex={true}
            />
            <Route path="b2beginner-chat" element={<WindowedChat />} noindex={true} />
            <Route path="dea0" element={<KidsDeA0 />} noindex={true} />
            <Route path="dea0-chat" element={<WindowedChat />} noindex={true} />
            <Route path="dea0sc" element={<StreamSpeakingClubKids />} noindex={true} />
            <Route path="dea1" element={<KidsDeA1 />} noindex={true} />
            <Route path="dea1-chat" element={<WindowedChat />} noindex={true} />
            <Route path="dea1sc" element={<StreamSpeakingClubKids />} noindex={true} />
            <Route path="dea2" element={<KidsDeA2 />} noindex={true} />
            <Route path="dea2-chat" element={<WindowedChat />} noindex={true} />
            <Route path="dea2sc" element={<StreamSpeakingClubKids />} noindex={true} />
            <Route path="deb1" element={<KidsDeB1 />} noindex={true} />
            <Route path="deb1-chat" element={<WindowedChat />} noindex={true} />
            <Route path="deb1sc" element={<StreamSpeakingClubKids />} noindex={true} />
            <Route path="pla1" element={<KidsPlA1 />} noindex={true} />
            <Route path="pla1-chat" element={<WindowedChat />} noindex={true} />
            <Route path="pla1sc" element={<StreamSpeakingClubKids />} noindex={true} />
            <Route path="pla2" element={<KidsPlA2 />} noindex={true} />
            <Route path="pla2-chat" element={<WindowedChat />} noindex={true} />
            <Route path="pla2sc" element={<StreamSpeakingClubKids />} noindex={true} />
            <Route path="a1free" element={<KidsA1Free />} noindex={true} />
            <Route path="a1free-chat" element={<WindowedChat />} noindex={true} />
            <Route path="dea1free" element={<KidsDeA1Free />} noindex={true} />
            <Route path="dea1free-chat" element={<WindowedChat />} noindex={true} />
            <Route path="pla1free" element={<KidsPlA1Free />} noindex={true} />
            <Route path="pla1free-chat" element={<WindowedChat />} noindex={true} />
          </Route>
          <Route path="chatbot" element={<TestChatBot />} noindex={true} />
          <Route path="record" element={<RecordLinkTree />} noindex={true} />
          <Route path="service" element={<Service />} noindex={true}>
            <Route path="viber" element={<ViberRedirect />} noindex={true} />
            <Route path="tg" element={<TelegramRedirect />} noindex={true} />
          </Route>
          <Route
            path="service-feedback/:crmId"
            element={<ServiceFeedback />}
            noindex={true}
          />
          <Route path="marathon" element={<Service />} noindex={true}>
            <Route path="viber" element={<ViberMarathonRedirect />} noindex={true} />
            <Route path="tg" element={<TelegramMarathonRedirect />} noindex={true} />
            <Route path="wa" element={<WhatsAppRedirect />} noindex={true} />
          </Route>
          <Route path="hr" element={<HR />} noindex={true}>
            <Route path="viber" element={<ViberHRRedirect />} noindex={true} />
            <Route path="tg" element={<TelegramHRRedirect />} noindex={true} />
            <Route path="calc" element={<HRCalc />} noindex={true} />
          </Route>
          <Route path="speakings" element={<Speakings />} noindex={true}>
            <Route path="a0sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="a0_2sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="a1sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="a2sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="b1sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="b2sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="13" element={<TeacherPageSpeaking13 />} noindex={true} />
            <Route path="c1sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="dea0sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="dea0_2sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="dea1sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="dea2sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="deb1sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="deb2sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="dec1sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="pla0sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="pla0_2sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="pla1sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="pla2sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="plb1sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="plb2sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="plc1sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="kids-a0sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="kids-a0_2sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="kids-a1sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="kids-a2sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="kids-b1sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="kids-b2sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="kids-c1sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route
              path="kids-c1schigh"
              element={<TeacherPageSpeaking />}
              noindex={true}
            />
            <Route path="kids-dea0sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route
              path="kids-dea0_2sc"
              element={<TeacherPageSpeaking />}
              noindex={true}
            />
            <Route path="kids-dea1sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="kids-dea2sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="kids-deb1sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="kids-deb2sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="kids-pla0sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route
              path="kids-pla0_2sc"
              element={<TeacherPageSpeaking />}
              noindex={true}
            />
            <Route path="kids-pla1sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="kids-pla2sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="kids-plb1sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="kids-plb2sc" element={<TeacherPageSpeaking />} noindex={true} />
            <Route path="ratings" element={<SpeakingsRatings />} noindex={true} />
          </Route>
          <Route path="teacher" element={<Teacher />} noindex={true}>
            <Route path="a0" element={<TeacherPage />} noindex={true} />
            <Route path="a0_2" element={<TeacherPage />} noindex={true} />
            <Route path="a1" element={<TeacherPage />} noindex={true} />
            <Route path="a2" element={<TeacherPage />} noindex={true} />
            <Route path="b1" element={<TeacherPage />} noindex={true} />
            <Route path="b2" element={<TeacherPage />} noindex={true} />
            <Route path="c1" element={<TeacherPage />} noindex={true} />
            <Route path="kidspre" element={<TeacherPage />} noindex={true} />
            <Route path="kidsbeg" element={<TeacherPage />} noindex={true} />
            <Route path="kidsmid" element={<TeacherPage />} noindex={true} />
            <Route path="kidshigh" element={<TeacherPage />} noindex={true} />
            <Route path="preschool" element={<TeacherPage />} noindex={true} />
            <Route path="nmt_ukr" element={<TeacherPage />} noindex={true} />
            <Route path="nmt_en" element={<TeacherPage />} noindex={true} />
            <Route path="nmt_math" element={<TeacherPage />} noindex={true} />
            <Route path="nmt_history" element={<TeacherPage />} noindex={true} />
            <Route path="a1free" element={<TeacherPageTrialLesson />} noindex={true} />
            <Route path="a2free" element={<TeacherPageTrialLesson />} noindex={true} />
            <Route path="a0kids" element={<TeacherPage />} noindex={true} />
            <Route path="a1kids" element={<TeacherPage />} noindex={true} />
            <Route path="a2kids" element={<TeacherPage />} noindex={true} />
            <Route path="b1kids" element={<TeacherPage />} noindex={true} />
            <Route path="b2kids" element={<TeacherPage />} noindex={true} />
            <Route path="c1kids" element={<TeacherPage />} noindex={true} />
            <Route
              path="a1kidsfree"
              element={<TeacherPageTrialLesson />}
              noindex={true}
            />
            <Route path="b1kidsbeginner" element={<TeacherPage />} noindex={true} />
            <Route path="b2kidsbeginner" element={<TeacherPage />} noindex={true} />
            <Route path="trendets" element={<TeacherPage />} noindex={true} />
            <Route path="deutsch-a0" element={<TeacherPage />} noindex={true} />
            <Route path="deutsch-a0_2" element={<TeacherPage />} noindex={true} />
            <Route path="deutsch-a1" element={<TeacherPage />} noindex={true} />
            <Route path="deutsch-a2" element={<TeacherPage />} noindex={true} />
            <Route path="deutsch-b1" element={<TeacherPage />} noindex={true} />
            <Route path="deutsch-b2" element={<TeacherPage />} noindex={true} />
            <Route
              path="deutsch-a1free"
              element={<TeacherPageTrialLesson />}
              noindex={true}
            />
            <Route
              path="deutsch-a2free"
              element={<TeacherPageTrialLesson />}
              noindex={true}
            />
            <Route path="dea0kids" element={<TeacherPage />} noindex={true} />
            <Route path="dea1kids" element={<TeacherPage />} noindex={true} />
            <Route path="dea2kids" element={<TeacherPage />} noindex={true} />
            <Route path="deb1kids" element={<TeacherPage />} noindex={true} />
            <Route
              path="dekidsfree"
              element={<TeacherPageTrialLesson />}
              noindex={true}
            />
            <Route path="polski-a0" element={<TeacherPage />} noindex={true} />
            <Route path="polski-a0_2" element={<TeacherPageFarm />} noindex={true} />
            <Route
              path="polski-a0_3"
              element={<TeacherPageWarehouseHotelTrialPL />}
              noindex={true}
            />
            <Route path="polski-a1" element={<TeacherPage />} noindex={true} />
            <Route
              path="polski-a1free"
              element={<TeacherPageTrialLesson />}
              noindex={true}
            />
            <Route path="polski-a2" element={<TeacherPage />} noindex={true} />
            <Route path="polski-b1" element={<TeacherPage />} noindex={true} />
            <Route path="polski-b2" element={<TeacherPage />} noindex={true} />
            <Route path="pla1kids" element={<TeacherPage />} noindex={true} />
            <Route path="pla2kids" element={<TeacherPage />} noindex={true} />
            <Route path="plkidsfree" element={<TeacherPage />} noindex={true} />
            <Route path="record" element={<TeacherPageVertical />} noindex={true} />
            <Route path="apconf" element={<TeacherPage />} noindex={true} />
            <Route path="test" element={<TeacherPage />} noindex={true} />
            <Route path="trials" element={<TeacherTrialPage />} noindex={true} />
            <Route path="trials-kids" element={<TeacherTrialPage />} noindex={true} />
            <Route path="trials-pl" element={<TeacherTrialPage />} noindex={true} />
            <Route path="trials-de" element={<TeacherTrialPage />} noindex={true} />
            <Route
              path="pedagogium-2"
              element={<TeacherPagePedagogium />}
              noindex={true}
            />
            <Route
              path="wstijo"
              element={<TeacherPageUni group="logistics" />}
              noindex={true}
            />
            <Route path="wskm" element={<TeacherPageUni group="cnc" />} noindex={true} />
            <Route path="wsbmir" element={<TeacherPage />} noindex={true} />
            <Route path="kubrak" element={<TeacherPageIndividual />} noindex={true} />
            <Route path="bulavka" element={<TeacherPageIndividual />} noindex={true} />
            <Route path="ivachevska" element={<TeacherPageIndividual />} noindex={true} />
            <Route path="deineka" element={<TeacherPageIndividual />} noindex={true} />
            <Route path="tsvihun" element={<TeacherPageIndividual />} noindex={true} />
            <Route path="nakonechna" element={<TeacherPageIndividual />} noindex={true} />
            <Route path="heinz" element={<TeacherPageIndividual />} noindex={true} />
            <Route path="doloka" element={<TeacherPageIndividual />} noindex={true} />
            <Route path="lyasota" element={<TeacherPageIndividual />} noindex={true} />
            <Route
              path="shvets"
              element={<TeacherPageIndividualPartners />}
              noindex={true}
            />
          </Route>
          <Route path="thankyou" element={<ThankYouPage />} noindex={true} />
          <Route
            path="quiz-g"
            element={<QuizOneRequestGoogleNoEngage utms={utms} noindex={true} />}
          />
          <Route
            path="quiz-d11p"
            element={<QuizOneRequestDiscountNoEngage utms={utms} noindex={true} />}
          />
          <Route
            path="quiz-d20p"
            element={<QuizOneRequestDiscountNoEngage utms={utms} noindex={true} />}
          />
          <Route
            path="quiz-d30p"
            element={<QuizOneRequestDiscountNoEngage utms={utms} noindex={true} />}
          />
          <Route path="forms-tree" element={<FormsLinkTree />} noindex={true} />
          <Route
            path="un-form"
            element={<UniversalLeadFormPage utms={utms} />}
            noindex={true}
          />
          <Route path="form" element={<LeadFormPage utms={utms} />} noindex={true} />
          <Route path="form-uni" element={<LeadFormPage utms={utms} />} noindex={true} />
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
          <Route path="form-a" element={<LeadFormPage utms={utms} />} noindex={true} />
          <Route path="form-b" element={<LeadFormPage utms={utms} />} noindex={true} />
          <Route path="form-c" element={<LeadFormPage utms={utms} />} noindex={true} />
          <Route path="form-d" element={<LeadFormPage utms={utms} />} noindex={true} />
          <Route path="form-e" element={<LeadFormPage utms={utms} />} noindex={true} />
          <Route path="form-f" element={<LeadFormPage utms={utms} />} noindex={true} />
          <Route path="form-g" element={<LeadFormPage utms={utms} />} noindex={true} />
          <Route path="form-h" element={<LeadFormPage utms={utms} />} noindex={true} />
          <Route path="form-i" element={<LeadFormPage utms={utms} />} noindex={true} />
          <Route path="form-j" element={<LeadFormPage utms={utms} />} noindex={true} />
          <Route path="form-k" element={<LeadFormPage utms={utms} />} noindex={true} />
          <Route path="form-l" element={<LeadFormPage utms={utms} />} noindex={true} />
          <Route path="form-m" element={<LeadFormPage utms={utms} />} noindex={true} />
          <Route path="form-n" element={<LeadFormPage utms={utms} />} noindex={true} />
          <Route path="form-o" element={<LeadFormPage utms={utms} />} noindex={true} />
          <Route path="form-ov" element={<LeadFormPage utms={utms} />} noindex={true} />
          <Route path="form-nuts" element={<LeadFormPage utms={utms} />} noindex={true} />
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
          <Route path="form-qeng" element={<LeadFormPage utms={utms} />} noindex={true} />
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
          <Route path="form-tg1" element={<LeadFormPage utms={utms} />} noindex={true} />
          <Route path="form-tg2" element={<LeadFormPage utms={utms} />} noindex={true} />
          <Route path="form-tg3" element={<LeadFormPage utms={utms} />} noindex={true} />
          <Route path="form-tg4" element={<LeadFormPage utms={utms} />} noindex={true} />
          <Route path="form-tg5" element={<LeadFormPage utms={utms} />} noindex={true} />
          <Route path="form-tg6" element={<LeadFormPage utms={utms} />} noindex={true} />
          <Route path="form-tg7" element={<LeadFormPage utms={utms} />} noindex={true} />
          <Route path="form-tg8" element={<LeadFormPage utms={utms} />} noindex={true} />
          <Route path="form-tg9" element={<LeadFormPage utms={utms} />} noindex={true} />
          <Route path="form-tg10" element={<LeadFormPage utms={utms} />} noindex={true} />
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
          <Route path="form-mix1" element={<LeadFormPage utms={utms} />} noindex={true} />
          <Route path="form-mix2" element={<LeadFormPage utms={utms} />} noindex={true} />
          <Route path="form-mix3" element={<LeadFormPage utms={utms} />} noindex={true} />
          <Route path="form-mix4" element={<LeadFormPage utms={utms} />} noindex={true} />
          <Route path="form-adm1" element={<LeadFormPage utms={utms} />} noindex={true} />
          <Route path="form-adm2" element={<LeadFormPage utms={utms} />} noindex={true} />
          <Route path="form-adm3" element={<LeadFormPage utms={utms} />} noindex={true} />
          <Route path="form-adm4" element={<LeadFormPage utms={utms} />} noindex={true} />
        </Routes>
      </Suspense>
    </>
  );
};
