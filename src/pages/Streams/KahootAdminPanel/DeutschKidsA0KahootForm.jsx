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

export const DeutschKidsA0KahootForm = ({ destination }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const initialLinksValues = {
    dea0kids_1: '',
    dea0kids_2: '',
    dea0kids_3: '',
    dea0kids_4: '',
    dea0kids_5: '',
    dea0kids_6: '',
    dea0kids_7: '',
    dea0kids_8: '',
    dea0kids_9: '',
    dea0kids_10: '',
    replace: true,
  };

  const linksSchema = yup.object().shape({
    dea0kids_1: yup.string().optional(),
    dea0kids_2: yup.string().optional(),
    dea0kids_3: yup.string().optional(),
    dea0kids_4: yup.string().optional(),
    dea0kids_5: yup.string().optional(),
    dea0kids_6: yup.string().optional(),
    dea0kids_7: yup.string().optional(),
    dea0kids_8: yup.string().optional(),
    dea0kids_9: yup.string().optional(),
    dea0kids_10: yup.string().optional(),
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
      const dea0kidslinks = { dea0kids: { links: {} } };
      for (const [key, value] of Object.entries(values)) {
        if (value && key !== 'replace') {
          dea0kidslinks.dea0kids.links[key] = value;
        } else {
          dea0kidslinks.dea0kids.replace = value;
        }
      }
      try {
        const response = await axios.patch(destination, dea0kidslinks);
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
        <FormTitle>De Kids A0</FormTitle>
        <Formik
          initialValues={initialLinksValues}
          onSubmit={handleLinksSubmit}
          validationSchema={linksSchema}
        >
          <LinksForm>
            <Label>
              <AdminInput
                type="text"
                name="dea0kids_1"
                autoComplete="off"
                placeholder="Перший кахут для дітей німецької рівня А0"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="dea0kids_2"
                autoComplete="off"
                placeholder="Другий кахут для дітей німецької рівня А0"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="dea0kids_3"
                autoComplete="off"
                placeholder="Третій кахут для дітей німецької рівня А0"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="dea0kids_4"
                autoComplete="off"
                placeholder="Четвертий кахут для дітей німецької рівня А0"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="dea0kids_5"
                autoComplete="off"
                placeholder="П'ятий кахут для дітей німецької рівня А0"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="dea0kids_6"
                autoComplete="off"
                placeholder="Шостий кахут для дітей німецької рівня А0"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="dea0kids_7"
                autoComplete="off"
                placeholder="Сьомий кахут для дітей німецької рівня А0"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="dea0kids_8"
                autoComplete="off"
                placeholder="Восьмий кахут для дітей німецької рівня А0"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="dea0kids_9"
                autoComplete="off"
                placeholder="Дев'ятий кахут для дітей німецької рівня А0"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="dea0kids_10"
                autoComplete="off"
                placeholder="Десятий кахут для дітей німецької рівня А0"
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
