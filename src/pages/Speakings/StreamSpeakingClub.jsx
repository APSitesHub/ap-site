import axios from 'axios';
import { StreamsBackgroundWrapper } from 'components/BackgroundWrapper/BackgroundWrappers';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { LoaderWrapper } from 'components/SharedLayout/Loaders/Loader.styled';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  StreamPlaceHolder,
  StreamPlaceHolderText,
  StreamRefreshPageLink,
  StreamRefreshQuestion,
  StreamRefreshText,
  StreamSection,
} from '../../components/Stream/Stream.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

const StreamSpeakingClub = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [redirectLink, setRedirectLink] = useState('');
  const [user, setUser] = useState({});
  const [course, setCourse] = useState('');
  const [level, setLevel] = useState('');
  const [isApproved, setIsApproved] = useState(false);
  const location = useLocation().pathname;

  const page = location.replace('/streams/', '').replace('sc', '');
  const link = page.includes('dea1')
    ? page.replace('dea1', 'deutsch')
    : page.includes('de')
    ? page.replace('de', 'deutsch')
    : page.includes('pla1')
    ? page.replace('pla1', 'polski')
    : page.includes('pl')
    ? page.replace('pl', 'polski')
    : page;

  useLayoutEffect(() => {
    const getLinksRequest = async () => {
      try {
        setIsLoading(isLoading => (isLoading = true));
        setRedirectLink((await axios.get('/speakings')).data[link]);
        const currentUser = await axios.post('/users/refresh', {
          mail: localStorage.getItem('mail'),
        });
        console.log(41, currentUser.data.user);
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
      return 'de';
    } else if (location.includes('pl') || location.includes('polski')) {
      return 'pl';
    } else {
      return 'en';
    }
  };
  const lang = getLanguageFromLocation(location);

  useEffect(() => {
    document.title = `Практичне заняття | AP Education`;

    const sendUserInfo = async () => {
      try {
        setCourse(
          (await axios.get('/timetable')).data.filter(
            timetable =>
              page.includes(timetable.level) && lang === timetable.lang
          )[0].course
        );
        setLevel(
          (await axios.get('/timetable')).data.filter(
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
          {course === user.course ||
          user.course
            ?.split('/')
            .some(singleCourse => singleCourse === course) ? (
            <StreamPlaceHolder>
              <StreamPlaceHolderText>
                Привіт! <br />
                Будь ласка, зачекайте, незабаром вас переадресує на практичне
                заняття в Zoom
              </StreamPlaceHolderText>
              <StreamRefreshText>
                <StreamRefreshQuestion>
                  Очікуєте занадто довго?
                </StreamRefreshQuestion>
                <StreamRefreshPageLink onClick={() => window.location.reload()}>
                  Натисніть сюди, щоб оновити сторінку
                </StreamRefreshPageLink>
              </StreamRefreshText>
            </StreamPlaceHolder>
          ) : (
            <StreamPlaceHolder>
              <StreamPlaceHolderText>
                Хммм... <br />
                Здається, ви намагаєтесь під'єднатися до практичного заняття не
                свого рівня!
              </StreamPlaceHolderText>
              <StreamRefreshText>
                <StreamRefreshQuestion>
                  Впевнені, що не помилились? <br /> Зв'яжіться з вашим
                  менеджером або
                </StreamRefreshQuestion>
                <StreamRefreshPageLink
                  onClick={() =>
                    window.location.replace(
                      'https://www.academy.ap.education/streams/' +
                        (lang !== 'en' ? lang : '') +
                        level +
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
            user.course
              ?.split('/')
              .some(singleCourse => singleCourse === course)) &&
            redirectLink &&
            isApproved) ||
            (user.name === 'Dev Acc' && isApproved) ||
            (user.name === 'Тічер' && isApproved)) &&
            window.location.replace(redirectLink)}
        </StreamsBackgroundWrapper>
      </StreamSection>
    </>
  );
};

export default StreamSpeakingClub;
