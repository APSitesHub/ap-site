import axios from 'axios';
import { Backdrop } from 'components/LeadForm/Backdrop/Backdrop.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import {
  BottomFormBackgroundStar,
  CloseIcon,
  FormBtn,
  FormCloseBtn,
  FormInputBox,
  FormSubTitle,
  FormTitle,
  FormTitleBox,
  HiddenInput,
  Input,
  InputNote,
  Label,
  StyledForm,
  TopFormBackgroundStar,
} from './LeadForm.styled';

axios.defaults.baseURL = 'https://aggregator-server.onrender.com';

export const LeadForm = ({ closeModal, utms }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    phone: '',
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
      .required("Будь ласка, вкажіть своє ім'я та прізвище!")
      .matches(
        /^[A-Za-zА-Яа-яіІїЇ]+(?:[-'\s][A-Za-zА-Яа-яіІїЇєЄ]+)+$/,
        "Будь ласка, введіть ім'я та прізвище, не менше двох слів, без цифр та спецсимволів!"
      )
      .min(2, 'Необхідно ввести не менше ніж 2 символи!')
      .max(50, 'Необхідно ввести не більше ніж 50 символів!'),
    phone: yup
      .string()
      .required('Будь ласка, вкажіть свій номер телефону!')
      .matches(
        /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
        'Будь ласка, введіть валідний номер телефону!'
      )
      .min(10, 'Номер телефону має складатися не менше ніж з 10 символів!')
      .max(15, 'Номер телефону має складатися не більше ніж з 15 символів!'),
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
    setIsLoading(isLoading => (isLoading = true));

    try {
      const response = await axios.post('/leads', values);
      console.log(response);
      resetForm();
      closeModal();
      navigate('/thankyou');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(isLoading => (isLoading = false));
    }
  };

  return (
    <>
      <Backdrop onClick={closeModal} />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={leadSchema}
      >
        <StyledForm>
          <FormCloseBtn onClick={closeModal}>
            <CloseIcon />
          </FormCloseBtn>
          <FormTitleBox>
            <TopFormBackgroundStar />
            <BottomFormBackgroundStar />
            <FormTitle>Бажаєте отримати консультацію?</FormTitle>
            <FormSubTitle>
              Залишіть заявку і наш менеджер вам зателефонує
            </FormSubTitle>
          </FormTitleBox>
          <FormInputBox>
            <Label>
              <Input type="text" name="name" placeholder="Ім'я та прізвище*" />
              <InputNote component="p" name="name" />
            </Label>
            <Label>
              <Input type="tel" name="phone" placeholder="Телефон*" />
              <InputNote component="p" name="phone" />
            </Label>
          </FormInputBox>
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
    </>
  );
};
