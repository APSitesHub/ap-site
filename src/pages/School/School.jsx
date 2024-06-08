import { ExperienceSchool } from 'components/Experience/ExperienceSchool';
import { HeroSchool } from 'components/Hero/HeroSchool';
import { WhyWeSchool } from 'components/HowItWorks/WhyWeSchool';
import { LeadForm } from 'components/LeadForm/LeadForm';
import { LeadTrialForm } from 'components/LeadForm/LeadTrialForm';
import { MotivationSchool } from 'components/Motivation/MotivationSchool';
import { PageFormSchool } from 'components/PageFormNew/PageFormSchool';
import { ReviewsNew } from 'components/Reviews/ReviewsNew';
import { useEffect, useState } from 'react';

const School = ({ utms }) => {
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
    document.title = 'AP School';

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
      <HeroSchool
        toggleModal={toggleModal}
        toggleTrialModal={toggleTrialModal}
      />
      <WhyWeSchool />
      <MotivationSchool />
      <ExperienceSchool />

      <ReviewsNew />
      <PageFormSchool utms={utms} />
      {isOpenModal && <LeadForm closeModal={closeModal} utms={utms} />}
      {isOpenTrialModal && (
        <LeadTrialForm closeTrialModal={closeTrialModal} utms={utms} />
      )}
    </>
  );
};

export default School;
