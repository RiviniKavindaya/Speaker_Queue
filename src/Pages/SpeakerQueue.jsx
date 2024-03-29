import React, { useState } from 'react';
import './SpeakerQueue.css';

const SpeakerQueue = () => {
  const [participants, setParticipants] = useState([
    { id: 1, name: 'Participant 1', handRaised: false },
    { id: 2, name: 'Participant 2', handRaised: false },
    { id: 3, name: 'Participant 3', handRaised: false },
    { id: 4, name: 'Participant 4', handRaised: false },
    { id: 5, name: 'Participant 5', handRaised: false },
    { id: 6, name: 'Participant 6', handRaised: false },

  ]);
  const [raiseHandOrder, setRaiseHandOrder] = useState([]);
  const handleHandRaise = (participantId) => {
    const participantIndex = participants.findIndex(participant => participant.id === participantId);

    if (participantIndex !== -1) {
      const updatedParticipants = [...participants];
      updatedParticipants[participantIndex].handRaised = true;
      setParticipants(updatedParticipants);
      setRaiseHandOrder([...raiseHandOrder, participantId]);
    }
  };

  const handleLowerHand = (participantId) => {
    const updatedParticipants = participants.map(participant => {
      if (participant.id === participantId) {
        return { ...participant, handRaised: false };
      }
      return participant;
    });
    setParticipants(updatedParticipants);
    const updatedRaiseHandOrder = raiseHandOrder.filter(id => id !== participantId);
    setRaiseHandOrder(updatedRaiseHandOrder);
  };

  return (
    <div className="speaker-queue">
      <h2>Speaker Queue</h2>
      <div className="raise-hand-order">
        Raise Hand Order: {raiseHandOrder.join(', ')}
      </div>
      <ul>
        {participants.map(participant => (
          <li key={participant.id} className={participant.handRaised ? 'raised-hand' : ''}>
            {participant.name}
            {participant.handRaised ? (
              <button onClick={() => handleLowerHand(participant.id)}>Lower Hand</button>
            ) : (
              <button onClick={() => handleHandRaise(participant.id)}>Raise Hand</button>
            )}
          </li>
        ))}
      </ul>
      {raiseHandOrder.length === 0 && <p>No participants in the queue.</p>}
    </div>
  );
};

export default SpeakerQueue;
