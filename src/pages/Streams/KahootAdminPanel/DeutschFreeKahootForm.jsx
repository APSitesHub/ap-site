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

export const DeutschFreeKahootForm = ({ destination }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const initialLinksValues = {
    deutschfree_1: '',
    deutschfree_2: '',
    deutschfree_3: '',
    deutschfree_4: '',
    deutschfree_5: '',
    deutschfree_6: '',
    replace: true,
  };

  const linksSchema = yup.object().shape({
    deutschfree_1: yup.string().optional(),
    deutschfree_2: yup.string().optional(),
    deutschfree_3: yup.string().optional(),
    deutschfree_4: yup.string().optional(),
    deutschfree_5: yup.string().optional(),
    deutschfree_6: yup.string().optional(),
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
      const deutschfreelinks = { deutschfree: { links: {} } };
      for (const [key, value] of Object.entries(values)) {
        if (value && key !== 'replace') {
          deutschfreelinks.deutschfree.links[key] = value;
        } else {
          deutschfreelinks.deutschfree.replace = value;
        }
      }
      try {
        const response = await axios.patch(destination, deutschfreelinks);
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
      <FormTitle>Deutsch A1 Free</FormTitle>
        <Formik
          initialValues={initialLinksValues}
          onSubmit={handleLinksSubmit}
          validationSchema={linksSchema}
        >
          <LinksForm>
            <Label>
              <AdminInput
                type="text"
                name="deutschfree_1"
                autoComplete="off"
                placeholder="Перший кахут для безкоштовного марафону рівня A1 з німецької"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="deutschfree_2"
                autoComplete="off"
                placeholder="Другий кахут для безкоштовного марафону рівня A1 з німецької"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="deutschfree_3"
                autoComplete="off"
                placeholder="Третій кахут для безкоштовного марафону рівня A1 з німецької"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="deutschfree_4"
                autoComplete="off"
                placeholder="Четвертий кахут для безкоштовного марафону рівня A1 з німецької"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="deutschfree_5"
                autoComplete="off"
                placeholder="П'ятий кахут для безкоштовного марафону рівня A1 з німецької"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="deutschfree_6"
                autoComplete="off"
                placeholder="Шостий кахут для безкоштовного марафону рівня A1 з німецької"
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
