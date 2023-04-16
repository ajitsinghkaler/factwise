import { Celebrity } from 'src/app/interfaces/celebrity';
import styles from './edit-form.module.css';
import accordionStyles from '../accrodion-item/accrodion-item.module.css';
import { ChangeEvent, FormEvent, useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { TiTick } from 'react-icons/ti';

export interface EditFormProps {
  celebrity: Celebrity;
  setIsEdit: (isEdit: boolean) => void;
  setIsActive: (isActive: boolean) => void;
  isActive: boolean;
}

export function EditForm({ celebrity, setIsEdit, isActive, setIsActive }: EditFormProps) {
  const [saveAllow, setSaveAllow] = useState(true);
  const countryError = "This field is required and allows alphabet only"
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const form = (e.target as HTMLFormElement).elements;
    celebrity.first = (form.namedItem('first') as HTMLInputElement).value;
    celebrity.age = Number((form.namedItem('age') as HTMLInputElement).value);
    celebrity.country = (form.namedItem('country') as HTMLInputElement).value;
    celebrity.gender = (form.namedItem('gender') as HTMLSelectElement).value;
    celebrity.description = (form.namedItem('description') as HTMLTextAreaElement).value;
    setIsEdit(false);
  }
  const allowSave = (e: ChangeEvent) => {
    setSaveAllow(false);
  }
  return (
    <form onSubmit={submit}>
      <div className={accordionStyles.title}>
        <div className={accordionStyles["inner-title"]}>
          <img src={celebrity.picture} />
          <input style={{ fontSize: "20px", fontWeight: 700 }} onChange={allowSave} name="first" required type='text' defaultValue={celebrity.first} />
        </div>
        <div className={accordionStyles.symbol}>{isActive ? '-' : '+'}</div>
      </div>
      {isActive && <div>
        <div className={accordionStyles["accordion-content"]}>
          <div className={accordionStyles["accordion-subtitle"]}>
            <div>
              <label className={accordionStyles["accordion-content-title"]}>Age</label>
              <input onChange={allowSave} type="number" name="age" required pattern="[0-9]+" inputMode="numeric" defaultValue={celebrity.age} />
            </div>
            <div>
              <label className={accordionStyles["accordion-content-title"]}>Gender</label>
              <select onChange={allowSave} required defaultValue={celebrity.gender} name="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="transgender">Transgender</option>
                <option value="rather not say">Rather Not Say</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className={accordionStyles["accordion-content-title"]}>Country</label>
              <input
                pattern="[a-zA-Z ]+"
                title={countryError}
                required
                name="country"
                type='text'
                onChange={allowSave}
                defaultValue={celebrity.country} />
            </div>
          </div>
          <div>
            <div className={accordionStyles["accordion-content-title"]}>Description</div>
            <textarea className={styles.description} rows={6} onChange={allowSave} name="description" required defaultValue={celebrity.description}></textarea>
          </div>
        </div>
        <div className={accordionStyles["accordion-footer"]}>
          <button style={{ marginRight: '20px' }} type="button" onClick={() => setIsEdit(false)}>
            <RxCross1 color='red' />
          </button>
          <button disabled={saveAllow}><TiTick color='green' /></button>
        </div>
      </div>}
    </form>
  );
}

export default EditForm;
