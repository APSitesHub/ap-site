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

export const PolskiFreeKahootForm = ({ destination }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const initialLinksValues = {
    polskifree_1: '',
    polskifree_2: '',
    polskifree_3: '',
    polskifree_4: '',
    polskifree_5: '',
    replace: true,
  };

  const linksSchema = yup.object().shape({
    polskifree_1: yup.string().optional(),
    polskifree_2: yup.string().optional(),
    polskifree_3: yup.string().optional(),
    polskifree_4: yup.string().optional(),
    polskifree_5: yup.string().optional(),
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
      const polskifreelinks = { polskifree: { links: {} } };
      for (const [key, value] of Object.entries(values)) {
        if (value && key !== 'replace') {
          polskifreelinks.polskifree.links[key] = value;
        } else {
          polskifreelinks.polskifree.replace = value;
        }
      }
      try {
        const response = await axios.patch(destination, polskifreelinks);
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
      <FormTitle>Polski A1 Free</FormTitle>
        <Formik
          initialValues={initialLinksValues}
          onSubmit={handleLinksSubmit}
          validationSchema={linksSchema}
        >
          <LinksForm>
            <Label>
              <AdminInput
                type="text"
                name="polskifree_1"
                autoComplete="off"
                placeholder="Перший кахут для безкоштовного марафону рівня A1 з польської"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="polskifree_2"
                autoComplete="off"
                placeholder="Другий кахут для безкоштовного марафону рівня A1 з польської"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="polskifree_3"
                autoComplete="off"
                placeholder="Третій кахут для безкоштовного марафону рівня A1 з польської"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="polskifree_4"
                autoComplete="off"
                placeholder="Четвертий кахут для безкоштовного марафону рівня A1 з польської"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="polskifree_5"
                autoComplete="off"
                placeholder="П'ятий кахут для безкоштовного марафону рівня A1 з польської"
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
