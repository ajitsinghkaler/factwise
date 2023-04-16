import { useState } from 'react';
import styles from './accrodion-item-wrapper.module.css';
import { Celebrity } from 'src/app/interfaces/celebrity';
import EditForm from '../edit-form/edit-form';
import AccrodionItem from '../accrodion-item/accrodion-item';

/* eslint-disable-next-line */
export interface AccrodionItemWrapperProps {
  celebrity: Celebrity;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

export function AccrodionItemWrapper({ setIsEditing, isEditing, celebrity }: AccrodionItemWrapperProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const allowActivating = (activate:boolean) => {
    if (!isEditing || !activate) {
      setIsActive(activate);
      if(!activate) {
        setIsEditing(false);
      }
    }
  }

  const editAllowed = (editVal: boolean) => {
    if (celebrity.age > 18) {
      setIsEdit(editVal);
      setIsEditing(editVal);
    } else {
      alert("Age should be greater than 18");
    }
  }


  return (
    <div className={styles.wrapper}>
      {isEdit ?
        <EditForm isActive={isActive} setIsActive={allowActivating} setIsEdit={editAllowed} celebrity={celebrity} /> :
        <AccrodionItem isActive={isActive} setIsActive={allowActivating} setIsEdit={editAllowed} celebrity={celebrity} />}
    </div>
  );
}

export default AccrodionItemWrapper;
