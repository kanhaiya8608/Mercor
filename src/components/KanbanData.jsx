import { v4 as uuidv4 } from 'uuid';
export const columnsFromBackend = {
  todo: {
    title: 'To Do',
    items: [
      {
        id:  uuidv4(),
        heading: 'Brainstorming',
        priority: 'Low',
        images: [
        
        ],
        description: 'Brainstorming brings team members diverse experience into play. ',
        collaborators: [
          './assets/collaborators/Ellipse12.png',
          './assets/collaborators/Ellipse15.png',
          './assets/collaborators/Ellipse14.png',
        ],
        comments: ['Comment 1', 'Comment 2'],
        files: '12'
      },
      {
        id: uuidv4(),
        heading: 'Research',
        priority: 'High',
        images: [
          
        ],
        description: 'User research helps you to create an optimal product for users.',
        collaborators: [
          './assets/collaborators/Ellipse16.png',
          './assets/collaborators/Ellipse13.png'      ],
        comments: [],
        files: '10'
      },
      {
        id: uuidv4(),
        heading: 'Wireframes',
        priority: 'High',
        images: [
          
        ],
        description: 'Low fidelity wireframes include the most basic content and visuals.',
        collaborators: [
          './assets/collaborators/Ellipse12.png',
          './assets/collaborators/Ellipse16.png',
          './assets/collaborators/Ellipse15.png',  
        ],
        comments: [],
        files: '10'
      }
    ],
  },
  inProgress: {
    title: 'On Progress',
    items: [
      {
        id: uuidv4(),
        heading: 'Onboarding Illustrations ',
        priority: 'Low',
        images: [
          './assets/cards/plant.png',
        ],
        description: '',
        collaborators: [
          './assets/collaborators/Ellipse15.png',
          './assets/collaborators/Ellipse14.png',
          './assets/collaborators/Ellipse12.png'
        ],
        comments: ['Comment 6'],
        files: '14'
      },
      {
        id: uuidv4(),
        heading: 'MoodBoard',
        priority: 'Low',
        images: [
          './assets/cards/table.png',
          './assets/cards/dog.png'
        ],
        description: '',
        collaborators: [
          './assets/collaborators/Ellipse15.png',
          './assets/collaborators/Ellipse14.png',
          './assets/collaborators/Ellipse12.png'
        ],
        comments: ['Comment 6'],
        files: '14'
      },
    ],
    
  },
  completed: {
    title: 'Done',
    items: [
      {
        id: 'uuidv4()',
        heading: '',
        priority: 'Completed',
        images: [
          './assets/cards/PlantCare.png'
        ],
        description: '',
        collaborators: [
          './assets/collaborators/Ellipse16.png',
          './assets/collaborators/Ellipse14.png',
        ],
        comments: ['Comment 8'],
        files: '12'
      },
      {
        id: uuidv4(),
        heading: 'Design System',
        priority: 'Completed',
        images: [
        ],
        description: 'It just needs to adapt the UI from what you did before ',
        collaborators: [
          './assets/collaborators/Ellipse12.png',
          './assets/collaborators/Ellipse14.png',
          './assets/collaborators/Ellipse15.png'
        ],
        comments: ['Comment 9', 'Comment 10'],
        files: '12'
      },
      // ... other completed tasks ...
    ],
  },
};