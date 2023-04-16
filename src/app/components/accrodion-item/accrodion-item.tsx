import { useContext, useState } from 'react';
import { Celebrity } from '../../interfaces/celebrity';
import styles from './accrodion-item.module.css';
import Modal from 'react-modal';
import { CelebrityContext } from 'src/app/interfaces/celebrityContext';

const customStyles = {
  content: {
    width: '50%',
    height: '50%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

/* eslint-disable-next-line */
interface AccrodionItemProps {
  celebrity: Celebrity;
  setIsEdit: (isEdit: boolean) => void;
  setIsActive: (isActive: boolean) => void;
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
        // onRequestClose={() => setIsOpen(false)}
        contentLabel="Example Modal"
        style={customStyles}>
        <p>Are you sure you want to delete?</p>
        <div>
          <button onClick={() => deleteCelebrity(celebrity.id)}>Delete</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </div>
      </Modal>
      <div className='accordion-item'>


        <div onClick={() => setIsActive(!isActive)} className="accordion-title">
          <img src={celebrity.picture} />
          <h2>{celebrity.first + " " + celebrity.last}</h2>
          <div>{isActive ? '-' : '+'}</div>
        </div>
        {isActive && <div>
          <div className="accordion-content">
            <div>
              <div>
                <div className="accordion-content-title">Age</div>
                <div>{celebrity.age}</div>
              </div><div>
                <div className="accordion-content-title">Gender</div>
                <div>{celebrity.gender}</div>
              </div><div>
                <div className="accordion-content-title">Country</div>
                <div>{celebrity.country}</div>
              </div>
            </div>
            <div>
              <div className="accordion-content-title">Description</div>
              <div>{celebrity.description}</div>
            </div>
          </div>
          <div className='accordion-footer'>
            <button onClick={() => setIsEdit(true)}>Edit</button>
            <button onClick={() => setIsOpen(true)}>Delete</button>
          </div>
        </div>}
      </div>
    </>
  );
}

export default AccrodionItem;
