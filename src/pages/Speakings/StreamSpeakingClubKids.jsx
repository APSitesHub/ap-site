import axios from 'axios';
import { StreamsBackgroundWrapper } from 'components/BackgroundWrapper/BackgroundWrappers';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { LoaderWrapper } from 'components/SharedLayout/Loaders/Loader.styled';
import { useEffect, useLayoutEffect, useState } from 'react';
import {
  StreamPlaceHolder,
  StreamPlaceHolderText,
  StreamRefreshPageLink,
  StreamRefreshQuestion,
  StreamRefreshText,
  StreamSection,
} from '../../components/Stream/Stream.styled';
import { useLocation } from 'react-router-dom';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

const StreamSpeakingClubKids = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [redirectLink, setRedirectLink] = useState('');
  const [user, setUser] = useState({});
  const [course, setCourse] = useState('');
  const [level, setLevel] = useState('');
  const [isApproved, setIsApproved] = useState(false);
  const location = useLocation().pathname;

  const page = location.includes('preschool')
    ? location.replace('/streams-kids/', '').slice(0, -2)
    : location.includes('pre') ||
      location.includes('beg') ||
      location.includes('mid') ||
      location.includes('high')
    ? 'kids' + location.replace('/streams-kids/', '').replace('sc', '')
    : location.replace('/streams-kids/', '').replace('sc', '') + 'kids';
  const link = page.includes('b1beginnerkids')
    ? 'b1kidsbeginner'
    : page.includes('b2beginnerkids')
    ? 'b2kidsbeginner'
    : page;

  console.log(41, page, course, level);

  useLayoutEffect(() => {
    const getLinksRequest = async () => {
      try {
        setIsLoading(isLoading => (isLoading = true));
        setRedirectLink((await axios.get('/speakings')).data[link]);
        const currentUser = await axios.post('/users/refresh', {
          mail: localStorage.getItem('mail'),
        });
        console.log(51, currentUser.data.user);
        setUser(
          user =>
            (user = {
              userId: currentUser.data.user.id,
              name: currentUser.data.user.name,
              mail: currentUser.data.user.mail,
              zoomMail: currentUser.data.user.zoomMail,
              age: currentUser.data.user.age,
              lang: currentUser.data.user.lang,
              course: currentUser.data.user.course,
              crmId: currentUser.data.user.crmId,
              contactId: currentUser.data.user.contactId,
              successRate: currentUser.data.user.successRate,
              temperament: currentUser.data.user.temperament,
              visited: currentUser.data.user.visited,
              visitedTime: currentUser.data.user.visitedTime,
              feedback: currentUser.data.user.feedback,
            })
        );
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(isLoading => (isLoading = false));
      }
    };
    getLinksRequest();
  }, [link]);

  const getLanguageFromLocation = location => {
    if (location.includes('de') || location.includes('deutsch')) {
      return 'dekids';
    } else if (location.includes('pl') || location.includes('polski')) {
      return 'plkids';
    } else {
      return 'enkids';
    }
  };
  const lang = getLanguageFromLocation(location);

  useEffect(() => {
    document.title = `Практичне заняття | AP Education`;
    const sendUserInfo = async () => {
      try {
        setCourse(
          page.includes('high')
            ? (await axios.get('/timetable')).data.filter(
                timetable => timetable.course.includes('high') && lang === timetable.lang
              )[0].course
            : (await axios.get('/timetable')).data.filter(
                timetable =>
                  page.includes(timetable.level) &&
                  lang === timetable.lang &&
                  !timetable.course.includes('high')
              )[0].course
        );

        setLevel(
          user.course === '10' || user.course === '11'
            ? 'c1'
            : (await axios.get('/timetable')).data.filter(
                timetable =>
                  lang === timetable.lang &&
                  (user.course === timetable.course ||
                    user.course
                      ?.split('/')
                      .some(singleCourse => singleCourse === timetable.course))
              )[0].level
        );

        console.log(user.userId);
        const existingUser = await axios.get(`/speakingusers/${user.userId}`);
        console.log('existingUser', existingUser);
        console.log(103, user);

        const res = !existingUser.data
          ? await axios.post('/speakingusers/new', user)
          : await axios.put(`/speakingusers/${user.userId}`, user);

        res.data._id && setIsApproved(true);
      } catch (error) {
        console.log(error);
      }
    };

    sendUserInfo();
  }, [user, page, lang]);

  return (
    <>
      <StreamSection>
        <StreamsBackgroundWrapper>
          {isLoading && (
            <LoaderWrapper>
              <Loader />
            </LoaderWrapper>
          )}
          {(redirectLink === undefined || redirectLink[0] < 10) && !isLoading && (
            <StreamPlaceHolder>
              <StreamPlaceHolderText>
                Привіт! <br />
                Наразі урок на цій сторінці не проводиться! Перевірте, чи ви перейшли за
                правильним посиланням або спробуйте пізніше.
              </StreamPlaceHolderText>
            </StreamPlaceHolder>
          )}
          {((course === user.course ||
            user.course?.split('/').some(singleCourse => singleCourse === course)) &&
            (lang === user.lang ||
              user.lang?.split('/').some(singleLang => singleLang === lang))) ||
          user.name === 'Dev Acc' ||
          user.course === '10' ||
          user.course?.split('/').some(singleCourse => singleCourse === '10') ||
          user.course === '11' ||
          user.course?.split('/').some(singleCourse => singleCourse === '11') ||
          user.name === 'Тічер' ? (
            <StreamPlaceHolder>
              <StreamPlaceHolderText>
                Привіт! <br />
                Будь ласка, зачекайте, незабаром вас переадресує на практичне заняття в
                Zoom
              </StreamPlaceHolderText>
              <StreamRefreshText>
                <StreamRefreshQuestion>Очікуєте занадто довго?</StreamRefreshQuestion>
                <StreamRefreshPageLink onClick={() => window.location.reload()}>
                  Натисніть сюди, щоб оновити сторінку
                </StreamRefreshPageLink>
              </StreamRefreshText>
            </StreamPlaceHolder>
          ) : (
            <StreamPlaceHolder>
              <StreamPlaceHolderText>
                Хммм... <br />
                Здається, ви намагаєтесь під'єднатися до практичного заняття не свого
                рівня!
              </StreamPlaceHolderText>
              <StreamRefreshText>
                <StreamRefreshQuestion>
                  Впевнені, що не помилились? <br /> Зв'яжіться з вашим менеджером або
                </StreamRefreshQuestion>
                <StreamRefreshPageLink
                  onClick={() =>
                    window.location.replace(
                      'https://www.academy.ap.education/streams-kids/' +
                        (lang !== 'enkids' ? lang.replace('kids', '') : '') +
                        (user.course.includes('high') ? 'high' : level) +
                        'sc'
                    )
                  }
                >
                  може, це ваше практичне заняття?
                </StreamRefreshPageLink>
              </StreamRefreshText>
            </StreamPlaceHolder>
          )}
          {(((course === user.course ||
            user.course?.split('/').some(singleCourse => singleCourse === course)) &&
            redirectLink &&
            redirectLink !== undefined &&
            redirectLink !== '1' &&
            isApproved) ||
            (user.name === 'Dev Acc' && isApproved) ||
            ((user.course === '10' ||
              user.course?.split('/').some(singleCourse => singleCourse === '10')) &&
              isApproved) ||
            ((user.course === '11' ||
              user.course?.split('/').some(singleCourse => singleCourse === '11')) &&
              isApproved) ||
            (user.name === 'Тічер' && isApproved)) &&
            redirectLink !== '1' &&
            window.location.replace(redirectLink)}
        </StreamsBackgroundWrapper>
      </StreamSection>
    </>
  );
};

export default StreamSpeakingClubKids;
