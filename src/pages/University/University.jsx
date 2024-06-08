import { Consent } from 'components/Consent/Consent';
import { ExperienceUniversity } from 'components/Experience/ExperienceUniversity';
import { HeroUniversity } from 'components/Hero/HeroUniversity';
import { WhyWeUniversity } from 'components/HowItWorks/WhyWeUniversity';
import { LeadForm } from 'components/LeadForm/LeadForm';
import { LeadTrialForm } from 'components/LeadForm/LeadTrialForm';
import { MotivationUniversity } from 'components/Motivation/MotivationUniversity';
import { PageFormUniversity } from 'components/PageFormNew/PageFormUniversity';
import { ReviewsNew } from 'components/Reviews/ReviewsNew';
import { useEffect, useState } from 'react';

const University = ({ utms }) => {
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
    document.title = 'AP University';

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
      <HeroUniversity
        toggleModal={toggleModal}
        toggleTrialModal={toggleTrialModal}
      />
      <WhyWeUniversity />
      <MotivationUniversity />
      <ExperienceUniversity />

      <ReviewsNew />
      <PageFormUniversity utms={utms} />
      <Consent />
      {isOpenModal && <LeadForm closeModal={closeModal} utms={utms} />}
      {isOpenTrialModal && (
        <LeadTrialForm closeTrialModal={closeTrialModal} utms={utms} />
      )}
    </>
  );
};

export default University;
