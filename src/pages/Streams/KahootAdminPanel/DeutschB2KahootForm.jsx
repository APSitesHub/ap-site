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

export const DeutschB2KahootForm = ({ destination }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const initialLinksValues = {
    deutschb2_1: '',
    deutschb2_2: '',
    deutschb2_3: '',
    deutschb2_4: '',
    deutschb2_5: '',
    replace: true,
  };

  const linksSchema = yup.object().shape({
    deutschb2_1: yup.string().optional(),
    deutschb2_2: yup.string().optional(),
    deutschb2_3: yup.string().optional(),
    deutschb2_4: yup.string().optional(),
    deutschb2_5: yup.string().optional(),
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
              Краще не відправляти пусту форму, бо так затруться ВСІ лінки. Якщо
              так і треба, клацай "Затерти все" і відправ форму знов.
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
              <WarningBtn
                className="cancel"
                onClick={() => toast.dismiss(t.id)}
              >
                Додати лінки
              </WarningBtn>
            </WarningBtnBox>
          </WarningBox>
        ),
        { duration: Infinity }
      );

    if (!emptyValues || confirmation) {
      const deutschb2links = { deutschb2: { links: {} } };
      for (const [key, value] of Object.entries(values)) {
        if (value && key !== 'replace') {
          deutschb2links.deutschb2.links[key] = value;
        } else {
          deutschb2links.deutschb2.replace = value;
        }
      }
      try {
        const response = await axios.patch(destination, deutschb2links);
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
        <FormTitle>Deutsch B2</FormTitle>
        <Formik
          initialValues={initialLinksValues}
          onSubmit={handleLinksSubmit}
          validationSchema={linksSchema}
        >
          <LinksForm>
            <Label>
              <AdminInput
                type="text"
                name="deutschb2_1"
                autoComplete="off"
                placeholder="Перший кахут для B2 з німецької"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="deutschb2_2"
                autoComplete="off"
                placeholder="Другий кахут для B2 з німецької"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="deutschb2_3"
                autoComplete="off"
                placeholder="Третій кахут для B2 з німецької"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="deutschb2_4"
                autoComplete="off"
                placeholder="Четвертий кахут для B2 з німецької"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="deutschb2_5"
                autoComplete="off"
                placeholder="П'ятий кахут для B2 з німецької"
              />
            </Label>
            <LabelCheckBox>
              <AdminCheckbox type="checkbox" name="replace" />
              Якщо не зняти галочку, всі лінки перезапишуться повністю. <br />{' '}
              Якщо її зняти, можна виправити конкретний лінк, не зачіпаючи інші.
              Наприклад, якщо треба виправити тільки один Кахут, наприклад, №3 -
              внось його лінк у відповідне поле (третє) і знімай галочку.
            </LabelCheckBox>
            <AdminFormBtn type="submit">Замінити лінки</AdminFormBtn>
          </LinksForm>
        </Formik>
        {isLoading && <Loader />}
      </AdminPanelSection>
    </>
  );
};
