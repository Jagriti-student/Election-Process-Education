import React from 'react';
import { Users, FileText, Megaphone, CheckSquare, Award } from 'lucide-react';
import type { ElectionStep } from '../types';

export const ELECTION_STEPS: ElectionStep[] = [
  {
    id: 'registration',
    title: 'Voter Registration',
    shortDescription: 'Register to vote in your local constituency.',
    duration: 'Months before election',
    detailedDescription: 'The first and most crucial step in the democratic process. Citizens must ensure their names are correctly listed on the electoral roll. Registration often requires proof of identity and residence.',
    tips: ['Check your registration status early.', 'Keep your ID documents handy.', 'Update your address if you have recently moved.'],
    extraDetails: {
      importance: "It guarantees that only eligible citizens can vote and prevents fraudulent voting.",
      whoIsInvolved: "The Electoral Commission, eligible citizens, and local government bodies."
    },
    icon: React.createElement(Users, { size: 20 })
  },
  {
    id: 'nomination',
    title: 'Candidate Nomination',
    shortDescription: 'Candidates file their papers to run for office.',
    duration: '3-4 weeks before election',
    detailedDescription: 'Individuals wishing to contest the election must submit their nomination papers to the Election Commission. This includes disclosing financial assets and criminal records to ensure transparency.',
    tips: ['Review the list of candidates in your area.', 'Read candidate manifestos.', 'Check candidate disclosures.'],
    extraDetails: {
      importance: "It gives voters a clear choice of representatives and ensures candidates meet legal requirements.",
      whoIsInvolved: "Political candidates, parties, and the Returning Officer."
    },
    icon: React.createElement(FileText, { size: 20 })
  },
  {
    id: 'campaign',
    title: 'Campaign Period',
    shortDescription: 'Candidates present their platforms to the public.',
    duration: '2-3 weeks',
    detailedDescription: 'Political parties and candidates engage in rallies, debates, and advertising to convince voters. The Election Commission monitors this period to ensure fair play and adherence to the Model Code of Conduct.',
    tips: ['Attend local debates or town halls.', 'Cross-check claims made in advertisements.', 'Look beyond party lines.'],
    extraDetails: {
      importance: "It allows citizens to make informed decisions by understanding candidate platforms and visions.",
      whoIsInvolved: "Candidates, political parties, the media, and the general public."
    },
    icon: React.createElement(Megaphone, { size: 20 })
  },
  {
    id: 'voting',
    title: 'Voting Day',
    shortDescription: 'Citizens cast their ballots at polling stations.',
    duration: '1 day',
    detailedDescription: 'The culmination of the process. Voters go to their designated polling booths to cast their votes secretly. Security forces are deployed to ensure a peaceful and fair voting environment.',
    tips: ['Find your polling station in advance.', 'Go early to avoid long queues.', 'Do not carry prohibited items (like phones) into the booth.'],
    extraDetails: {
      importance: "This is the direct act of democratic participation where the populace chooses its leaders.",
      whoIsInvolved: "Voters, polling officers, and election observers."
    },
    icon: React.createElement(CheckSquare, { size: 20 })
  },
  {
    id: 'results',
    title: 'Counting & Results',
    shortDescription: 'Votes are counted and the winners are declared.',
    duration: '1-3 days post-voting',
    detailedDescription: 'Electronic Voting Machines (EVMs) or ballot boxes are opened under strict supervision. Votes are counted, and the candidate with the highest number of votes is declared the winner by the Returning Officer.',
    tips: ['Follow official Election Commission updates.', 'Be patient as final tallies can take time.', 'Respect the democratic outcome.'],
    extraDetails: {
      importance: "It accurately reflects the will of the people and ensures a peaceful transition or continuation of power.",
      whoIsInvolved: "Returning Officers, counting agents, candidates, and the Election Commission."
    },
    icon: React.createElement(Award, { size: 20 })
  }
];
