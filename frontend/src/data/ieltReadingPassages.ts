export type Difficulty = "easy" | "medium" | "hard"
export type TFNGAnswer = "TRUE" | "FALSE" | "NOT GIVEN"

export interface TFNGQuestion {
  id: number
  type: "tfng"
  question: string
  answer: TFNGAnswer
  explanation: string
}

export interface MultipleQuestion {
  id: number
  type: "multiple"
  question: string
  options: string[]
  answer: number
  explanation: string
}

export interface FillInQuestion {
  id: number
  type: "fillin"
  question: string
  answer: string
  alternatives: string[]
  explanation: string
}

export interface MatchingQuestion {
  id: number
  type: "matching"
  question: string
  options: string[]
  answer: number
  explanation: string
}

export type PassageQuestion = TFNGQuestion | MultipleQuestion | FillInQuestion | MatchingQuestion

export interface ReadingPassage {
  id: number
  title: string
  topic: string
  difficulty: Difficulty
  passage: string
  questions: PassageQuestion[]
}

export const readingPassages: ReadingPassage[] = [
  {
    id: 1,
    title: "The Renewable Energy Revolution",
    topic: "Environment",
    difficulty: "medium",
    passage: `The transition from fossil fuels to renewable energy sources represents one of the most significant economic and technological transformations in human history. Solar and wind power, once regarded as expensive novelties suitable only for niche applications, have undergone dramatic cost reductions over the past two decades that have fundamentally altered the global energy landscape. The cost of solar photovoltaic electricity has fallen by more than 90 percent since 2010, making it the cheapest source of electricity in history according to the International Energy Agency's 2020 assessment.

A. The driving forces behind this transformation are multiple and mutually reinforcing. Technological innovation has improved the efficiency of solar panels and wind turbines while simultaneously reducing manufacturing costs. Economies of scale have emerged as production volumes have grown, further driving down unit costs. Policy support in the form of subsidies, tax incentives, and renewable portfolio standards has created stable demand that encouraged investment and accelerated the learning curve. China's emergence as the dominant manufacturer of solar panels has introduced intense competitive pressure that has compressed margins and reduced prices globally.

B. Despite this progress, the transition to renewable energy faces substantial technical challenges. The intermittent nature of solar and wind power — they generate electricity only when the sun shines or the wind blows — creates integration challenges for electricity grids designed around controllable fossil fuel generators. Grid operators must balance supply and demand in real time, and the variability of renewables complicates this task. The solution most commonly proposed is energy storage, particularly batteries, which can absorb excess renewable generation and discharge it when needed. Battery costs have also fallen dramatically, though significant further reductions will be needed for storage to fully address intermittency at grid scale.

C. The geographic distribution of renewable resources is uneven, creating both opportunities and complications for energy policy. Some regions possess exceptional solar or wind resources that could theoretically generate far more electricity than they consume. The Sahara Desert, for example, receives enough solar radiation to meet global electricity demand many times over. However, transmitting electricity over very long distances involves significant losses and requires substantial infrastructure investment. The development of high-voltage direct current transmission technology has reduced these losses and made intercontinental electricity trade more feasible, though political and regulatory barriers remain formidable.

D. The employment implications of the energy transition are contested. The fossil fuel industry directly employs millions of workers worldwide, concentrated in particular regions and communities where these industries have historically dominated local economies. The decline of coal mining has already caused significant economic hardship in communities across the United States, the United Kingdom, Germany, and Australia. Renewable energy industries are growing rapidly and creating new jobs, but these are often located in different places and require different skills than the fossil fuel jobs they are replacing. Managing this transition fairly — ensuring that the costs are not disproportionately borne by workers and communities in fossil fuel regions — has emerged as a central challenge for energy policy.

E. The pace of the renewable energy transition varies significantly across countries and regions, shaped by their resource endowments, existing energy infrastructure, political systems, and economic circumstances. Countries with abundant renewable resources and limited existing fossil fuel infrastructure, such as Iceland and Costa Rica, have achieved very high shares of renewable electricity with relative ease. Countries with large existing investments in fossil fuel infrastructure face greater transition costs, as assets risk becoming stranded before the end of their economic lives. Developing nations face the dilemma of whether to build new fossil fuel infrastructure to meet growing energy demand quickly and cheaply, or to leapfrog directly to renewables at potentially higher upfront cost but lower long-term risk.

F. International climate agreements, particularly the Paris Agreement adopted in 2015, have created political frameworks that encourage countries to accelerate their energy transitions. The agreement's goal of limiting global warming to well below 2 degrees Celsius above pre-industrial levels implies a near-complete decarbonisation of the global energy system by mid-century. Meeting this target requires not only rapid deployment of renewable electricity but also the electrification of sectors currently powered by fossil fuels, including transport, heating, and industrial processes. The scale and speed of transformation required is unprecedented in the history of energy systems, raising fundamental questions about whether market forces alone can drive change quickly enough or whether more direct government intervention will be necessary.`,
    questions: [
      {
        id: 1,
        type: "tfng",
        question: "Solar electricity costs have fallen by more than 90 percent since 2010.",
        answer: "TRUE",
        explanation: "The passage directly states 'the cost of solar photovoltaic electricity has fallen by more than 90 percent since 2010.'"
      },
      {
        id: 2,
        type: "tfng",
        question: "China is the dominant manufacturer of wind turbines globally.",
        answer: "FALSE",
        explanation: "The passage states China is the dominant manufacturer of solar panels — not wind turbines."
      },
      {
        id: 3,
        type: "tfng",
        question: "The Sahara Desert could theoretically generate enough electricity to meet global demand many times over.",
        answer: "TRUE",
        explanation: "The passage directly states the Sahara 'receives enough solar radiation to meet global electricity demand many times over.'"
      },
      {
        id: 4,
        type: "tfng",
        question: "The Paris Agreement aims to limit warming to exactly 2 degrees Celsius.",
        answer: "FALSE",
        explanation: "The passage states the goal is 'well below 2 degrees Celsius' — not exactly 2 degrees."
      },
      {
        id: 5,
        type: "multiple",
        question: "According to the passage, what is the main technical challenge facing renewable energy integration?",
        options: [
          "The high cost of solar panels",
          "The intermittent nature of solar and wind generation",
          "The lack of suitable land for wind farms",
          "The shortage of trained engineers"
        ],
        answer: 1,
        explanation: "The passage identifies 'the intermittent nature of solar and wind power' as creating 'integration challenges for electricity grids.'"
      },
      {
        id: 6,
        type: "multiple",
        question: "Which countries have achieved high shares of renewable electricity most easily?",
        options: [
          "Countries with large fossil fuel industries",
          "Countries with advanced manufacturing sectors",
          "Countries with abundant renewable resources and limited fossil fuel infrastructure",
          "Countries that signed the Paris Agreement early"
        ],
        answer: 2,
        explanation: "The passage states 'countries with abundant renewable resources and limited existing fossil fuel infrastructure, such as Iceland and Costa Rica, have achieved very high shares of renewable electricity with relative ease.'"
      },
      {
        id: 7,
        type: "multiple",
        question: "What problem does the passage identify regarding renewable energy jobs?",
        options: [
          "There are not enough renewable energy jobs being created",
          "Renewable jobs are in different locations and require different skills than fossil fuel jobs",
          "Renewable energy workers are paid less than fossil fuel workers",
          "Governments refuse to fund renewable energy job training"
        ],
        answer: 1,
        explanation: "The passage states renewable jobs 'are often located in different places and require different skills than the fossil fuel jobs they are replacing.'"
      },
      {
        id: 8,
        type: "multiple",
        question: "What does the passage say about high-voltage direct current transmission?",
        options: [
          "It has made intercontinental electricity trade impossible",
          "It has increased electricity transmission losses",
          "It has reduced transmission losses and made intercontinental trade more feasible",
          "It remains too expensive for practical use"
        ],
        answer: 2,
        explanation: "The passage states HVDC technology 'has reduced these losses and made intercontinental electricity trade more feasible.'"
      },
      {
        id: 9,
        type: "fillin",
        question: "The IEA described solar as the __________ source of electricity in history in its 2020 assessment.",
        answer: "cheapest",
        alternatives: ["most affordable", "least expensive"],
        explanation: "The passage states the IEA called solar 'the cheapest source of electricity in history' in its 2020 assessment."
      },
      {
        id: 10,
        type: "fillin",
        question: "Grid operators must balance __________ and demand in real time to manage renewable energy variability.",
        answer: "supply",
        alternatives: [],
        explanation: "The passage states 'grid operators must balance supply and demand in real time.'"
      },
      {
        id: 11,
        type: "fillin",
        question: "Countries that build new fossil fuel infrastructure risk having those assets become __________ before the end of their economic lives.",
        answer: "stranded",
        alternatives: [],
        explanation: "The passage warns that assets 'risk becoming stranded before the end of their economic lives.'"
      },
      {
        id: 12,
        type: "matching",
        question: "Which paragraph discusses the unequal geographic distribution of renewable resources?",
        options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"],
        answer: 2,
        explanation: "Paragraph C discusses how 'the geographic distribution of renewable resources is uneven' and mentions the Sahara Desert example."
      },
      {
        id: 13,
        type: "matching",
        question: "Which paragraph explains the employment challenges caused by the energy transition?",
        options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"],
        answer: 3,
        explanation: "Paragraph D discusses how the fossil fuel industry employs millions and how the transition has caused 'significant economic hardship in communities.'"
      }
    ]
  },
  {
    id: 2,
    title: "The Science of Human Memory",
    topic: "Psychology",
    difficulty: "medium",
    passage: `Human memory is not a single unified system but a collection of distinct processes and storage mechanisms that interact in complex ways. Decades of research in cognitive psychology and neuroscience have revealed that what we commonly refer to as memory encompasses fundamentally different types of information storage, each supported by different brain structures and operating according to different principles. Understanding these distinctions has practical implications for education, legal proceedings, and the treatment of memory disorders.

A. The most basic distinction in memory research is between short-term and long-term memory. Short-term memory, now more commonly described as working memory, holds a limited amount of information in an active, readily accessible state for brief periods — typically seconds to minutes. The capacity of working memory is famously limited, with research suggesting that most people can hold approximately seven items, plus or minus two, in working memory simultaneously. Long-term memory, by contrast, appears to have essentially unlimited capacity and can store information for periods ranging from minutes to an entire lifetime.

B. Within long-term memory, researchers distinguish between declarative memory — memories for facts and events that can be consciously recalled and verbally reported — and non-declarative or implicit memory, which includes skills, habits, and conditioned responses that influence behaviour without conscious recollection. Declarative memory is further divided into episodic memory, which stores personally experienced events with their temporal and spatial context, and semantic memory, which contains general knowledge about the world independent of the circumstances in which it was acquired. A person knows that Paris is the capital of France without remembering where or when they learned this fact — this is semantic memory. Their recollection of their first visit to Paris is episodic memory.

C. The process by which memories are formed involves three stages: encoding, storage, and retrieval. Encoding refers to the initial registration of information — the transformation of sensory experience into a memory trace. Not all information that enters sensory awareness is encoded into long-term memory; encoding requires attention, and the depth of processing affects the durability of the resulting memory. Information processed for meaning — elaborative encoding — produces stronger memories than information processed only for surface features such as how a word sounds. Storage involves the consolidation of encoded information into stable long-term representations, a process that continues for hours or even days after the initial encoding event and depends critically on sleep.

D. Memory retrieval is more complex and less reliable than is commonly assumed. Retrieving a memory is not like playing back a recording; it is an active reconstructive process in which the brain reassembles fragments of stored information, filling gaps with knowledge, expectations, and inferences. This reconstructive nature makes memory vulnerable to distortion. The misinformation effect, demonstrated extensively by psychologist Elizabeth Loftus, shows that information encountered after an event can alter the stored memory of the event itself. Eyewitnesses who are asked leading questions may incorporate the false information contained in those questions into their recollection of what actually occurred.

E. The reliability of eyewitness memory has significant implications for the legal system. Eyewitness testimony has historically been treated as particularly compelling evidence in criminal trials, yet research consistently demonstrates that eyewitness identifications are frequently inaccurate, particularly across racial lines and under conditions of stress or poor visibility. Studies of wrongful convictions in the United States, made possible by DNA evidence, have found that mistaken eyewitness identification was a contributing factor in approximately 70 percent of cases. These findings have prompted reforms in police procedures for conducting lineups and interviewing witnesses.

F. Memory disorders provide additional insights into the organisation of the memory system. Anterograde amnesia — the inability to form new long-term memories following brain injury — typically results from damage to the hippocampus, a seahorse-shaped structure in the medial temporal lobe. Patients with severe anterograde amnesia may be unable to remember any event that occurred more than a few minutes ago, yet retain intact memories from before their injury and continue to learn new motor skills. This pattern demonstrates the dissociation between different memory systems — the hippocampus is critical for forming new declarative memories but not for procedural skill learning, which depends on different brain structures including the basal ganglia and cerebellum.`,
    questions: [
      {
        id: 1,
        type: "tfng",
        question: "Working memory can hold an unlimited amount of information.",
        answer: "FALSE",
        explanation: "The passage states working memory capacity is 'famously limited' to approximately seven items plus or minus two."
      },
      {
        id: 2,
        type: "tfng",
        question: "Semantic memory stores personally experienced events with their time and place context.",
        answer: "FALSE",
        explanation: "The passage states episodic memory stores personally experienced events — semantic memory contains general world knowledge independent of when it was learned."
      },
      {
        id: 3,
        type: "tfng",
        question: "Sleep plays a critical role in memory consolidation.",
        answer: "TRUE",
        explanation: "The passage states consolidation 'depends critically on sleep.'"
      },
      {
        id: 4,
        type: "tfng",
        question: "Elizabeth Loftus demonstrated that post-event information can alter stored memories.",
        answer: "TRUE",
        explanation: "The passage states 'the misinformation effect, demonstrated extensively by psychologist Elizabeth Loftus, shows that information encountered after an event can alter the stored memory of the event itself.'"
      },
      {
        id: 5,
        type: "multiple",
        question: "What does elaborative encoding mean according to the passage?",
        options: [
          "Repeating information many times",
          "Processing information for its meaning",
          "Writing information down immediately",
          "Associating information with images"
        ],
        answer: 1,
        explanation: "The passage defines elaborative encoding as processing 'information for meaning' which 'produces stronger memories than information processed only for surface features.'"
      },
      {
        id: 6,
        type: "multiple",
        question: "What percentage of wrongful convictions in the US involved mistaken eyewitness identification?",
        options: ["Around 30 percent", "Around 50 percent", "Around 70 percent", "Around 90 percent"],
        answer: 2,
        explanation: "The passage states mistaken eyewitness identification 'was a contributing factor in approximately 70 percent of cases.'"
      },
      {
        id: 7,
        type: "multiple",
        question: "What is anterograde amnesia?",
        options: [
          "The loss of memories from before a brain injury",
          "The inability to form new long-term memories after brain injury",
          "The gradual decline of memory with age",
          "The inability to recall emotional memories"
        ],
        answer: 1,
        explanation: "The passage defines anterograde amnesia as 'the inability to form new long-term memories following brain injury.'"
      },
      {
        id: 8,
        type: "multiple",
        question: "Which brain structure is described as critical for forming new declarative memories?",
        options: ["The cerebellum", "The basal ganglia", "The hippocampus", "The prefrontal cortex"],
        answer: 2,
        explanation: "The passage states 'the hippocampus is critical for forming new declarative memories.'"
      },
      {
        id: 9,
        type: "fillin",
        question: "Memory retrieval is an active __________ process rather than a simple playback of stored recordings.",
        answer: "reconstructive",
        alternatives: ["reconstruction"],
        explanation: "The passage describes retrieval as 'an active reconstructive process in which the brain reassembles fragments of stored information.'"
      },
      {
        id: 10,
        type: "fillin",
        question: "Patients with severe anterograde amnesia retain intact memories from __________ their injury.",
        answer: "before",
        alternatives: [],
        explanation: "The passage states patients 'retain intact memories from before their injury' even when unable to form new memories."
      },
      {
        id: 11,
        type: "fillin",
        question: "Procedural skill learning depends on the basal ganglia and the __________.",
        answer: "cerebellum",
        alternatives: [],
        explanation: "The passage states procedural skill learning 'depends on different brain structures including the basal ganglia and cerebellum.'"
      },
      {
        id: 12,
        type: "matching",
        question: "Which paragraph discusses the implications of unreliable eyewitness memory for the legal system?",
        options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"],
        answer: 4,
        explanation: "Paragraph E discusses how 'eyewitness testimony has historically been treated as particularly compelling evidence in criminal trials' and its problems of reliability."
      },
      {
        id: 13,
        type: "matching",
        question: "Which paragraph explains the distinction between episodic and semantic memory?",
        options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"],
        answer: 1,
        explanation: "Paragraph B distinguishes between episodic memory (personally experienced events with context) and semantic memory (general world knowledge)."
      }
    ]
  },
  {
    id: 3,
    title: "Urbanisation and the Future of Cities",
    topic: "Society",
    difficulty: "medium",
    passage: `For the first time in human history, more than half of the world's population lives in urban areas. This milestone, reached around 2007, marks a profound demographic shift that has been accelerating for two centuries. The United Nations projects that by 2050, approximately two thirds of humanity will be urban dwellers, with the vast majority of this growth occurring in cities of Africa and Asia.

A. The economic logic of cities is well established. Agglomeration economies — the productivity benefits that arise from the concentration of people, firms, and institutions in close proximity — generate significant advantages over dispersed settlement patterns. Workers in cities have access to larger labour markets, increasing the probability of a good match between their skills and available jobs. Firms benefit from proximity to specialised suppliers and customers. Knowledge spillovers occur more readily when people can interact face to face, and the density of cities facilitates the informal exchange of ideas that drives innovation. Research consistently finds that doubling the population of a city increases average productivity by approximately 15 percent, a relationship that holds across countries and time periods.

B. The environmental impact of cities is complex and counterintuitive. Urban density, often associated in popular imagination with pollution and environmental degradation, actually tends to reduce per capita resource consumption compared to suburban or rural living. City dwellers typically travel shorter distances, live in smaller dwellings that require less energy to heat and cool, and have access to public transport systems that are more energy-efficient than private car travel. Studies have found that dense urban residents in cities like New York or Hong Kong have significantly lower carbon footprints than their counterparts in surrounding suburban and rural areas. However, cities also concentrate pollution in ways that create serious public health problems, particularly in rapidly growing cities in developing nations with inadequate environmental regulation.

C. The governance challenges of rapidly growing cities in the developing world are formidable. Many cities in Africa, Asia, and Latin America are growing faster than their governments can provide infrastructure and services. Informal settlements — areas where residents have built housing without legal title to the land — house an estimated one billion people worldwide and are often characterised by inadequate sanitation, unreliable electricity, and limited access to clean water. Slum upgrading programmes, which seek to improve conditions in existing informal settlements rather than demolishing and replacing them, have produced mixed results. Successful examples such as the favela upgrading programmes in Brazilian cities have demonstrated that significant improvements in living conditions are achievable without displacing residents.

D. The relationship between urbanisation and economic development is well documented but not straightforward. In general, urbanisation and economic growth tend to occur together, and cities have historically been the engines of economic development. However, a phenomenon described as premature urbanisation has been observed in some sub-Saharan African countries, where urban populations are growing rapidly without a corresponding expansion of productive employment. In these cases, rural migrants move to cities in search of opportunities that do not materialise, swelling the urban population without generating the agglomeration-driven productivity gains that characterise successful urbanisation in other contexts.

E. Smart city technologies — the application of digital technologies to urban infrastructure and services — have attracted enormous interest and investment from governments and technology companies over the past decade. Sensors embedded in infrastructure can monitor traffic flows, energy consumption, and air quality in real time, enabling more efficient management of urban systems. Data analytics can identify patterns that allow predictive maintenance of infrastructure, reducing costly failures. However, smart city initiatives have also raised concerns about surveillance, data privacy, and the risk of creating technological systems that exclude or disadvantage segments of the population who lack digital access or literacy.

F. The design of cities profoundly influences the quality of life of their residents in ways that extend beyond the provision of basic infrastructure. Urban planning decisions about land use, building density, street design, and the provision of public space shape residents' opportunities for physical activity, social interaction, and exposure to nature. Research has linked high-quality urban green space to improved mental and physical health outcomes. The walkability of neighbourhoods has been associated with lower rates of obesity, higher social capital, and stronger community cohesion. These findings have influenced a growing movement toward human-scale urban design that prioritises pedestrians and cyclists over private vehicles.`,
    questions: [
      { id: 1, type: "tfng", question: "More than half of the world's population lived in cities for the first time around 2007.", answer: "TRUE", explanation: "The passage directly states this milestone was reached around 2007." },
      { id: 2, type: "tfng", question: "Doubling a city's population increases average productivity by approximately 30 percent.", answer: "FALSE", explanation: "The passage states the increase is approximately 15 percent, not 30 percent." },
      { id: 3, type: "tfng", question: "Urban residents consistently have higher carbon footprints than rural residents.", answer: "FALSE", explanation: "The passage states dense urban residents have significantly lower carbon footprints than suburban and rural counterparts." },
      { id: 4, type: "tfng", question: "Slum upgrading programmes have produced consistently successful results worldwide.", answer: "FALSE", explanation: "The passage states these programmes have produced mixed results." },
      { id: 5, type: "multiple", question: "What are agglomeration economies?", options: ["Government subsidies for urban businesses", "Productivity benefits from concentrating people and firms in close proximity", "The economic costs of managing large cities", "Tax advantages available only in cities"], answer: 1, explanation: "The passage defines agglomeration economies as productivity benefits arising from concentration of people and firms in close proximity." },
      { id: 6, type: "multiple", question: "What is premature urbanisation?", options: ["Cities growing before adequate infrastructure is built", "Urban populations growing without corresponding expansion of productive employment", "Young people moving to cities before completing education", "Cities expanding into agricultural land"], answer: 1, explanation: "The passage defines it as urban populations growing rapidly without corresponding expansion of productive employment." },
      { id: 7, type: "multiple", question: "What concern has been raised about smart city initiatives?", options: ["They are too expensive for most cities", "They create surveillance and data privacy risks", "They require too many engineers to operate", "They only work in wealthy nations"], answer: 1, explanation: "The passage states smart city initiatives raised concerns about surveillance, data privacy, and digital exclusion." },
      { id: 8, type: "multiple", question: "What has walkable neighbourhood design been associated with?", options: ["Higher property prices", "Increased traffic congestion", "Lower obesity rates and stronger community cohesion", "Greater reliance on public transport"], answer: 2, explanation: "The passage states walkability is associated with lower obesity rates, higher social capital, and stronger community cohesion." },
      { id: 9, type: "fillin", question: "The UN projects approximately __________ of humanity will be urban dwellers by 2050.", answer: "two thirds", alternatives: ["2/3", "two-thirds"], explanation: "The passage states approximately two thirds of humanity will be urban by 2050." },
      { id: 10, type: "fillin", question: "Informal settlements house an estimated __________ people worldwide.", answer: "one billion", alternatives: ["1 billion", "a billion"], explanation: "The passage directly states one billion people live in informal settlements." },
      { id: 11, type: "fillin", question: "Research has linked high-quality urban __________ space to improved mental and physical health outcomes.", answer: "green", alternatives: [], explanation: "The passage directly states urban green space is linked to improved health outcomes." },
      { id: 12, type: "matching", question: "Which paragraph discusses the productivity advantages of city living?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: 0, explanation: "Paragraph A discusses agglomeration economies and the 15 percent productivity gain." },
      { id: 13, type: "matching", question: "Which paragraph discusses digital technology applications in urban management?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: 4, explanation: "Paragraph E discusses smart city technologies, sensors, and data analytics." }
    ]
  },
  {
    id: 4,
    title: "CRISPR and the Gene Editing Revolution",
    topic: "Science",
    difficulty: "hard",
    passage: `The development of CRISPR-Cas9 gene editing technology has been described by scientists as the most significant biological tool since the discovery of the double helix structure of DNA in 1953. CRISPR stands for Clustered Regularly Interspaced Short Palindromic Repeats, a molecular mechanism originally discovered in bacteria where it serves as a primitive immune system that recognises and destroys viral DNA. Scientists Jennifer Doudna and Emmanuelle Charpentier, who shared the 2020 Nobel Prize in Chemistry, demonstrated in 2012 that this bacterial system could be repurposed as a precise tool for editing the genomes of any organism, including humans.

A. The mechanism of CRISPR-Cas9 editing involves two key components: a guide RNA molecule that directs the system to a specific DNA sequence, and the Cas9 protein, which functions as molecular scissors that cut the DNA at the targeted location. Once the DNA is cut, the cell's natural repair mechanisms activate. If a template DNA sequence is provided, the cell can incorporate it at the cut site, effectively replacing the original sequence with the desired one. Alternatively, the cell's error-prone repair mechanism can introduce small insertions or deletions that disrupt the function of the targeted gene. The precision, efficiency, and relative simplicity of this system compared to earlier gene editing technologies has made it transformative.

B. In medicine, CRISPR has opened possibilities previously confined to science fiction. Clinical trials have demonstrated that CRISPR editing can effectively treat sickle cell disease and beta-thalassemia — two serious inherited blood disorders — by reactivating a form of haemoglobin normally produced only in foetal development. Patients in early trials have achieved what appears to be functional cures, with some remaining transfusion-free for years after a single treatment. Research is also underway into CRISPR-based treatments for cancers, viral infections including HIV, and degenerative eye conditions. The technology has also dramatically accelerated biological research by making it vastly easier to create animal models of human diseases.

C. Agricultural applications of CRISPR are advancing alongside medical ones, though they face a different regulatory landscape. CRISPR can develop crop varieties with enhanced disease resistance, improved nutritional profiles, greater drought tolerance, or extended shelf life without introducing foreign DNA from other species — a feature that distinguishes it from earlier forms of genetic modification. In the United States, CRISPR-edited crops that do not contain foreign DNA face a lighter regulatory burden than traditional GMOs. The European Union has taken a more restrictive approach, with the European Court of Justice ruling in 2018 that CRISPR-edited crops are subject to the same strict regulations as other GMOs, significantly constraining agricultural biotechnology development in Europe.

D. The most controversial application of CRISPR involves editing the human germline — making changes to embryos, eggs, or sperm that would be inherited by future generations. In 2018, Chinese scientist He Jiankui announced that he had used CRISPR to edit human embryos that were subsequently implanted and resulted in the birth of twin girls. He claimed to have disabled a gene called CCR5, which encodes a receptor used by HIV to enter cells, intending to confer resistance to HIV infection. The announcement provoked immediate and widespread condemnation from the scientific community. Critics pointed out that the editing was medically unnecessary, that safer alternatives for preventing HIV transmission exist, and that the children cannot consent to permanent changes to their genome.

E. The technical limitations and risks of CRISPR remain significant. Off-target effects — unintended edits at locations in the genome other than the intended target — represent a major safety concern for clinical applications. The guide RNA can sometimes bind to sequences similar but not identical to the intended target, causing Cas9 to cut at unintended locations. These off-target cuts can potentially disrupt genes important for normal cell function or, in the worst case, activate oncogenes — genes that can cause cancer. Delivery of CRISPR components into the relevant cells within a living organism also presents significant challenges, particularly for editing cells in solid organs such as the liver or muscle.

F. The governance of CRISPR technology presents challenges that extend beyond national boundaries. Because scientific knowledge and techniques are shared globally through publication and collaboration, restrictions imposed by one country can be circumvented by conducting research elsewhere. International scientific organisations have called for a global moratorium on clinical applications of germline editing pending the development of appropriate safety and ethical frameworks. However, achieving meaningful international governance of a rapidly advancing technology involving enormous commercial interests and deeply held values about the nature of humanity presents difficulties unlikely to be resolved quickly.`,
    questions: [
      { id: 1, type: "tfng", question: "CRISPR was originally discovered as a defence mechanism in bacteria.", answer: "TRUE", explanation: "The passage states CRISPR is a molecular mechanism originally discovered in bacteria where it serves as a primitive immune system." },
      { id: 2, type: "tfng", question: "Doudna and Charpentier won the Nobel Prize in Medicine for their CRISPR work.", answer: "FALSE", explanation: "The passage states they shared the 2020 Nobel Prize in Chemistry, not Medicine." },
      { id: 3, type: "tfng", question: "The EU applies the same regulations to CRISPR-edited crops as to traditional GMOs.", answer: "TRUE", explanation: "The passage states the European Court of Justice ruled CRISPR-edited crops are subject to the same strict regulations as other GMOs." },
      { id: 4, type: "tfng", question: "He Jiankui's germline editing work was widely praised by the scientific community.", answer: "FALSE", explanation: "The passage states the announcement provoked immediate and widespread condemnation from the scientific community." },
      { id: 5, type: "multiple", question: "How does CRISPR-Cas9 incorporate a desired DNA sequence at a cut site?", options: ["By using a virus to deliver the new sequence", "By activating the cell's natural repair mechanisms with a template DNA", "By chemically synthesising the new DNA directly", "By using electrical stimulation to force DNA insertion"], answer: 1, explanation: "The passage states if a template DNA sequence is provided, the cell can incorporate it at the cut site." },
      { id: 6, type: "multiple", question: "What distinguishes CRISPR gene editing in crops from earlier genetic modification?", options: ["CRISPR is faster but less precise", "CRISPR can edit crops without introducing foreign DNA from other species", "CRISPR only works on plant cells", "CRISPR requires no regulatory approval anywhere"], answer: 1, explanation: "The passage states CRISPR develops crops without introduction of foreign DNA from other species, distinguishing it from earlier modification." },
      { id: 7, type: "multiple", question: "What are off-target effects in CRISPR editing?", options: ["Edits that do not work at the target site", "Unintended edits at locations other than the intended target", "Side effects experienced by patients after treatment", "Edits that affect nearby patients in trials"], answer: 1, explanation: "The passage defines off-target effects as unintended edits at locations other than the intended target." },
      { id: 8, type: "multiple", question: "Why is international governance of CRISPR particularly challenging?", options: ["Most countries lack scientific expertise to regulate it", "CRISPR patents are held by private companies immune to regulation", "Scientific knowledge is shared globally so restrictions can be circumvented elsewhere", "No international organisations have addressed the issue"], answer: 2, explanation: "The passage states restrictions imposed by one country can be circumvented by conducting research elsewhere." },
      { id: 9, type: "fillin", question: "The Cas9 protein functions as molecular __________ that cuts DNA at the targeted location.", answer: "scissors", alternatives: [], explanation: "The passage describes Cas9 as molecular scissors that cut DNA at the targeted location." },
      { id: 10, type: "fillin", question: "He Jiankui disabled the __________ gene which encodes a receptor used by HIV to enter cells.", answer: "CCR5", alternatives: [], explanation: "The passage states he disabled a gene called CCR5 which encodes a receptor used by HIV to enter cells." },
      { id: 11, type: "fillin", question: "Off-target cuts can in the worst case activate __________ which are genes that can cause cancer.", answer: "oncogenes", alternatives: [], explanation: "The passage states off-target cuts can activate oncogenes — genes that can cause cancer." },
      { id: 12, type: "matching", question: "Which paragraph describes CRISPR treatment of inherited blood disorders?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: 1, explanation: "Paragraph B discusses clinical trials for sickle cell disease and beta-thalassemia." },
      { id: 13, type: "matching", question: "Which paragraph explains the technical mechanism of CRISPR-Cas9?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: 0, explanation: "Paragraph A explains the guide RNA, Cas9 protein, DNA cutting, and cell repair processes." }
    ]
  },
  {
    id: 5,
    title: "The Psychology of Decision Making",
    topic: "Psychology",
    difficulty: "hard",
    passage: `For much of the twentieth century, economists and policymakers operated on the assumption that human beings are rational actors who make decisions by carefully weighing costs and benefits and choosing the option that maximises their welfare. This model, known as Homo economicus, provided elegant mathematical frameworks for predicting behaviour and designing policy. However, decades of research in cognitive psychology and behavioural economics have revealed systematic patterns of reasoning that deviate from this rational ideal in predictable and often significant ways.

A. The pioneering work of psychologists Daniel Kahneman and Amos Tversky, beginning in the 1970s, identified numerous cognitive biases that affect judgment and decision making. Kahneman's framework distinguishes between two modes of cognitive processing. System 1 thinking is fast, automatic, and intuitive, operating largely below the level of conscious awareness and drawing on heuristics — mental shortcuts — to arrive at quick judgments. System 2 thinking is slow, deliberate, and effortful, capable of complex logical reasoning but requiring significant cognitive resources and effort to engage. Most everyday decisions are made by System 1, with System 2 engaging only when problems require careful deliberation.

B. One of the most robust findings in behavioural economics is loss aversion — the observation that losses loom larger than equivalent gains in human psychology. Research consistently finds that the pain of losing a sum of money is approximately twice as powerful as the pleasure of gaining the same amount. This asymmetry has profound implications for decision making. People will go to considerable lengths to avoid realising a loss, even when doing so is economically irrational — holding onto losing investments in the hope of recovery rather than cutting losses, for example. Loss aversion also contributes to the status quo bias: people tend to prefer the current state of affairs over alternatives, partly because any change involves the potential for losses that loom disproportionately large.

C. The framing effect demonstrates that the way information is presented can profoundly influence decisions, even when the underlying facts are identical. Classic experiments by Tversky and Kahneman presented subjects with choices about medical treatments described either in terms of survival rates or mortality rates. A treatment described as offering a 90 percent survival rate was consistently preferred over one described as carrying a 10 percent mortality rate — despite these being mathematically equivalent statements. In public health contexts, framing effects have been exploited both to promote beneficial behaviours and, more problematically, to manipulate public opinion.

D. Anchoring is a cognitive bias in which initial information disproportionately influences subsequent judgments. When people are asked to estimate an unknown quantity, their estimates are systematically pulled toward an initial value — the anchor — even when that anchor is clearly arbitrary. In one famous demonstration, subjects who were first asked whether the percentage of African nations in the United Nations was higher or lower than a random number generated by a spinning wheel gave estimates that were heavily influenced by the random number. Anchoring has been demonstrated in salary negotiations, where the first offer tends to anchor the final settlement, and in legal sentencing, where the severity of a prosecutor's initial demand influences judges' decisions.

E. The concept of bounded rationality, introduced by Nobel laureate Herbert Simon in the 1950s, provides a theoretical framework for understanding why humans rely on heuristics and make systematic errors. Simon argued that human cognitive capacity is limited — we cannot consider all possible options, process unlimited information, or perform complex calculations effortlessly. Given these limitations, using heuristics that work well most of the time is a reasonable adaptive strategy. The errors arise not because humans are irrational in any deep sense but because heuristics that evolved to work in environments very different from modern decision contexts sometimes fail when applied to novel or complex situations.

F. Insights from behavioural economics have been applied to policy design through an approach known as libertarian paternalism or nudge theory, associated with economists Richard Thaler and Cass Sunstein. Nudges are interventions that alter the environment in which decisions are made — the choice architecture — in ways that predictably influence behaviour without restricting freedom of choice or significantly changing economic incentives. Changing the default option in pension enrolment from opt-in to opt-out dramatically increases participation rates by exploiting the status quo bias. Placing healthier food options at eye level in cafeterias increases their selection without removing less healthy options. Nudge-based policy has been adopted by governments in numerous countries, though it has attracted criticism from those who regard it as manipulation that bypasses rational agency.`,
    questions: [
      { id: 1, type: "tfng", question: "The Homo economicus model assumes humans carefully weigh all costs and benefits before deciding.", answer: "TRUE", explanation: "The passage states the model assumed humans make decisions by carefully weighing costs and benefits and choosing the option that maximises their welfare." },
      { id: 2, type: "tfng", question: "System 1 thinking requires significant cognitive resources and conscious effort.", answer: "FALSE", explanation: "System 1 is described as fast and automatic — it is System 2 that requires significant effort." },
      { id: 3, type: "tfng", question: "The pain of losing money is approximately twice as powerful as the pleasure of gaining the same amount.", answer: "TRUE", explanation: "The passage directly states this finding from research on loss aversion." },
      { id: 4, type: "tfng", question: "Herbert Simon introduced bounded rationality in the 1970s.", answer: "FALSE", explanation: "The passage states Simon introduced bounded rationality in the 1950s, not the 1970s." },
      { id: 5, type: "multiple", question: "What did the medical treatment framing experiment demonstrate?", options: ["People prefer treatments with higher success rates regardless of framing", "Describing the same information differently influences choices", "Medical professionals are immune to cognitive biases", "People cannot understand statistical health information"], answer: 1, explanation: "The experiment showed that identical facts presented differently — survival rate vs mortality rate — led to different decisions." },
      { id: 6, type: "multiple", question: "What did the spinning wheel experiment demonstrate?", options: ["People cannot estimate percentages accurately", "Random initial values influence subsequent estimates", "People are good at ignoring irrelevant information", "Mathematical training eliminates anchoring bias"], answer: 1, explanation: "The experiment showed estimates were heavily influenced by the random number from the spinning wheel." },
      { id: 7, type: "multiple", question: "What is a nudge according to the passage?", options: ["A financial penalty for poor decisions", "An intervention changing choice architecture without restricting freedom", "A form of direct government regulation", "A public education campaign"], answer: 1, explanation: "The passage defines nudges as interventions that alter decision environments without restricting freedom of choice." },
      { id: 8, type: "multiple", question: "According to Simon's bounded rationality theory, why do humans use heuristics?", options: ["Because humans are fundamentally irrational", "Because heuristics are always more accurate than deliberate reasoning", "Because human cognitive capacity is limited and heuristics work well most of the time", "Because education systems fail to teach proper reasoning"], answer: 2, explanation: "Simon argued that because human cognitive capacity is limited, using heuristics that work well most of the time is a reasonable adaptive strategy." },
      { id: 9, type: "fillin", question: "Loss aversion contributes to the __________ bias where people prefer the current state of affairs.", answer: "status quo", alternatives: ["status-quo"], explanation: "The passage states loss aversion contributes to the status quo bias." },
      { id: 10, type: "fillin", question: "Nudge theory is also known as libertarian __________ and is associated with Thaler and Sunstein.", answer: "paternalism", alternatives: [], explanation: "The passage describes the approach as libertarian paternalism or nudge theory." },
      { id: 11, type: "fillin", question: "Heuristics are mental __________ that allow quick judgments without extensive deliberation.", answer: "shortcuts", alternatives: [], explanation: "The passage defines heuristics as mental shortcuts." },
      { id: 12, type: "matching", question: "Which paragraph discusses how identical information presented differently leads to different choices?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: 2, explanation: "Paragraph C discusses the framing effect and the medical treatment experiment." },
      { id: 13, type: "matching", question: "Which paragraph discusses policy applications of behavioural economics?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: 5, explanation: "Paragraph F discusses nudge theory, pension enrolment defaults, and cafeteria food placement." }
    ]
  },
  {
    id: 6,
    title: "The Deep Ocean",
    topic: "Science",
    difficulty: "hard",
    passage: `The deep ocean — broadly defined as water below 200 metres depth where sunlight no longer penetrates — covers more than 65 percent of the Earth's surface and represents the largest living space on the planet. Despite this, it remains the least explored environment on Earth. Scientists estimate that more than 80 percent of the ocean's depths have never been mapped, observed, or explored in any meaningful way. The Moon, Mars, and even Venus have been mapped in greater detail than the seafloor of our own planet. This profound ignorance about a vast portion of Earth's biosphere has significant implications for our understanding of life, planetary processes, and the potential consequences of human activities such as deep-sea mining.

A. The deep ocean presents extreme physical conditions that challenge both life and exploration. Pressure increases by one atmosphere for every ten metres of depth, meaning that at 10,000 metres — the approximate depth of the deepest ocean trenches — pressure reaches about 1,000 atmospheres, or approximately one tonne per square centimetre. Temperatures in the deep ocean, away from hydrothermal vents, hover near freezing — typically between 2 and 4 degrees Celsius. Light is entirely absent below approximately 1,000 metres, though many organisms produce their own light through bioluminescence. These conditions require specialised adaptations from deep-sea organisms and pose formidable engineering challenges for exploration vehicles and instruments.

B. Despite these extreme conditions, the deep ocean is far from lifeless. The first scientists to sample the deep sea in the nineteenth century half-expected it to be an abiotic desert; instead, they found it inhabited by a surprising diversity of organisms. The discovery of hydrothermal vent communities in 1977 represented a paradigm shift in biology. These communities, clustered around vents where superheated water rich in chemicals is expelled from the seafloor, are entirely independent of sunlight. They are powered instead by chemosynthesis — the process by which certain bacteria derive energy from chemical reactions involving hydrogen sulphide and other compounds. The organisms that live at vents, including tube worms up to two metres long and giant clams, challenged the assumption that all life on Earth ultimately depends on photosynthesis.

C. The deep ocean plays a critical role in regulating Earth's climate, though this function is poorly understood by the general public. The ocean absorbs approximately 30 percent of the carbon dioxide released by human activities each year, and the deep ocean is the ultimate repository for much of this absorbed carbon. Thermohaline circulation — the global system of deep ocean currents driven by differences in water temperature and salinity — transports heat from the tropics toward the poles and plays a central role in maintaining regional climates worldwide. Disruption of thermohaline circulation, potentially caused by the melting of polar ice that reduces surface water salinity, could have profound consequences for climate patterns.

D. The prospect of deep-sea mining has brought increasing attention to the ecology of the deep ocean and sparked significant scientific and ethical debate. The deep seafloor contains polymetallic nodules — potato-sized concretions of manganese, nickel, cobalt, and copper that accumulate extremely slowly over millions of years — as well as cobalt-rich crusts on seamounts and massive sulphide deposits at hydrothermal vents. These mineral resources are of growing commercial interest as demand for metals used in batteries and electronics increases. However, mining these resources would involve disturbing sediments that have accumulated undisturbed for millions of years, potentially destroying ecosystems that recover, if at all, on timescales of decades to centuries.

E. Exploration of the deep ocean has been transformed by technological advances, though progress has been slower and less well-funded than space exploration. Remotely operated vehicles, or ROVs, controlled from surface ships via tethered cables, have been used extensively for deep-sea research and have reached all parts of the ocean. Autonomous underwater vehicles, or AUVs, navigate independently using pre-programmed instructions or artificial intelligence, allowing broader coverage without the limitations of a tether. Advances in sonar technology have progressively improved the resolution of seafloor mapping. However, the cost and logistical difficulty of deep-sea research means that many areas have been sampled only superficially or not at all.

F. The potential medical and biotechnological applications of deep-sea organisms have attracted growing research interest. Organisms adapted to extreme conditions — extremophiles — produce enzymes and other molecules with properties that have proved valuable in biotechnology. Taq polymerase, an enzyme derived from a thermophilic bacterium discovered in a hot spring, is essential to the polymerase chain reaction technique used in DNA analysis, medical diagnostics, and forensic science. Researchers have identified deep-sea organisms producing compounds with potential applications as antibiotics, anti-cancer agents, and industrial enzymes. The unknown diversity of deep-sea life thus represents a potentially valuable biological resource that, once lost to mining or other disturbance, cannot be recovered.`,
    questions: [
      { id: 1, type: "tfng", question: "More than 80 percent of the ocean depths have never been meaningfully explored.", answer: "TRUE", explanation: "The passage directly states more than 80 percent of ocean depths have never been mapped, observed, or explored in any meaningful way." },
      { id: 2, type: "tfng", question: "The deep ocean covers approximately 40 percent of Earth's surface.", answer: "FALSE", explanation: "The passage states the deep ocean covers more than 65 percent of Earth's surface, not 40 percent." },
      { id: 3, type: "tfng", question: "Hydrothermal vent communities were discovered in 1977.", answer: "TRUE", explanation: "The passage directly states the discovery of hydrothermal vent communities in 1977 represented a paradigm shift in biology." },
      { id: 4, type: "tfng", question: "Polymetallic nodules form rapidly over short time periods.", answer: "FALSE", explanation: "The passage states these nodules accumulate extremely slowly over millions of years." },
      { id: 5, type: "multiple", question: "What is chemosynthesis?", options: ["A process by which plants convert sunlight into energy", "A process by which bacteria derive energy from chemical reactions", "A method of synthesising chemicals in a laboratory", "A way deep-sea fish produce bioluminescent light"], answer: 1, explanation: "The passage defines chemosynthesis as the process by which certain bacteria derive energy from chemical reactions involving hydrogen sulphide." },
      { id: 6, type: "multiple", question: "What drives thermohaline circulation?", options: ["Wind patterns at the ocean surface", "Tidal forces from the moon and sun", "Differences in water temperature and salinity", "Heat from hydrothermal vents"], answer: 2, explanation: "The passage states thermohaline circulation is driven by differences in water temperature and salinity." },
      { id: 7, type: "multiple", question: "What is the key difference between ROVs and AUVs?", options: ["ROVs can go deeper than AUVs", "AUVs are controlled remotely while ROVs navigate independently", "ROVs are controlled via tethered cables while AUVs navigate independently", "AUVs are older technology than ROVs"], answer: 2, explanation: "The passage states ROVs are controlled via tethered cables while AUVs navigate independently." },
      { id: 8, type: "multiple", question: "What is Taq polymerase used for?", options: ["Treating bacterial infections", "DNA analysis, medical diagnostics, and forensic science", "Cleaning up oil spills", "Manufacturing exploration equipment"], answer: 1, explanation: "The passage states Taq polymerase is essential to the polymerase chain reaction used in DNA analysis, medical diagnostics, and forensic science." },
      { id: 9, type: "fillin", question: "At 10,000 metres depth, pressure reaches approximately __________ atmospheres.", answer: "1,000", alternatives: ["1000", "one thousand", "a thousand"], explanation: "The passage states pressure at 10,000 metres reaches about 1,000 atmospheres." },
      { id: 10, type: "fillin", question: "The ocean absorbs approximately __________ percent of carbon dioxide released by human activities each year.", answer: "30", alternatives: ["thirty"], explanation: "The passage states the ocean absorbs approximately 30 percent of human-released carbon dioxide annually." },
      { id: 11, type: "fillin", question: "Organisms adapted to extreme conditions are called __________.", answer: "extremophiles", alternatives: [], explanation: "The passage directly uses the term extremophiles to describe organisms adapted to extreme conditions." },
      { id: 12, type: "matching", question: "Which paragraph discusses the climate regulation role of the deep ocean?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: 2, explanation: "Paragraph C discusses carbon absorption, thermohaline circulation, and climate regulation." },
      { id: 13, type: "matching", question: "Which paragraph discusses the controversy around deep-sea mining?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: 3, explanation: "Paragraph D discusses polymetallic nodules, commercial mining interest, and ecological risks." }
    ]
  },
  {
    id: 7,
    title: "The History of Vaccination",
    topic: "Health",
    difficulty: "medium",
    passage: `Vaccination stands as one of the most successful public health interventions in human history, having eliminated or dramatically reduced diseases that once killed or disabled millions of people every year. Smallpox, which killed approximately 300 million people in the twentieth century alone, was declared eradicated in 1980 following a global vaccination campaign — the only infectious disease affecting humans to have been eradicated to date. Polio, which paralysed hundreds of thousands of children annually in the mid-twentieth century, has been eliminated from most of the world. Measles, whooping cough, diphtheria, and numerous other diseases that were once common childhood killers have been reduced to a fraction of their former burden through vaccination programmes.

A. The history of vaccination begins not with Edward Jenner, who is conventionally credited with its invention, but with the practice of variolation that was widespread in parts of Asia and the Middle East centuries before Jenner's work. Variolation involved deliberately infecting a person with material from a mild smallpox case to induce immunity. The practice was introduced to Britain in the early eighteenth century by Lady Mary Wortley Montagu, who had observed it in the Ottoman Empire. While variolation was effective, it carried a risk of causing serious disease or death in approximately 1-2 percent of recipients, limiting its acceptability.

B. Jenner's contribution, made in 1796, was to observe that milkmaids who had contracted cowpox — a similar but much less dangerous virus — appeared to be protected against smallpox. He tested this observation by inoculating a young boy with cowpox material and then exposing him to smallpox, demonstrating that cowpox inoculation provided protection. The term vaccine comes from the Latin vacca, meaning cow, reflecting the bovine origin of this first vaccine. Jenner's work did not require understanding the immunological mechanisms involved — that understanding would not come until much later — but empirically demonstrated that deliberate exposure to a related, less dangerous pathogen could provide protection against a more dangerous one.

C. The scientific understanding of how vaccines work developed gradually through the work of Louis Pasteur and others who developed germ theory — the understanding that infectious diseases are caused by microorganisms. Pasteur demonstrated that laboratory-attenuated — weakened — versions of pathogens could stimulate immunity without causing disease. He developed vaccines against chicken cholera, anthrax, and most famously rabies, demonstrating the principle of using weakened or killed pathogens to induce immunity. This approach remains the basis for many vaccines in use today, including those against influenza, polio, and measles.

D. The immune system's response to vaccination involves multiple components working together. When a vaccine introduces antigens — molecules characteristic of a pathogen — the immune system mounts a response involving both antibodies produced by B cells and cellular immunity mediated by T cells. Memory B and T cells formed during this initial response persist in the body for years or decades, enabling a rapid and powerful immune response if the actual pathogen is subsequently encountered. The speed and magnitude of this memory response typically prevents the infection from causing serious disease, even if some viral replication occurs.

E. Vaccine hesitancy — reluctance or refusal to accept vaccines despite their availability — has emerged as a significant public health challenge in the twenty-first century, particularly in high-income countries where the diseases vaccines prevent are rarely encountered. The spread of misinformation about vaccine safety through social media has contributed to declining vaccination rates in some communities. The fraudulent 1998 paper by Andrew Wakefield, which falsely claimed a link between the measles-mumps-rubella vaccine and autism, caused lasting damage to public confidence despite being retracted and thoroughly debunked, and despite Wakefield losing his medical licence as a consequence.

F. The development of mRNA vaccines during the COVID-19 pandemic represented a significant technological advance. Traditional vaccine development typically requires growing pathogens or their proteins, which is time-consuming. mRNA vaccines instead provide genetic instructions that prompt the cells to produce the target antigen, allowing vaccines to be designed and manufactured much more rapidly. The Pfizer-BioNTech and Moderna vaccines were developed, tested in large clinical trials, and authorised for use within less than a year of the virus's genetic sequence being published — a timeline previously considered impossible. This technology is now being applied to vaccine development against cancer, HIV, and other diseases for which conventional approaches have proved inadequate.`,
    questions: [
      { id: 1, type: "tfng", question: "Smallpox is the only infectious human disease to have been completely eradicated.", answer: "TRUE", explanation: "The passage states smallpox is the only infectious disease affecting humans to have been eradicated to date." },
      { id: 2, type: "tfng", question: "Variolation carried no significant risk of serious disease for recipients.", answer: "FALSE", explanation: "The passage states variolation carried a risk of causing serious disease or death in approximately 1-2 percent of recipients." },
      { id: 3, type: "tfng", question: "The word vaccine derives from the Latin word for cow.", answer: "TRUE", explanation: "The passage states the term vaccine comes from the Latin vacca, meaning cow." },
      { id: 4, type: "tfng", question: "Andrew Wakefield's 1998 paper was confirmed by subsequent research.", answer: "FALSE", explanation: "The passage states the paper was retracted and thoroughly debunked and Wakefield lost his medical licence." },
      { id: 5, type: "multiple", question: "Where did Lady Mary Wortley Montagu observe variolation?", options: ["China", "India", "The Ottoman Empire", "Ancient Egypt"], answer: 2, explanation: "The passage states she had observed variolation in the Ottoman Empire." },
      { id: 6, type: "multiple", question: "What did Pasteur demonstrate about weakened pathogens?", options: ["They are completely harmless", "They can stimulate immunity without causing disease", "They work better than killed pathogens", "They must be combined with antibiotics"], answer: 1, explanation: "The passage states Pasteur demonstrated that weakened versions of pathogens could stimulate immunity without causing disease." },
      { id: 7, type: "multiple", question: "What are memory B and T cells?", options: ["Cells that store genetic information about vaccines", "Long-lasting immune cells enabling rapid response to future infections", "Cells produced only during serious illness", "Specialised cells found only in lymph nodes"], answer: 1, explanation: "The passage states memory cells persist for years or decades, enabling a rapid and powerful immune response to future infections." },
      { id: 8, type: "multiple", question: "What advantage do mRNA vaccines have over traditional vaccines?", options: ["They are cheaper to produce at all scales", "They require no clinical trials", "They can be designed and manufactured much more rapidly", "They provide lifelong immunity with a single dose"], answer: 2, explanation: "The passage states mRNA vaccines allow vaccines to be designed and manufactured much more rapidly than traditional approaches." },
      { id: 9, type: "fillin", question: "Smallpox was declared eradicated in __________ following a global vaccination campaign.", answer: "1980", alternatives: [], explanation: "The passage directly states smallpox was declared eradicated in 1980." },
      { id: 10, type: "fillin", question: "Jenner demonstrated in 1796 that __________ infection provided protection against smallpox.", answer: "cowpox", alternatives: [], explanation: "The passage states cowpox inoculation provided protection against smallpox." },
      { id: 11, type: "fillin", question: "mRNA vaccines provide genetic __________ that prompt cells to produce the target antigen.", answer: "instructions", alternatives: [], explanation: "The passage states mRNA vaccines provide genetic instructions that prompt cells to produce the target antigen." },
      { id: 12, type: "matching", question: "Which paragraph explains the immunological mechanism by which vaccines work?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: 3, explanation: "Paragraph D explains antigens, B cells, T cells, antibodies, and memory cell formation." },
      { id: 13, type: "matching", question: "Which paragraph discusses declining public confidence in vaccines?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: 4, explanation: "Paragraph E discusses vaccine hesitancy, misinformation, and the Wakefield fraud." }
    ]
  },
  {
    id: 8,
    title: "The Global Food System",
    topic: "Food & Agriculture",
    difficulty: "medium",
    passage: `The way humanity produces, distributes, and consumes food has been transformed beyond recognition over the past century, creating a global food system of extraordinary productivity and equally extraordinary fragility. The Green Revolution of the 1950s to 1970s dramatically increased crop yields through the development of high-yielding varieties, synthetic fertilisers, pesticides, and expanded irrigation, averting the famines predicted by some analysts as the global population grew rapidly. Today, the world produces more than enough food to feed its entire population, yet approximately 800 million people remain chronically undernourished while simultaneously over two billion adults are overweight or obese — a paradox that reflects not failures of production but profound inequities in distribution and access.

A. The industrialisation of agriculture has generated remarkable productivity gains but at significant environmental cost. Modern intensive farming practices rely heavily on synthetic nitrogen fertilisers, which require enormous quantities of fossil fuel energy to produce and whose runoff causes eutrophication — the excessive enrichment of water bodies with nutrients — in rivers, lakes, and coastal seas. Pesticide use has been linked to declines in insect populations, including pollinators essential for crop reproduction. Intensive livestock production generates substantial greenhouse gas emissions, particularly methane from cattle digestion and nitrous oxide from manure management. Agriculture as a whole is responsible for approximately 25 percent of global greenhouse gas emissions when land use change, primarily deforestation for agricultural expansion, is included.

B. The concentration of global food supply chains has created efficiencies but also significant vulnerabilities. A relatively small number of multinational corporations control large shares of seed, fertiliser, pesticide, and food processing markets. A handful of crop varieties dominate global production — three crops, wheat, rice, and maize, provide approximately half of all human calorie consumption. This concentration creates systemic risk: a disease or pest that evolves to attack a widely grown crop variety could cause catastrophic harvest failures across multiple continents simultaneously. The Irish Potato Famine of the 1840s, caused by a potato blight that devastated a population heavily dependent on a single crop variety, stands as a historical warning of the consequences of agricultural monoculture.

C. Food waste represents a massive inefficiency in the global food system. The United Nations Food and Agriculture Organisation estimates that approximately one third of all food produced globally is lost or wasted at some point between production and consumption. In high-income countries, waste is concentrated at the retail and consumer end — food purchased but not eaten, produce rejected for cosmetic imperfections, and meals prepared but not consumed. In low-income countries, losses are more concentrated in post-harvest storage and transportation, where inadequate infrastructure allows food to spoil before it reaches consumers. Reducing food waste has been identified as one of the most cost-effective strategies for both reducing environmental impact and improving food security.

D. The nutritional quality of the global food supply has shifted significantly alongside its quantitative expansion. The widespread availability of cheap, calorie-dense, highly processed foods has contributed to dramatic increases in rates of obesity, type 2 diabetes, and cardiovascular disease across both high-income and increasingly middle-income countries. Ultra-processed foods — products involving multiple industrial processes and numerous additives — now account for more than half of calorie consumption in countries including the United States and the United Kingdom, and their share is growing rapidly in developing nations. Research has linked high consumption of ultra-processed foods to increased risks of numerous chronic diseases, though the causal mechanisms are not fully understood.

E. The environmental sustainability of current food production patterns is widely regarded as inadequate for the long term. Freshwater withdrawal for agriculture accounts for approximately 70 percent of global freshwater use, and aquifer depletion in major agricultural regions including the North China Plain, the Punjab in India and Pakistan, and the High Plains of the United States is proceeding faster than natural recharge. Topsoil degradation through erosion, compaction, and loss of organic matter threatens the long-term productive capacity of agricultural land. Climate change is already affecting crop yields in some regions, and projections suggest that without adaptation, warming temperatures and shifting precipitation patterns will reduce yields of major crops in many of the world's most agriculturally important regions.

F. Alternative food systems and production methods have attracted growing interest from researchers, investors, and policymakers seeking more sustainable approaches. Precision agriculture applies data analytics, satellite imagery, and sensors to optimise inputs and reduce waste. Agroecology seeks to design farming systems that work with natural ecological processes rather than overriding them with chemical inputs. Cultured meat — animal protein grown from cell cultures rather than whole animals — has advanced from laboratory curiosity to commercial product in a small number of markets. Vertical farming uses controlled indoor environments to grow crops with dramatically reduced water and pesticide use, though high energy consumption remains a challenge. Whether any combination of these approaches can scale sufficiently to feed a projected global population of ten billion people sustainably remains an open and urgent question.`,
    questions: [
      { id: 1, type: "tfng", question: "The world currently produces enough food to feed its entire population.", answer: "TRUE", explanation: "The passage states the world produces more than enough food to feed its entire population — the problem is distribution and access, not production." },
      { id: 2, type: "tfng", question: "Agriculture accounts for approximately 25 percent of global greenhouse gas emissions when land use change is included.", answer: "TRUE", explanation: "The passage directly states agriculture is responsible for approximately 25 percent of global greenhouse gas emissions when land use change is included." },
      { id: 3, type: "tfng", question: "Food waste in low-income countries is mainly concentrated at the consumer end.", answer: "FALSE", explanation: "The passage states that in low-income countries losses are more concentrated in post-harvest storage and transportation — not at the consumer end." },
      { id: 4, type: "tfng", question: "Freshwater withdrawal for agriculture accounts for approximately 50 percent of global freshwater use.", answer: "FALSE", explanation: "The passage states agriculture accounts for approximately 70 percent of global freshwater use, not 50 percent." },
      { id: 5, type: "multiple", question: "What is eutrophication according to the passage?", options: ["A method of producing synthetic fertilisers", "The excessive enrichment of water bodies with nutrients", "A type of crop disease caused by pesticides", "The process of converting fossil fuels to fertiliser"], answer: 1, explanation: "The passage defines eutrophication as the excessive enrichment of water bodies with nutrients, caused by fertiliser runoff." },
      { id: 6, type: "multiple", question: "What lesson does the Irish Potato Famine illustrate according to the passage?", options: ["The importance of international food aid systems", "The dangers of agricultural monoculture and crop concentration", "The need for better government famine response", "The vulnerability of island nations to food shortages"], answer: 1, explanation: "The passage states the famine stands as a historical warning of the consequences of agricultural monoculture." },
      { id: 7, type: "multiple", question: "What characterises ultra-processed foods according to the passage?", options: ["They are produced only in high-income countries", "They involve multiple industrial processes and numerous additives", "They are nutritionally superior to unprocessed foods", "They are defined by their high fat content"], answer: 1, explanation: "The passage defines ultra-processed foods as products involving multiple industrial processes and numerous additives." },
      { id: 8, type: "multiple", question: "What challenge does vertical farming still face despite its advantages?", options: ["Lack of suitable urban locations", "High energy consumption", "Inability to grow staple crops", "Resistance from traditional farmers"], answer: 1, explanation: "The passage states that for vertical farming, high energy consumption remains a challenge." },
      { id: 9, type: "fillin", question: "Approximately __________ of all food produced globally is lost or wasted between production and consumption.", answer: "one third", alternatives: ["1/3", "a third"], explanation: "The passage states approximately one third of all food produced globally is lost or wasted." },
      { id: 10, type: "fillin", question: "Three crops — wheat, rice, and __________ — provide approximately half of all human calorie consumption.", answer: "maize", alternatives: ["corn"], explanation: "The passage states wheat, rice, and maize provide approximately half of all human calorie consumption." },
      { id: 11, type: "fillin", question: "Cultured meat is animal protein grown from cell __________ rather than whole animals.", answer: "cultures", alternatives: ["culture"], explanation: "The passage describes cultured meat as animal protein grown from cell cultures rather than whole animals." },
      { id: 12, type: "matching", question: "Which paragraph discusses the concentration of food supply chains and monoculture risks?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: 1, explanation: "Paragraph B discusses multinational corporation control, crop concentration, and the Irish Potato Famine as a warning." },
      { id: 13, type: "matching", question: "Which paragraph discusses alternative and more sustainable food production methods?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: 5, explanation: "Paragraph F discusses precision agriculture, agroecology, cultured meat, and vertical farming." }
    ]
  },
  {
    id: 9,
    title: "Migration and Human Genetics",
    topic: "Science",
    difficulty: "hard",
    passage: `The study of human migration has been transformed by advances in ancient DNA analysis and genomic sequencing, enabling researchers to reconstruct population movements and mixing events that occurred tens of thousands of years before written records. What has emerged from this research is a picture of human prehistory far more complex and dynamic than earlier models suggested — one characterised by repeated waves of migration, population replacement, and genetic admixture that have shaped the genetic composition of contemporary human populations in ways that continue to be revealed.

A. Modern humans — Homo sapiens — originated in Africa, with the earliest anatomically modern human fossils dating to approximately 300,000 years ago. The prevailing model of human dispersal, supported by both fossil and genetic evidence, holds that modern humans expanded out of Africa in one or more waves, with a major dispersal event occurring approximately 60,000–70,000 years ago. This expansion ultimately resulted in the colonisation of every habitable continent, replacing or interbreeding with archaic human populations including Neanderthals in Europe and western Asia and Denisovans in eastern Asia and Oceania. Genomic analysis has confirmed that contemporary non-African populations carry small but detectable amounts of Neanderthal DNA, typically between 1 and 4 percent, evidence of interbreeding between modern humans and Neanderthals before the latter's extinction.

B. The genetic history of Europe has proved particularly complex and has been substantially rewritten by ancient DNA research over the past decade. Three major ancestral populations contributed to the genetic makeup of contemporary Europeans: the first modern humans to arrive in Europe approximately 45,000 years ago, who were later largely replaced by a wave of farmers migrating from Anatolia beginning around 8,000–9,000 years ago, and subsequently by herders from the Eurasian steppe — associated with the Yamnaya culture — who expanded westward approximately 5,000 years ago. This steppe ancestry is also associated with the spread of Indo-European languages across much of Europe and South Asia, though the precise mechanisms by which languages spread alongside genetic ancestry remain debated.

C. The peopling of the Americas represents another area where ancient DNA has dramatically revised understanding. For decades, the dominant model held that the Americas were settled by a single founding population crossing from Siberia to Alaska via a land bridge exposed during the last Ice Age. Recent genomic evidence complicates this picture significantly. Studies have identified genetic signals of at least two distinct founding populations contributing to the ancestry of Native American populations, and some have detected traces of ancestry related to Australasian populations in certain Amazonian groups — a finding that has not yet been fully explained. The timing and routes of initial settlement also remain contested, with some genetic and archaeological evidence suggesting human presence in the Americas before the land bridge crossing was possible.

D. Ancient DNA analysis has also shed light on historical population dynamics that occurred within the period of written records but were not well documented. The expansion of Yersinia pestis — the bacterium responsible for bubonic plague — across Eurasia in the fourteenth century caused demographic collapse in many regions. Ancient DNA from burial sites has been used to track the pathogen's origins and spread, as well as to document the dramatic population decline and subsequent demographic recovery. Similarly, the genetic consequences of European colonisation of the Americas — including population collapse among indigenous peoples due to introduced diseases, enslavement, and violence — have been documented through the analysis of pre- and post-contact skeletal remains.

E. The application of genetic ancestry testing to living populations has raised complex questions about the relationship between genetics, identity, and historical narrative. Commercial genetic ancestry tests, which compare a customer's genome to reference panels of populations, have become enormously popular, with tens of millions of people having taken such tests. However, the results require careful interpretation. Genetic ancestry does not map cleanly onto ethnic, national, or cultural identity. The reference panels used by testing companies are imperfect representations of historical populations, and the categories used — percentages of English, French, or Scandinavian ancestry, for example — are modern political constructs that did not exist in the same form when the relevant population mixing occurred.

F. The ethical dimensions of ancient DNA research have attracted increasing scrutiny from indigenous communities and scholars. Research on human remains from archaeological sites has sometimes proceeded without meaningful consultation with or consent from descendant communities. The analysis of ancient DNA from indigenous ancestors has in some cases produced findings that conflict with oral traditions about origins and migration histories — findings that have been experienced by some communities as a challenge to their cultural identity and legal claims to land. International guidelines for the ethical conduct of ancient DNA research have been developed, but their implementation remains uneven and contested.`,
    questions: [
      { id: 1, type: "tfng", question: "Modern humans originated in Africa approximately 300,000 years ago.", answer: "TRUE", explanation: "The passage states the earliest anatomically modern human fossils date to approximately 300,000 years ago in Africa." },
      { id: 2, type: "tfng", question: "All contemporary human populations carry detectable amounts of Neanderthal DNA.", answer: "FALSE", explanation: "The passage states non-African populations carry Neanderthal DNA — it does not say all populations, implying African populations may not." },
      { id: 3, type: "tfng", question: "The Americas were definitively settled by a single founding population according to recent genomic evidence.", answer: "FALSE", explanation: "The passage states recent evidence identifies at least two distinct founding populations, complicating the single founding population model." },
      { id: 4, type: "tfng", question: "Commercial genetic ancestry tests provide perfectly accurate representations of historical populations.", answer: "FALSE", explanation: "The passage states reference panels are imperfect representations of historical populations and results require careful interpretation." },
      { id: 5, type: "multiple", question: "What three ancestral populations contributed to contemporary European genetics?", options: ["Africans, Asians, and Middle Easterners", "First modern Europeans, Anatolian farmers, and Eurasian steppe herders", "Neanderthals, Denisovans, and modern humans", "Northern Europeans, Southern Europeans, and Eastern Europeans"], answer: 1, explanation: "The passage identifies three populations: first modern Europeans, Anatolian farmers from 8,000–9,000 years ago, and Yamnaya steppe herders from 5,000 years ago." },
      { id: 6, type: "multiple", question: "What unexpected finding was detected in some Amazonian indigenous populations?", options: ["High levels of Neanderthal DNA", "Traces of ancestry related to Australasian populations", "Evidence of direct migration from Africa", "Genetic markers from East Asian populations"], answer: 1, explanation: "The passage states some studies detected traces of ancestry related to Australasian populations in certain Amazonian groups." },
      { id: 7, type: "multiple", question: "What has ancient DNA analysis revealed about the Black Death?", options: ["Its origins were in Western Europe, not Asia", "It tracked the pathogen's origins and the demographic collapse it caused", "The bacterium has since become extinct", "European populations were genetically immune to the disease"], answer: 1, explanation: "The passage states ancient DNA tracked the pathogen's origins and spread and documented dramatic population decline and recovery." },
      { id: 8, type: "multiple", question: "What concern have indigenous communities raised about ancient DNA research?", options: ["That the research is too expensive to be worthwhile", "That findings sometimes conflict with oral traditions about origins", "That the technology is not yet accurate enough to be reliable", "That the research focuses too much on European populations"], answer: 1, explanation: "The passage states ancient DNA findings have in some cases conflicted with oral traditions about origins and migration histories." },
      { id: 9, type: "fillin", question: "Non-African populations typically carry between 1 and __________ percent Neanderthal DNA.", answer: "4", alternatives: ["four"], explanation: "The passage states non-African populations carry between 1 and 4 percent Neanderthal DNA." },
      { id: 10, type: "fillin", question: "The Yamnaya culture is associated with the spread of __________ languages across Europe and South Asia.", answer: "Indo-European", alternatives: [], explanation: "The passage states steppe ancestry is associated with the spread of Indo-European languages." },
      { id: 11, type: "fillin", question: "Yersinia pestis is the bacterium responsible for __________ plague.", answer: "bubonic", alternatives: [], explanation: "The passage identifies Yersinia pestis as the bacterium responsible for bubonic plague." },
      { id: 12, type: "matching", question: "Which paragraph discusses the complex genetic history of Europe and its three founding populations?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: 1, explanation: "Paragraph B discusses the three major ancestral populations of contemporary Europeans." },
      { id: 13, type: "matching", question: "Which paragraph raises ethical concerns about ancient DNA research and indigenous communities?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: 5, explanation: "Paragraph F discusses lack of consent, conflicts with oral traditions, and international ethical guidelines." }
    ]
  },
  {
    id: 10,
    title: "The Architecture of Cities",
    topic: "Architecture",
    difficulty: "medium",
    passage: `Architecture shapes human experience in ways that are simultaneously profound and largely invisible to those who live within built environments. The design of buildings, streets, and public spaces influences mood, behaviour, social interaction, and physical health in ways that decades of research in environmental psychology have begun to document systematically. Yet architectural decisions are often driven primarily by economic considerations — construction costs, land values, and return on investment — with consequences for human wellbeing that are rarely fully accounted for in the calculus of development.

A. The relationship between architectural design and human psychology has been studied since the mid-twentieth century, when researchers began investigating why some environments feel comfortable and others stressful. A consistent finding is that humans respond positively to environments that offer both prospect — the ability to see a wide surrounding area — and refuge — a sense of shelter and enclosure. This preference, theorised to reflect evolutionary adaptations developed on the African savanna, helps explain the enduring appeal of spaces that combine openness with protective boundaries, such as the alcoves, courtyards, and window seats that characterise beloved traditional architecture. Modernist architectural styles that prioritised open, undifferentiated spaces have in some cases produced buildings that feel alienating despite their functional efficiency.

B. The question of what makes cities walkable and socially vibrant has occupied urban designers since Jane Jacobs's influential critique of postwar urban renewal in her 1961 book The Death and Life of Great American Cities. Jacobs argued that the health of urban neighbourhoods depends on a mixture of uses — residential, commercial, and civic — generating foot traffic at different times of day, along with buildings of varying ages that enable a mix of businesses at different rent levels. Wide pavements, active street frontages, and short city blocks that offer pedestrians multiple routes all contribute to what she termed the conditions for urban vitality. The wholesale demolition of existing neighbourhoods in favour of modernist housing towers surrounded by open space — a planning approach she fiercely opposed — tended to destroy the social fabric that had sustained communities for generations.

C. The relationship between architecture and social inequality has become increasingly prominent in contemporary debates. Housing affordability has reached crisis levels in many major cities, driven by a combination of population growth, restrictive planning regulations, and the treatment of housing as an investment asset rather than a social good. The design of social housing has varied dramatically in its approach and outcomes. Some postwar social housing projects, such as the Pruitt-Igoe complex in St Louis demolished in 1972, became associated with concentrated poverty, crime, and social breakdown — though researchers have debated how much responsibility should be attributed to architectural design versus funding decisions, management failures, and the broader social context of racial segregation and deindustrialisation. More recent social housing projects, particularly in northern European cities, have demonstrated that high-quality, well-designed affordable housing can be both economically viable and socially successful.

D. Sustainable architecture has moved from a marginal interest to a mainstream concern as the environmental impact of the built environment has become better understood. Buildings account for approximately 40 percent of global energy consumption and a similar share of carbon dioxide emissions in many countries, primarily through heating, cooling, and lighting. Passive design strategies — optimising building orientation, insulation, glazing, and ventilation to reduce energy demand without mechanical systems — can dramatically reduce operational energy consumption. The embodied carbon in building materials — the emissions associated with their manufacture and transport — is receiving increasing attention as operational carbon is reduced. Whole-life carbon accounting, which considers both operational and embodied carbon over a building's lifetime, is becoming the standard framework for assessing environmental impact.

E. The preservation of historic buildings and urban environments has generated persistent tension between conservation and development interests. Historic buildings embody accumulated craftsmanship, cultural memory, and often irreplaceable architectural techniques. Their demolition eliminates not only physical structures but also the continuity of urban character that gives cities their distinctive identities. However, conservation can conflict with housing supply needs, restrict adaptive reuse, and in some cases serve primarily to protect property values in affluent areas while limiting development that might improve affordability. The heritage designation of entire neighbourhoods has in some cities contributed to the displacement of lower-income residents through gentrification — the process by which wealthier incomers gradually replace lower-income communities as neighbourhood desirability increases.

F. Digital technologies are transforming architectural practice in ways that extend well beyond the use of computer-aided design software. Building information modelling allows architects, engineers, and contractors to work from a shared three-dimensional digital model that contains information about every component of a building, enabling better coordination, clash detection, and lifecycle management. Computational design tools allow architects to explore vast design spaces and optimise for multiple performance criteria simultaneously. Parametric design — the use of algorithms to generate building forms — has produced striking architectural experiments, though critics argue that the resulting buildings sometimes prioritise visual novelty over human experience. The use of virtual and augmented reality in design review allows clients and communities to experience proposed buildings before they are built, potentially improving the quality of design decisions.`,
    questions: [
      { id: 1, type: "tfng", question: "Humans respond positively to environments that offer both prospect and refuge.", answer: "TRUE", explanation: "The passage directly states a consistent finding is that humans respond positively to environments offering both prospect and refuge." },
      { id: 2, type: "tfng", question: "Jane Jacobs supported the demolition of existing neighbourhoods in favour of modernist housing towers.", answer: "FALSE", explanation: "The passage states Jacobs fiercely opposed the wholesale demolition of existing neighbourhoods in favour of modernist housing towers." },
      { id: 3, type: "tfng", question: "Buildings account for approximately 40 percent of global energy consumption in many countries.", answer: "TRUE", explanation: "The passage directly states buildings account for approximately 40 percent of global energy consumption." },
      { id: 4, type: "tfng", question: "Heritage designation of neighbourhoods always prevents gentrification and protects lower-income residents.", answer: "FALSE", explanation: "The passage states heritage designation has in some cities contributed to the displacement of lower-income residents through gentrification." },
      { id: 5, type: "multiple", question: "What does Jane Jacobs argue creates urban vitality?", options: ["Tall buildings with large green spaces surrounding them", "A mixture of uses generating foot traffic at different times, varied building ages, and short blocks", "Strict zoning separating residential from commercial areas", "Wide roads allowing efficient traffic flow through neighbourhoods"], answer: 1, explanation: "The passage states Jacobs argued urban health depends on mixed uses, buildings of varying ages, active street frontages, and short city blocks." },
      { id: 6, type: "multiple", question: "What does whole-life carbon accounting consider?", options: ["Only the energy used during a building's operation", "Only the carbon emitted during construction", "Both operational and embodied carbon over a building's lifetime", "The carbon offset potential of green roofs and solar panels"], answer: 2, explanation: "The passage states whole-life carbon accounting considers both operational and embodied carbon over a building's lifetime." },
      { id: 7, type: "multiple", question: "What is parametric design?", options: ["Design based on historical precedent and traditional proportions", "The use of algorithms to generate building forms", "Design optimised purely for structural efficiency", "A collaborative design process involving community consultation"], answer: 1, explanation: "The passage defines parametric design as the use of algorithms to generate building forms." },
      { id: 8, type: "multiple", question: "What criticism do some make of buildings produced through parametric design?", options: ["They are too expensive to construct", "They prioritise visual novelty over human experience", "They cannot meet energy efficiency standards", "They are structurally unsafe"], answer: 1, explanation: "The passage states critics argue resulting buildings sometimes prioritise visual novelty over human experience." },
      { id: 9, type: "fillin", question: "The preference for prospect and refuge is theorised to reflect evolutionary adaptations developed on the African __________.", answer: "savanna", alternatives: ["savannah"], explanation: "The passage states this preference reflects evolutionary adaptations developed on the African savanna." },
      { id: 10, type: "fillin", question: "Jane Jacobs published her influential critique of postwar urban renewal in __________.", answer: "1961", alternatives: [], explanation: "The passage states Jacobs published The Death and Life of Great American Cities in 1961." },
      { id: 11, type: "fillin", question: "Building information modelling allows architects, engineers, and contractors to work from a shared three-dimensional __________ model.", answer: "digital", alternatives: [], explanation: "The passage states building information modelling involves a shared three-dimensional digital model." },
      { id: 12, type: "matching", question: "Which paragraph discusses the environmental impact of buildings and sustainable design strategies?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: 3, explanation: "Paragraph D discusses buildings' energy consumption, passive design strategies, embodied carbon, and whole-life carbon accounting." },
      { id: 13, type: "matching", question: "Which paragraph discusses digital technologies transforming architectural practice?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: 5, explanation: "Paragraph F discusses building information modelling, computational design, parametric design, and virtual reality in architecture." }
    ]
  },
  {
    id: 11,
    title: "The Economics of Inequality",
    topic: "Economics",
    difficulty: "hard",
    passage: `Economic inequality — the unequal distribution of income and wealth across individuals and households — has increased significantly in many countries over the past four decades, reversing a mid-twentieth century trend toward greater equality that had characterised the postwar decades. The reversal has been most pronounced in English-speaking countries, particularly the United States and the United Kingdom, though the trend has been observed across much of the developed world. Understanding the causes of rising inequality, its consequences for economic growth and social cohesion, and the policy options available to address it has become one of the central preoccupations of contemporary economics.

A. The causes of rising inequality are multiple and contested. Technological change, particularly the development of information and communication technologies, has increased the productivity and earnings of highly skilled workers while reducing demand for routine tasks that can be automated, contributing to what economists call skill-biased technological change. Globalisation has increased competition from lower-wage countries, putting downward pressure on wages for workers in import-competing industries in developed nations. The declining bargaining power of trade unions, resulting from legislative changes, sectoral shifts away from manufacturing, and increased employer mobility, has weakened workers' ability to capture a share of productivity gains. The financialisation of economies — the growing role of financial activities in economic life — has generated large returns to capital holders that have not been shared broadly.

B. The work of French economist Thomas Piketty, particularly his 2013 book Capital in the Twenty-First Century, stimulated renewed public and academic attention to wealth inequality. Piketty argued, based on extensive historical data, that the rate of return on capital tends to exceed the rate of economic growth over long periods, implying that wealth will tend to concentrate unless interrupted by exceptional circumstances such as the world wars or policy interventions. His analysis suggested that the mid-twentieth century period of relatively equal distribution was historically anomalous, driven by the destruction of accumulated wealth during the wars and by progressive taxation and social spending policies that have since been substantially rolled back.

C. The consequences of high inequality for economic growth are debated among economists. Some argue that inequality creates incentives for innovation and risk-taking by offering large rewards to successful entrepreneurs. Others contend that high inequality undermines growth by reducing consumer demand, limiting investment in human capital among lower-income households, and generating political instability. Research by the International Monetary Fund has found that high levels of inequality are associated with shorter periods of economic growth and greater economic volatility, suggesting that beyond a certain threshold, inequality is economically as well as socially harmful. The relationship is complex, however, and depends on the mechanisms through which inequality arises and the policy context.

D. The social consequences of high inequality extend beyond economic performance. Research has linked greater inequality within societies to a range of negative social outcomes including poorer population health, lower social mobility, higher rates of crime, lower levels of social trust, and reduced political participation among lower-income groups. The epidemiologists Richard Wilkinson and Kate Pickett, in their book The Spirit Level, argued that these social problems are caused not by poverty in absolute terms but by relative inequality — the social stress generated by large status differences within societies. Their comparative analysis across developed nations found that more equal societies systematically outperformed less equal ones on a wide range of social outcomes, regardless of average income levels.

E. Policy responses to inequality operate through multiple channels. Progressive taxation — systems in which effective tax rates rise with income — redistributes pre-tax inequality to some degree, as does spending on public services including education, healthcare, and housing that provides benefits disproportionately to lower-income households. Labour market policies including minimum wage legislation, collective bargaining rights, and anti-discrimination law shape the pre-distribution of earnings before taxes and transfers. Wealth taxes, inheritance taxes, and land value taxes target wealth accumulation directly. The effectiveness of these instruments depends critically on the ability to prevent tax avoidance and evasion, which has proved increasingly difficult as capital has become more internationally mobile and the sophistication of tax planning has increased.

F. The rise of billionaires — individuals whose wealth exceeds one billion dollars — has attracted particular attention as a marker of extreme concentration at the top of the wealth distribution. The number of billionaires globally has grown from fewer than 150 in 1987 to over 2,600 by 2022, with their combined wealth exceeding the GDP of most countries. Critics argue that extreme wealth concentration is incompatible with democratic governance, as it provides the very wealthy with disproportionate influence over political processes through campaign financing, media ownership, and lobbying. Defenders argue that billionaire wealth largely reflects the creation of valuable companies and products that have benefited society broadly. The debate over whether extreme wealth concentration is an economic problem, a political problem, or both, shows no sign of resolution.`,
    questions: [
      { id: 1, type: "tfng", question: "Economic inequality has decreased in most countries over the past four decades.", answer: "FALSE", explanation: "The passage states inequality has increased significantly in many countries over the past four decades, reversing an earlier trend." },
      { id: 2, type: "tfng", question: "Piketty argued that the rate of return on capital tends to exceed the rate of economic growth over long periods.", answer: "TRUE", explanation: "The passage directly states Piketty argued the rate of return on capital tends to exceed the rate of economic growth over long periods." },
      { id: 3, type: "tfng", question: "All economists agree that high inequality always stimulates economic growth through incentives.", answer: "FALSE", explanation: "The passage states consequences of inequality for growth are debated — some argue it creates incentives while others contend it undermines growth." },
      { id: 4, type: "tfng", question: "Wilkinson and Pickett argued social problems are caused by relative inequality rather than absolute poverty.", answer: "TRUE", explanation: "The passage states they argued problems are caused not by poverty in absolute terms but by relative inequality." },
      { id: 5, type: "multiple", question: "What is skill-biased technological change?", options: ["Technology that creates jobs equally across all skill levels", "Technology that increases productivity for skilled workers while reducing demand for routine tasks", "Technology that specifically targets low-skill manufacturing", "Technology developed exclusively by highly educated researchers"], answer: 1, explanation: "The passage describes skill-biased technological change as increasing productivity for highly skilled workers while reducing demand for routine tasks that can be automated." },
      { id: 6, type: "multiple", question: "What did the IMF research find about high inequality?", options: ["It consistently accelerates economic growth", "It has no measurable effect on economic performance", "It is associated with shorter growth periods and greater volatility", "It only affects developing nations negatively"], answer: 2, explanation: "The passage states IMF research found high inequality is associated with shorter periods of economic growth and greater economic volatility." },
      { id: 7, type: "multiple", question: "How many billionaires existed globally by 2022 according to the passage?", options: ["Fewer than 150", "Approximately 500", "Around 1,000", "Over 2,600"], answer: 3, explanation: "The passage states there were over 2,600 billionaires globally by 2022." },
      { id: 8, type: "multiple", question: "What do critics of extreme wealth concentration argue?", options: ["Billionaires create too many jobs, distorting labour markets", "Extreme wealth is incompatible with democratic governance due to disproportionate political influence", "Wealthy individuals pay too much in taxes", "Billionaires should be required to invest only in domestic companies"], answer: 1, explanation: "The passage states critics argue extreme wealth concentration is incompatible with democratic governance as it provides disproportionate political influence." },
      { id: 9, type: "fillin", question: "Piketty published Capital in the Twenty-First Century in __________.", answer: "2013", alternatives: [], explanation: "The passage states Piketty published his book in 2013." },
      { id: 10, type: "fillin", question: "The number of billionaires globally grew from fewer than 150 in 1987 to over 2,600 by __________.", answer: "2022", alternatives: [], explanation: "The passage states the growth occurred from fewer than 150 in 1987 to over 2,600 by 2022." },
      { id: 11, type: "fillin", question: "Wilkinson and Pickett presented their argument in a book called The __________ Level.", answer: "Spirit", alternatives: [], explanation: "The passage refers to their book as The Spirit Level." },
      { id: 12, type: "matching", question: "Which paragraph discusses the causes of rising inequality including technology and globalisation?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: 0, explanation: "Paragraph A discusses skill-biased technological change, globalisation, declining union power, and financialisation as causes." },
      { id: 13, type: "matching", question: "Which paragraph discusses policy tools for addressing inequality?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: 4, explanation: "Paragraph E discusses progressive taxation, public services, labour market policies, and wealth taxes as policy responses." }
    ]
  },
  {
    id: 12,
    title: "Language Extinction and Preservation",
    topic: "Language",
    difficulty: "medium",
    passage: `Of the approximately 7,000 languages spoken in the world today, linguists estimate that between 50 and 90 percent will have fallen silent by the end of the twenty-first century. A language dies every two weeks on average, typically when its last fluent native speaker passes away without having transmitted the language to a new generation. The current rate of language extinction has no historical precedent; it represents the most rapid reduction in linguistic diversity in human history, driven primarily by the global dominance of a small number of major languages and the social, economic, and political pressures that lead communities to shift away from their heritage languages.

A. The geographic distribution of linguistic diversity is highly uneven. The vast majority of the world's languages are spoken in tropical regions, particularly in Papua New Guinea, which has over 800 languages — more than any other country — along with sub-Saharan Africa, the Amazon basin, and parts of Southeast Asia. By contrast, Europe, with its relatively small land area and large populations, accounts for only around 3 percent of the world's languages. This pattern broadly reflects historical isolation and ecological diversity — geographically fragmented environments with many distinct ecological niches tend to support greater cultural and linguistic diversity. The languages at greatest risk of extinction are typically those with the smallest speaker communities, often located in regions undergoing rapid economic development and integration.

B. The causes of language shift — the process by which communities abandon their heritage language in favour of another — are intertwined with broader social, economic, and political forces. Languages associated with economic opportunity, education, and social advancement attract speakers, while those associated with marginalisation and limited opportunity lose them. Colonial histories have profoundly shaped current linguistic landscapes, with colonial languages often having been imposed as the medium of education, administration, and economic life in ways that persisted long after formal independence. In some cases, colonial and post-colonial governments actively suppressed indigenous languages through policies prohibiting their use in schools, a practice whose effects on language vitality are still being felt in many communities.

C. The loss of a language represents not merely the disappearance of a communication system but the extinction of a unique way of encoding human experience and knowledge. Each language structures reality differently — through its grammatical categories, the semantic domains it distinguishes with precision, and the cultural knowledge embedded in its vocabulary. Many languages encode sophisticated ecological knowledge accumulated over centuries of close observation of local environments — knowledge about plant properties, animal behaviour, weather patterns, and sustainable resource management that is often not recorded elsewhere. When a language dies, this knowledge may be lost along with it, representing a potential loss not only for the communities concerned but for humanity's broader understanding of the natural world.

D. Efforts to document and preserve endangered languages have intensified significantly over the past three decades, driven by growing recognition of the urgency of the situation among linguists and, crucially, among indigenous communities themselves. Documentary linguistics — the systematic recording of languages through audio and video recordings, grammatical analysis, and the compilation of dictionaries and texts — has become an established subdiscipline, supported by dedicated funding programmes in several countries. However, documentation alone does not prevent language death; it merely creates a record of what has been lost. Language revitalisation — the effort to restore active intergenerational transmission of a language — requires sustained community effort over generations and is considerably more difficult to achieve.

E. A small number of language revitalisation efforts have achieved remarkable success, offering models and hope to other endangered language communities. Hebrew was revived from a classical literary language with no native speakers in the late nineteenth and early twentieth centuries to become the everyday spoken language of a modern nation — an achievement widely regarded as historically unprecedented. Welsh has been stabilised and partially revitalised in Wales through a combination of official recognition, Welsh-medium education, and broadcasting in Welsh. The Maori language in New Zealand has been supported through Kohanga Reo — language nest — immersion programmes for young children, contributing to significant increases in the number of younger Maori speakers, though concerns remain about the depth of fluency achieved.

F. The politics of language are deeply intertwined with questions of cultural identity, political autonomy, and human rights. For many indigenous communities, the revitalisation of their heritage language is inseparable from broader struggles for cultural survival and political recognition. The United Nations Declaration on the Rights of Indigenous Peoples, adopted in 2007, affirms the right of indigenous peoples to revitalise, use, develop, and transmit to future generations their languages. However, the translation of these rights into practical policy support has been uneven. Governments that have invested seriously in indigenous language support, such as New Zealand and some Scandinavian nations, have demonstrated that meaningful progress is achievable with sustained political commitment and adequate resources.`,
    questions: [
      { id: 1, type: "tfng", question: "A language dies approximately every two weeks on average.", answer: "TRUE", explanation: "The passage directly states a language dies every two weeks on average." },
      { id: 2, type: "tfng", question: "Europe accounts for the majority of the world's languages.", answer: "FALSE", explanation: "The passage states Europe accounts for only around 3 percent of the world's languages." },
      { id: 3, type: "tfng", question: "Papua New Guinea has more languages than any other country.", answer: "TRUE", explanation: "The passage directly states Papua New Guinea has over 800 languages, more than any other country." },
      { id: 4, type: "tfng", question: "Language documentation alone is sufficient to prevent language death.", answer: "FALSE", explanation: "The passage explicitly states documentation alone does not prevent language death, it merely creates a record of what has been lost." },
      { id: 5, type: "multiple", question: "What is language shift?", options: ["The natural evolution of a language over time", "The process by which communities abandon their heritage language in favour of another", "The adoption of foreign words into an existing language", "The standardisation of spelling and grammar in a language"], answer: 1, explanation: "The passage defines language shift as the process by which communities abandon their heritage language in favour of another." },
      { id: 6, type: "multiple", question: "What achievement is Hebrew revitalisation widely regarded as?", options: ["A natural consequence of Israeli nationalism", "A historically unprecedented achievement", "A relatively straightforward process that took only a few years", "A partially successful effort that is still ongoing"], answer: 1, explanation: "The passage states Hebrew revitalisation is widely regarded as historically unprecedented." },
      { id: 7, type: "multiple", question: "What are Kohanga Reo programmes?", options: ["Maori language university courses", "Language immersion programmes for young children", "Government-funded translation services", "Radio and television programmes in Maori"], answer: 1, explanation: "The passage describes Kohanga Reo as language nest immersion programmes for young children." },
      { id: 8, type: "multiple", question: "When was the UN Declaration on the Rights of Indigenous Peoples adopted?", options: ["1987", "1997", "2007", "2017"], answer: 2, explanation: "The passage directly states the UN Declaration was adopted in 2007." },
      { id: 9, type: "fillin", question: "Linguists estimate between 50 and __________ percent of today's languages will have fallen silent by the end of this century.", answer: "90", alternatives: ["ninety"], explanation: "The passage states linguists estimate between 50 and 90 percent of languages will fall silent by the end of the century." },
      { id: 10, type: "fillin", question: "Papua New Guinea has over __________ languages, more than any other country.", answer: "800", alternatives: ["eight hundred"], explanation: "The passage states Papua New Guinea has over 800 languages." },
      { id: 11, type: "fillin", question: "Language __________ requires sustained community effort over generations and is considerably more difficult than documentation.", answer: "revitalisation", alternatives: ["revitalization"], explanation: "The passage contrasts documentation with language revitalisation, describing the latter as considerably more difficult." },
      { id: 12, type: "matching", question: "Which paragraph discusses what is lost when a language disappears beyond just the communication system?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: 2, explanation: "Paragraph C discusses unique ways of encoding experience, ecological knowledge, and cultural knowledge embedded in vocabulary." },
      { id: 13, type: "matching", question: "Which paragraph discusses successful examples of language revitalisation including Hebrew and Welsh?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: 4, explanation: "Paragraph E discusses Hebrew revival, Welsh stabilisation, and Maori Kohanga Reo programmes as successful cases." }
    ]
  },
  {
    id: 13,
    title: "The Science of Climate Change",
    topic: "Environment",
    difficulty: "hard",
    passage: `The scientific understanding of climate change has developed over more than a century, from the theoretical work of Swedish chemist Svante Arrhenius, who calculated in 1896 that doubling atmospheric carbon dioxide would raise global temperatures by approximately 5 to 6 degrees Celsius, to the sophisticated climate models of today that integrate observations from satellites, ocean buoys, weather stations, and ice cores to project future climate trajectories with increasing confidence. The core conclusion — that human activities are causing the Earth to warm through the emission of greenhouse gases, primarily carbon dioxide from fossil fuel combustion and methane from agriculture and waste — is among the most thoroughly examined and robustly supported conclusions in all of science.

A. The greenhouse effect is a natural phenomenon essential to life on Earth. Without it, the planet's average surface temperature would be approximately minus 18 degrees Celsius rather than the current average of approximately 15 degrees Celsius — far too cold to support most life as we know it. The greenhouse effect operates because certain gases in the atmosphere, including water vapour, carbon dioxide, and methane, absorb outgoing infrared radiation emitted by the Earth's surface and re-emit it in all directions, including back toward the surface. The enhanced greenhouse effect — the amplification of this natural warming by human emissions of greenhouse gases — is the mechanism through which human activities are causing climate change.

B. The evidence for human-caused climate change comes from multiple independent lines of investigation. Direct measurements show that atmospheric carbon dioxide concentrations have increased from approximately 280 parts per million in pre-industrial times to over 420 parts per million today — the highest level in at least 800,000 years, as determined from analysis of air bubbles trapped in Antarctic ice cores. Global average surface temperatures have risen by approximately 1.1 degrees Celsius above pre-industrial levels. Sea levels have risen by approximately 20 centimetres since 1900, driven by thermal expansion of warming ocean water and the melting of glaciers and ice sheets. Arctic sea ice extent has declined dramatically, with the Arctic warming at approximately four times the global average rate.

C. Climate models — mathematical representations of the Earth's climate system that simulate the interactions between the atmosphere, ocean, land surface, and ice — have become increasingly sophisticated over the decades. Early models captured only the most basic features of the climate system; contemporary models run on supercomputers and incorporate detailed representations of cloud formation, ocean circulation, carbon cycling, and land surface processes. These models successfully reproduce the observed warming of the twentieth century when human forcings are included and fail to reproduce it when only natural factors are considered, providing powerful evidence that human activities are the dominant cause of observed warming. Their projections of future warming depend critically on future greenhouse gas emission pathways.

D. The impacts of climate change are already being observed across the globe and are projected to intensify significantly as warming continues. Extreme weather events including heatwaves, heavy precipitation events, and intense tropical cyclones have become more frequent and severe in many regions. Coral reefs have experienced repeated mass bleaching events as ocean temperatures rise, threatening ecosystems that support approximately 25 percent of all marine species. Permafrost — permanently frozen ground in Arctic and sub-Arctic regions — is thawing, releasing stored carbon and methane and potentially creating a positive feedback that could accelerate warming beyond what human emissions alone would produce. Agricultural systems in many regions are experiencing changing growing seasons, shifting precipitation patterns, and increased frequency of extreme events that threaten food security.

E. The politics of climate change have proved as complex as the science. Despite overwhelming scientific consensus, climate policy has been highly contested in many countries, particularly those with significant fossil fuel industries. The fossil fuel industry has been documented as having funded campaigns to sow doubt about climate science and delay policy action, drawing comparisons with the tobacco industry's historical efforts to contest evidence of smoking's health harms. International climate negotiations have been complicated by questions of historical responsibility — wealthy nations that industrialised first have contributed the most to cumulative emissions but are often better placed to cope with climate impacts than the poorer nations that have contributed least but are often most vulnerable.

F. The response to climate change requires action across multiple timescales and sectors simultaneously. Mitigation — reducing greenhouse gas emissions to limit the extent of future warming — requires rapid decarbonisation of energy systems, transport, industry, and agriculture. The Intergovernmental Panel on Climate Change has concluded that limiting warming to 1.5 degrees Celsius above pre-industrial levels — the more ambitious target of the Paris Agreement — requires global net emissions to reach zero by approximately 2050 and likely requires the removal of carbon dioxide from the atmosphere. Adaptation — adjusting to the climate change that is already locked in due to past emissions — requires changes to infrastructure, land use, agricultural practices, and public health systems. The distinction between mitigation and adaptation is important: while mitigation determines how much climate change ultimately occurs, adaptation determines how much harm a given level of warming causes.`,
    questions: [
      { id: 1, type: "tfng", question: "Arrhenius calculated in 1896 that doubling CO2 would raise temperatures by approximately 5 to 6 degrees Celsius.", answer: "TRUE", explanation: "The passage directly states Arrhenius calculated doubling atmospheric carbon dioxide would raise global temperatures by approximately 5 to 6 degrees Celsius." },
      { id: 2, type: "tfng", question: "Without the greenhouse effect, Earth's average temperature would be approximately minus 18 degrees Celsius.", answer: "TRUE", explanation: "The passage directly states without the greenhouse effect Earth's average surface temperature would be approximately minus 18 degrees Celsius." },
      { id: 3, type: "tfng", question: "Current atmospheric CO2 levels are the highest in at least 800,000 years.", answer: "TRUE", explanation: "The passage states over 420 parts per million is the highest level in at least 800,000 years as determined from Antarctic ice cores." },
      { id: 4, type: "tfng", question: "Climate models successfully reproduce observed warming without including human factors.", answer: "FALSE", explanation: "The passage states models successfully reproduce observed warming when human forcings are included and fail to reproduce it when only natural factors are considered." },
      { id: 5, type: "multiple", question: "What drives sea level rise according to the passage?", options: ["Increased rainfall from extreme weather events", "Thermal expansion of warming ocean water and melting of glaciers and ice sheets", "Changes in ocean circulation patterns", "Subsidence of coastal land areas"], answer: 1, explanation: "The passage states sea level rise is driven by thermal expansion of warming ocean water and the melting of glaciers and ice sheets." },
      { id: 6, type: "multiple", question: "What percentage of marine species do coral reefs support?", options: ["Approximately 10 percent", "Approximately 15 percent", "Approximately 25 percent", "Approximately 40 percent"], answer: 2, explanation: "The passage states coral reefs support approximately 25 percent of all marine species." },
      { id: 7, type: "multiple", question: "What comparison has been made regarding the fossil fuel industry's behaviour?", options: ["It has been compared to the arms industry lobbying against arms control", "It has been compared to the tobacco industry contesting evidence of smoking harms", "It has been compared to pharmaceutical companies delaying drug approvals", "It has been compared to agricultural lobbies opposing environmental regulation"], answer: 1, explanation: "The passage states the fossil fuel industry has been compared to the tobacco industry's historical efforts to contest evidence of smoking harms." },
      { id: 8, type: "multiple", question: "What does adaptation to climate change involve?", options: ["Reducing greenhouse gas emissions to limit future warming", "Removing carbon dioxide from the atmosphere", "Adjusting to climate change already locked in due to past emissions", "Developing new forms of clean energy technology"], answer: 2, explanation: "The passage defines adaptation as adjusting to the climate change that is already locked in due to past emissions." },
      { id: 9, type: "fillin", question: "Global average surface temperatures have risen by approximately __________ degrees Celsius above pre-industrial levels.", answer: "1.1", alternatives: ["one point one"], explanation: "The passage states temperatures have risen by approximately 1.1 degrees Celsius above pre-industrial levels." },
      { id: 10, type: "fillin", question: "Sea levels have risen by approximately __________ centimetres since 1900.", answer: "20", alternatives: ["twenty"], explanation: "The passage states sea levels have risen approximately 20 centimetres since 1900." },
      { id: 11, type: "fillin", question: "The Arctic is warming at approximately __________ times the global average rate.", answer: "four", alternatives: ["4"], explanation: "The passage states the Arctic is warming at approximately four times the global average rate." },
      { id: 12, type: "matching", question: "Which paragraph discusses political obstacles and fossil fuel industry opposition to climate policy?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: 4, explanation: "Paragraph E discusses fossil fuel industry campaigns to sow doubt, comparisons with the tobacco industry, and challenges of international negotiations." },
      { id: 13, type: "matching", question: "Which paragraph defines and distinguishes between mitigation and adaptation strategies?", options: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], answer: 5, explanation: "Paragraph F defines mitigation as reducing emissions and adaptation as adjusting to locked-in climate change, and explains why the distinction matters." }
    ]
  }
]
