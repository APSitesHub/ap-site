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

export const PreschoolEdKahootForm = ({ destination }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const initialLinksValues = {
    preschool_1: '',
    preschool_2: '',
    preschool_3: '',
    preschool_4: '',
    preschool_5: '',
    preschool_6: '',
    preschool_7: '',
    preschool_8: '',
    preschool_9: '',
    preschool_10: '',
    replace: true,
  };

  const linksSchema = yup.object().shape({
    preschool_1: yup.string().optional(),
    preschool_2: yup.string().optional(),
    preschool_3: yup.string().optional(),
    preschool_4: yup.string().optional(),
    preschool_5: yup.string().optional(),
    preschool_6: yup.string().optional(),
    preschool_7: yup.string().optional(),
    preschool_8: yup.string().optional(),
    preschool_9: yup.string().optional(),
    preschool_10: yup.string().optional(),
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
      const preschoollinks = { preschool: { links: {} } };
      for (const [key, value] of Object.entries(values)) {
        if (value && key !== 'replace') {
          preschoollinks.preschool.links[key] = value;
        } else {
          preschoollinks.preschool.replace = value;
        }
      }
      try {
        const response = await axios.patch(destination, preschoollinks);
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
        <FormTitle>Preschool</FormTitle>
        <Formik
          initialValues={initialLinksValues}
          onSubmit={handleLinksSubmit}
          validationSchema={linksSchema}
        >
          <LinksForm>
            <Label>
              <AdminInput
                type="text"
                name="preschool_1"
                autoComplete="off"
                placeholder="Перший кахут для дошкільної освіти"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="preschool_2"
                autoComplete="off"
                placeholder="Другий кахут для дошкільної освіти"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="preschool_3"
                autoComplete="off"
                placeholder="Третій кахут для дошкільної освіти"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="preschool_4"
                autoComplete="off"
                placeholder="Четвертий кахут для дошкільної освіти"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="preschool_5"
                autoComplete="off"
                placeholder="П'ятий кахут для дошкільної освіти"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="preschool_6"
                autoComplete="off"
                placeholder="Шостий кахут для дошкільної освіти"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="preschool_7"
                autoComplete="off"
                placeholder="Сьомий кахут для дошкільної освіти"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="preschool_8"
                autoComplete="off"
                placeholder="Восьмий кахут для дошкільної освіти"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="preschool_9"
                autoComplete="off"
                placeholder="Дев'ятий кахут для дошкільної освіти"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="preschool_10"
                autoComplete="off"
                placeholder="Десятий кахут для дошкільної освіти"
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
