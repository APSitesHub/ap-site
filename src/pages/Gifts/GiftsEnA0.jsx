import {
  ExternalLinkIcon,
  LessonTopBox,
  LessonValuePdfLink,
  LessonVideoBox,
  PdfBox,
  PdfWrapper,
} from 'pages/MyAP/LessonFinder/LessonFinder.styled';
import { Title } from 'pages/Quiz/Quiz.styled';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
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
  QuizletShortLogo,
  SubTitle,
  YouTubeLogo,
} from './Gifts.styled';
import { gifts } from './giftsSet';

const GiftsEnA0 = () => {
  const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState(false);
  const [openedPdf, setOpenedPdf] = useState('');

  useEffect(() => {
    document.title = 'Подарункові матеріали, English A0 | AP Education';
  }, []);

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
      <Logo />
      <Title>Подарункові матеріали</Title>
      <SubTitle>
        Розпочніть своє навчання вже зараз з безкоштовними подарунковими
        матеріалами!
      </SubTitle>
      <GiftsBox>
        {gifts.en.a0.map((gift, i) => (
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
                    <QuizletShortLogo />
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
    </>
  );
};

export default GiftsEnA0;
