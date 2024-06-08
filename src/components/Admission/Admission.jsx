import { Description, DescriptionMoreText, DescriptionTrigger, DescriptionUnderlineLong, DescriptionUnderlineShort } from 'components/Hero/Hero.styled';
import {
  AdmissionDescription,
  AdmissionSection,
  AdmissionSubTitle,
  AdmissionTitle,
  AdmissionWrapper,
  AdmissionBackground,
} from './Admission.styled';
import { AdmissionMarquee } from './AdmissionMarquee/AdmissionMarquee';
// eslint-disable-next-line
import { ScrollableMenu } from './AdmissionMarquee/AdmissionScrollingMenu';
import { useState } from 'react';

export const Admission = () => {
  const [isMore, setIsMore] = useState(false);

  const showMore = () => {
    setIsMore(isMore => !isMore);
  };

  return (
    <AdmissionBackground>
      <AdmissionSection id="admissions">
        <AdmissionWrapper>
          <AdmissionTitle>
            БЮРО <AdmissionSubTitle>ОСВІТИ</AdmissionSubTitle> ТА <AdmissionSubTitle>КАР'ЄРИ</AdmissionSubTitle>
          </AdmissionTitle>
          <AdmissionDescription>
          <Description>
          <span>
            «AP Education Center» є провідним центром навчання іноземних мов та
            підготовки до міжнародних іспитів{isMore ? '' : '...'}
          </span>
          <DescriptionMoreText
            className={isMore ? 'more-shown' : 'more-hidden'}
          >
            {' '}
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Exercitationem veritatis temporibus magni? A amet eius atque
            provident quod explicabo asperiores pariatur modi corporis quibusdam
            accusamus magni exercitationem vero, similique commodi nulla beatae
            deleniti, esse, maxime ea eum natus temporibus? Exercitationem unde
            laborum reiciendis explicabo molestias dignissimos temporibus quod
            perferendis voluptate vitae debitis suscipit odio ipsam eligendi
            iusto dicta autem quos excepturi, aspernatur voluptatibus eveniet ab
            a. Odit provident nisi nesciunt culpa. Tempora esse voluptatem
            dolore, porro aspernatur nostrum non fuga laudantium praesentium
            consectetur quisquam maiores ducimus officia at eum ratione
            necessitatibus dicta distinctio harum corrupti repudiandae id est
            temporibus laboriosam? Sint architecto obcaecati nam quae
            voluptatibus aut totam dolore at, deserunt dolor perspiciatis optio
            quia, similique sapiente ab ducimus? Sint non, totam reiciendis
            consequuntur nostrum voluptatibus cumque unde soluta. Quasi ad a
            mollitia sequi. Voluptates porro voluptatibus itaque cumque quaerat
            laudantium tempore, qui voluptatum alias ipsum quisquam sed
            quibusdam officiis.
          </DescriptionMoreText>
        </Description>
        <DescriptionTrigger onClick={showMore}>
          {isMore ? 'Згорнути' : 'Дізнатись більше'}
          {isMore ? (
            <DescriptionUnderlineShort />
          ) : (
            <DescriptionUnderlineLong />
          )}
        </DescriptionTrigger>
            Вступ в коледжі, університети України та інші країни Європи
          </AdmissionDescription>
        </AdmissionWrapper>
        <AdmissionMarquee />
        {/* <ScrollableMenu/> */}
      </AdmissionSection>
    </AdmissionBackground>
  );
};
