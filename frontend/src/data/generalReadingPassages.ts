export type GRDifficulty = 'basic' | 'elementary' | 'pre-intermediate'
export type GRQuestionType = 'multiple' | 'tfng' | 'fillin' | 'vocab'

export interface GRQuestion {
  id: number
  type: GRQuestionType
  question: string
  options?: string[]
  answer: string | number
  explanation: string
}

export interface GRPassage {
  id: number
  level: GRDifficulty
  topic: string
  title: string
  passage: string
  questions: GRQuestion[]
}

export const generalReadingPassages: GRPassage[] = [
  {
    id: 1,
    level: 'basic',
    topic: 'School',
    title: 'My First Day of School in America',
    passage: `My name is May. I am from Myanmar. I came to the United States six months ago. Last Monday was my first day at Jefferson Elementary School. I was very nervous.

My mother walked with me to school. The school was a big red building with a large playground. Many children were playing outside. Some children were running. Some were talking with their friends. I did not know anyone.

My teacher's name is Mrs. Johnson. She has brown hair and a kind smile. When I walked into the classroom, she said, "Welcome, May! We are happy you are here." I felt a little better.

The classroom had many colorful posters on the walls. There were pictures of animals, letters, and numbers. Each student had their own desk. My desk was near the window. I could see the playground from my seat.

In the morning, we learned the alphabet. I already knew the English alphabet, so that was easy for me. Then we practiced writing our names. After that, we did math. We counted to one hundred. I like math very much.

At lunchtime, I did not know where to sit. A girl named Sofia came to me. She said, "Do you want to sit with me?" I said yes. Sofia is from Mexico. She also came to America recently. We ate lunch together and talked about our home countries. She became my first friend in America.

In the afternoon, we had art class. We drew pictures of our families. I drew my mother, my father, my grandmother, and my little brother. I missed them very much when I looked at my drawing.

At the end of the day, Mrs. Johnson gave everyone a small sticker. Mine had a star on it. She said, "Good job today, May." I smiled. My first day was difficult, but it was also good. I think I will like my new school.`,
    questions: [
      { id: 1, type: 'multiple', question: 'Where is May from?', options: ['Mexico', 'China', 'Myanmar', 'Thailand'], answer: 2, explanation: 'The passage says "My name is May. I am from Myanmar."' },
      { id: 2, type: 'multiple', question: 'What color is the school building?', options: ['White', 'Blue', 'Yellow', 'Red'], answer: 3, explanation: 'The passage says "The school was a big red building."' },
      { id: 3, type: 'multiple', question: 'What is May\'s teacher\'s name?', options: ['Mrs. Smith', 'Mrs. Johnson', 'Mrs. Jackson', 'Mrs. Wilson'], answer: 1, explanation: 'The passage says "My teacher\'s name is Mrs. Johnson."' },
      { id: 4, type: 'multiple', question: 'Where was May\'s desk?', options: ['Near the door', 'Near the board', 'Near the window', 'Near the teacher'], answer: 2, explanation: 'The passage says "My desk was near the window."' },
      { id: 5, type: 'multiple', question: 'Who became May\'s first friend?', options: ['Mrs. Johnson', 'A girl named Sofia', 'A boy named Carlos', 'Her neighbor'], answer: 1, explanation: 'The passage says "She became my first friend in America." Sofia is the girl who invited May to sit with her.' },
      { id: 6, type: 'multiple', question: 'What did the children draw in art class?', options: ['Animals', 'Their school', 'Their families', 'Their home countries'], answer: 2, explanation: 'The passage says "We drew pictures of our families."' },
      { id: 7, type: 'multiple', question: 'What sticker did Mrs. Johnson give May?', options: ['A heart sticker', 'A flower sticker', 'A star sticker', 'A smiley face sticker'], answer: 2, explanation: 'The passage says "Mine had a star on it."' },
      { id: 8, type: 'multiple', question: 'Where is Sofia from?', options: ['Myanmar', 'China', 'Mexico', 'Japan'], answer: 2, explanation: 'The passage says "Sofia is from Mexico."' },
      { id: 9, type: 'tfng', question: 'May walked to school alone on her first day.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', explanation: 'The passage says "My mother walked with me to school." May was not alone.' },
      { id: 10, type: 'tfng', question: 'May already knew the English alphabet before school.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE', explanation: 'The passage says "I already knew the English alphabet, so that was easy for me."' },
      { id: 11, type: 'tfng', question: 'Mrs. Johnson has blonde hair.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', explanation: 'The passage says Mrs. Johnson "has brown hair" — not blonde.' },
      { id: 12, type: 'tfng', question: 'May has a little brother.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE', explanation: 'The passage says "I drew my mother, my father, my grandmother, and my little brother."' },
      { id: 13, type: 'tfng', question: 'May enjoyed the math lesson.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE', explanation: 'The passage says "I like math very much."' },
      { id: 14, type: 'fillin', question: 'May came to the United States ___ months ago.', answer: 'six', explanation: 'The passage says "I came to the United States six months ago."' },
      { id: 15, type: 'fillin', question: 'At lunchtime, Sofia asked May, "Do you want to ___ with me?"', answer: 'sit', explanation: 'The passage says Sofia said "Do you want to sit with me?"' },
      { id: 16, type: 'fillin', question: 'May and Sofia talked about their ___ countries at lunch.', answer: 'home', explanation: 'The passage says "We ate lunch together and talked about our home countries."' },
      { id: 17, type: 'fillin', question: 'In the morning, the class practiced writing their ___.', answer: 'names', explanation: 'The passage says "Then we practiced writing our names."' },
      { id: 18, type: 'vocab', question: 'In the passage, "nervous" means:', options: ['Happy and excited', 'Worried and not relaxed', 'Tired and sleepy', 'Angry and upset'], answer: 1, explanation: '"Nervous" means feeling worried or anxious about something — May was worried about her first day.' },
      { id: 19, type: 'vocab', question: 'In the passage, "colorful" means:', options: ['Very large', 'Having many colors', 'Very old', 'Very expensive'], answer: 1, explanation: '"Colorful" means having many bright colors.' },
      { id: 20, type: 'vocab', question: 'In the passage, "recently" means:', options: ['A long time ago', 'Not very long ago', 'Every day', 'In the future'], answer: 1, explanation: '"Recently" means not long ago — a short time in the past.' },
    ]
  },
  {
    id: 2,
    level: 'basic',
    topic: 'Shopping',
    title: 'Going to the Supermarket',
    passage: `Every Saturday morning, my family goes to the supermarket. We go to a big store called FoodMart. It is about ten minutes from our apartment by car. My father drives. My mother sits in the front seat. My sister and I sit in the back.

Before we leave, my mother always makes a shopping list. She writes down everything we need. Last Saturday, the list had many things on it. We needed milk, eggs, bread, rice, chicken, tomatoes, onions, apples, and orange juice. We also needed soap and shampoo.

When we arrived at FoodMart, my father took a shopping cart. The store was very busy. Many people were shopping. The store is very large. It has many different sections. There is a section for fruits and vegetables, a section for meat, a section for dairy products, and a section for drinks. There is also a section for cleaning products.

We started in the fruit and vegetable section. My mother picked up tomatoes and checked if they were fresh. She always chooses the best ones. My sister wanted to buy grapes, but they were not on the list. My mother said, "Not today."

Then we went to the meat section. My father chose a whole chicken. It was on sale — twenty percent off. My father loves finding good deals at the supermarket.

In the dairy section, we got milk and eggs. I like to carry the eggs very carefully because I dropped them once and they broke. That was a big mess.

At the end, we went to the checkout. There was a long line. We waited for about five minutes. The cashier scanned all our items. The total was forty-two dollars and thirty cents. My mother paid with her debit card.

When we got home, my sister and I helped put the groceries away. My mother cooked rice and chicken for lunch. It was delicious.`,
    questions: [
      { id: 1, type: 'multiple', question: 'When does the family go to the supermarket?', options: ['Every Sunday', 'Every Friday evening', 'Every Saturday morning', 'Every Monday afternoon'], answer: 2, explanation: 'The passage says "Every Saturday morning, my family goes to the supermarket."' },
      { id: 2, type: 'multiple', question: 'How far is the supermarket from their apartment?', options: ['Five minutes by car', 'Ten minutes by car', 'Twenty minutes by car', 'Walking distance'], answer: 1, explanation: 'The passage says "It is about ten minutes from our apartment by car."' },
      { id: 3, type: 'multiple', question: 'Who makes the shopping list?', options: ['The father', 'The sister', 'The narrator', 'The mother'], answer: 3, explanation: 'The passage says "my mother always makes a shopping list."' },
      { id: 4, type: 'multiple', question: 'Why was the chicken a good deal?', options: ['It was free', 'It was twenty percent off', 'It was the biggest one', 'It came with a gift'], answer: 1, explanation: 'The passage says "It was on sale — twenty percent off."' },
      { id: 5, type: 'multiple', question: 'Why does the narrator carry eggs carefully?', options: ['They are very expensive', 'They dropped eggs once and they broke', 'The eggs are very heavy', 'The mother told them to'], answer: 1, explanation: 'The passage says "I like to carry the eggs very carefully because I dropped them once and they broke."' },
      { id: 6, type: 'multiple', question: 'How did the mother pay?', options: ['With cash', 'With a credit card', 'With a debit card', 'With a gift card'], answer: 2, explanation: 'The passage says "My mother paid with her debit card."' },
      { id: 7, type: 'multiple', question: 'How much did the shopping cost?', options: ['$32.40', '$40.23', '$42.30', '$24.32'], answer: 2, explanation: 'The passage says "The total was forty-two dollars and thirty cents" = $42.30.' },
      { id: 8, type: 'multiple', question: 'What did the mother cook for lunch?', options: ['Soup and bread', 'Rice and chicken', 'Pasta and vegetables', 'Eggs and toast'], answer: 1, explanation: 'The passage says "My mother cooked rice and chicken for lunch."' },
      { id: 9, type: 'tfng', question: 'The sister wanted to buy grapes.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE', explanation: 'The passage says "My sister wanted to buy grapes."' },
      { id: 10, type: 'tfng', question: 'The family walked to the supermarket.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', explanation: 'The passage says "My father drives" — they went by car, not walking.' },
      { id: 11, type: 'tfng', question: 'The supermarket has a section for electronics.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'NOT GIVEN', explanation: 'The passage lists several sections but does not mention an electronics section.' },
      { id: 12, type: 'tfng', question: 'The narrator has dropped eggs before.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE', explanation: 'The passage says "I dropped them once and they broke."' },
      { id: 13, type: 'tfng', question: 'The checkout line was very short.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', explanation: 'The passage says "There was a long line." The line was not short.' },
      { id: 14, type: 'fillin', question: 'The family shops at a store called ___.', answer: 'FoodMart', explanation: 'The passage says "We go to a big store called FoodMart."' },
      { id: 15, type: 'fillin', question: 'The mother checks if tomatoes are ___ before buying them.', answer: 'fresh', explanation: 'The passage says "My mother picked up tomatoes and checked if they were fresh."' },
      { id: 16, type: 'fillin', question: 'After shopping, the narrator and sister helped ___ the groceries away.', answer: 'put', explanation: 'The passage says "my sister and I helped put the groceries away."' },
      { id: 17, type: 'fillin', question: 'At the checkout, they waited for about ___ minutes.', answer: 'five', explanation: 'The passage says "We waited for about five minutes."' },
      { id: 18, type: 'vocab', question: 'In the passage, "section" means:', options: ['A type of food', 'A part of a store for specific items', 'A shopping cart', 'A checkout line'], answer: 1, explanation: 'A "section" in a store is a specific area for certain types of products.' },
      { id: 19, type: 'vocab', question: 'In the passage, "on sale" means:', options: ['Sold out', 'At a lower price than usual', 'Very popular', 'New arrival'], answer: 1, explanation: '"On sale" means the item is being sold at a reduced/discounted price.' },
      { id: 20, type: 'vocab', question: 'In the passage, "checkout" means:', options: ['The entrance of the store', 'The place where you pay for your items', 'The place where you get a cart', 'The customer service desk'], answer: 1, explanation: 'The "checkout" is the area in a store where you pay for your items.' },
    ]
  },
  {
    id: 3,
    level: 'basic',
    topic: 'Family & Neighbors',
    title: 'My Neighbor\'s Family',
    passage: `I live in an apartment building in Seattle, Washington. There are twelve apartments in my building. My apartment is on the second floor. My neighbor's name is Mrs. Garcia. She lives in the apartment next to mine.

Mrs. Garcia is a very friendly woman. She is about sixty years old. She has short gray hair and wears glasses. Every morning, she sits on her small balcony and drinks coffee. When she sees me, she always waves and smiles.

Mrs. Garcia has a big family. Her husband, Mr. Garcia, works at a hardware store downtown. He is a tall man with a mustache. He comes home every evening at around six o'clock. When he arrives, he always brings a small treat for their dog, a golden retriever named Biscuit. Biscuit is very friendly. He wags his tail whenever he sees anyone.

Mrs. Garcia and Mr. Garcia have three adult children. Their oldest son, Daniel, is thirty-two years old. He is a nurse at a hospital. He visits every Sunday and usually brings food — sometimes pizza, sometimes tamales. Their daughter, Maria, lives in California. She calls her parents every day but cannot visit often because she is very busy with her own children. Their youngest son, Carlos, still lives with his parents. He is twenty years old and goes to community college nearby.

On weekends, the apartment building becomes very lively. Mrs. Garcia often cooks big meals and invites other neighbors to eat with them. The smell of her cooking fills the hallway. She makes dishes like enchiladas, rice, and beans. Everything is always delicious.

I feel lucky to have Mrs. Garcia as my neighbor. She makes me feel less lonely in a new country. Sometimes she teaches me Spanish words, and I teach her words in Burmese. We both laugh a lot when we practice each other's language.`,
    questions: [
      { id: 1, type: 'multiple', question: 'Where does the narrator live?', options: ['Portland, Oregon', 'Seattle, Washington', 'San Francisco, California', 'Los Angeles, California'], answer: 1, explanation: 'The passage says "I live in an apartment building in Seattle, Washington."' },
      { id: 2, type: 'multiple', question: 'How old is Mrs. Garcia approximately?', options: ['About forty', 'About fifty', 'About sixty', 'About seventy'], answer: 2, explanation: 'The passage says "She is about sixty years old."' },
      { id: 3, type: 'multiple', question: 'Where does Mr. Garcia work?', options: ['At a grocery store', 'At a hospital', 'At a hardware store', 'At a school'], answer: 2, explanation: 'The passage says "Her husband, Mr. Garcia, works at a hardware store downtown."' },
      { id: 4, type: 'multiple', question: 'What is the name of the Garcia\'s dog?', options: ['Bruno', 'Biscuit', 'Buddy', 'Bailey'], answer: 1, explanation: 'The passage says "a golden retriever named Biscuit."' },
      { id: 5, type: 'multiple', question: 'What does Daniel usually bring when he visits?', options: ['Flowers', 'Drinks', 'Food', 'Toys'], answer: 2, explanation: 'The passage says "he always brings food — sometimes pizza, sometimes tamales."' },
      { id: 6, type: 'multiple', question: 'Why can\'t Maria visit often?', options: ['She lives too far away', 'She is sick', 'She is very busy with her own children', 'She doesn\'t like visiting'], answer: 2, explanation: 'The passage says "She cannot visit often because she is very busy with her own children."' },
      { id: 7, type: 'multiple', question: 'How old is Carlos?', options: ['Eighteen', 'Twenty', 'Twenty-two', 'Twenty-five'], answer: 1, explanation: 'The passage says "Their youngest son, Carlos, still lives with his parents. He is twenty years old."' },
      { id: 8, type: 'multiple', question: 'What does the narrator teach Mrs. Garcia?', options: ['English words', 'Cooking recipes', 'Burmese words', 'Spanish words'], answer: 2, explanation: 'The passage says "I teach her words in Burmese."' },
      { id: 9, type: 'tfng', question: 'Mrs. Garcia has short gray hair.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE', explanation: 'The passage says "She has short gray hair and wears glasses."' },
      { id: 10, type: 'tfng', question: 'Biscuit is an unfriendly dog.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', explanation: 'The passage says "Biscuit is very friendly."' },
      { id: 11, type: 'tfng', question: 'Daniel is the youngest Garcia child.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', explanation: 'The passage says Daniel is the oldest son, and Carlos is the youngest.' },
      { id: 12, type: 'tfng', question: 'Maria lives in California.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE', explanation: 'The passage says "Their daughter, Maria, lives in California."' },
      { id: 13, type: 'tfng', question: 'The narrator has lived in Seattle for ten years.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'NOT GIVEN', explanation: 'The passage does not say how long the narrator has lived in Seattle.' },
      { id: 14, type: 'fillin', question: 'The narrator\'s apartment is on the ___ floor.', answer: 'second', explanation: 'The passage says "My apartment is on the second floor."' },
      { id: 15, type: 'fillin', question: 'Mrs. Garcia drinks ___ on her balcony every morning.', answer: 'coffee', explanation: 'The passage says "she sits on her small balcony and drinks coffee."' },
      { id: 16, type: 'fillin', question: 'Mr. Garcia comes home every evening at around ___ o\'clock.', answer: 'six', explanation: 'The passage says "He comes home every evening at around six o\'clock."' },
      { id: 17, type: 'fillin', question: 'Mrs. Garcia teaches the narrator ___ words.', answer: 'Spanish', explanation: 'The passage says "Sometimes she teaches me Spanish words."' },
      { id: 18, type: 'vocab', question: 'In the passage, "lively" means:', options: ['Very quiet and calm', 'Full of activity and energy', 'Very dirty', 'Very cold'], answer: 1, explanation: '"Lively" means full of life, energy, and activity.' },
      { id: 19, type: 'vocab', question: 'In the passage, "treat" means:', options: ['A punishment', 'Medicine', 'A small gift or snack', 'A training tool'], answer: 2, explanation: 'A "treat" is a small special gift, usually food, given as a reward or surprise.' },
      { id: 20, type: 'vocab', question: 'In the passage, "adult" means:', options: ['A young child', 'A teenager', 'A fully grown person', 'An elderly person'], answer: 2, explanation: 'An "adult" is a fully grown person, usually 18 years or older.' },
    ]
  },
  {
    id: 4,
    level: 'basic',
    topic: 'Transportation',
    title: 'Taking the Bus for the First Time',
    passage: `When I first arrived in the United States, I did not have a car. In my home country, I usually walked or took a motorcycle taxi. Here, I had to learn how to use public transportation. My first experience was taking the city bus.

My friend Lily helped me the first time. She showed me how to find the bus stop near my apartment. The bus stop had a blue sign with the bus number and a small bench where people could sit and wait.

Lily explained that I needed to pay the fare when I got on the bus. The fare was two dollars and fifty cents. I could pay with exact change or use a transit card. A transit card is a small plastic card that you can add money to. You just tap it on a reader near the bus driver when you get on. Lily gave me her old transit card with some money on it. She said it was easier than using coins.

The bus came at exactly eight fifteen in the morning. It was a large blue and white bus. When the doors opened, people got off first before we got on. Lily said this was important — always wait for people to exit before you enter. Inside, the bus was clean and had many seats. Some seats near the front were reserved for elderly people and people with disabilities. A sign above those seats said "Priority Seating."

We sat in the middle of the bus. Lily showed me the screen at the front that displayed the next stop. She also showed me the yellow cord along the windows. "If you want to get off," she said, "pull this cord and the bus will stop at the next stop."

I watched everything very carefully. I was a little nervous, but Lily was patient and kind. When we arrived at our stop, I pulled the cord myself. The bus driver said "Have a nice day!" as we got off.

After that day, I started taking the bus by myself. Now I know all the bus routes in my neighborhood. The bus is cheap, convenient, and good for the environment. I am glad I learned how to use it.`,
    questions: [
      { id: 1, type: 'multiple', question: 'How did the narrator usually travel in their home country?', options: ['By car or train', 'By walking or motorcycle taxi', 'By bus or subway', 'By bicycle or bus'], answer: 1, explanation: 'The passage says "I usually walked or took a motorcycle taxi."' },
      { id: 2, type: 'multiple', question: 'Who helped the narrator take the bus for the first time?', options: ['A neighbor', 'A coworker', 'A friend named Lily', 'A bus driver'], answer: 2, explanation: 'The passage says "My friend Lily helped me the first time."' },
      { id: 3, type: 'multiple', question: 'How much was the bus fare?', options: ['$1.50', '$2.00', '$2.50', '$3.00'], answer: 2, explanation: 'The passage says "The fare was two dollars and fifty cents."' },
      { id: 4, type: 'multiple', question: 'What is a transit card used for?', options: ['Showing your ID on the bus', 'Paying for the bus fare by tapping', 'Reserving a seat on the bus', 'Getting a discount at shops'], answer: 1, explanation: 'The passage says a transit card is tapped on a reader to pay the fare.' },
      { id: 5, type: 'multiple', question: 'What time did the bus arrive?', options: ['8:00am', '8:15am', '8:30am', '8:45am'], answer: 1, explanation: 'The passage says "The bus came at exactly eight fifteen in the morning."' },
      { id: 6, type: 'multiple', question: 'What are the seats at the front of the bus reserved for?', options: ['Children and students', 'Bus drivers and staff', 'Elderly people and people with disabilities', 'People with transit cards'], answer: 2, explanation: 'The passage says "Some seats near the front were reserved for elderly people and people with disabilities."' },
      { id: 7, type: 'multiple', question: 'How do you signal that you want to get off the bus?', options: ['Press a button', 'Tell the driver', 'Pull a yellow cord', 'Wave your hand'], answer: 2, explanation: 'The passage says "pull this cord and the bus will stop at the next stop."' },
      { id: 8, type: 'multiple', question: 'What did the narrator do after learning to take the bus?', options: ['Bought a car', 'Stopped using the bus', 'Started taking the bus alone', 'Moved to a new neighborhood'], answer: 2, explanation: 'The passage says "I started taking the bus by myself."' },
      { id: 9, type: 'tfng', question: 'The bus stop had a red sign.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', explanation: 'The passage says "The bus stop had a blue sign" — not red.' },
      { id: 10, type: 'tfng', question: 'Lily gave the narrator a transit card.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE', explanation: 'The passage says "Lily gave me her old transit card with some money on it."' },
      { id: 11, type: 'tfng', question: 'The bus was dirty inside.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', explanation: 'The passage says "Inside, the bus was clean."' },
      { id: 12, type: 'tfng', question: 'The narrator pulled the cord to stop the bus on their first ride.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE', explanation: 'The passage says "When we arrived at our stop, I pulled the cord myself."' },
      { id: 13, type: 'tfng', question: 'The narrator thinks the bus is expensive.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', explanation: 'The passage says "The bus is cheap, convenient, and good for the environment."' },
      { id: 14, type: 'fillin', question: 'People must wait for others to ___ the bus before getting on.', answer: 'exit', explanation: 'The passage says "always wait for people to exit before you enter."' },
      { id: 15, type: 'fillin', question: 'The transit card is tapped on a ___ near the bus driver.', answer: 'reader', explanation: 'The passage says "You just tap it on a reader near the bus driver."' },
      { id: 16, type: 'fillin', question: 'The screen at the front of the bus shows the ___ stop.', answer: 'next', explanation: 'The passage says "the screen at the front that displayed the next stop."' },
      { id: 17, type: 'fillin', question: 'The bus driver said "___ a nice day!" as they got off.', answer: 'Have', explanation: 'The passage says "The bus driver said \'Have a nice day!\'"' },
      { id: 18, type: 'vocab', question: 'In the passage, "fare" means:', options: ['The bus schedule', 'The price you pay to ride the bus', 'The bus route map', 'A bus ticket office'], answer: 1, explanation: 'A "fare" is the money you pay to use public transport.' },
      { id: 19, type: 'vocab', question: 'In the passage, "convenient" means:', options: ['Expensive and difficult', 'Easy to use and helpful', 'Very fast', 'Very crowded'], answer: 1, explanation: '"Convenient" means easy to use and fitting well into your life.' },
      { id: 20, type: 'vocab', question: 'In the passage, "reserved" means:', options: ['Paid for in advance', 'Kept for a specific group of people', 'Very comfortable', 'Located at the back'], answer: 1, explanation: '"Reserved" means kept or set aside for a specific purpose or group.' },
    ]
  },
  {
    id: 5,
    level: 'basic',
    topic: 'Health',
    title: 'A Visit to the Doctor',
    passage: `Last week, I did not feel well. I had a sore throat, a headache, and a slight fever. I knew I needed to see a doctor. In my country, you can just walk into a clinic without an appointment. Here in America, you usually need to make an appointment first.

I called my doctor's office in the morning. The receptionist answered and asked for my name, date of birth, and the reason for my visit. She told me there was an appointment available at two o'clock in the afternoon. I said yes, and she confirmed the appointment. She also reminded me to bring my insurance card.

I arrived at the clinic five minutes early. I checked in at the front desk. The receptionist gave me a form to fill out. The form asked about my medical history, my allergies, and my current symptoms. I filled it out carefully. Some words were difficult for me, but the receptionist was helpful and explained what they meant.

After about fifteen minutes, a nurse called my name. She took me to a small examination room. She measured my height and weight. She also checked my blood pressure and temperature. My temperature was thirty-eight point two degrees Celsius — that is a mild fever.

Then the doctor came in. His name was Dr. Patel. He was a calm, gentle man. He asked me questions about my symptoms. He looked in my throat with a small light. He said my throat was red and slightly swollen. He listened to my chest with a stethoscope. He said my lungs were clear.

Dr. Patel told me I had a mild throat infection. He gave me a prescription for antibiotics. He also told me to drink plenty of water, rest as much as possible, and avoid cold drinks. He said I would feel better in about five days.

I went to the pharmacy next door and gave the pharmacist my prescription. The medicine cost eight dollars with my insurance. Without insurance, it would have been forty dollars. I went home, took my medicine, and rested. Three days later, I felt much better.`,
    questions: [
      { id: 1, type: 'multiple', question: 'What symptoms did the narrator have?', options: ['Stomachache and vomiting', 'Sore throat, headache, and slight fever', 'Cough and chest pain', 'Rash and itching'], answer: 1, explanation: 'The passage says "I had a sore throat, a headache, and a slight fever."' },
      { id: 2, type: 'multiple', question: 'What time was the appointment?', options: ['10am', '12pm', '2pm', '4pm'], answer: 2, explanation: 'The passage says "there was an appointment available at two o\'clock in the afternoon."' },
      { id: 3, type: 'multiple', question: 'What did the form at the clinic ask about?', options: ['Name and address only', 'Medical history, allergies, and symptoms', 'Insurance details and payment', 'Family members and their health'], answer: 1, explanation: 'The passage says "The form asked about my medical history, my allergies, and my current symptoms."' },
      { id: 4, type: 'multiple', question: 'What was the narrator\'s temperature?', options: ['37.0°C', '37.5°C', '38.2°C', '39.0°C'], answer: 2, explanation: 'The passage says "My temperature was thirty-eight point two degrees Celsius."' },
      { id: 5, type: 'multiple', question: 'What did Dr. Patel say about the narrator\'s lungs?', options: ['They were infected', 'They were weak', 'They were clear', 'They needed more tests'], answer: 2, explanation: 'The passage says "He said my lungs were clear."' },
      { id: 6, type: 'multiple', question: 'What did Dr. Patel diagnose?', options: ['A serious lung infection', 'A mild throat infection', 'The flu', 'Allergies'], answer: 1, explanation: 'The passage says "Dr. Patel told me I had a mild throat infection."' },
      { id: 7, type: 'multiple', question: 'How much did the medicine cost with insurance?', options: ['$4', '$8', '$40', '$80'], answer: 1, explanation: 'The passage says "The medicine cost eight dollars with my insurance."' },
      { id: 8, type: 'multiple', question: 'How long did Dr. Patel say recovery would take?', options: ['Two days', 'Three days', 'Five days', 'One week'], answer: 2, explanation: 'The passage says "He said I would feel better in about five days."' },
      { id: 9, type: 'tfng', question: 'The narrator needed an appointment to see the doctor.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE', explanation: 'The passage says "here in America, you usually need to make an appointment first."' },
      { id: 10, type: 'tfng', question: 'The nurse checked the narrator\'s blood pressure.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE', explanation: 'The passage says "She also checked my blood pressure and temperature."' },
      { id: 11, type: 'tfng', question: 'Dr. Patel prescribed vitamins.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', explanation: 'The passage says Dr. Patel "gave me a prescription for antibiotics" — not vitamins.' },
      { id: 12, type: 'tfng', question: 'The narrator felt better after three days.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE', explanation: 'The passage says "Three days later, I felt much better."' },
      { id: 13, type: 'tfng', question: 'The pharmacy was in a different building from the clinic.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', explanation: 'The passage says "I went to the pharmacy next door" — it was next door, not a different building.' },
      { id: 14, type: 'fillin', question: 'The receptionist reminded the narrator to bring their ___ card.', answer: 'insurance', explanation: 'The passage says "She also reminded me to bring my insurance card."' },
      { id: 15, type: 'fillin', question: 'Dr. Patel told the narrator to drink plenty of ___.', answer: 'water', explanation: 'The passage says "He also told me to drink plenty of water."' },
      { id: 16, type: 'fillin', question: 'The narrator arrived at the clinic ___ minutes early.', answer: 'five', explanation: 'The passage says "I arrived at the clinic five minutes early."' },
      { id: 17, type: 'fillin', question: 'Without insurance, the medicine would have cost ___ dollars.', answer: 'forty', explanation: 'The passage says "Without insurance, it would have been forty dollars."' },
      { id: 18, type: 'vocab', question: 'In the passage, "symptoms" means:', options: ['The name of a disease', 'Signs of illness that you feel or see', 'Medicine for a disease', 'A medical test'], answer: 1, explanation: '"Symptoms" are the signs or feelings that show you may be ill, like fever or pain.' },
      { id: 19, type: 'vocab', question: 'In the passage, "prescription" means:', options: ['A doctor\'s bill', 'A written order from a doctor for medicine', 'A medical test result', 'A health insurance form'], answer: 1, explanation: 'A "prescription" is a written note from a doctor telling the pharmacy what medicine to give you.' },
      { id: 20, type: 'vocab', question: 'In the passage, "mild" means:', options: ['Very serious', 'Not serious, not very strong', 'Getting worse', 'Very painful'], answer: 1, explanation: '"Mild" means not serious or not very strong — a mild fever is a low fever.' },
    ]
  },
  {
    id: 6,
    level: 'basic',
    topic: 'Daily Life',
    title: 'My Daily Routine',
    passage: `My name is Ko Ko. I am from Myanmar and I now live in Houston, Texas. I work at a restaurant as a kitchen assistant. My days are busy, but I have a good routine that helps me stay organized.

I wake up at six thirty every morning. First, I go to the bathroom to wash my face and brush my teeth. Then I get dressed. I usually wear comfortable clothes to work — black pants and a white t-shirt. My work uniform is kept at the restaurant, so I change when I arrive.

After getting dressed, I make breakfast. I usually eat rice with a fried egg and some vegetables. Sometimes I eat oatmeal with banana and honey if I am in a hurry. I always drink a glass of water and a cup of green tea in the morning.

I leave my apartment at seven forty-five. I take the bus to work. The ride takes about twenty-five minutes. During the bus ride, I like to listen to English podcasts or read news on my phone. This helps me practice English every day.

I start work at eight thirty. My job is to prepare ingredients for the chef. I wash and cut vegetables, measure spices, and organize the kitchen. The restaurant opens at eleven, so the morning is always busy with preparation. I work with two other kitchen assistants. Their names are Miguel and Thanh. We work well together.

I have a lunch break at one o'clock. I usually eat the staff meal, which is cooked by the chef. It is always different every day. After lunch, I continue working until four thirty in the afternoon.

After work, I go to the gym three times a week — on Monday, Wednesday, and Friday. I exercise for about an hour. Then I go home, cook dinner, shower, and relax. I often watch a movie or video call my family in Myanmar. They are seven hours ahead of Houston time.

I go to bed at ten thirty. Before sleeping, I write three new English words in my notebook. This is my habit for improving my English. I have been doing this for eight months and I now know many more words than before.`,
    questions: [
      { id: 1, type: 'multiple', question: 'Where does Ko Ko live?', options: ['Seattle, Washington', 'New York City', 'Houston, Texas', 'Los Angeles, California'], answer: 2, explanation: 'The passage says "I now live in Houston, Texas."' },
      { id: 2, type: 'multiple', question: 'What is Ko Ko\'s job?', options: ['A chef', 'A waiter', 'A kitchen assistant', 'A cashier'], answer: 2, explanation: 'The passage says "I work at a restaurant as a kitchen assistant."' },
      { id: 3, type: 'multiple', question: 'What does Ko Ko usually eat for breakfast?', options: ['Toast and coffee', 'Rice with a fried egg and vegetables', 'Cereal and milk', 'Pancakes and juice'], answer: 1, explanation: 'The passage says "I usually eat rice with a fried egg and some vegetables."' },
      { id: 4, type: 'multiple', question: 'How long does Ko Ko\'s bus ride take?', options: ['Fifteen minutes', 'Twenty minutes', 'Twenty-five minutes', 'Thirty minutes'], answer: 2, explanation: 'The passage says "The ride takes about twenty-five minutes."' },
      { id: 5, type: 'multiple', question: 'What does Ko Ko do during the bus ride?', options: ['Sleeps', 'Listens to music', 'Listens to English podcasts or reads news', 'Does homework'], answer: 2, explanation: 'The passage says "I like to listen to English podcasts or read news on my phone."' },
      { id: 6, type: 'multiple', question: 'When does the restaurant open?', options: ['At nine o\'clock', 'At ten o\'clock', 'At eleven o\'clock', 'At twelve o\'clock'], answer: 2, explanation: 'The passage says "The restaurant opens at eleven."' },
      { id: 7, type: 'multiple', question: 'On which days does Ko Ko go to the gym?', options: ['Tuesday, Thursday, Saturday', 'Monday, Wednesday, Friday', 'Monday, Thursday, Saturday', 'Every day'], answer: 1, explanation: 'The passage says "I go to the gym three times a week — on Monday, Wednesday, and Friday."' },
      { id: 8, type: 'multiple', question: 'What does Ko Ko write in their notebook before sleeping?', options: ['A diary entry', 'Three new English words', 'A to-do list', 'A letter to family'], answer: 1, explanation: 'The passage says "I write three new English words in my notebook."' },
      { id: 9, type: 'tfng', question: 'Ko Ko changes into work clothes at the restaurant.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE', explanation: 'The passage says "My work uniform is kept at the restaurant, so I change when I arrive."' },
      { id: 10, type: 'tfng', question: 'Ko Ko works with three other kitchen assistants.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', explanation: 'The passage says "I work with two other kitchen assistants" — not three.' },
      { id: 11, type: 'tfng', question: 'Ko Ko\'s family is in Myanmar.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE', explanation: 'The passage says "video call my family in Myanmar."' },
      { id: 12, type: 'tfng', question: 'Myanmar is seven hours behind Houston time.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', explanation: 'The passage says "They are seven hours ahead of Houston time" — ahead, not behind.' },
      { id: 13, type: 'tfng', question: 'Ko Ko has been writing English words for over a year.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', explanation: 'The passage says "I have been doing this for eight months" — less than a year.' },
      { id: 14, type: 'fillin', question: 'Ko Ko wakes up at ___ every morning.', answer: 'six thirty', explanation: 'The passage says "I wake up at six thirty every morning."' },
      { id: 15, type: 'fillin', question: 'Ko Ko\'s coworkers are named Miguel and ___.', answer: 'Thanh', explanation: 'The passage says "Their names are Miguel and Thanh."' },
      { id: 16, type: 'fillin', question: 'Ko Ko has a lunch break at ___ o\'clock.', answer: 'one', explanation: 'The passage says "I have a lunch break at one o\'clock."' },
      { id: 17, type: 'fillin', question: 'Ko Ko goes to bed at ___.', answer: 'ten thirty', explanation: 'The passage says "I go to bed at ten thirty."' },
      { id: 18, type: 'vocab', question: 'In the passage, "routine" means:', options: ['A type of exercise', 'A regular set of activities done in the same order', 'A type of food', 'A work schedule'], answer: 1, explanation: 'A "routine" is a regular pattern of activities you do at the same time each day.' },
      { id: 19, type: 'vocab', question: 'In the passage, "ingredients" means:', options: ['Kitchen tools and equipment', 'The foods used to make a dish', 'Cooking instructions', 'Restaurant customers'], answer: 1, explanation: '"Ingredients" are the individual food items used to prepare a dish or recipe.' },
      { id: 20, type: 'vocab', question: 'In the passage, "habit" means:', options: ['A type of clothing', 'Something you do regularly without thinking', 'A difficult task', 'A type of exercise'], answer: 1, explanation: 'A "habit" is something you do regularly, often without thinking — like a daily routine.' },
    ]
  },
  {
    id: 7,
    level: 'basic',
    topic: 'Work & People',
    title: 'Making Friends at Work',
    passage: `Starting a new job in a new country can be very difficult. You have to learn new tasks, follow new rules, and communicate with people in a new language. When I started working at my first job in America — a hotel near the airport — I was nervous and shy.

On my first day, my manager gave me a tour of the hotel. She showed me the front desk, the kitchen, the laundry room, and the storage area. She explained my duties. I was a housekeeper. My job was to clean guest rooms, change bed sheets, replace towels, and make sure everything was tidy.

I worked on a team with five other housekeepers. Most of them were immigrants, like me. There was a woman named Rosa from El Salvador, a man named Hamid from Somalia, a woman named Lin from China, and two brothers named James and Samuel from Nigeria. We were all from different countries, but we all had one thing in common — we were building a new life in America.

At first, I was quiet and kept to myself. I was afraid to make mistakes when speaking English. But Rosa was very kind. On the second day, she offered me some homemade tamales during our break. She said, "I make too much food at home. Please eat." I said thank you and tried one. It was delicious. That small act of kindness made me feel much more comfortable.

After that, we started talking more during breaks. Hamid was very funny and always made everyone laugh. Lin was quiet like me, but she helped me when I could not understand something. The two brothers, James and Samuel, loved football and always talked about soccer matches on weekends.

Within a month, we had become a real team — not just at work but as friends. We celebrated each other's birthdays and shared food from our home countries. I brought mohinga, a Burmese fish noodle soup, once. Everyone loved it.

Working in that hotel was not easy. The work was physically hard and the days were long. But having good friends at work made everything better. I learned that kindness has no language barrier.`,
    questions: [
      { id: 1, type: 'multiple', question: 'Where did the narrator work?', options: ['A restaurant near a mall', 'A hotel near the airport', 'A school near downtown', 'A hospital near the city center'], answer: 1, explanation: 'The passage says "a hotel near the airport."' },
      { id: 2, type: 'multiple', question: 'What was the narrator\'s job at the hotel?', options: ['A receptionist', 'A chef', 'A housekeeper', 'A security guard'], answer: 2, explanation: 'The passage says "I was a housekeeper."' },
      { id: 3, type: 'multiple', question: 'How many other housekeepers were on the team?', options: ['Three', 'Four', 'Five', 'Six'], answer: 2, explanation: 'The passage says "I worked on a team with five other housekeepers."' },
      { id: 4, type: 'multiple', question: 'Where is Rosa from?', options: ['Mexico', 'El Salvador', 'Colombia', 'Guatemala'], answer: 1, explanation: 'The passage says "There was a woman named Rosa from El Salvador."' },
      { id: 5, type: 'multiple', question: 'What did Rosa give the narrator on the second day?', options: ['A sandwich', 'Homemade tamales', 'Rice and beans', 'A gift card'], answer: 1, explanation: 'The passage says "she offered me some homemade tamales during our break."' },
      { id: 6, type: 'multiple', question: 'Who was described as funny?', options: ['Rosa', 'Lin', 'Hamid', 'Samuel'], answer: 2, explanation: 'The passage says "Hamid was very funny and always made everyone laugh."' },
      { id: 7, type: 'multiple', question: 'What did James and Samuel love talking about?', options: ['Movies and music', 'Football and soccer matches', 'Food from their country', 'Their families'], answer: 1, explanation: 'The passage says "James and Samuel loved football and always talked about soccer matches."' },
      { id: 8, type: 'multiple', question: 'What Burmese food did the narrator bring to share?', options: ['Fried rice', 'Curry', 'Mohinga', 'Spring rolls'], answer: 2, explanation: 'The passage says "I brought mohinga, a Burmese fish noodle soup."' },
      { id: 9, type: 'tfng', question: 'The narrator was confident on their first day of work.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', explanation: 'The passage says "I was nervous and shy."' },
      { id: 10, type: 'tfng', question: 'All six housekeepers were from different countries.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', explanation: 'James and Samuel are brothers from Nigeria — they share the same country, so not all six are from different countries.' },
      { id: 11, type: 'tfng', question: 'Lin helped the narrator understand things.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE', explanation: 'The passage says "Lin was quiet like me, but she helped me when I could not understand something."' },
      { id: 12, type: 'tfng', question: 'The narrator\'s team celebrated each other\'s birthdays.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE', explanation: 'The passage says "We celebrated each other\'s birthdays."' },
      { id: 13, type: 'tfng', question: 'The narrator found the job physically easy.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', explanation: 'The passage says "The work was physically hard and the days were long."' },
      { id: 14, type: 'fillin', question: 'The narrator\'s job included cleaning guest rooms and changing ___ sheets.', answer: 'bed', explanation: 'The passage says "change bed sheets."' },
      { id: 15, type: 'fillin', question: 'The narrator was afraid to make ___ when speaking English.', answer: 'mistakes', explanation: 'The passage says "I was afraid to make mistakes when speaking English."' },
      { id: 16, type: 'fillin', question: 'Within a ___, the team had become real friends.', answer: 'month', explanation: 'The passage says "Within a month, we had become a real team."' },
      { id: 17, type: 'fillin', question: 'Mohinga is a Burmese fish ___ soup.', answer: 'noodle', explanation: 'The passage says "mohinga, a Burmese fish noodle soup."' },
      { id: 18, type: 'vocab', question: 'In the passage, "duties" means:', options: ['Rules to follow', 'Tasks and responsibilities of your job', 'Working hours', 'Payment and salary'], answer: 1, explanation: '"Duties" are the tasks and responsibilities that are part of your job.' },
      { id: 19, type: 'vocab', question: 'In the passage, "tidy" means:', options: ['Clean and well-organized', 'Very large', 'Very comfortable', 'Empty and bare'], answer: 0, explanation: '"Tidy" means clean, neat, and well-organized.' },
      { id: 20, type: 'vocab', question: 'In the passage, "language barrier" means:', options: ['A wall in a classroom', 'Difficulty communicating because of different languages', 'A type of translation app', 'A language class'], answer: 1, explanation: 'A "language barrier" is the difficulty in communicating when people speak different languages.' },
    ]
  },
  {
    id: 8,
    level: 'basic',
    topic: 'Housing',
    title: 'Renting an Apartment',
    passage: `Finding a place to live is one of the first big challenges when you move to a new country. When I arrived in Chicago, I stayed with my cousin for two weeks. But I knew I needed to find my own apartment as soon as possible.

My cousin helped me search for apartments online. We used a website that lists available apartments in the city. You can filter by price, number of bedrooms, and neighborhood. I was looking for a one-bedroom apartment with a budget of nine hundred dollars per month.

We found several options. The first apartment we visited was on the third floor of an old building. It had one bedroom, a small kitchen, and a bathroom. The living room was a good size. But there was no elevator, and I had to carry everything up three flights of stairs. I also noticed some cracks in the walls. The landlord said the building was over sixty years old.

The second apartment was much newer. It had large windows, a modern kitchen, and in-unit laundry — which means the washing machine and dryer were inside the apartment. This was very convenient. The building also had a gym and a rooftop area. However, the rent was eleven hundred dollars — two hundred dollars over my budget.

The third apartment was the best for me. It was on the second floor of a quiet building. The apartment had one bedroom, a clean kitchen, and a good-sized bathroom. There was no in-unit laundry, but there was a shared laundry room in the basement. The rent was eight hundred and fifty dollars — fifty dollars under my budget. The neighborhood was safe and close to a bus stop and a grocery store.

I decided to rent the third apartment. The landlord asked for a security deposit equal to one month's rent. He also asked for my work contract and two recent pay stubs to prove I had income. I signed a twelve-month lease agreement.

Moving in was exciting. My cousin helped me carry my boxes. I did not have much furniture. I bought a bed, a small table, and two chairs from a secondhand store. Slowly, my empty apartment started to feel like home.`,
    questions: [
      { id: 1, type: 'multiple', question: 'Where did the narrator stay when they first arrived in Chicago?', options: ['In a hotel', 'With a friend', 'With a cousin', 'In a hostel'], answer: 2, explanation: 'The passage says "I stayed with my cousin for two weeks."' },
      { id: 2, type: 'multiple', question: 'What was the narrator\'s monthly budget for rent?', options: ['$800', '$900', '$1,000', '$1,100'], answer: 1, explanation: 'The passage says "I was looking for a one-bedroom apartment with a budget of nine hundred dollars per month."' },
      { id: 3, type: 'multiple', question: 'What problem did the first apartment have?', options: ['It was too expensive', 'It was too far from work', 'No elevator and cracks in the walls', 'It was too small'], answer: 2, explanation: 'The passage says "there was no elevator" and "I noticed some cracks in the walls."' },
      { id: 4, type: 'multiple', question: 'What special feature did the second apartment have?', options: ['A swimming pool', 'In-unit laundry', 'A private garden', 'A parking space'], answer: 1, explanation: 'The passage says "in-unit laundry — which means the washing machine and dryer were inside the apartment."' },
      { id: 5, type: 'multiple', question: 'How much was the rent for the second apartment?', options: ['$850', '$900', '$1,000', '$1,100'], answer: 3, explanation: 'The passage says "the rent was eleven hundred dollars."' },
      { id: 6, type: 'multiple', question: 'Where was the laundry room in the third apartment building?', options: ['On the rooftop', 'In the lobby', 'In the basement', 'On each floor'], answer: 2, explanation: 'The passage says "there was a shared laundry room in the basement."' },
      { id: 7, type: 'multiple', question: 'What documents did the landlord ask for?', options: ['Passport and birth certificate', 'Work contract and two recent pay stubs', 'Bank statements and references', 'ID and school certificate'], answer: 1, explanation: 'The passage says "He also asked for my work contract and two recent pay stubs."' },
      { id: 8, type: 'multiple', question: 'Where did the narrator buy furniture?', options: ['From a new furniture store', 'Online', 'From a secondhand store', 'From a neighbor'], answer: 2, explanation: 'The passage says "I bought a bed, a small table, and two chairs from a secondhand store."' },
      { id: 9, type: 'tfng', question: 'The first apartment building was over sixty years old.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE', explanation: 'The passage says "The landlord said the building was over sixty years old."' },
      { id: 10, type: 'tfng', question: 'The second apartment had a gym.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE', explanation: 'The passage says "The building also had a gym and a rooftop area."' },
      { id: 11, type: 'tfng', question: 'The narrator chose the second apartment.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', explanation: 'The passage says "I decided to rent the third apartment."' },
      { id: 12, type: 'tfng', question: 'The third apartment was close to a bus stop.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE', explanation: 'The passage says "The neighborhood was safe and close to a bus stop and a grocery store."' },
      { id: 13, type: 'tfng', question: 'The narrator had a lot of furniture when they moved in.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', explanation: 'The passage says "I did not have much furniture."' },
      { id: 14, type: 'fillin', question: 'The narrator searched for apartments using a ___ online.', answer: 'website', explanation: 'The passage says "We used a website that lists available apartments."' },
      { id: 15, type: 'fillin', question: 'The security deposit was equal to one ___ rent.', answer: "month's", explanation: 'The passage says "a security deposit equal to one month\'s rent."' },
      { id: 16, type: 'fillin', question: 'The narrator signed a twelve-month ___ agreement.', answer: 'lease', explanation: 'The passage says "I signed a twelve-month lease agreement."' },
      { id: 17, type: 'fillin', question: 'The third apartment cost ___ dollars per month.', answer: 'eight hundred and fifty', explanation: 'The passage says "The rent was eight hundred and fifty dollars."' },
      { id: 18, type: 'vocab', question: 'In the passage, "budget" means:', options: ['A type of apartment', 'The maximum amount of money you plan to spend', 'A monthly bill', 'A rental agreement'], answer: 1, explanation: 'A "budget" is the amount of money you have available or plan to spend on something.' },
      { id: 19, type: 'vocab', question: 'In the passage, "security deposit" means:', options: ['A monthly rent payment', 'Money paid in advance that is returned when you leave if there is no damage', 'A fee for moving in', 'A type of insurance'], answer: 1, explanation: 'A "security deposit" is money you pay before moving in, which the landlord returns when you leave if you haven\'t damaged anything.' },
      { id: 20, type: 'vocab', question: 'In the passage, "lease" means:', options: ['A utility bill', 'A key to the apartment', 'A legal rental agreement between a tenant and landlord', 'A type of furniture'], answer: 2, explanation: 'A "lease" is a legal agreement between you and the landlord that says how long you will rent the apartment and how much you will pay.' },
    ]
  },
  {
    id: 9,
    level: 'basic',
    topic: 'Food & Culture',
    title: 'Eating at an American Restaurant',
    passage: `Before I came to America, I had never eaten at an American restaurant. In Myanmar, we usually eat at small food stalls or cook at home. Going to a sit-down restaurant in America was a completely new experience for me.

The first time I went to an American restaurant, my coworker David invited me. He said, "Let's go to my favorite diner on Saturday." A diner is a casual American restaurant. They serve breakfast, lunch, and dinner. They are usually open very early and close late at night.

When we arrived at the diner, a staff member greeted us at the entrance. She said, "Good morning! How many?" David said "Two." She led us to a table by the window and gave us menus. The menus were large — almost the size of a newspaper. There were so many choices that I did not know what to order.

David explained some of the dishes. He said pancakes are a popular American breakfast — thick, flat, and fluffy cakes served with butter and maple syrup. He recommended the eggs Benedict, which is a dish with a poached egg on top of Canadian bacon and toast, covered with a creamy yellow sauce called hollandaise. It sounded very interesting.

I decided to try the eggs Benedict. David ordered pancakes and bacon. The waitress came to take our order. She also asked if we wanted coffee. David said yes. I was not sure, so I ordered orange juice instead.

The food arrived after about ten minutes. My eggs Benedict looked beautiful. The yellow sauce was rich and creamy. I cut into the egg and the yolk ran out. It was soft and delicious. David's pancakes were huge — three thick cakes stacked on top of each other with a small container of maple syrup.

At the end of the meal, the waitress brought the check. In America, it is common to leave a tip for the server — usually fifteen to twenty percent of the bill. David explained this to me. Our bill was twenty-two dollars. We each paid eleven dollars, and we each left a few dollars as a tip.

I loved my first experience at an American diner. The food was very different from what I was used to, but it was delicious. I have been back to that diner many times since then.`,
    questions: [
      { id: 1, type: 'multiple', question: 'Who invited the narrator to the diner?', options: ['A neighbor', 'A family member', 'A coworker named David', 'A friend from Myanmar'], answer: 2, explanation: 'The passage says "my coworker David invited me."' },
      { id: 2, type: 'multiple', question: 'What type of restaurant is a "diner"?', options: ['A very expensive formal restaurant', 'A casual American restaurant', 'A fast food place', 'A food truck'], answer: 1, explanation: 'The passage says "A diner is a casual American restaurant."' },
      { id: 3, type: 'multiple', question: 'What are pancakes served with?', options: ['Cheese and eggs', 'Butter and maple syrup', 'Cream and strawberries', 'Bacon and toast'], answer: 1, explanation: 'The passage says pancakes are "served with butter and maple syrup."' },
      { id: 4, type: 'multiple', question: 'What did the narrator order to drink?', options: ['Coffee', 'Tea', 'Orange juice', 'Water'], answer: 2, explanation: 'The passage says "I ordered orange juice instead."' },
      { id: 5, type: 'multiple', question: 'What did the narrator order to eat?', options: ['Pancakes', 'Bacon and eggs', 'Eggs Benedict', 'A burger'], answer: 2, explanation: 'The passage says "I decided to try the eggs Benedict."' },
      { id: 6, type: 'multiple', question: 'How long did it take for the food to arrive?', options: ['Five minutes', 'Ten minutes', 'Twenty minutes', 'Thirty minutes'], answer: 1, explanation: 'The passage says "The food arrived after about ten minutes."' },
      { id: 7, type: 'multiple', question: 'How many pancakes did David get?', options: ['One', 'Two', 'Three', 'Four'], answer: 2, explanation: 'The passage says "three thick cakes stacked on top of each other."' },
      { id: 8, type: 'multiple', question: 'How much did each person pay for the meal?', options: ['$11', '$15', '$22', '$44'], answer: 0, explanation: 'The passage says "Our bill was twenty-two dollars. We each paid eleven dollars."' },
      { id: 9, type: 'tfng', question: 'Diners in America are usually closed in the morning.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', explanation: 'The passage says diners "are usually open very early" — they are open in the morning.' },
      { id: 10, type: 'tfng', question: 'The narrator had eaten at an American restaurant before coming to the US.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', explanation: 'The passage says "Before I came to America, I had never eaten at an American restaurant."' },
      { id: 11, type: 'tfng', question: 'Hollandaise is a creamy yellow sauce.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE', explanation: 'The passage says "a creamy yellow sauce called hollandaise."' },
      { id: 12, type: 'tfng', question: 'The narrator did not enjoy the eggs Benedict.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', explanation: 'The passage says "It was soft and delicious." The narrator enjoyed it.' },
      { id: 13, type: 'tfng', question: 'The narrator has returned to the diner since their first visit.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE', explanation: 'The passage says "I have been back to that diner many times since then."' },
      { id: 14, type: 'fillin', question: 'In America, it is common to leave a ___ for the server.', answer: 'tip', explanation: 'The passage says "it is common to leave a tip for the server."' },
      { id: 15, type: 'fillin', question: 'The typical tip is ___ to twenty percent of the bill.', answer: 'fifteen', explanation: 'The passage says "usually fifteen to twenty percent of the bill."' },
      { id: 16, type: 'fillin', question: 'The waitress brought the ___ at the end of the meal.', answer: 'check', explanation: 'The passage says "the waitress brought the check."' },
      { id: 17, type: 'fillin', question: 'The menus were large — almost the size of a ___.', answer: 'newspaper', explanation: 'The passage says "The menus were large — almost the size of a newspaper."' },
      { id: 18, type: 'vocab', question: 'In the passage, "casual" means:', options: ['Very expensive and formal', 'Relaxed and informal', 'Very busy and crowded', 'New and modern'], answer: 1, explanation: '"Casual" means relaxed and informal — not fancy or formal.' },
      { id: 19, type: 'vocab', question: 'In the passage, "fluffy" means:', options: ['Very hard', 'Very sweet', 'Light, soft, and airy', 'Very thin and flat'], answer: 2, explanation: '"Fluffy" means light, soft, and airy — like a pillow or a soft cake.' },
      { id: 20, type: 'vocab', question: 'In the passage, "yolk" means:', options: ['The white part of an egg', 'The yellow part in the center of an egg', 'The shell of an egg', 'A type of sauce'], answer: 1, explanation: 'The "yolk" is the round yellow part in the center of an egg.' },
    ]
  },
  {
    id: 10,
    level: 'basic',
    topic: 'Communication',
    title: 'A Phone Call with Customer Service',
    passage: `In Myanmar, when you have a problem with a product or service, you usually go to the shop in person and talk to someone face to face. In America, many problems are solved by calling customer service on the phone. At first, I found this very difficult.

My first experience with customer service was when my internet stopped working. I had been using the same internet provider for three months, and suddenly the connection was gone. I checked all the cables and restarted my router, but nothing worked. I knew I had to call the company.

I was nervous because I was not confident in my spoken English, especially on the phone. When you talk on the phone, you cannot see the person's face or their expressions. You have to understand everything just from their voice. I practiced what I wanted to say before calling.

I dialed the customer service number and waited. First, I heard a recorded message: "Thank you for calling FastConnect. For English, press 1. For Spanish, press 2." I pressed 1. Then the recording said, "For technical support, press 1. For billing, press 2. To speak to a representative, press 0." I pressed 1.

I waited on hold for about eight minutes. Hold music played. Then a person answered. She said, "Thank you for calling FastConnect. My name is Sarah. How can I help you today?" I explained my problem. I said, "Hello. My internet is not working. I checked everything but it's still not connecting."

Sarah was patient and clear. She asked for my account number and my address. Then she asked me to do several things: turn off my router, wait thirty seconds, and turn it back on. She called this "rebooting" the router. I did it, but the internet still did not work. She then said there might be an outage in my area. She checked on her computer and confirmed that there was a network problem affecting several homes in my neighborhood. She said a technician would come to fix it within twenty-four hours.

True to her word, the technician arrived the next morning. He found a problem with the cable outside my building and fixed it in thirty minutes. My internet worked again.

After that experience, I felt much more confident about calling customer service. I learned that if you speak clearly and politely, most customer service agents will be patient and helpful.`,
    questions: [
      { id: 1, type: 'multiple', question: 'What problem did the narrator have?', options: ['Their phone stopped working', 'Their electricity went out', 'Their internet stopped working', 'Their water was not running'], answer: 2, explanation: 'The passage says "my internet stopped working."' },
      { id: 2, type: 'multiple', question: 'How long had the narrator been using the internet provider?', options: ['One month', 'Two months', 'Three months', 'Six months'], answer: 2, explanation: 'The passage says "I had been using the same internet provider for three months."' },
      { id: 3, type: 'multiple', question: 'Why was the narrator nervous about calling?', options: ['They had never used a phone before', 'They could not see the person\'s face on a call', 'The company was far away', 'The call was very expensive'], answer: 1, explanation: 'The passage says "you cannot see the person\'s face or their expressions. You have to understand everything just from their voice."' },
      { id: 4, type: 'multiple', question: 'How long did the narrator wait on hold?', options: ['Three minutes', 'Five minutes', 'Eight minutes', 'Fifteen minutes'], answer: 2, explanation: 'The passage says "I waited on hold for about eight minutes."' },
      { id: 5, type: 'multiple', question: 'What was the name of the customer service agent?', options: ['Susan', 'Sandra', 'Sophie', 'Sarah'], answer: 3, explanation: 'The passage says "My name is Sarah."' },
      { id: 6, type: 'multiple', question: 'What does "rebooting" the router mean?', options: ['Replacing the router', 'Turning it off and on again', 'Checking the cables', 'Calling the technician'], answer: 1, explanation: 'The passage says Sarah asked the narrator to turn off the router, wait, and turn it back on — "She called this \'rebooting\' the router."' },
      { id: 7, type: 'multiple', question: 'What was the real cause of the problem?', options: ['A broken router', 'A network outage in the area', 'Wrong password', 'Unpaid bill'], answer: 1, explanation: 'The passage says "there was a network problem affecting several homes in my neighborhood."' },
      { id: 8, type: 'multiple', question: 'How long did the technician take to fix the problem?', options: ['Ten minutes', 'Thirty minutes', 'One hour', 'Two hours'], answer: 1, explanation: 'The passage says "He found a problem with the cable outside my building and fixed it in thirty minutes."' },
      { id: 9, type: 'tfng', question: 'The narrator practiced what to say before calling.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE', explanation: 'The passage says "I practiced what I wanted to say before calling."' },
      { id: 10, type: 'tfng', question: 'The narrator pressed 2 for English.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', explanation: 'The passage says "For English, press 1" and "I pressed 1." Not 2.' },
      { id: 11, type: 'tfng', question: 'Rebooting the router fixed the internet problem.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', explanation: 'The passage says "I did it, but the internet still did not work." The real problem was a network outage.' },
      { id: 12, type: 'tfng', question: 'The technician came the next morning.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE', explanation: 'The passage says "the technician arrived the next morning."' },
      { id: 13, type: 'tfng', question: 'The narrator felt less confident after the phone call experience.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE', explanation: 'The passage says "I felt much more confident about calling customer service."' },
      { id: 14, type: 'fillin', question: 'The name of the internet company was ___.', answer: 'FastConnect', explanation: 'The passage says "Thank you for calling FastConnect."' },
      { id: 15, type: 'fillin', question: 'Sarah asked the narrator to turn off the router and wait ___ seconds.', answer: 'thirty', explanation: 'The passage says "turn off my router, wait thirty seconds, and turn it back on."' },
      { id: 16, type: 'fillin', question: 'The technician found a problem with the ___ outside the building.', answer: 'cable', explanation: 'The passage says "He found a problem with the cable outside my building."' },
      { id: 17, type: 'fillin', question: 'Sarah said a ___ would come within twenty-four hours.', answer: 'technician', explanation: 'The passage says "a technician would come to fix it within twenty-four hours."' },
      { id: 18, type: 'vocab', question: 'In the passage, "on hold" means:', options: ['Hanging up the phone', 'Waiting on the phone while the agent is busy', 'Being transferred to another agent', 'Speaking to a recorded message'], answer: 1, explanation: '"On hold" means you are waiting on the phone while the other person checks something or finds the right person to help you.' },
      { id: 19, type: 'vocab', question: 'In the passage, "outage" means:', options: ['A phone call', 'A service interruption — when something stops working', 'A type of cable', 'A technical support visit'], answer: 1, explanation: 'An "outage" is when a service (like internet, electricity, or water) stops working, often affecting many people.' },
      { id: 20, type: 'vocab', question: 'In the passage, "representative" means:', options: ['A recorded message', 'A person who speaks on behalf of a company', 'A type of phone menu', 'A technical engineer'], answer: 1, explanation: 'A "representative" (or "agent") is a person who works for a company and helps customers.' },
    ]
  },
]
