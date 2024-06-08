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

export const B1KidsBeginnerKahootForm = ({ destination }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const initialLinksValues = {
    b1kidsbeginner_1: '',
    b1kidsbeginner_2: '',
    b1kidsbeginner_3: '',
    b1kidsbeginner_4: '',
    b1kidsbeginner_5: '',
    b1kidsbeginner_6: '',
    b1kidsbeginner_7: '',
    b1kidsbeginner_8: '',
    b1kidsbeginner_9: '',
    b1kidsbeginner_10: '',
    replace: true,
  };

  const linksSchema = yup.object().shape({
    b1kidsbeginner_1: yup.string().optional(),
    b1kidsbeginner_2: yup.string().optional(),
    b1kidsbeginner_3: yup.string().optional(),
    b1kidsbeginner_4: yup.string().optional(),
    b1kidsbeginner_5: yup.string().optional(),
    b1kidsbeginner_6: yup.string().optional(),
    b1kidsbeginner_7: yup.string().optional(),
    b1kidsbeginner_8: yup.string().optional(),
    b1kidsbeginner_9: yup.string().optional(),
    b1kidsbeginner_10: yup.string().optional(),
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
      const b1kidsbeginnerlinks = { b1kidsbeginner: { links: {} } };
      for (const [key, value] of Object.entries(values)) {
        if (value && key !== 'replace') {
          b1kidsbeginnerlinks.b1kidsbeginner.links[key] = value;
        } else {
          b1kidsbeginnerlinks.b1kidsbeginner.replace = value;
        }
      }
      try {
        const response = await axios.patch(destination, b1kidsbeginnerlinks);
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
      <FormTitle>B1 Kids Beginner</FormTitle>
        <Formik
          initialValues={initialLinksValues}
          onSubmit={handleLinksSubmit}
          validationSchema={linksSchema}
        >
          <LinksForm>
            <Label>
              <AdminInput
                type="text"
                name="b1kidsbeginner_1"
                autoComplete="off"
                placeholder="Перший кахут для дітей початківців рівня B1"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="b1kidsbeginner_2"
                autoComplete="off"
                placeholder="Другий кахут для дітей початківців рівня B1"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="b1kidsbeginner_3"
                autoComplete="off"
                placeholder="Третій кахут для дітей початківців рівня B1"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="b1kidsbeginner_4"
                autoComplete="off"
                placeholder="Четвертий кахут для дітей початківців рівня B1"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="b1kidsbeginner_5"
                autoComplete="off"
                placeholder="П'ятий кахут для дітей початківців рівня B1"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="b1kidsbeginner_6"
                autoComplete="off"
                placeholder="Шостий кахут для дітей початківців рівня B1"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="b1kidsbeginner_7"
                autoComplete="off"
                placeholder="Сьомий кахут для дітей початківців рівня B1"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="b1kidsbeginner_8"
                autoComplete="off"
                placeholder="Восьмий кахут для дітей початківців рівня B1"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="b1kidsbeginner_9"
                autoComplete="off"
                placeholder="Дев'ятий кахут для дітей початківців рівня B1"
              />
            </Label>
            <Label>
              <AdminInput
                type="text"
                name="b1kidsbeginner_10"
                autoComplete="off"
                placeholder="Десятий кахут для дітей початківців рівня B1"
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
