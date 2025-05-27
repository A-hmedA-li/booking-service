'use client';
import { useState, useRef, useEffect } from 'react';
import { Clock, X, ChevronDown , ChevronRight} from 'lucide-react';

export  function CircularTimePicker ({isDisabled}) {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState(12);
  const [selectedMin, setSelectedMin] = useState(15);
  const [isAm, setIsAm] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [minutes , setMinutes] = useState(false);
  const circleRef = useRef(null);



  // Convert selected hour to display format
  const displayTime = `${selectedHour.toString().padStart(2, '0')}:${selectedMin.toString().padStart(2, '0')} ${isAm ? 'AM' : 'PM'}`;

  // Handle mouse/touch events for circular selection
  const updateSelection = (clientX, clientY) => {
    if (!circleRef.current) return;
    
    const rect = circleRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(clientY - centerY, clientX - centerX) * 180 / Math.PI  ;
    
   
    let now = Math.round(((angle + 90 + 360) % 360) / 30);
    console.log(now)
    if (minutes)
      setSelectedMin(now*5)
    else
      setSelectedHour(now === 0 ? 12 : now);
  };

  // Event handlers
  const handleInteractionStart = (e) => {
    setIsDragging(true);
    updateSelection(
      e.clientX || e.touches[0].clientX, 
      e.clientY || e.touches[0].clientY
    );
  };

  const handleInteractionMove = (e) => {
    if (isDragging) {

      updateSelection(
        e.clientX || e.touches[0].clientX, 
        e.clientY || e.touches[0].clientY
      );
           
    }
  };

  const handleInteractionEnd = () => {
    setIsDragging(false);
  };
  const handleInteractionDown = (e) =>{

    if (circleRef.current  && !circleRef.current.contains(e.target))
      setIsOpen(false)
  }

  // Effect for event listeners
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousemove', handleInteractionMove);
      document.addEventListener('mouseup', handleInteractionEnd);
      document.addEventListener('mousedown', handleInteractionDown);
      document.addEventListener('touchmove', handleInteractionMove);
      document.addEventListener('touchstart', handleInteractionDown);
      document.addEventListener('touchend', handleInteractionEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleInteractionMove);
      document.removeEventListener('mouseup', handleInteractionEnd);
      document.removeEventListener('mousedown', handleInteractionDown);

      document.removeEventListener('touchmove', handleInteractionMove);
      document.removeEventListener('touchend', handleInteractionEnd);
      document.removeEventListener('touchstart', handleInteractionDown);

    };
  }, [isOpen, isDragging]);

  return (
    <div className="relative w-full max-w-xs">
      {/* Toggle Button */}
      <a
        onClick={() => setIsOpen(!isOpen && isDisabled ==true  ) }
        className={`w-full flex items-center justify-between p-3 border rounded-lg transition-all ${isOpen ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300 hover:border-gray-400'}`}
      >
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-gray-500" />
          <span className="font-medium">{displayTime}</span>
        </div>
        {isOpen ? (
          <X className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </a>

      {/* Time Picker Dropdown */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden dark:bg-gray-800">
          <div className="p-4">
            {/* Circular Clock */}

            <div className='flex justify-end' onClick={()=> setMinutes(!minutes)}>
                <ChevronRight />
            </div>
            {
               minutes? 
              <MinuteClock circleRef={circleRef} handleInteractionStart={handleInteractionStart}  selectedMin={selectedMin} setSelectedMin={setSelectedMin}  />
              :<HourClock circleRef={circleRef} handleInteractionStart={handleInteractionStart}  selectedHour={selectedHour} setSelectedHour={setSelectedHour}/>
            }
            {/* AM/PM Selector */}
            <div className="flex justify-center gap-4 mt-6">
              <a
                className={`px-6 py-2 rounded-lg transition-colors ${isAm ? 'bg-blue-500 text-white'   : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => setIsAm(true)}
              >
                AM
              </a>
              <a
                className={`px-6 py-2 rounded-lg transition-colors ${!isAm ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => setIsAm(false)}
              >
                PM
              </a>
            </div>
          </div>

          {/* Footer with Done button */}
          <div className="border-t p-3 bg-gray-50 flex justify-end">
            <a
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Done
            </a>
          </div>
        </div>
      )}
    </div>
  );
}


function HourClock( {circleRef , handleInteractionStart  , selectedHour , setSelectedHour}){

    const hours = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
     <div 
              ref={circleRef}
              className="relative mx-auto w-48 h-48 rounded-full border-2 border-gray-200 cursor-pointer select-none"
              onMouseDown={handleInteractionStart}
              onTouchStart={handleInteractionStart}
            >
              {/* Center point */}
              <div className="absolute w-3 h-3 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2" 
                style={{ top: '50%', left: '50%' }} />

              {/* Hour hand */}
              <div 
                className="absolute w-1 h-15 bg-blue-500 origin-bottom transform -translate-y-1/2"
                style={{
                  transform: `rotate(${selectedHour * 30  }deg)`,
                  top: '34%',
                  left: '49%'
                }}
              />

              {/* Hour markers */}
              {hours.map((hour) => {
                const angle = (hour * 30 - 90) * (Math.PI / 180);
                const radius = 80;
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);
                
                return (
                  <div
                    key={hour}
                    className={`absolute flex items-center justify-center w-8 h-8 rounded-full transition-all
                      ${selectedHour === hour ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`}
                    style={{
                      left: `calc(50% + ${x}px - 1rem)`,
                      top: `calc(50% + ${y}px - 1rem)`
                    }}
                    onClick={() =>{ setSelectedHour(hour)}}
                  >
                    {hour}
                  </div>
                );
              })}
            </div>
  )
}


function MinuteClock( {circleRef , handleInteractionStart  , selectedMin, setSelectedMin }){


  const minute = Array.from({ length: 12 }, (_, i) =>  5*i);
  return (
     <div 
              ref={circleRef}
              className="relative mx-auto w-48 h-48 rounded-full border-2 border-gray-200 cursor-pointer select-none"
              onMouseDown={handleInteractionStart}
              onTouchStart={handleInteractionStart}
            >
              {/* Center point */}
              <div className="absolute w-3 h-3 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2" 
                style={{ top: '50%', left: '50%' }} />

              {/* Hour hand */}
              <div 
                className="absolute w-1 h-15 bg-blue-500 origin-bottom transform -translate-y-1/2"
                style={{
                  transform: `rotate(${selectedMin * 6   }deg)`,
                  top: '34%',
                  left: '49%'
                }}
              />

              {/* Hour markers */}
              {minute.map((m) => {
                
                const angle = (m * 6 - 90) * (Math.PI / 180);
                const radius = 80;
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);
                
                return (
                  <div
                    key={m}
                    className={`absolute flex items-center justify-center w-8 h-8 rounded-full transition-all 
                      ${selectedMin === m ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`}
                    style={{
                      left: `calc(50% + ${x}px - 1rem)`,
                      top: `calc(50% + ${y}px - 1rem)`
                    }}
                    onClick={() =>setSelectedMin(m)} >
                    {m}
                  </div>
                );
              })}
            </div>
  )
}
