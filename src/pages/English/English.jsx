import { EdPlatformEn } from 'components/EdPlatform/EdPlatformEn';
import { HeroEnglish } from 'components/Hero/HeroEnglish';
import { LeadForm } from 'components/LeadForm/LeadForm';
import { LeadTrialForm } from 'components/LeadForm/LeadTrialForm';
import { MotivationEn } from 'components/Motivation/MotivationEn';
import { PageFormNew } from 'components/PageFormNew/PageFormNew';
import { ReviewsNew } from 'components/Reviews/ReviewsNew';
import { useEffect, useState } from 'react';

const English = ({ utms }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenTrialModal, setIsOpenTrialModal] = useState(false);

  const toggleModal = () => {
    setIsOpenModal(isOpen => !isOpen);
    if (!document.body.style.overflowY) {
      document.body.style.overflowY = 'hidden';
    }
  };

  const toggleTrialModal = () => {
    setIsOpenTrialModal(isOpen => !isOpen);
    if (!document.body.style.overflowY) {
      document.body.style.overflowY = 'hidden';
    }
  };

  const closeModal = () => {
    setIsOpenModal(isOpen => (isOpen = false));
    !document.body.style.overflowY && isOpenModal
      ? (document.body.style.overflowY = 'hidden')
      : (document.body.style.overflowY = '');
  };

  const closeTrialModal = () => {
    setIsOpenTrialModal(isOpen => (isOpen = false));
    !document.body.style.overflowY && isOpenTrialModal
      ? (document.body.style.overflowY = 'hidden')
      : (document.body.style.overflowY = '');
  };

  useEffect(() => {
    document.title = 'AP Education | English';

    const onEscapeClose = event => {
      if (event.code === 'Escape' && isOpenModal) {
        closeModal();
      }
      if (event.code === 'Escape' && isOpenTrialModal) {
        closeTrialModal();
      }
    };

    window.addEventListener('keydown', onEscapeClose);

    return () => {
      window.removeEventListener('keydown', onEscapeClose);
    };
  });

  return (
    <>
      <HeroEnglish
        toggleModal={toggleModal}
        toggleTrialModal={toggleTrialModal}
      />
      <MotivationEn />
      <EdPlatformEn />
      <ReviewsNew />
      <PageFormNew utms={utms} />
      {isOpenModal && <LeadForm closeModal={closeModal} utms={utms} />}
      {isOpenTrialModal && (
        <LeadTrialForm closeTrialModal={closeTrialModal} utms={utms} />
      )}
    </>
  );
};

export default English;
