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

export const WSKMLogisticsKahootForm = ({ destination }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const initialLinksValues = {
    wskm_logistics_1: '',
    wskm_logistics_2: '',
    wskm_logistics_3: '',
    wskm_logistics_4: '',
    wskm_logistics_5: '',
    replace: true,
  };

  const linksSchema = yup.object().shape({
    wskm_logistics_1: yup.string().optional(),
    wskm_logistics_2: yup.string().optional(),
    wskm_logistics_3: yup.string().optional(),
    wskm_logistics_4: yup.string().optional(),
    wskm_logistics_5: yup.string().optional(),
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
      const wskm_logisticslinks = { wskm_logistics: { links: {} } };
      for (const [key, value] of Object.entries(values)) {
        if (value && key !== 'replace') {
          wskm_logisticslinks.wskm_logistics.links[key] = value;
        } else {
          wskm_logisticslinks.wskm_logistics.replace = value;
        }
      }
      try {
        const response = await axios.patch(destination, wskm_logisticslinks);
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
        <FormTitle>WSKM Logistics</FormTitle>
        <Formik
          initialValues={initialLinksValues}
          onSubmit={handleLinksSubmit}
          validationSchema={linksSchema}
        >
          <LinksForm>
            <Label>
              <AdminInput
                type="text"
                name="wskm_logistics_1"
                autoComplete="off"
                placeholder="Перший кахут для WSKM Logisitics"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="wskm_logistics_2"
                autoComplete="off"
                placeholder="Другий кахут для WSKM Logisitics"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="wskm_logistics_3"
                autoComplete="off"
                placeholder="Третій кахут для WSKM Logisitics"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="wskm_logistics_4"
                autoComplete="off"
                placeholder="Четвертий кахут для WSKM Logisitics"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="wskm_logistics_5"
                autoComplete="off"
                placeholder="П'ятий кахут для WSKM Logisitics"
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
