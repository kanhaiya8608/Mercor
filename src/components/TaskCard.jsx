
import PropTypes from 'prop-types';
import Collaborators from './Collaborators';
import {BsChatSquareDots, BsThreeDots} from 'react-icons/bs'
import {FiFolderMinus} from 'react-icons/fi'

const TaskCard = ({ item }) => {
  const renderImages = () => {
    if (item.images.length === 2) {
      return (
        <div className="flex space-x-2">
          {item.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              className="h-20 flex-1 object-cover rounded"
            />
          ))}
        </div>
      );
    } else {
      return (
        <div>
          {item.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full mb-2 object-cover rounded"
            />
          ))}
        </div>
      );
    }
  };
  const getPriorityStyles = (priority) => {
    let textColor = '';
    let backgroundColor = '';
  
    switch (priority) {
      case 'High':
        textColor = '#D8727D';
        backgroundColor = 'rgba(216, 114, 125, 0.1)';
        break;
      case 'Medium':
        textColor = 'rgb(79 70 229)';
        backgroundColor = 'rgb(165 180 252)';
        break;
      case 'Low':
        textColor = '#D58D49';
        backgroundColor = 'rgba(223, 168, 116, 0.2)';
        break;
      default:
        textColor = 'rgba(104, 178, 102, 1)';
        backgroundColor = 'rgba(131, 194, 157, 0.2)';
        break;
    }
  
    return {
      color: textColor,
      backgroundColor: backgroundColor,
    };
  };
  return (
    <div className="p-4 bg-white rounded">
      
      <div className="mt-2">
        <div className="flex justify-between mb-2">
          <span className='text-xs font-medium p-1 rounded' style={getPriorityStyles(item.priority)}>{item.priority}</span>
          <BsThreeDots className='font-extrabold'/>
        </div>
        <h1 className="mb-2 text-lg font-semibold">
          {item.heading}
        </h1>
        <div className=" text-xs text-zinc-500 mb-4">
           {item.description}
        </div>
     
        <div className="mb-2">
         
          {renderImages()}
        </div>
        <div className="flex justify-between">
        <Collaborators collaborators={item.collaborators} />
          <ul >
          <div className='inline text-zinc-500 text-[12px] font-medium'><BsChatSquareDots className='inline mr-2'/>{item.comments.length} comments</div>
          <div className='inline text-zinc-500 text-[12px] font-medium'><FiFolderMinus className='inline mx-2'/>{item.comments.length} files</div>

          </ul>
        </div>
        
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  item: PropTypes.shape({
    heading: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    collaborators: PropTypes.arrayOf(PropTypes.string).isRequired,
    comments: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default TaskCard;
