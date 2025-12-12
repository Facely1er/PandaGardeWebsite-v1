export interface StorySceneData {
  id: string;
  title: string;
  content: string;
  character?: 'panda' | 'turtle' | 'monkey' | 'beaver' | 'rabbit' | 'owl' | 'fox';
  animation?: 'bounce' | 'wave' | 'nod' | 'shake' | 'dance' | 'hide' | 'appear';
  background?: 'forest' | 'cave' | 'meadow' | 'river' | 'mountain' | 'village' | 'digital';
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night';
  weather?: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'foggy';
  mood?: 'happy' | 'mysterious' | 'tense' | 'peaceful' | 'exciting' | 'scary';
  choices?: Array<{
    text: string;
    nextScene: string;
    consequence?: string;
  }>;
  audioUrl?: string;
  duration?: number;
}

export const storyScenes: StorySceneData[] = [
  {
    id: 'intro',
    title: 'The Digital Bamboo Forest',
    content: 'Deep in the lush Bamboo Digital Forest lived a panda named Po. He was different from the other pandas because instead of munching on regular bamboo all day, he loved to play with digital bamboo tablets. These magical tablets could connect to all parts of the forest, letting animals share stories, photos, and messages.',
    character: 'panda',
    animation: 'appear',
    background: 'forest',
    timeOfDay: 'morning',
    weather: 'sunny',
    mood: 'peaceful',
    duration: 8
  },
  {
    id: 'shy-panda',
    title: 'Po the Shy Panda',
    content: 'Po was the shyest animal in the forest. He would hide behind the tallest bamboo stalks whenever other animals came near. Even though he loved his digital tablet, he rarely shared anything with others. "What if they don\'t like my photos?" he would worry. "What if they laugh at my stories?" So Po kept to himself, quietly exploring the digital pathways of the forest while staying hidden in the shadows.',
    character: 'panda',
    animation: 'hide',
    background: 'forest',
    timeOfDay: 'afternoon',
    weather: 'cloudy',
    mood: 'mysterious',
    duration: 10
  },
  {
    id: 'accident',
    title: 'The Accidental Share',
    content: 'One sunny morning, Po was so excited about a new game on his tablet that he accidentally pressed the wrong button. Suddenly, a message appeared: "All your information has been shared with the entire forest!" Po gasped! His secret diary, his collection of embarrassing bamboo dance videos, and even his personal information like where he slept and what times he ate – everything was now visible to every animal in the forest!',
    character: 'panda',
    animation: 'shake',
    background: 'digital',
    timeOfDay: 'morning',
    weather: 'sunny',
    mood: 'tense',
    choices: [
      {
        text: 'Turn off the tablet and hide',
        nextScene: 'hiding',
        consequence: 'Po becomes more isolated'
      },
      {
        text: 'Try to fix the settings',
        nextScene: 'trying-to-fix',
        consequence: 'Po learns about privacy controls'
      }
    ],
    duration: 12
  },
  {
    id: 'hiding',
    title: 'Hiding in Fear',
    content: 'Po turned off his tablet and hid in his den for days, too embarrassed to come out. He felt terrible about what had happened and didn\'t know how to face the other animals. Meanwhile, messages started popping up on his tablet from curious forest friends who had seen his shared information.',
    character: 'panda',
    animation: 'hide',
    background: 'cave',
    timeOfDay: 'evening',
    weather: 'rainy',
    mood: 'scary',
    duration: 8
  },
  {
    id: 'trying-to-fix',
    title: 'Learning to Fix Things',
    content: 'Po decided to try to understand what went wrong. He carefully looked through his tablet settings and discovered privacy controls he never knew existed. He learned about sharing permissions and how to control who could see his information. This gave him a little bit of hope.',
    character: 'panda',
    animation: 'nod',
    background: 'digital',
    timeOfDay: 'afternoon',
    weather: 'sunny',
    mood: 'peaceful',
    duration: 10
  },
  {
    id: 'turtle-visit',
    title: 'Wise Old Turtle\'s Visit',
    content: 'After a week, there was a gentle knock at his door. It was wise old Turtle, the eldest animal in the forest. "Po," said Turtle softly, "may I come in?" Po reluctantly let Turtle inside. "I know what happened," Turtle said. "And I\'m here to help you understand something important about our Digital Forest."',
    character: 'turtle',
    animation: 'wave',
    background: 'cave',
    timeOfDay: 'evening',
    weather: 'foggy',
    mood: 'peaceful',
    duration: 12
  },
  {
    id: 'privacy-shield',
    title: 'The Privacy Shield',
    content: 'Turtle showed Po a special shield he carried. "This is a Privacy Shield. It helps protect what we share in the Digital Forest. Let me teach you how to use it." Over the next few days, Turtle taught Po many important lessons about protecting personal information and using privacy settings wisely.',
    character: 'turtle',
    animation: 'appear',
    background: 'meadow',
    timeOfDay: 'morning',
    weather: 'sunny',
    mood: 'exciting',
    choices: [
      {
        text: 'Listen carefully to Turtle\'s lessons',
        nextScene: 'learning-lessons',
        consequence: 'Po becomes a privacy expert'
      },
      {
        text: 'Ask questions about privacy',
        nextScene: 'asking-questions',
        consequence: 'Po learns even more'
      }
    ],
    duration: 15
  },
  {
    id: 'learning-lessons',
    title: 'Important Privacy Lessons',
    content: 'Po listened carefully and learned: "Information once shared is hard to take back. That\'s why we must be careful what we share from the beginning." "We can use special privacy settings. These are like fences around your digital bamboo garden." "Most importantly, you have the right to protect your information, just like you protect your home."',
    character: 'panda',
    animation: 'nod',
    background: 'meadow',
    timeOfDay: 'afternoon',
    weather: 'sunny',
    mood: 'happy',
    duration: 12
  },
  {
    id: 'asking-questions',
    title: 'Curious Questions',
    content: 'Po asked many questions: "How do I know if an app is safe?" "What should I do if someone asks for my personal information?" "How can I help my friends stay safe too?" Turtle was impressed by Po\'s curiosity and answered each question patiently, helping Po become even more knowledgeable about digital safety.',
    character: 'panda',
    animation: 'bounce',
    background: 'meadow',
    timeOfDay: 'afternoon',
    weather: 'sunny',
    mood: 'exciting',
    duration: 14
  },
  {
    id: 'becoming-teacher',
    title: 'Privacy Panda Emerges',
    content: 'As Po became more confident, something unexpected happened. Forest animals began coming to him with questions: "Po, how do I stop strangers from seeing my photos?" asked Owen the Owl. "Po, someone is pretending to be me online! What should I do?" worried Fiona the Fox. With each question, Po realized he could use what he had learned to help others.',
    character: 'panda',
    animation: 'dance',
    background: 'village',
    timeOfDay: 'afternoon',
    weather: 'sunny',
    mood: 'happy',
    duration: 15
  },
  {
    id: 'privacy-panda',
    title: 'The Forest\'s Privacy Expert',
    content: 'Soon, Po wasn\'t shy anymore. He became known as "Privacy Panda" – the forest\'s expert on staying safe in the digital world. He created fun games to teach young animals about online safety and held special classes under the tallest bamboo tree. The animals loved learning from Privacy Panda. His gentle voice and kind smile made even scary topics feel manageable.',
    character: 'panda',
    animation: 'wave',
    background: 'forest',
    timeOfDay: 'morning',
    weather: 'sunny',
    mood: 'happy',
    duration: 16
  },
  {
    id: 'conclusion',
    title: 'A Safer Digital Forest',
    content: 'As the seasons changed and the Digital Bamboo Forest grew larger and more complex, Privacy Panda continued his important work. He never forgot how it felt to have his private information exposed, and that memory made him an even better teacher. And so, Privacy Panda protected the forest one animal at a time, teaching them to navigate the digital wilderness with confidence, safety, and a little bit of bamboo-powered wisdom.',
    character: 'panda',
    animation: 'appear',
    background: 'forest',
    timeOfDay: 'evening',
    weather: 'sunny',
    mood: 'peaceful',
    duration: 18
  }
];

