import { PlatformBoxVerticalPDF } from './Platform.styled';

export const PlatformVerticalPDF = ({ isPDFOpen, isOpenedLast }) => {
  const supportBoxStylesHandler = () => {
    return {
      zIndex: isOpenedLast === 'pdf' ? '4' : '1',
    };
  };

  return (
    <>
      <PlatformBoxVerticalPDF
        className={isPDFOpen ? 'shown' : 'hidden'}
        style={{ ...supportBoxStylesHandler() }}
      >
        <iframe
          src="/vinners.pdf"
          title="PDF Viewer"
          width="100%"
          height="100%"
          style={{
            border: 'none',
            borderRadius: '20px',
            background: 'white'
          }}
          allow="fullscreen"
        />
        {/* Fallback для випадку, коли PDF не завантажується */}
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '5px',
          fontSize: '12px'
        }}>
          <a
            href="/vinners.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'white', textDecoration: 'none' }}
          >
            📄 Відкрити в новій вкладці
          </a>
        </div>
      </PlatformBoxVerticalPDF>
    </>
  );
};
