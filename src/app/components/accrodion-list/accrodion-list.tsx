import { Celebrity } from '../../interfaces/celebrity';
import styles from './accrodion-list.module.css';
import AccrodionItemWrapper from '../accrodion-item-wrapper/accrodion-item-wrapper';
import celebritiesJson from '../../../assets/celebrities.json';
import { getAge } from 'src/app/utilities/ageUtility';
import { useState } from 'react';
import { CelebrityContext } from 'src/app/interfaces/celebrityContext';


export function AccrodionList() {
  const celebritiesWithAge = (celebritiesJson: Omit<Celebrity, "age">[]) => {
    return celebritiesJson.map(celebrity => ({
      ...celebrity,
      age: getAge(celebrity.dob)
    }));
  }
  const [celebrities, setCelebrities] = useState(celebritiesWithAge(celebritiesJson));
  const [isEditing, setIsEditing] = useState(false);
  return (
    <CelebrityContext.Provider value={{ celebrities, setCelebrities }}>
      {celebrities.map((celebrity) => (
        <AccrodionItemWrapper isEditing={isEditing} setIsEditing={setIsEditing} key={celebrity.id} celebrity={celebrity} />
      ))}
    </CelebrityContext.Provider>
  );
}

export default AccrodionList;
