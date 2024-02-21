export default (req, res) => {
  res.send(questions[req.query.day - 1]);
};

const questions = [
  [
    {
      "Question (Reddit post)":
        'Sometimes I feel alienated from "regular people". People who do not do opioids. So I do not always have people to talk to, even about non opioids related subject matter. You all having a good day? If anyone is struggling with loneliness feel free to talk as well. I know that sometimes life is hard and it helps to have people to turn to to talk about things.',
      "Reddit response":
        "Last days were really good, I got my drivers licence and got accepted to a university. I have been sober for a year, but lately I have been feeling like I should celebrate with some opioids, because even though I have managed to do a lot of things, I still dont feel completely happy. I know it is a bad idea, so I will try not to do it.",
      "LLM response": null,
    },
    {
      "Question (Reddit post)":
        "I celebrated six years clean and, people keep saying how proud they are of me when i share my story, but I am not proud. I fight the craving every single day. I remember so vividly how good opiates made me feel. Does this feeling ever go away? It is honestly haunting. I know that for every addict relapse is just one step away. I refuse to take that step. I never will. I know how much better I am when I am sober. I know using does not make life any easier, but sometimes it made things more bearable. That is the trouble with drugs, it starts out as fun until it is not anymore. I will not relapse.",
      "Reddit response":
        "The craving will never go away. This is unfortunately the scientifically proven truth. Instead of fighting the fear of craving, try embracing it as a darkness that is simply a necessary yin to the yang of life. Congrats on 6 years!",
      "LLM response": null,
    },
    {
      "Question (Reddit post)":
        "Anyone have tips for how to prove to people you are sober? It is really hard when everyone that matters to me doubts that I am still clean. To be honest, I have been super close to relapsing but still have not.",
      "Reddit response":
        "I am sorry that nobody is believing in you right now. Just focus on yourself and on remaining off of opioid use. Good luck!",
      "LLM response": null,
    },
    {
      "Question (Reddit post)":
        "I have been dependent on suboxone (medication-assisted treatment against opioids) for 3 to 4 years. I am worried that I am just trading one addiction for another. I will end up addicted to both opioids and suboxone. Do others also feel the same?",
      "Reddit response":
        "Yes, with suboxone, I traded one addiction for another. But 2 years later I'm employable, functional, have money in the bank, and don't hate my life. I traded a hellish existence for a decent life. Yes, I'm addicted to suboxone now, but this addiction is an angel compared to the devil that was opioid addiction. I honestly could quit using suboxone if I chose to.",
      "LLM response": null,
    },
    {
      "Question (Reddit post)": "How to stay sober?",
      "Reddit response":
        "I know that exact feeling! Get in contact with people who are in recovery man! They will save you. Take care!",
      "LLM response": null,
    },
    {
      "Question (Reddit post)":
        "Hey everyone! I want to be done with opioids once and for all. I have enrolled into a medication-assisted treatment program and have an upcoming appointment coming up soon. What should be my plan of action?",
      "Reddit response":
        "Talk to the doctor! That will give you some accountability, and because they'll get to know you personally, they will know the best plan for helping you get straightened out. You will get through this!",
      "LLM response": null,
    },
    {
      "Question (Reddit post)":
        "I have been on suboxone for about 6 weeks now, and I am having a lot of side effects. Can anyone offer advice? Mainly I am sleepy all the time. Also, I feel like suboxone puts me in a state of mind to want to use more opioids than I normally would, so I have had some frequent relapses. Can anyone tell me if they have had similar experiences, and how they coped, if they continued suboxone?",
      "Reddit response":
        "What’s your dosage and what was opioid opiate habit like? It all depends on that. Sounds like you might be on too large of a dose for suboxone. I’ve been on and off suboxone for a couple years, but I’ve been on every possible dosage at one point or another. Too low of a dose, you experience opioid withdrawal; too high of a dose, you’ll get sleepy. Suboxone did nothing to subside the urge to use opioids for me.",
      "LLM response": null,
    },
  ],
  [
    {
      "Question (Reddit post)":
        "I have been on suboxone for about 6 weeks now, and I am having a lot of side effects. Can anyone offer advice? Mainly I am sleepy all the time. Also, I feel like suboxone puts me in a state of mind to want to use more opioids than I normally would, so I have had some frequent relapses. Can anyone tell me if they have had similar experiences, and how they coped, if they continued suboxone?",
      "Reddit response":
        "What’s your dosage and what was opioid opiate habit like? It all depends on that. Sounds like you might be on too large of a dose for suboxone. I’ve been on and off suboxone for a couple years, but I’ve been on every possible dosage at one point or another. Too low of a dose, you experience opioid withdrawal; too high of a dose, you’ll get sleepy. Suboxone did nothing to subside the urge to use opioids for me.",
      "LLM response": null,
    },
  ],
];
