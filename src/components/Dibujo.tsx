
import React, { useEffect, useRef } from 'react';

// Definición de las propiedades del componente Dibujo
interface DibujoProps {
  intentosFallidos: number; // Número de intentos fallidos (0-6)
}

// Componente para dibujar el ahorcado utilizando canvas
const Dibujo: React.FC<DibujoProps> = ({ intentosFallidos }) => {
  // Referencia al elemento canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Dibujar el ahorcado cuando cambian los intentos fallidos
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    // Limpiar el canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Configurar el estilo de dibujo
    context.strokeStyle = '#333333';
    context.lineWidth = 4;
    context.lineCap = 'round';
    
    // Dibujar la base (siempre visible)
    context.beginPath();
    context.moveTo(20, 280);
    context.lineTo(180, 280);
    context.stroke();
    
    // Dibujar progresivamente según los intentos fallidos
    if (intentosFallidos >= 1) {
      // Poste vertical
      context.beginPath();
      context.moveTo(60, 280);
      context.lineTo(60, 40);
      context.stroke();
    }
    
    if (intentosFallidos >= 2) {
      // Poste horizontal
      context.beginPath();
      context.moveTo(60, 40);
      context.lineTo(150, 40);
      context.stroke();
    }
    
    if (intentosFallidos >= 3) {
      // Cuerda
      context.beginPath();
      context.moveTo(150, 40);
      context.lineTo(150, 70);
      context.stroke();
    }
    
    if (intentosFallidos >= 4) {
      // Cabeza
      context.beginPath();
      context.arc(150, 90, 20, 0, Math.PI * 2);
      context.stroke();
    }
    
    if (intentosFallidos >= 5) {
      // Cuerpo
      context.beginPath();
      context.moveTo(150, 110);
      context.lineTo(150, 190);
      context.stroke();
      
      // Brazos
      context.beginPath();
      context.moveTo(150, 130);
      context.lineTo(120, 160);
      context.stroke();
      
      context.beginPath();
      context.moveTo(150, 130);
      context.lineTo(180, 160);
      context.stroke();
    }
    
    if (intentosFallidos >= 6) {
      // Piernas
      context.beginPath();
      context.moveTo(150, 190);
      context.lineTo(120, 230);
      context.stroke();
      
      context.beginPath();
      context.moveTo(150, 190);
      context.lineTo(180, 230);
      context.stroke();
    }
    
  }, [intentosFallidos]);

  return (
    <div className="border border-gray-300 rounded-lg bg-white p-3 shadow-sm">
      <canvas
        ref={canvasRef}
        width={200}
        height={300}
        className="mx-auto"
      />
    </div>
  );
};

export default Dibujo;
