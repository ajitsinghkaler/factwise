import { Celebrity } from 'src/app/interfaces/celebrity';
import styles from './edit-form.module.css';
import { ChangeEvent, FormEvent, InvalidEvent, SyntheticEvent, useState } from 'react';

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
    <form onSubmit={submit} className='accordion-item'>
      <div className="accordion-title">
        <img src={celebrity.picture} />
        <input onChange={allowSave} name="first" required type='text' defaultValue={celebrity.first} />
        <div>{isActive ? '-' : '+'}</div>
      </div>
      {isActive && <div>
        <div className="accordion-content">
          <div>
            <div>
              <label className="accordion-content-title">Age</label>
              <input onChange={allowSave} type="number" name="age" required pattern="[0-9]+" inputMode="numeric" defaultValue={celebrity.age} />
            </div>
            <div>
              <label className="accordion-content-title">Gender</label>
              <select onChange={allowSave} required defaultValue={celebrity.gender} name="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="transgender">Transgender</option>
                <option value="rather not say">Rather Not Say</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="accordion-content-title">Country</label>
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
            <div className="accordion-content-title">Description</div>
            <textarea onChange={allowSave} name="description" required defaultValue={celebrity.description}></textarea>
          </div>
        </div>
        <div className='accordion-footer'>
          <button type="button" onClick={() => setIsEdit(false)}>Unsave</button>
          <button disabled={saveAllow}>Save</button>
        </div>
      </div>}
    </form>
  );
}

export default EditForm;
