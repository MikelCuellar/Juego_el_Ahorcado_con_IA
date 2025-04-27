
import React from 'react';
import GameMessage from './GameMessage';
import { EstadoJuego } from '@/models/AhorcadoTypes';

interface MensajesDeErrorProps {
  estadoJuego: EstadoJuego;
  palabraSecreta: string;
  onReiniciar: () => void;
  isLoading: boolean;
}

const MensajesDeError: React.FC<MensajesDeErrorProps> = (props) => {
  return <GameMessage {...props} />;
};

export default MensajesDeError;
