import { useContext, useState } from 'react';
import { Celebrity } from '../../interfaces/celebrity';
import styles from './accrodion-item.module.css';
import Modal from 'react-modal';
import { CelebrityContext } from 'src/app/interfaces/celebrityContext';
import { MdOutlineModeEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { RxCross1 } from 'react-icons/rx';

const customStyles = {
  content: {
    width: '650px',
    height: "165px",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    padding: '30px',
  },
};

/* eslint-disable-next-line */
interface AccrodionItemProps {
  celebrity: Celebrity;
  setIsActive: (isActive: boolean) => void;
  setIsEdit: (isEdit: boolean) => void;
  isActive: boolean;
}
Modal.setAppElement('#root');

export function AccrodionItem({ celebrity, setIsEdit, isActive, setIsActive }: AccrodionItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { celebrities, setCelebrities } = useContext(CelebrityContext);
  const deleteCelebrity = (id: number) => {
    const newCelebrities = celebrities.filter(celebrity => celebrity.id !== id);
    setCelebrities(newCelebrities);
    setIsOpen(false);
  }
  return (
    <>
      <Modal
        isOpen={isOpen}
        contentLabel="Delete Modal"
        style={customStyles}>
        <p className={styles["modal-title"]}>
          Are you sure you want to delete?
          <RxCross1 onClick={() => setIsOpen(false)} />
        </p>
        <div className={styles["modal-footer"]}>
          <button className={styles.cancel} onClick={() => setIsOpen(false)}>Cancel</button>
          <button className={styles.delete} onClick={() => deleteCelebrity(celebrity.id)}>Delete</button>
        </div>
      </Modal>
      <div>
        <div onClick={() => setIsActive(!isActive)} className={styles.title}>
          <div className={styles["inner-title"]}>
            <img src={celebrity.picture} />
            <h2>{celebrity.first}</h2>
          </div>
          <div className={styles.symbol}>{isActive ? '-' : '+'}</div>
        </div>
        {isActive && <div>
          <div className={styles["accordion-content"]}>
            <div className={styles["accordion-subtitle"]}>
              <div>
                <div className={styles["accordion-content-title"]}>Age</div>
                <div className={styles["accordion-content-value"]}>{celebrity.age}</div>
              </div><div>
                <div className={styles["accordion-content-title"]}>Gender</div>
                <div style={{ textTransform: 'capitalize' }} className={styles["accordion-content-value"]}>{celebrity.gender}</div>
              </div><div>
                <div className={styles["accordion-content-title"]}>Country</div>
                <div className={styles["accordion-content-value"]}>{celebrity.country}</div>
              </div>
            </div>
            <div>
              <div className={styles["accordion-content-title"]}>Description</div>
              <div className={styles["accordion-content-value"]}>{celebrity.description}</div>
            </div>
          </div>
          <div className={styles["accordion-footer"]}>
            <button style={{ marginRight: '20px' }} onClick={() => setIsEdit(true)}>
              <MdOutlineModeEdit color="blue" />
            </button>
            <button onClick={() => setIsOpen(true)}><RiDeleteBin6Line color="red" /></button>
          </div>
        </div>}
      </div>
    </>
  );
}

export default AccrodionItem;
