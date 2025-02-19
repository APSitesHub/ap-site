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

export const WSEPrepKahootForm = ({ destination }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const initialLinksValues = {
    wse_prep_1: '',
    wse_prep_2: '',
    wse_prep_3: '',
    wse_prep_4: '',
    wse_prep_5: '',
    replace: true,
  };

  const linksSchema = yup.object().shape({
    wse_prep_1: yup.string().optional(),
    wse_prep_2: yup.string().optional(),
    wse_prep_3: yup.string().optional(),
    wse_prep_4: yup.string().optional(),
    wse_prep_5: yup.string().optional(),
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
              Краще не відправляти пусту форму, бо так затруться ВСІ лінки. Якщо так і треба, клацай "Затерти все" і відправ форму знов.
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
      const wse_preplinks = { wse_prep: { links: {} } };
      for (const [key, value] of Object.entries(values)) {
        if (value && key !== 'replace') {
          wse_preplinks.wse_prep.links[key] = value;
        } else {
          wse_preplinks.wse_prep.replace = value;
        }
      }
      try {
        const response = await axios.patch(destination, wse_preplinks);
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
        <FormTitle>WSE Prep</FormTitle>
        <Formik initialValues={initialLinksValues} onSubmit={handleLinksSubmit} validationSchema={linksSchema}>
          <LinksForm>
            <Label>
              <AdminInput type="text" name="wse_prep_1" autoComplete="off" placeholder="Перший кахут для WSE Prep" />
            </Label>
            <Label>
              <AdminInput type="text" name="wse_prep_2" autoComplete="off" placeholder="Другий кахут для WSE Prep" />
            </Label>
            <Label>
              <AdminInput type="text" name="wse_prep_3" autoComplete="off" placeholder="Третій кахут для WSE Prep" />
            </Label>
            <Label>
              <AdminInput type="text" name="wse_prep_4" autoComplete="off" placeholder="Четвертий кахут для WSE Prep" />
            </Label>
            <Label>
              <AdminInput type="text" name="wse_prep_5" autoComplete="off" placeholder="П'ятий кахут для WSE Prep" />
            </Label>
            <LabelCheckBox>
              <AdminCheckbox type="checkbox" name="replace" />
              Якщо не зняти галочку, всі лінки перезапишуться повністю. <br /> Якщо її зняти, можна виправити конкретний лінк, не зачіпаючи інші.
              Наприклад, якщо треба виправити тільки один Кахут, наприклад, №3 - внось його лінк у відповідне поле (третє) і знімай галочку.
            </LabelCheckBox>
            <AdminFormBtn type="submit">Замінити лінки</AdminFormBtn>
          </LinksForm>
        </Formik>
        {isLoading && <Loader />}
      </AdminPanelSection>
    </>
  );
};
