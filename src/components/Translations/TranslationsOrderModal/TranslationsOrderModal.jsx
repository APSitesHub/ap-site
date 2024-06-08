import axios from 'axios';
import { Backdrop } from 'components/LeadForm/Backdrop/Backdrop.styled';
import {
  CloseIcon,
  FormBtn,
  FormCloseBtn,
  FormTitle,
  HiddenInput,
  Input,
  InputNote,
  Label,
  StyledForm,
} from 'components/LeadForm/LeadForm.styled';
import { MarqueeCloseBtn } from 'components/Hero/HeroSwiper/HeroSwiperModal/HeroSwiperModal.styled';
import { Formik } from 'formik';
import { useState } from 'react';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import * as yup from 'yup';
import { OrderModal } from './TranslationsOrderModal.styled';

export const TranslationsOrderModal = ({ closeOrderModal, utms }) => {
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    name: '',
    phone: '',
    lang: '',
    utm_content: '',
    utm_medium: '',
    utm_campaign: '',
    utm_source: '',
    utm_term: '',
    utm_referrer: '',
    referrer: '',
    gclientid: '',
    gclid: '',
    fbclid: '',
  };

  const leadSchema = yup.object().shape({
    name: yup
      .string()
      .required("Будь ласка, вкажіть своє ім'я!")
      .matches(
        /^[A-Za-zА-Яа-яіІїЇ]+(?:[-'\s][A-Za-zА-Яа-яіІїЇ]+)*$/,
        "Ім'я не має містити цифр та спецсимволів!"
      )
      .min(2, "Ім'я має складатися не менше ніж з 2 символів!")
      .max(50, "Ім'я має складатися не більше ніж з 50 символів!"),
    phone: yup
      .string()
      .required('Будь ласка, вкажіть свій номер телефону!')
      .matches(
        /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
        'Будь ласка, введіть валідний номер телефону!'
      )
      .min(10, 'Номер телефону має складатися не менше ніж з 10 символів!')
      .max(20, 'Номер телефону має складатися не більше ніж з 20 символів!'),
    lang: yup.string().required('Будь ласка, оберіть мову зі списку!'),
    utm_content: yup.string().optional(),
    utm_medium: yup.string().optional(),
    utm_campaign: yup.string().optional(),
    utm_source: yup.string().optional(),
    utm_term: yup.string().optional(),
    utm_referrer: yup.string().optional(),
    referrer: yup.string().optional(),
    gclientid: yup.string().optional(),
    gclid: yup.string().optional(),
    fbclid: yup.string().optional(),
  });

  const handleSubmit = async (values, { resetForm }) => {
    console.log('clicked');
    values.utm_content = utms.utm_content;
    values.utm_medium = utms.utm_medium;
    values.utm_campaign = utms.utm_campaign;
    values.utm_source = utms.utm_source;
    values.utm_term = utms.utm_term;
    values.utm_referrer = utms.utm_referrer;
    values.referrer = utms.referrer;
    values.gclientid = utms.gclientid;
    values.gclid = utms.gclid;
    values.fbclid = utms.fbclid;
    console.log(values);
    setIsLoading(isLoading => (isLoading = true));

    try {
      const response = await axios.post('/tr-leads', values);
      console.log(response);
      resetForm();
      closeOrderModal();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(isLoading => (isLoading = false));
    }
  };

  return (
    <>
      <Backdrop onClick={closeOrderModal} />
      <OrderModal>
        <MarqueeCloseBtn onClick={closeOrderModal}>
          <CloseIcon />
        </MarqueeCloseBtn>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={leadSchema}
        >
          <StyledForm>
            <FormCloseBtn onClick={closeOrderModal}>
              <CloseIcon />
            </FormCloseBtn>
            <FormTitle>
              Залишіть заявку на переклад і наш менеджер вам зателефонує
            </FormTitle>
            <Label>
              <Input type="text" name="name" placeholder="Ім'я" />
              <InputNote component="p" name="name" />
            </Label>
            <Label>
              <Input type="tel" name="phone" placeholder="Телефон" />
              <InputNote component="p" name="phone" />
            </Label>
            <Label>
              <Input component="select" name="lang" placeholder="Мова">
                <option value="" disabled hidden></option>
                <option value="Англійська">Англійська</option>
                <option value="Німецька">Німецька</option>
                <option value="Польська">Польська</option>
              </Input>
              <InputNote component="p" name="lang" />
            </Label>
            <HiddenInput type="text" name="utm_content" />
            <HiddenInput type="text" name="utm_medium" />
            <HiddenInput type="text" name="utm_campaign" />
            <HiddenInput type="text" name="utm_source" />
            <HiddenInput type="text" name="utm_term" />
            <HiddenInput type="text" name="utm_referrer" />
            <HiddenInput type="text" name="referrer" />
            <HiddenInput type="text" name="gclientid" />
            <HiddenInput type="text" name="gclid" />
            <HiddenInput type="text" name="fbclid" />
            <FormBtn type="submit">Надіслати</FormBtn>
            {isLoading && <Loader />}
          </StyledForm>
        </Formik>
      </OrderModal>
    </>
  );
};
