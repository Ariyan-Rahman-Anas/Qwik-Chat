// import { useState, useEffect } from 'react';

// export default function ChatTime({ updatedAt }) {
//   const [timeString, setTimeString] = useState('');

//   useEffect(() => {
//     const timeDifference = (Date.now() - updatedAt) / 1000; // Difference in seconds

//     if (timeDifference < 60) {
//       setTimeString('just now');
//     } else if (timeDifference < 3600) {
//       setTimeString(`${Math.floor(timeDifference / 60)} min ago`);
//     } else if (timeDifference < 86400) {
//       setTimeString(`${Math.floor(timeDifference / 3600)} hours ago`);
//     } else {
//       const date = new Date(updatedAt);
//       setTimeString(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
//     }

//     const interval = setInterval(() => {
//       const timeDifference = (Date.now() - updatedAt) / 1000;

//       if (timeDifference < 60) {
//         setTimeString('just now');
//       } else if (timeDifference < 3600) {
//         setTimeString(`${Math.floor(timeDifference / 60)} min ago`);
//       } else if (timeDifference < 86400) {
//         setTimeString(`${Math.floor(timeDifference / 3600)} hours ago`);
//       } else {
//         const date = new Date(updatedAt);
//         setTimeString(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
//       }
//     }, 60000); // Update every minute

//     return () => clearInterval(interval); // Cleanup on component unmount
//   }, [updatedAt]);

//   return <span>{timeString}</span>;
// }






import { useState, useEffect } from 'react';

export default function ChatTime({ updatedAt }) {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const timeDifference = (Date.now() - updatedAt) / 1000; // Difference in seconds

    if (timeDifference < 60) {
      setTimeString('just now');
    } else {
      const date = new Date(updatedAt);
      setTimeString(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }

    // Update the timeString after 60 seconds to the actual time
    const timeout = setTimeout(() => {
      const date = new Date(updatedAt);
      setTimeString(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);

    return () => clearTimeout(timeout); // Cleanup on component unmount
  }, [updatedAt]);

  return <span>{timeString}</span>;
}