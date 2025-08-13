import { PDFBox } from './Partners.styled';

export const Partners = ({ isPDFOpen, isOpenedLast, sectionWidth }) => {
  const supportBoxStylesHandler = () => {
    return {
      zIndex: isOpenedLast === 'pdf' ? '4' : '1',
      width: (sectionWidth / 10) * 4,
    };
  };

  return (
    <>
      <PDFBox
        className={isPDFOpen ? 'shown' : 'hidden'}
        style={{ ...supportBoxStylesHandler() }}
      >
        <iframe
          id="pdf-window"
          title="pdf-pin"
          src="https://drive.google.com/file/d/1jnojSMUm6uzg1-HWpkrMJlLzyRLFli64/preview"
          width="58.83%"
          height="58.83%"
          allow="autoplay"
        ></iframe>
      </PDFBox>
    </>
  );
};
