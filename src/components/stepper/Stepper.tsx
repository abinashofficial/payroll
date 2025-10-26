import React, { useEffect, useState } from 'react';
import greenimage from '../../assets/Filled_img.png';
import greyimage from '../../assets/UnFilled_img.png';
import Completed from '../../assets/Completed.png';
import No_Event_1 from '../../assets/Not_Applicable_Lable.png';
import Pending from '../../assets/Pending_Lable.png';
import Rejected from '../../assets/Rejected_Label.png';
import No_Event_2 from '../../assets/No_Event_2.png';
import No_Event_3 from '../../assets/No_Event_3.png';
import No_Event_4 from '../../assets/No_Event_4.png';
import No_Event_5 from '../../assets/No_Event_5.png';
import './Stepper.css';
import styled from '@emotion/styled';

const StyledArrowProgressBar = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  background-color: #EFFAEF;
  border-radius: 4px;
  overflow: hidden;

  .progress-container {
    display: flex;
    height: 100%;
    width: 100%;
    background-color: #fff;
  }
`;

interface Label {
  text: string;
  status: number;
  marginLeft?: string;
  label_order: number;
}

interface Props {
  ProgressBarValue: number;
  NumberOfDiv: number;
  projectLeadStatus: number;
  inventoryLeadStatus: number;
  packingStatus: number;
  pendingLeadStatus: number;
  qualityLeadStatus: number;
}

const CustomStepper: React.FC<Props> = (props) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1);

useEffect(() => {
  const timeout1 = setTimeout(() => {
    setSelectedImageIndex(-1);
  }, 100);

  const timeout2 = setTimeout(() => {
    setSelectedImageIndex(props.ProgressBarValue);
  }, 200);

  return () => {
    clearTimeout(timeout1);
    clearTimeout(timeout2);
  };
}, [props.ProgressBarValue]);


  const generateDivs = () => {
    return [...Array(props.NumberOfDiv)].map((_, index) => (
      <div
        key={index}
        style={{
          width: '37px',
          backgroundImage: `url(${index <= selectedImageIndex ? greenimage : greyimage})`,
          backgroundSize: '25px 50px',
          backgroundRepeat: 'no-repeat',
          backgroundColor: "#EFFAEF",
          ...(index <= selectedImageIndex && {
            transition: 'background-image 0.1s ease',
            transitionDelay: `${index * 0.05}s`,
            backgroundColor: "#EFFAEF"
          }),
        }}
      ></div>
    ));
  };

  const eventImages: { [key: number]: string } =  {
    1: No_Event_1,
    2: No_Event_2,
    3: No_Event_3,
    4: No_Event_4,
    5: No_Event_5,
  };

  const generateLabels = () => {
    const labels: Label[] = [
      { text: 'Request Raised', status: props.pendingLeadStatus, label_order: 1 },
      { text: 'Project Lead', status: props.projectLeadStatus, label_order: 2 },
      { text: 'Inventory Lead', marginLeft: '15px', status: props.inventoryLeadStatus, label_order: 3 },
      { text: 'Packing', status: props.packingStatus, label_order: 4 },
      { text: 'Quality Lead', status: props.qualityLeadStatus, label_order: 5 },
    ];

    return labels.map((label, index) => {
      let background_image = Completed;

      if (label.status === 0) {
        background_image = Pending;
      } else if (label.status === 1) {
        background_image = Completed;
      } else if (label.status === 2) {
        background_image = Rejected;
      } else if (label.status === 3) {
        background_image = No_Event_1;
      } else if (label.status === 4) {
        background_image = eventImages[label.label_order]
      }

      return (
        <div className="container" key={index} style={{ backgroundImage: `url(${background_image})`, backgroundSize: '175px 71px', backgroundRepeat: 'no-repeat' }}>
          <div className="icon-container">
            <i className="fa fa-icon" aria-hidden="true"></i>
          </div>
          <div className="text-container">
            <p style={{ marginLeft: label.marginLeft }}>{label.text}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className='stepper-container'>
      <div className='label-container'>
        {generateLabels()}
      </div>
      <StyledArrowProgressBar>
        <div className="progress-container">
          {generateDivs()}
        </div>
      </StyledArrowProgressBar>
    </div>
  );
}

export default CustomStepper;
