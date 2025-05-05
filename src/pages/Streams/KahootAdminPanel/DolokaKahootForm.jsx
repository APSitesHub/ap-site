import axios from 'axios';
import { Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { DismissIcon } from 'components/Stream/Kahoots/Kahoots.styled';
import { Formik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import {
  AdminCheckbox,
  AdminFormBtn,
  AdminInput,
  AdminPanelSection,
  FormTitle,
  LabelCheckBox,
  LinksForm,
  WarningBox,
  WarningBtn,
  WarningBtnBox,
  WarningDismissBtn,
  WarningText,
} from './KahootAdminPanel.styled';

export const DolokaKahootForm = ({ destination }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  console.log(destination);

  const initialLinksValues = {
    doloka_1: '',
    doloka_2: '',
    doloka_3: '',
    doloka_4: '',
    doloka_5: '',
    replace: true,
  };

  const linksSchema = yup.object().shape({
    doloka_1: yup.string().optional(),
    doloka_2: yup.string().optional(),
    doloka_3: yup.string().optional(),
    doloka_4: yup.string().optional(),
    doloka_5: yup.string().optional(),
    replace: yup.bool().required(),
  });

  const handleLinksSubmit = async (values, { resetForm }) => {
    setIsLoading(isLoading => (isLoading = true));
    const emptyValues = Object.values(values)
      .filter(value => typeof value === 'string')
      .every(value => !value === true);

    !confirmation &&
      emptyValues &&
      toast(
        t => (
          <WarningBox>
            <WarningDismissBtn onClick={() => toast.dismiss(t.id)}>
              <DismissIcon />
            </WarningDismissBtn>
            <WarningText>
              Краще не відправляти пусту форму, бо так затруться ВСІ лінки. Якщо так і
              треба, клацай "Затерти все" і відправ форму знов.
            </WarningText>
            <WarningBtnBox>
              <WarningBtn
                className="delete"
                onClick={() => {
                  setConfirmation(confirmation => (confirmation = true));
                  toast.dismiss(t.id);
                }}
              >
                Затерти все
              </WarningBtn>
              <WarningBtn className="cancel" onClick={() => toast.dismiss(t.id)}>
                Додати лінки
              </WarningBtn>
            </WarningBtnBox>
          </WarningBox>
        ),
        { duration: Infinity }
      );

    if (!emptyValues || confirmation) {
      const dolokalinks = { doloka: { links: {} } };
      for (const [key, value] of Object.entries(values)) {
        if (value && key !== 'replace') {
          dolokalinks.doloka.links[key] = value;
        } else {
          dolokalinks.doloka.replace = value;
        }
      }
      try {
        const response = await axios.patch(destination, dolokalinks);
        console.log(response);
        resetForm();
        alert('Лінки замінилися, молодець');
      } catch (error) {
        console.error(error);
        alert('Щось не прокнуло');
      } finally {
        setIsLoading(isLoading => (isLoading = false));
        setConfirmation(confirmation => (confirmation = false));
      }
    }
    setIsLoading(isLoading => (isLoading = false));
    return;
  };

  return (
    <>
      <AdminPanelSection>
        <FormTitle>Долока</FormTitle>
        <Formik
          initialValues={initialLinksValues}
          onSubmit={handleLinksSubmit}
          validationSchema={linksSchema}
        >
          <LinksForm>
            <Label>
              <AdminInput
                type="text"
                name="doloka_1"
                autoComplete="off"
                placeholder="Долока Ольга, індивідуальні пробні, кахут 1"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="doloka_2"
                autoComplete="off"
                placeholder="Долока Ольга, індивідуальні пробні, кахут 2"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="doloka_3"
                autoComplete="off"
                placeholder="Долока Ольга, індивідуальні пробні, кахут 3"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="doloka_4"
                autoComplete="off"
                placeholder="Долока Ольга, індивідуальні пробні, кахут 4"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="doloka_5"
                autoComplete="off"
                placeholder="Долока Ольга, індивідуальні пробні, кахут 5"
              />
            </Label>
            <LabelCheckBox>
              <AdminCheckbox type="checkbox" name="replace" />
              Якщо не зняти галочку, всі лінки перезапишуться повністю. <br /> Якщо її
              зняти, можна виправити конкретний лінк, не зачіпаючи інші. Наприклад, якщо
              треба виправити тільки один Кахут, наприклад, №3 - внось його лінк у
              відповідне поле (третє) і знімай галочку.
            </LabelCheckBox>
            <AdminFormBtn type="submit">Замінити лінки</AdminFormBtn>
          </LinksForm>
        </Formik>
        {isLoading && <Loader />}
      </AdminPanelSection>
    </>
  );
};
